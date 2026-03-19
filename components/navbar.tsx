"use client";

import * as React from "react";
import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import profile from "@/public/profile.jpg";
import Image from "next/image";

export default function Navbar() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Education", id: "education" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Snaps", id: "snaps" },
  ];

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

        <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-semibold tracking-[-0.1em] text-white whitespace-nowrap overflow-hidden text-right select-none">
          KSHITIZ
        </div>
      </div>

      {/* Info bar */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between py-2 px-1 text-xs lowercase tracking-tighter text-black ${GeistMono.className}`}
      >
        <div className="hidden sm:block">
          21 &nbsp;&bull;&nbsp; tempe &nbsp;&bull;&nbsp; arizona state (go
          devils!) &nbsp;&bull;&nbsp;{" "}
          <Link
            href="mailto:kshitizchaurasia30@gmail.com"
            className="hover:text-gray-500 transition-colors underline"
          >
            kshitizchaurasia30@gmail.com
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.id}>
              <Link
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="hover:text-gray-500 transition-colors"
              >
                {link.label}
              </Link>
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