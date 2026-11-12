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
- [x] **`components/contact.tsx`**: EmailJS keys live in `.env.local` (see Pre-publish below)

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
- [x] **`components/flap-board.ts`**: `HOLD_MS` 3200 to 2500 (each hero word stays up 2.5 s)
- [x] **`components/contact.tsx`**: Copy is now "What's up with you?" / "Hiring, building something, or found a hidden travel gem..."
- [x] **EmailJS account**: Gmail service + "Contact Us" template (body `{{from_name}}` + `{{message}}`, Reply To `{{from_name}}`, To Email = your Gmail)
- [x] **`.env.local`**: All three `NEXT_PUBLIC_EMAILJS_*` keys set; `.env.example` lists them for reference
- [x] **`components/contact.tsx`**: Email fallback. If keys are missing or EmailJS fails, the error toast shows a mailto link with the visitor's message pre-filled (tested with a forced failure)
- [x] **`package-lock.json`**: `caniuse-lite` updated; dev-server Browserslist warning gone
- [x] **Local send test**: Gmail service reconnected in EmailJS (was failing with 412 "Gmail_API: Not found the sessional location", fixed by reconnecting and granting send permission); real send from `npm run dev` succeeded
- [ ] **Reply-To check**: In Gmail, hit Reply on the test message and confirm it addresses the sender, not you
- [x] **`app/layout.tsx`**: `<Toaster closeButton />` so every notification can be dismissed
- [ ] **Vercel env vars**: When the Vercel project is set up, add the same three keys for Production, then send a test message from the live site
- [ ] **EmailJS security**: Account > Security, restrict requests to the live domain once it exists
- [ ] **Deploy**: Commit on `redesign`, merge into `main`, push

## Search (2026-11-11)

- [x] **`lib/site.ts`**: One place for `SITE_URL` (https://itskz.vercel.app), name, title, socials
- [x] **`app/layout.tsx`**: Title "Kshitiz Chaurasia | Software Engineer", `metadataBase`, canonical, Open Graph profile, schema.org `Person` JSON-LD (GitHub + LinkedIn in `sameAs`)
- [x] **`components/navbar.tsx`**: Banner KSHITIZ is now the page `h1` with screen-reader text "Kshitiz Chaurasia, Software Engineer" (looks identical)
- [x] **`app/sitemap.ts`** + **`app/robots.ts`**: `/sitemap.xml` and `/robots.txt`
- [x] **`next.config.mjs`**: 308 redirect from `kshitiz-chaurasia.vercel.app` to `itskz.vercel.app`
- [ ] **Google Search Console**: Verify `https://itskz.vercel.app`, submit `sitemap.xml`, request indexing
- [ ] **Backlinks**: Site URL on LinkedIn (Contact info + Featured), GitHub profile Website + README, resume, Devpost, Handshake
- [ ] **Domain change?** If buying a real domain, update `SITE_URL` in `lib/site.ts` and the redirect in `next.config.mjs`
