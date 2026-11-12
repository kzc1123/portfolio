import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import {
  GOOGLE_SITE_VERIFICATION,
  PERSON,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: PERSON.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

// schema.org Person: tells search engines who the page is about and links the profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  url: SITE_URL,
  jobTitle: PERSON.jobTitle,
  alumniOf: { "@type": "CollegeOrUniversity", name: PERSON.school },
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.city,
      addressRegion: PERSON.region,
      addressCountry: "US",
    },
  },
  sameAs: [PERSON.github, PERSON.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden flex flex-col
           bodymain ${GeistSans.className} antialiased`}
      >
        <script
          type="application/ld+json"
          // Static data from lib/site.ts; "<" escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
        <Toaster closeButton />
      </body>
    </html>
  );
}
