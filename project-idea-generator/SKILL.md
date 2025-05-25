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
