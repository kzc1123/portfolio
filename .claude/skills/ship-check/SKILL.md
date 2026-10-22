---
name: ship-check
description: Pre-deploy audit for the portfolio — lint, typecheck, build, leftover template content, oversized assets, and todo.md drift. Report only; never modifies files.
disable-model-invocation: true
---

# Ship Check

Run every step, then print one report. Do not modify any files.

## 1. Build health

Run each and report failures verbatim (first ~30 lines):

```bash
npm run lint
npx tsc --noEmit
npx next build
```

## 2. Template leftovers

This site started from another person's portfolio template. Search for remnants:

```bash
grep -rniE "chaitanya|itschai_tea|meridian-in|medium\.com|this is me!" app components lib
ls public | grep -i chaitanya
```

Also flag `href="#"` or empty `href=""` links in `components/`.

## 3. Asset weight

```bash
find public -type f -size +500k -exec du -h {} +
```

For each file over 500 KB, suggest a target (e.g. resize to 2000px long edge, convert to WebP, ~200–400 KB). Note which component imports it.

## 4. Todo drift

Read `tasks/todo.md`. For each unchecked `[ ]` item, check the referenced file and classify it:
- **Done in code** — the item can be ticked
- **Still open** — the placeholder or old value is still there
- **Stale** — the file or component no longer exists

## Report format

```
## Ship check — <date>
Build:      lint ✅/❌ · tsc ✅/❌ · build ✅/❌
Leftovers:  <count> — file:line list
Assets:     <count> over 500 KB — list with sizes
Todo drift: <n> done-in-code · <n> still open · <n> stale
Verdict:    READY / NOT READY — top 3 blockers
```
