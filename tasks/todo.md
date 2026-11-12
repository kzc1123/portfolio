# Portfolio Personalization Checklist

## Name & Identity

- [x] **`app/layout.tsx`** — Page title: `"Kshitiz Chaurasia"`
- [x] **`app/layout.tsx`**: Meta description rewritten (was the template's `"this is me!"`)
- [x] **`components/navbar.tsx`** — Hero banner name: `KSHITIZ`
- [x] **`components/footer.tsx`** — Copyright text: `Kshitiz Chaurasia`
- [x] **`components/contact.tsx`** — EmailJS `to_name`: `"Kshitiz"`

---

## Age, Location & Education

- [x] **`components/navbar.tsx`** — Info bar: `22 · tempe · arizona state (go devils!) · kshitizchaurasia30@gmail.com`

---

## Email & Contact

- [x] **`components/navbar.tsx`** — Email in info bar: `kshitizchaurasia30@gmail.com` (clickable mailto link)
- [ ] **`components/contact.tsx`** — EmailJS service/template/key env vars *(keep as env vars — needs .env config)*

---

## Social Links

- [x] **`components/footer.tsx`** — GitHub source repo: `https://github.com/kzc1123/portfolio`
- [x] **`components/footer.tsx`** — GitHub profile: `https://github.com/kzc1123`
- [x] **`components/footer.tsx`** — LinkedIn: `https://www.linkedin.com/in/kshitizchaurasia/`
- [x] **`components/footer.tsx`**: Template Instagram link removed
- [x] **`components/footer.tsx`**: Template X/Twitter link removed
- [x] **`components/projects.tsx`**: Template Medium blog card removed
- [x] **`components/projects.tsx`**: Template Medium link removed

---

## Current Role & Startup

- [x] **`components/info.tsx`** — Role headline: `SWE-In-Build_v0.1` (typewriter effect)
- [x] **`components/info.tsx`** — Startup: `Noriv.ai` with typewriter on "building " *(link still points to meridian-in.com — needs Noriv URL)*
- [x] **`components/projects.tsx`** — Noriv project card: `Noriv.ai` *(link still points to meridian-in.com — needs Noriv URL)*
- [x] **`components/projects.tsx`**: Rewritten from resume: Noriv.ai (incident orchestration) + Agent Monkey (fault injection). Quantum blog card and Medium links removed

---

## Structural Changes (completed)

- [x] **`components/navbar.tsx`** — Restructured: 3-column banner (©2026 | photo | KSHITIZ) + info bar below with nav links (Home | Education | Experience | Projects | Snaps)
- [x] **`components/info.tsx`** — Removed WifiWaves, added typewriter to "SWE-In-Build_v0.1" and "building "
- [x] **`components/info.tsx`** — Removed LinkedIn post callout div
- [x] **`components/education.tsx`** — **NEW** — ASU, BS CS, Aug 2023–Dec 2026, GPA 3.87, static coursework list, resume download button (`/Resume.pdf`), wave heading animation
- [x] **`components/experience.tsx`** + **`components/experience-figures.tsx`**: Redesigned. Sticky role index + live "Fig." per role (NucleusTeq bandit router, Lumity cross-surface sync, Sherlocks sequential vs concurrent timeline), metrics ticker, no em dashes in copy
- [x] **`components/navbar.tsx`**: Mobile overflow fixed (banner + nav row fit 375px)
- [x] **`app/page.tsx`** — Updated page order: Navbar → Info → Education → Experience → Exp → Projects → Hacks → Photos → Contact → Footer
- [x] **`components/exp.tsx`** — Gutted: removed typewriter phrases, show more/less, Logos, resume button (moved to education.tsx)

---

## LinkedIn Featured Post

- [x] **`components/info.tsx`** — Removed entirely

---

## Experience & Skills (old Typewriter Phrases)

- [x] **`components/exp.tsx`** — Removed (component gutted)

---

## Companies Worked At

- [x] **`components/logos.tsx`** — Removed (was unused)

---

## Resume

- [x] **`components/education.tsx`** — Resume download link: `/Resume.pdf`
- [x] **`public/Resume.pdf`**: Replaced with Kshitiz's resume (was Chaitanya's)
- [x] **`public/Resume_Chaitanya.pdf`**: Deleted
- [x] **`public/Resume_Chaitanya.zip`**: Deleted

---

## Hackathon Projects

- [x] **`components/hacks.tsx`**: LegalAid, Incognito, DocChain cards and "What I've built" label removed; only the "I love building" heading remains, now above Projects

---

## Blog / Projects Content

- [x] **`components/projects.tsx`**: Blog card removed (was Chaitanya's)

---

## Bio / Personal Interests

- [x] **`components/info.tsx`**: Hero rebuilt as a split-flap ASCII board (`components/flap-board.ts`, `components/flap-mask.ts`). Cycles I CODE / COOK / GOLF / TRAVEL / PLAY BADMINTON / PHOTOGRAPH / THAT'S WHAT'S UP!; `?to=company` adds a HELLO greeting. Typewriter, meridian-in.com link, and the "building / i code" block removed

---

## Images

- [x] **`public/profile.jpg`**: Your photo
- [x] **`public/stealth.jpg`**: Deleted (unused)
- [ ] **`public/clip.jpg`**: Template image kept on purpose as the "building" text texture in `components/hacks.tsx` (resized from 4000x6000 / 3.9 MB to 933x1400 / ~120 KB). Swap for your own image someday if you want zero template assets
- [x] **`public/snaps/1-4.jpg`**: Your photos; unused `2_original.jpg` deleted

---

## Photo Captions

- [x] **`components/photos.tsx`**: Captions and alt text are yours (Las Vegas, El Granada, San Francisco, Manali)

---

## Cleanup

- [x] **`components/exp.tsx`**: Deleted (was an empty div still rendered under Experience)
- [x] **`components/logos.tsx`** — Removed (was unused)
- [x] **`components/navbar.tsx`**: Medium blog link removed during restructure
- [x] **`app/page.tsx`** — `#work` / `#more` IDs gone; sections now switch via the ruler carousel
- [x] **`package.json`** — Removed 15 unused deps (three, @react-three/fiber, @mui/icons-material, react-router-dom, react-scroll, motion, …); pinned `next` to `^14.2.14`
- [x] **`bash.exe.stackdump`**: Deleted

---

## Synced to resume (2026-10-21)

- [x] **`components/education.tsx`**: Graduation May 2027; Skills block added; GPA count-up in the degree card (`components/count-up.tsx` shared with Experience); resume button now solid black
- [x] **`components/experience.tsx`**: Lumity is Tempe, AZ / 39.8k lines / fetch-layer GET dedup bullet; DevLabs leadership card removed
- [x] **`components/hacks.tsx`**: Chaitanya's hackathons removed
- [x] **`components/projects.tsx`**: Rebuilt with an animated system diagram per project (`components/project-diagrams.tsx`)

## Pre-publish (2026-11-11)

- [x] **`components/contact.tsx`**: Removed `console.log(response)`; empty messages are now rejected with a toast; typed the click event
- [x] **`app/opengraph-image.tsx`**: Link-preview image (1200x630, split-flap KSHITIZ tiles + hobby tiles); `twitter.card = summary_large_image` in `app/layout.tsx`
- [x] **`components/flap-board.ts`**: `HOLD_MS` 3200 to 2250 (each hero word stays up 2.25 s)
- [ ] **Vercel env vars**: Confirm the three `NEXT_PUBLIC_EMAILJS_*` keys are set for Production, then send a test message from the live site
- [ ] **Deploy**: Commit on `redesign`, merge into `main`, push
