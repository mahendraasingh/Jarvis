---
name: internship-posting-searcher
description: Searches the web for currently open software engineering internship postings matching a student's criteria (companies, location, class year, tech stack) and returns them as a table. Use when the user asks to find internships, search for open SWE internship postings, or wants a list of companies currently hiring interns. Trigger on: find internships, internship postings, who's hiring interns, search for SWE internships, internship search.
---

# Internship Posting Searcher

Finds current, open SWE internship postings matching the student's criteria.
Requires the `WebSearch` and/or `WebFetch` tools — if neither is available in
the current environment, say so upfront and suggest the student check their
school's career portal (Handshake) and company career pages directly instead
of guessing at postings from memory. **Never list a posting from training
data as if it's currently open** — postings open and close constantly, and
stale info wastes a student's application cycle.

## Inputs to gather first

Ask for whatever of these isn't already given:
- Target companies or industries (or "open to anything").
- Target internship cycle (e.g. Summer 2027) and class year/grad date.
- Location preference (remote / specific cities / no preference).
- Tech stack or role focus (backend, frontend, ML, mobile, etc.), if any.

## Search strategy

Run multiple searches from different angles rather than one broad query —
job aggregators and company sites index differently:

1. **Curated internship-list repos** — search for e.g.
   `"Summer 2027 internships" software engineering github` to find
   community-maintained lists (the SimplifyJobs-style
   "Summer20XX-Internships" repos are the best-known example and are
   updated frequently by students). These are usually the highest-signal,
   lowest-effort source.
2. **Company career pages directly**, for any companies the user named —
   search `<company> software engineering internship <cycle>` and fetch the
   careers page to confirm the posting is actually open (not just cached).
3. **Job boards** — general search like
   `site:linkedin.com/jobs software engineering intern <cycle>` or similar
   for boards that are searchable without login.
4. If the user gave a tech-stack focus, thread that into the queries (e.g.
   "backend software engineering intern" vs. generic "software engineering
   intern").

Use `WebFetch` on promising links to confirm the posting is real, still
open, and matches the criteria — don't just report a search-result snippet
as fact, since snippets can be stale or misleading.

## Output format

A table: **Company | Role | Location | Posted/Deadline (if known) | Link**.
Group or sort by relevance to the user's stated criteria. After the table:

- Note any postings that appear to be closing soon or already closed (drop
  closed ones from the table, don't pad the list with dead links).
- Explicitly state: *"This is what's publicly searchable right now — also
  check your school's Handshake/career portal, since many internships post
  there first or exclusively."*
- If search tools aren't available or results are thin, say so directly
  rather than filling in gaps with guesses.
