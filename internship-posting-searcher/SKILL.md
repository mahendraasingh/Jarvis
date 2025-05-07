---
name: internship-posting-searcher
description: Searches the web for currently open software engineering internship postings matching a student's criteria (companies, location, class year, tech stack) and returns them as a table. Use when the user asks to find internships, search for open SWE internship postings, or wants a list of companies currently hiring interns. Trigger on: find internships, internship postings, who's hiring interns, search for SWE internships, internship search.
---

# Internship Posting Searcher

Finds current, open SWE internship postings matching the student's criteria.
Requires the `WebSearch` and/or `WebFetch` tools — if neither is available in
the current environment, say so upfront and suggest the student check their
