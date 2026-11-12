import type { Metadata } from "next";
  import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";


export const metadata: Metadata = {
  title: "Kshitiz Chaurasia",
  description:
    "Kshitiz Chaurasia: software engineer and CS student at Arizona State. Experience, projects, and photos.",
  twitter: { card: "summary_large_image" },
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
          {children}
          <Analytics />
        <Toaster closeButton />
      </body>
    </html>
  );
}
