#!/usr/bin/env bash
# PostToolUse (Edit|Write): typecheck the project and lint the edited file.
# Exit 2 sends the errors back to Claude so it fixes them immediately.

f=$(/usr/bin/jq -r '.tool_input.file_path // empty')

case "$f" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0

if ! out=$(npx tsc --noEmit 2>&1); then
  echo "TypeScript errors after editing $f:" >&2
  echo "$out" | head -30 >&2
  exit 2
fi

if ! out=$(npx next lint --file "$f" 2>&1); then
  echo "ESLint errors in $f:" >&2
  echo "$out" | head -30 >&2
  exit 2
fi
