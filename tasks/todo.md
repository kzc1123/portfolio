# Portfolio Personalization Checklist

## Name & Identity

- [x] **`app/layout.tsx`** — Page title: `"Kshitiz Chaurasia"`
- [ ] **`app/layout.tsx`** — Meta description: `"this is me!"` *(unchanged — waiting for input)*
- [x] **`components/navbar.tsx`** — Hero banner name: `KSHITIZ`
- [x] **`components/footer.tsx`** — Copyright text: `Kshitiz Chaurasia`
- [x] **`components/contact.tsx`** — EmailJS `to_name`: `"Kshitiz"`

---

## Age, Location & Education

- [x] **`components/navbar.tsx`** — Info bar: `21 · tempe · arizona state (go devils!) · kshitizchaurasia30@gmail.com`

---

## Email & Contact

- [x] **`components/navbar.tsx`** — Email in info bar: `kshitizchaurasia30@gmail.com` (clickable mailto link)
- [ ] **`components/contact.tsx`** — EmailJS service/template/key env vars *(keep as env vars — needs .env config)*

---

## Social Links

- [x] **`components/footer.tsx`** — GitHub source repo: `https://github.com/kzc1123/portfolio`
- [x] **`components/footer.tsx`** — GitHub profile: `https://github.com/kzc1123`
- [x] **`components/footer.tsx`** — LinkedIn: `https://www.linkedin.com/in/kshitizchaurasia/`
- [ ] **`components/footer.tsx`** — Instagram: `https://instagram.com/chaitanya_chaurasia` *(needs your Instagram)*
- [ ] **`components/footer.tsx`** — X/Twitter: `https://x.com/itschai_tea` *(needs your X handle)*
- [ ] **`components/projects.tsx`** — Medium blog (quantum article) *(needs your blog post URL)*
- [ ] **`components/projects.tsx`** — Medium all blogs *(needs your Medium URL)*

---

## Current Role & Startup

- [x] **`components/info.tsx`** — Role headline: `SWE-In-Build_v0.1` (typewriter effect)
- [x] **`components/info.tsx`** — Startup: `Noriv.ai` with typewriter on "building " *(link still points to meridian-in.com — needs Noriv URL)*
- [x] **`components/projects.tsx`** — Noriv project card: `Noriv.ai` *(link still points to meridian-in.com — needs Noriv URL)*
- [ ] **`components/projects.tsx`** — Noriv description *(unchanged — waiting for input)*

---

## Structural Changes (completed)

- [x] **`components/navbar.tsx`** — Restructured: 3-column banner (©2026 | photo | KSHITIZ) + info bar below with nav links (Home | Education | Experience | Projects | Snaps)
- [x] **`components/info.tsx`** — Removed WifiWaves, added typewriter to "SWE-In-Build_v0.1" and "building "
- [x] **`components/info.tsx`** — Removed LinkedIn post callout div
- [x] **`components/education.tsx`** — **NEW** — ASU, BS CS, Aug 2023–Dec 2026, GPA 3.87, static coursework list, resume download button (`/Resume.pdf`), wave heading animation
- [x] **`components/experience.tsx`** — **NEW** — Lumity Media + Sherlocks.ai roles with scroll-triggered border-grow animation, wave heading animation
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

- [ ] **`components/logos.tsx`** — Companies list *(still has old data — needs your companies or removal)*

---

## Resume

- [x] **`components/education.tsx`** — Resume download link: `/Resume.pdf`
- [ ] **`public/Resume.pdf`** — Resume PDF file *(replace with yours)*
- [ ] **`public/Resume_Chaitanya.pdf`** — Old resume *(delete or replace)*
- [ ] **`public/Resume_Chaitanya.zip`** — Old resume zip *(delete or replace)*

---

## Hackathon Projects

- [ ] **`components/hacks.tsx`** — LegalAid *(needs your hackathon projects)*
- [ ] **`components/hacks.tsx`** — Incognito
- [ ] **`components/hacks.tsx`** — DocChain

---

## Blog / Projects Content

- [ ] **`components/projects.tsx`** — Blog post title *(needs your blog post)*

---

## Bio / Personal Interests

- [ ] **`components/info.tsx`** — Interests list: "i code / i blog / i design / i photograph / i play soccer / i travel" *(needs your interests)*

---

## Images

- [ ] **`public/profile.jpg`** — Profile photo *(replace with yours)*
- [ ] **`public/stealth.jpg`** — Startup logo image *(replace with Noriv logo)*
- [ ] **`public/clip.jpg`** — Hackathons background image
- [ ] **`public/snaps/1.jpeg`** — Photo *(replace with yours)*
- [ ] **`public/snaps/2.jpeg`** — Photo *(replace with yours)*
- [ ] **`public/snaps/3.jpeg`** — Photo *(replace with yours)*

---

## Photo Captions

- [ ] **`components/photos.tsx`** — `"05/23, leh, india"` *(needs your caption)*
- [ ] **`components/photos.tsx`** — `"05/25, new york"` *(needs your caption)*
- [ ] **`components/photos.tsx`** — `"12/23, golden gate"` *(needs your caption)*
- [ ] **`components/photos.tsx`** — Alt text: `"San Francisco"` *(needs update)*

---

## Cleanup

- [ ] **`components/exp.tsx`** — Empty shell, consider removing entirely and from `page.tsx`
- [ ] **`components/logos.tsx`** — Unused import removed from exp.tsx, but component still exists — remove if not needed
- [ ] **`components/navbar.tsx`** — Medium blog link removed during restructure
- [ ] **`app/page.tsx`** — Section IDs `#work` and `#more` still on Exp/Projects wrappers — update or remove to match new nav
