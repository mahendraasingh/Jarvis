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
curl -fsSL "https://github.com/${REPO}/archive/refs/heads/${BRANCH}.tar.gz" -o "${TMP_DIR}/repo.tar.gz"
tar -xzf "${TMP_DIR}/repo.tar.gz" -C "${TMP_DIR}"

SRC_DIR="${TMP_DIR}/get-swe-${BRANCH}"
mkdir -p "${TARGET_DIR}"

INSTALLED=()
for skill in "${SKILLS[@]}"; do
  if [ -d "${SRC_DIR}/${skill}" ]; then
    rm -rf "${TARGET_DIR:?}/${skill}"
    cp -R "${SRC_DIR}/${skill}" "${TARGET_DIR}/${skill}"
    INSTALLED+=("$skill")
  else
    echo "Warning: ${skill} not found in downloaded repo, skipping" >&2
  fi
done

echo ""
echo "Installed ${#INSTALLED[@]} skill(s) to ${TARGET_DIR}:"
for skill in "${INSTALLED[@]}"; do
  echo "  - ${skill}"
done
echo ""
echo "Restart Claude Code (or start a new session) to pick them up."
