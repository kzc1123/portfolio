// Single source for the public identity of the site. If the domain changes, update SITE_URL here
// and the redirect destination in next.config.mjs.
export const SITE_URL = "https://itskz.vercel.app";

export const PERSON = {
  name: "Kshitiz Chaurasia",
  jobTitle: "Software Engineer",
  school: "Arizona State University",
  city: "Tempe",
  region: "AZ",
  github: "https://github.com/kzc1123",
  linkedin: "https://www.linkedin.com/in/kshitizchaurasia/",
} as const;

// Google Search Console ownership token (URL-prefix property for SITE_URL). Public by design.
export const GOOGLE_SITE_VERIFICATION = "yS_-AyHdBjhmIQV_pV4HClNudaylslYpjOlpyi-mYhs";

export const TAGLINE =`${PERSON.jobTitle} building AI systems.`;

export const SITE_TITLE = `${PERSON.name} | ${PERSON.jobTitle}`;
export const SITE_DESCRIPTION = `${PERSON.name}: ${TAGLINE} CS student at Arizona State. Experience, projects, and photos.`;
