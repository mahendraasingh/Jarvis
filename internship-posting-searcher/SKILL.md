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
