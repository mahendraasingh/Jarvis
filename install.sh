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
