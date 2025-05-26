---
name: project-idea-generator
description: Generates resume-worthy personal project ideas scoped to a realistic timeframe, based on specific skills or technologies the student wants to showcase for internship applications. Use when the user wants project ideas, doesn't know what to build, or wants to demonstrate specific skills through a project. Trigger on: project ideas, what should I build, portfolio project, project to showcase X skill, side project ideas for resume.
---

# Project Idea Generator

Generates a short, distinctive list of project ideas scoped to demonstrate
specific skills the student names, sized to a timeframe they can realistically
finish.

## Inputs to gather first

- The specific skill(s)/technologies to showcase (e.g. "React + TypeScript",
  "systems programming in Rust", "data pipelines", "mobile, Swift"). If the
  student is vague ("I want to learn backend"), narrow it down with one
  follow-up question rather than guessing.
- Available time (a weekend, 2 weeks, a full semester) — this changes scope
  dramatically and should be asked if not given.
- Anything they want to avoid repeating (e.g. "I already have a web app on
  my resume, want something different").

## Generating ideas

Produce 3-5 ideas, not a huge list — a focused shortlist is more useful than
an overwhelming one. For each idea:

1. **What it is**, in 1-2 sentences.
2. **Why it demonstrates the target skill(s) well** to someone screening
   resumes — be specific about which parts of the tech stack it exercises,
   not just "it uses React."
3. **Realistic scope for the stated timeframe** — explicitly cut features
   that would blow the budget, and say so ("skip auth/multi-user for a
   weekend build, that alone eats the whole timebox").
4. **What makes it non-generic** — briefly note the twist or specific
   constraint that keeps it out of "yet another CRUD app" territory.

Deliberately avoid the most overdone student-portfolio ideas unless the user
specifically asks for something simple to start with: plain todo apps,
generic weather-app API wrappers, basic calculators, unmodified tutorial
clones. A recruiter skimming 200 resumes has seen these many times; a project
with a specific angle, real constraint, or personal use case stands out more
and is usually no harder to build.

Favor ideas with:
- A genuine personal reason to build it (something the student would
  actually use), which also makes it easier to talk about in interviews.
- A clear technical challenge tied to the target skill, not just UI work
  wrapped around a tutorial's backend.
- A natural "impressive metric" to put on a resume later (throughput,
  latency, data volume, concurrent users handled, test coverage).

## If the student picks one

Once they choose an idea, offer to sketch a rough build plan: milestones in
build order, the first concrete piece to build first (usually the smallest
end-to-end vertical slice, not the hardest component), and what the resume
bullet for it might eventually look like once built — this gives the
student a target to build toward, not just a vague concept.
