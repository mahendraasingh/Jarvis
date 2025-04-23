#!/usr/bin/env bash
# Installs the get-swe skill pack into ~/.claude/skills/
# Usage: curl -fsSL https://raw.githubusercontent.com/TheMuffinMan1320/get-swe/main/install.sh | bash
set -euo pipefail

REPO="TheMuffinMan1320/get-swe"
BRANCH="main"
TARGET_DIR="${HOME}/.claude/skills"
SKILLS=(
  resume-review
  resume-adapter
  internship-posting-searcher
  project-idea-generator
  leetcode-coach
  behavioral-interview-prep
  mock-technical-interview
  github-portfolio-polish
)

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Downloading ${REPO}@${BRANCH}..."
