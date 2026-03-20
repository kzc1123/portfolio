"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Info from "@/components/info";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Exp from "@/components/exp";
import ContactPage from "@/components/contact";
import Footer from "@/components/footer";
import Photos from "@/components/photos";
import Hacks from "@/components/hacks";
import Navbar from "@/components/navbar";
import {
  RulerCarousel,
  type CarouselItem,
} from "@/components/ui/ruler-carousel";

const rulerItems: CarouselItem[] = [
  { id: 1, title: "Education" },
  { id: 2, title: "Experience" },
  { id: 3, title: "Projects" },
  { id: 4, title: "Snaps" },
];

const sectionMap: Record<string, React.ReactNode> = {
  Education: <Education />,
  Experience: (
    <>
      <Experience />
      <Exp />
    </>
  ),
  Projects: (
    <>
      <Projects />
      <Hacks />
    </>
  ),
  Snaps: <Photos />,
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("Education");
  const [navTarget, setNavTarget] = useState<string | undefined>(undefined);

  const handleActiveChange = useCallback((title: string) => {
    setActiveSection(title);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    setNavTarget(section);
    setActiveSection(section);
    setTimeout(() => setNavTarget(undefined), 100);
    document.getElementById("ruler")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen p-2 flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <Navbar onNavigate={handleNavigate} />
      </div>
      <div className="w-full" id="home">
        <Info />
      </div>

      <div className="w-full mt-10" id="ruler">
        <RulerCarousel
          originalItems={rulerItems}
          onActiveChange={handleActiveChange}
          activeTitle={navTarget}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {sectionMap[activeSection]}
        </motion.div>
      </AnimatePresence>

      <div className="w-full my-20" id="contact">
        <ContactPage />
      </div>
      <Footer />
    </main>
  );
}
