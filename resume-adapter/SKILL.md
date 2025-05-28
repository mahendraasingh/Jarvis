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
