#!/usr/bin/env bash
# PreToolUse (Edit|Write): refuse edits to .env files (EmailJS keys live there).
# .env.example is allowed so the template can still be maintained.

f=$(/usr/bin/jq -r '.tool_input.file_path // empty')
name=$(basename "$f")

case "$name" in
  .env.example) exit 0 ;;
  .env|.env.*)
    echo "Blocked: $name holds environment secrets. Edit it manually if needed." >&2
    exit 2
    ;;
esac
