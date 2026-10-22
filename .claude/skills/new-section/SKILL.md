---
name: new-section
description: Conventions for adding, renaming, or removing a section of the portfolio page (Education, Experience, Projects, Snaps, ...). Use whenever a section component is created or the navbar/ruler navigation changes.
---

# Adding a Portfolio Section

Sections are not stacked on the page — only one is shown at a time, switched by the ruler carousel. A section must be registered in **three places** that must stay in sync, keyed by the same title string.

## 1. Create the component — `components/<name>.tsx`

- Default export, PascalCase name (`export default function Awards()`)
- Root element: `<div id="<lowercase-name>" className="w-full py-10">`
- Add `"use client";` only if it uses state, effects, or event handlers
- Data lives in a typed `readonly` const array above the component (see `roles` in `components/experience.tsx`, `courses` in `components/education.tsx`)

### Visual language

- Fonts: Geist Sans is the body default (set in `app/layout.tsx`). Use `GeistMono` from `geist/font/mono` via `className={GeistMono.className}` for metadata, dates, labels
- Palette: black/white with gray text (`text-gray-400`, `text-gray-600`); one accent per item at most (e.g. `text-cyan-400`)
- Type: big headings use `font-medium tracking-tighter` (`text-5xl md:text-7xl`); small text uses `text-sm tracking-tighter`
- Panels: solid `bg-black p-6` paired with `bg-white border border-black border-dashed p-6`; split `flex-col lg:flex-row` with `lg:w-1/2`
- Buttons/links: `border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200`
- Keep it flat and editorial: square panels, no gradients, avoid shadows. `rounded-full` is reserved for pill buttons/links
- Interactive elements need `type="button"`, `aria-*` labels, and `focus-visible:ring-2 focus-visible:ring-black`

## 2. Register in `app/page.tsx`

- Import the component
- Add `{ id: <next>, title: "<Title>" }` to `rulerItems`
- Add `<Title>: <Component />` to `sectionMap` (a section may render several components in a fragment, like `Projects` + `Hacks`)

## 3. Register in `components/navbar.tsx`

- Add `{ label: "<Title>" }` to `navLinks` in the same order as `rulerItems`

The `title` in `rulerItems`, the key in `sectionMap`, and the `label` in `navLinks` **must be identical strings** — `handleNavigate` passes the label straight through as the active section.

## Removing or renaming

Update all three places plus the component file. Then `grep -rn "<OldTitle>" app components` to catch stragglers, and tick/update the matching item in `tasks/todo.md`.

## Verify

- `npx tsc --noEmit` and `npm run lint` pass (the PostToolUse hook runs these automatically)
- In the browser, click the new navbar link and confirm the ruler scrolls to it and the section fades in
