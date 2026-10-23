import {
  EndSensitivity,
  GoogleGenAI,
  Modality,
  StartSensitivity,
} from "@google/genai";
import decibri from "decibri";
const Decibri = decibri as any;
const DecibriOutput = (decibri as any).DecibriOutput || (decibri as any);
import { Server } from "socket.io";
import StreamConfig from "../constants/StreamConfig.js";
import { appToolDeclarations, handleAppAction } from "../tools/app-agent.js";
import {
  browserToolDeclarations,
  handleBrowserAction,
} from "../tools/browser-agent.js";
import { nexusToolDeclarations, handleNexusFs } from "../tools/nexus-agent.js";
import { addMemory, getMemoryContextString } from "../utils/memory.js";

let isConnected = false;
let stopSession: (() => void) | null = null;

async function connectIrisVoice(io: Server) {
  const memoryContext = getMemoryContextString();
  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const systemInstruction = `You are IRIS — a voice assistant running locally on Harsh's machine.

CURRENT DATE & TIME: ${currentDate}
TIMEZONE: ${timeZone}

IDENTITY:
- Your name is IRIS. You were built by Harsh.
- You are direct, sharp, and confident — not robotic, not overly formal.
- You speak like a capable assistant who knows the machine inside out.
- Keep responses concise. This is voice — no bullet points, no markdown, no lists.
- Never say "As an AI" or "I'm just an assistant". You are IRIS. Act like it.

CAPABILITIES:
- You have full access to this machine: files, apps, and the browser.
- You can open and close applications.
- You can search Google and YouTube.
- You can read, write, and manage files and directories.
- You know the current time and date — answer time/date questions instantly without calling any tool.

BEHAVIOR:
- If Harsh asks what time or date it is, answer immediately from your context — do not call a tool.
- When executing a task, confirm it briefly after doing it. Don't narrate before.
- If something fails, say what went wrong in plain words. No technical stack traces.
- Match Harsh's energy. If he's casual, be casual. If he's focused, be sharp.

MEMORY & CONVERSATION HISTORY:
${
  memoryContext && memoryContext !== "No previous conversation history."
    ? `CRITICAL — Resume naturally from this prior conversation. Do not greet if already mid-conversation:\n${memoryContext}`
    : "No prior conversation history. This is a fresh session — a brief greeting is fine."
}`;

  const voiceName = process.env.IRIS_VOICE || "Lyra";

  const config = {
    responseModalities: [Modality.AUDIO],
    systemInstruction,
    tools: [
      {
        functionDeclarations: [
          ...nexusToolDeclarations,
          ...browserToolDeclarations,
          ...appToolDeclarations,
        ],
      },
    ],
    automaticActivityDetection: {
      disabled: true,
      startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
      endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_HIGH,
      prefixPaddingMs: 20,
      silenceDurationMs: 100,
    },
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName,
        },
      },
    },
  };

  const messageQueue: any[] = [];
  const audioQueue: Buffer[] = [];
  let speaker: any = null;
  let userTranscript = "";
  let agentTranscript = "";
  const modelName = StreamConfig(systemInstruction);

  async function getNextMessage() {
    while (messageQueue.length === 0) {
      await new Promise((r) => setImmediate(r));
    }
    return messageQueue.shift();
  }

  function initSpeaker() {
    if (speaker) speaker.end();
    speaker = new DecibriOutput({
      channels: 1,
      format: "int16",
      sampleRate: 24000,
    });
    speaker.on("error", (err: any) => console.error("Speaker error:", err));
  }

  async function processIncomingMessages() {
    while (true) {
      const msg = await getNextMessage();
      if (!msg) continue;
      if (msg.serverContent && msg.serverContent.interrupted) {
        audioQueue.length = 0;
        if (speaker) {
          speaker.stop();
          initSpeaker();
        }
        continue;
      }
      if (msg.toolCall) {
        const functionResponses = [];
        for (const fc of msg.toolCall.functionCalls || []) {
          if (fc.name === "create_directory" || fc.name === "write_file") {
            const res = handleNexusFs(msg.toolCall, io);
            functionResponses.push(...res);
          } else if (
            fc.name === "open_website" ||
            fc.name === "search_youtube" ||
            fc.name === "search_google"
          ) {
            const res = await handleBrowserAction(fc, io);
            functionResponses.push(res);
          } else if (fc.name === "open_app" || fc.name === "close_app") {
            const res = await handleAppAction(fc, io);
            functionResponses.push(res);
          }
        }
        session.sendToolResponse({ functionResponses });
      }
      if (
        msg.serverContent &&
        msg.serverContent.modelTurn &&
        msg.serverContent.modelTurn.parts
      ) {
        for (const part of msg.serverContent.modelTurn.parts) {
          if (part.inlineData && part.inlineData.data) {
            audioQueue.push(Buffer.from(part.inlineData.data, "base64"));
          }
        }
      }
      if (msg.serverContent && msg.serverContent.turnComplete) {
        // Turn completed
      }
    }
  }

  async function playAudio() {
    while (true) {
      if (audioQueue.length === 0) {
        await new Promise((r) => setImmediate(r));
      } else {
        if (!speaker) initSpeaker();
        const chunk = audioQueue.shift()!;
        await new Promise<void>((resolve) => {
          speaker.write(chunk, () => resolve());
        });
      }
    }
  }

  processIncomingMessages();
  playAudio();

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });
  const session = await ai.live.connect({
    model: modelName,
    config: config as any,
    callbacks: {
      onopen: () => console.log("Connected to Gemini Live API"),
      onmessage: (msg: any) => {
        messageQueue.push(msg);
        const sc = msg.serverContent;
        if (sc?.inputTranscription) {
          userTranscript += sc.inputTranscription.text;
          io.emit("transcript_chunk", {
            role: "USER",
            text: sc.inputTranscription.text,
          });
        }
        if (sc?.outputTranscription) {
          agentTranscript += sc.outputTranscription.text;
          io.emit("transcript_chunk", {
            role: "AGENT",
            text: sc.outputTranscription.text,
          });
        }
        if (sc?.turnComplete) {
          if (userTranscript.trim()) {
            addMemory("USER", userTranscript.trim());
            userTranscript = "";
          }
          if (agentTranscript.trim()) {
            addMemory("AGENT", agentTranscript.trim());
            agentTranscript = "";
          }
          io.emit("turn_complete");
        }
      },
      onerror: (err: any) => io.emit("system_status", err.message),
      onclose: (e: any) => io.emit("system_status", e.reason),
    },
  });

  const mic = new Decibri({
    sampleRate: 16000,
    framesPerBuffer: 1600,
    channels: 1,
  });

  mic.on("data", (data: any) => {
    session.sendRealtimeInput({
      audio: {
        data: data.toString("base64"),
        mimeType: "audio/pcm;rate=16000",
      },
    });
  });

  mic.on("error", (err: any) => {
    console.error("Microphone error:", err);
  });

  console.log("Microphone started. Speak now...");

  return () => {
    mic.stop();
    session.close();
    isConnected = false;
  };
}

export const startIrisVoice = (io: Server) => {
  if (isConnected) return;
  isConnected = true;
  io.emit("system_status", "IRIS-MINI : Connected");
  connectIrisVoice(io)
    .then((cleanup) => {
      stopSession = cleanup;
    })
    .catch((err) => {
      console.error(err);
      io.emit("system_status", "Failed to connect: " + err.message);
      isConnected = false;
    });
};

export const stopIrisVoice = (io: Server) => {
  if (!isConnected) return;
  isConnected = false;
  io.emit("system_status", "IRIS-MINI : Disconnected");
  if (stopSession) {
    stopSession();
    stopSession = null;
  }
};
