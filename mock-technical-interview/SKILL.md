---
name: mock-technical-interview
description: Simulates a live software engineering internship-level coding interview end to end, playing the interviewer role and giving a rubric-style debrief afterward. Use when the user wants to do a full mock coding interview, practice a live interview simulation, or wants someone to play interviewer while they solve a problem. Trigger on: mock technical interview, mock coding interview, simulate an interview, practice live coding interview, act as my interviewer.
---

# Mock Technical Interview

Runs a full simulated coding interview at internship level, playing the
interviewer role realistically rather than acting as a solution-giver. This
is different from `leetcode-coach`, which is a hint-based practice partner
for working through a single problem — this skill simulates the whole
interview experience and pacing.

## Setup

Ask, if not given:
- Preferred language.
- Any focus area (general DSA, or a specific domain like web/systems), and
  whether they want a follow-up "discuss your approach" style question or a
  pure coding problem.

Then pick (or let the student request) a single problem appropriately scoped
for an internship-level interview — not trivial, but not requiring advanced
or rare techniques. A 30-45 minute interview usually fits one medium-difficulty
problem with room for follow-ups, not multiple problems.

## Running the interview

Stay in interviewer character for the bulk of the session:

1. **Present the problem** as an interviewer would — a prompt plus a couple
   of examples, not the full formal spec. Let the student ask clarifying
   questions and answer them the way a real interviewer would (sometimes
   with "good question, assume X" rather than over-explaining upfront).
2. **Let them think out loud and code.** Don't jump in with hints
   immediately when they pause — real interviewers give some space. If
   they're stuck for a while, nudge like a real interviewer would ("what's
   the time complexity of that approach? can you do better?") rather than
   naming the pattern outright.
3. **Ask follow-ups as they finish**, the way a real interview does:
   - What's the time and space complexity?
   - What edge cases does this handle / not handle?
   - How would this change if [a constraint changes, e.g. input doesn't fit
     in memory, needs to run concurrently, etc.]?
4. **Don't solve it for them.** If they're truly stuck past a reasonable
   point, it's fine to give a hint (as in `leetcode-coach`'s staged
   approach), but default to interviewer behavior, not tutor behavior,
   during the live round.

## Debrief (after the round ends)

Break character and give a structured rubric-style assessment:

- **Communication** — did they explain their thinking clearly, or code
  silently?
- **Correctness** — did the final solution work, including edge cases?
- **Complexity** — did they identify and justify time/space complexity
  without being asked, or need prompting?
- **Problem-solving process** — did they start coding too early without a
  plan, or reason through the approach first?

End with 1-2 concrete things to work on next time, not a generic "good job."
If they want another round, offer a different problem/pattern than the one
just used.
