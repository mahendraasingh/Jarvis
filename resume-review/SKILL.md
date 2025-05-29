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
