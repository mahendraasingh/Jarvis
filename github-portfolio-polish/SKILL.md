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
  missing, this is a free, high-visibility win — suggest adding one with a
  short bio, current focus/interests, and links (LinkedIn, portfolio site,
  email) rather than a wall of badges/stats widgets, which recruiters mostly
  skim past.
- Are there 4-6 **pinned repos**? An unpinned profile forces a recruiter to
  guess which repos matter; recommend pinning the strongest, most complete,
  most relevant-to-target-role projects — not just the most recent ones.

### 2. Per-repo README quality (for each pinned/key repo)
For each one, check it has:
- A one-line description of what it does and why, right at the top.
- Instructions to actually run it (setup steps, or better, a live demo
  link/GIF/screenshot — projects that are hard to evaluate quickly get
  skipped).
- The tech stack stated explicitly (helps both human skimming and searches).
Flag repos with no README, or a default auto-generated one (e.g. bare
`# project-name` with nothing else) — these read as unfinished even if the
code inside is solid.

### 3. Repo hygiene
- Are there stale, empty, or clearly-abandoned repos cluttering the profile
  (e.g. forked tutorial repos with no changes, or empty "first commit"
  repos)? Suggest unpinning or, if truly dead weight, deleting/archiving —
  quality over quantity; a profile with 3 polished projects reads better
  than 20 half-finished ones.
- Commit history: wildly inconsistent or a single giant "final commit" can
  read as if the student didn't actually build it incrementally. Not
  something to fix retroactively, but worth flagging as a habit for future
  projects (commit in meaningful increments).
- Are topics/tags set on key repos? These help both GitHub search and quick
  scanning of what a repo is about.

### 4. Alignment with target role
If the student names a target role/stack, check whether the pinned repos
actually demonstrate it. If there's a mismatch (e.g. targeting backend
roles but every pinned repo is a frontend UI clone), say so directly — this
is exactly the kind of gap `project-idea-generator` is meant to help close.

## Output format

1. Quick top-line verdict.
2. Profile-level fixes.
3. Per-repo fixes, repo by repo, most important first.
4. If there's a role-alignment gap, call it out explicitly with a pointer to
   `project-idea-generator`.
