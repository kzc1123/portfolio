# Kshitiz Chaurasia — Portfolio

Single-page personal portfolio. Next.js 14 (App Router) · TypeScript (strict) · Tailwind 3 · shadcn/ui (new-york, zinc) · framer-motion. Deployed on Vercel (`@vercel/analytics`).

## Commands

```bash
npm run dev          # localhost:3000
npm run lint         # next lint (core-web-vitals)
npx tsc --noEmit     # typecheck
npx next build       # production build
```

There is no test suite. `tsc` + `lint` + `build` are the verification gates.

## Architecture

- `app/page.tsx` — the only route. Navbar + Info (hero) are always shown; below them a `RulerCarousel` shows **one section at a time** via `sectionMap`, then Contact + Footer.
- `components/<section>.tsx` — one file per section. `components/ui/` holds shadcn primitives and `ruler-carousel.tsx`.
- A section is registered in three places that must use the identical title string: `rulerItems` and `sectionMap` in `app/page.tsx`, and `navLinks` in `components/navbar.tsx`. Use the `new-section` skill when adding, renaming, or removing one.
- `@/*` resolves to the repo root (`@/components/...`, `@/public/...`).

## Style

- Flat black/white editorial look; gray secondary text; at most one accent color per item.
- Geist Sans is the body font; use `GeistMono` from `geist/font/mono` for dates, labels, metadata.
- Headings: `font-medium tracking-tighter`. Small text: `text-sm tracking-tighter`.
- Data for a section lives in a typed `readonly` const array above the component.

## Context

- This site was built from another person's template (Chaitanya Chaurasia). Leftover content — names, social handles, `meridian-in.com` links, old resumes — is tracked in `tasks/todo.md`. Keep that checklist current when personalizing.
- Contact form uses EmailJS via `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in `.env.local`. Claude is blocked from editing `.env*` files.
- `public/clip.jpg` and `public/snaps/` are multi-MB images; prefer resized/WebP versions when touching them.
- The user writes their own commit messages — stage and suggest, don't commit unless asked.

## Claude Code setup (`.claude/`)

- Hooks: every `.ts`/`.tsx` edit runs `tsc --noEmit` + `next lint --file` (errors are fed back); edits to `.env*` are blocked (`.env.example` allowed).
- Skills: `/ship-check` (pre-deploy audit, report only) · `new-section` (section conventions).
- Agent: `visual-qa` — screenshots each section at 375/1440 px, console check, Lighthouse.
- MCP: Vercel (`.mcp.json`) — needs a one-time `/mcp` sign-in.
