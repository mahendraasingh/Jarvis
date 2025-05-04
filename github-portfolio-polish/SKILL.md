---
name: github-portfolio-polish
description: Audits a student's GitHub profile and repos for internship-application readiness and suggests concrete fixes to profile README, pinned repos, per-repo READMEs, and commit hygiene. Use when the user wants their GitHub profile reviewed, wants to know if their GitHub is recruiter-ready, or asks how to make their GitHub profile stand out. Trigger on: review my github, github profile for internships, is my github good enough, polish my portfolio, github profile audit.
---

# GitHub Portfolio Polish

Audits a student's GitHub profile for internship-application readiness —
recruiters and interviewers commonly click through to GitHub, and a messy
or empty-looking profile undercuts an otherwise strong resume.

## Inputs

Ask for the GitHub username or profile URL if not given. If tools for
reading GitHub are available (e.g. `gh` CLI, web fetch), use them to inspect
the actual profile, pinned repos, and READMEs rather than asking the student
to describe everything manually.

## What to check

### 1. Profile-level
- Is there a profile README (the special `username/username` repo)? If
