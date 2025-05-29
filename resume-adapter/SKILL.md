---
name: resume-adapter
description: Tailors an existing resume to a specific software engineering internship job posting — reorders and rewrites bullets to match the posting's requirements and language without fabricating experience. Use when the user has both a resume and a specific job posting/description and wants the resume tailored, customized, or optimized for that role. Trigger on: tailor my resume, adapt resume to this job, customize resume for this posting, does my resume match this job description.
---

# Resume Adapter

Takes a student's existing resume plus a specific job posting and adapts the
resume to that role. This is different from `resume-review`, which audits a
resume with no specific job in mind — use that one first if the resume has
general quality issues; use this one once there's a real posting to target.

## Inputs required

1. The resume (paste, file, or path).
2. The job posting/description — paste the full text if possible, not just
   a link summary, so the actual required/preferred skills and phrasing are
   visible.

If the user only gives a company + role name with no posting text, ask them
to paste the posting, or use the `internship-posting-searcher` skill's
approach to look it up if web search is available.

## Process

### 1. Extract requirements from the posting
Pull out, explicitly:
- Required technical skills/languages/frameworks.
- Preferred/nice-to-have skills.
- Any domain emphasis (e.g. "distributed systems," "mobile," "data
  pipelines").
- Soft-skill or team-context signals (e.g. "fast-paced," "cross-functional
  collaboration") — these matter less for bullet rewriting but can inform
  which projects to lead with.

### 2. Score existing resume content against those requirements
For each project/experience entry on the resume, note how directly it
relates to the posting's required/preferred skills. Do **not** invent a
connection that isn't there — if nothing on the resume touches a required
skill, that's a real gap to surface, not something to paper over.

### 3. Reorder
- Within Projects/Experience, move the entries most relevant to this
  specific posting higher, even if that's not chronological order (chronological
  order isn't a hard rule for student resumes — relevance matters more once
  applying to a specific role).
- In the Skills section, list the posting's required skills first if the
  student genuinely has them.

### 4. Rewrite bullets to mirror the posting's language
Where the resume already demonstrates a relevant skill but uses different
terminology than the posting (e.g. resume says "built REST endpoints",
posting says "developed APIs"), rewrite to use the posting's terminology —
this is legitimate keyword alignment for both ATS and human skimming, not
dishonesty, as long as the underlying claim stays true. Never add a
technology, tool, or achievement the student didn't actually do.

### 5. Surface gaps honestly
List the required/preferred skills from the posting that the resume doesn't
support at all. Don't suggest fabricating them — instead:
- Suggest if any existing project could legitimately be reframed to
  highlight a related-but-unlisted skill.
- If genuinely absent, say so plainly, and optionally point toward
  `project-idea-generator` to close the gap for future applications.

## Output format

1. Extracted requirement list from the posting (required vs. preferred).
2. Coverage map: which resume entries match which requirements, and which
   requirements have no match.
3. The reordered, reworded resume content (Before → After for changed
   bullets, plus the new section ordering).
4. A short honest list of remaining gaps.
