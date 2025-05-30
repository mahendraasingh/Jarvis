---
name: resume-review
description: Reviews a college student's resume for software engineering internship applications — checks structure, ATS-compatibility, and bullet quality, and rewrites weak bullets. Use when the user shares a resume and asks for feedback, wants it reviewed/critiqued/improved, or asks "is my resume good enough for internships," without a specific job posting in hand. Trigger on: resume review, resume feedback, critique my resume, is my resume good, resume for internships.
---

# Resume Review

Audits a student's resume for SWE internship applications and rewrites weak
parts. This is a general-purpose pass — no specific job posting required. If
the user *does* have a specific posting in hand, prefer the `resume-adapter`
skill instead (or run this first, then that).

## Inputs

Ask for the resume content if not already provided (pasted text, PDF, or
file path). Also useful but optional: target role type (e.g. backend,
frontend, ML) and class year — tailor the bar accordingly (a sophomore's
resume is judged differently than a graduating senior's).

## What to check, in order

### 1. Structure
Expected sections for a student resume, roughly in this order: **Education**,
**Experience** (if any), **Projects**, **Skills**. Flag if:
- Resume is longer than one page (should almost always be one page for a
  student).
- Sections are out of a sensible order (e.g. burying Projects at the bottom
  when the student has no internship experience — Projects should come
  before Experience in that case).
- Education section is missing GPA when GPA is reasonably strong (3.3+), or
  including a weak GPA that would be better omitted (below ~3.0 — mention
  this trade-off, don't decide for them).
- No dates, or inconsistent date formatting.

### 2. ATS compatibility
Flag anything that breaks automated resume parsers:
- Tables, multi-column layouts, text boxes, or images used for content
  (icons for contact info are fine).
- Non-standard fonts or fonts embedded as images.
- Headers/footers containing content that parsers often skip.
- Contact info not in plain text at the top.

### 3. Bullet quality
For every bullet under Experience and Projects, check it has all three of:
- **Action verb** at the start (Built, Designed, Implemented, Optimized,
  Reduced — not "Worked on" or "Responsible for").
- **What was actually done**, specific enough that a reader without context
  understands the technical contribution (not just "helped with backend").
- **Impact or metric** — a number wherever honestly possible (latency
  reduced X%, N users, test coverage from X% to Y%, time saved). If no
  metric is available, at least state the concrete outcome.
