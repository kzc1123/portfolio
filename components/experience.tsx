"use client";

import { GeistMono } from "geist/font/mono";
import { useEffect, useRef, useState } from "react";

function WaveHeading({ text }: { text: string }) {
  return (
    <>
      <style>{`
        @keyframes wave {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
      `}</style>
      <span className="inline-flex">
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              animation: "wave 2s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

const roles = [
  {
    company: "Lumity Media",
    title: "Software Developer Intern",
    dates: "Jan. 2026 \u2013 Present",
    bullets: [
      "Architected and built a full-stack web platform (Next.js, TypeScript, Node.js) with RESTful APIs, secure authentication, and a shared MySQL schema, supporting real-time data consistency across web and mobile systems used by 7,000+ users.",
      "Containerized multi-service architecture with Docker and implemented automated CI/CD via GitHub Actions, reducing deployment time by 40% and enabling reliable, reproducible production releases.",
    ],
  },
  {
    company: "Sherlocks.ai",
    title: "Software Engineer Intern",
    dates: "May 2025 \u2013 Aug. 2025",
    bullets: [
      "Developed scalable backend services and RESTful APIs using Python and TypeScript in a cloud-native environment, improving system response time by 20% while supporting production-scale relational and NoSQL data workflows.",
      "Deployed containerized services using Docker and Kubernetes and contributed to testing, debugging, and automation pipelines, reducing environment/setup overhead by 30% and improving system reliability.",
    ],
  },
];

function RoleCard({ role, delay }: { role: (typeof roles)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="relative pl-6">
      {/* Animated border */}
      <div
        className="absolute left-0 top-0 w-[2px] bg-black transition-all ease-out"
        style={{
          height: visible ? "100%" : "0%",
          transitionDuration: "800ms",
        }}
      />

      {/* Content */}
      <div
        className="transition-all ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transitionDuration: "600ms",
          transitionDelay: "400ms",
        }}
      >
        <div className="text-4xl font-semibold tracking-tighter text-black">
          {role.company}
        </div>
        <div className="text-2xl font-medium tracking-tighter text-black mt-1">
          {role.title}
        </div>
        <div className={`text-base tracking-tighter text-gray-500 mt-1 ${GeistMono.className}`}>
          {role.dates}
        </div>

        <ul className="mt-4 space-y-3">
          {role.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm tracking-tighter text-gray-700 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div id="experience" className="w-full flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-5xl font-semibold tracking-tighter text-black mb-12 text-center">
          <WaveHeading text="Experience" />
        </h2>

        <div className="flex flex-col gap-12">
          {roles.map((role, i) => (
            <RoleCard key={role.company} role={role} delay={i * 200} />
          ))}
        </div>
      </div>
    </div>
  );
}
