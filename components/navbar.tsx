"use client";

import * as React from "react";
import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import profile from "@/public/profile.jpg";
import Image from "next/image";

export default function Navbar({
  onNavigate,
}: {
  onNavigate?: (section: string) => void;
}) {
  const navLinks = [
    { label: "Home" },
    { label: "Education" },
    { label: "Experience" },
    { label: "Projects" },
    { label: "Snaps" },
  ];

  const handleClick = (label: string) => {
    if (label === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (onNavigate) {
      onNavigate(label);
    }
  };

  return (
    <div className="w-full" id="home">
      {/* Banner */}
      <div className="flex items-center justify-between w-full h-[125px] bg-black overflow-hidden">
        <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-semibold tracking-[-0.1em] text-white whitespace-nowrap">
          &copy;2026
        </div>

        <div className="relative h-full w-[280px] sm:w-[320px] md:w-[350px] flex items-center justify-center">
          <Image
            src={profile.src}
            alt="Profile"
            width={180}
            height={180}
            className="h-32 max-w-fit object-cover grayscale"
            priority
          />
        </div>

        <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-semibold tracking-[-0.1em] text-white whitespace-nowrap overflow-hidden text-right select-none pr-4">
          KSHITIZ
        </div>
      </div>

      {/* Info bar */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between py-2 px-1 text-sm tracking-tighter text-black ${GeistMono.className}`}
      >
        <div className="hidden sm:block">
          21 &bull; Tempe &bull; Arizona State (Go Devils!) &bull;{" "}
          <Link
            href="mailto:kshitizchaurasia30@gmail.com"
            className="hover:text-gray-500 transition-colors no-underline"
          >
            kshitizchaurasia30@gmail.com
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.label}>
              <button
                onClick={() => handleClick(link.label)}
                className="hover:text-gray-500 transition-colors cursor-pointer bg-transparent border-none p-0 text-sm tracking-tighter text-black"
              >
                {link.label}
              </button>
              {i < navLinks.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
