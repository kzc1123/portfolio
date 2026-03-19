"use client";

import { GeistMono } from "geist/font/mono";

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

const courses = [
  "Database Management", "Software QA & Testing", "Probability & Statistics",
  "Machine Learning", "Artificial Intelligence", "Social Media Mining",
  "Computer Systems Security", "Intro to Human Computer Interaction",
];

export default function Education() {
  return (
    <div id="education" className="w-full flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-5xl font-semibold tracking-tighter text-black mb-12 text-center -mt-32">
          <WaveHeading text="Education" />
        </h2>

        <div className="border-l-2 border-black pl-6">
          <div className="text-4xl font-semibold tracking-tighter text-black">
            Arizona State University
          </div>
          <div className="text-base tracking-tighter text-gray-500 mt-1">
            Tempe, AZ
          </div>

          <div className="mt-4 text-2xl font-medium tracking-tighter text-black">
            Bachelor of Science in Computer Science
          </div>

          <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-base tracking-tighter text-gray-600 ${GeistMono.className}`}>
            <span>Aug. 2023 &ndash; Dec. 2026</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>GPA: 3.87 / 4.0</span>
          </div>

          <div className="mt-8">
            <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
              coursework
            </div>
            <div className={`flex flex-wrap gap-2 ${GeistMono.className}`}>
              {courses.map((course) => (
                <span key={course} className="text-sm tracking-tighter text-gray-600">
                  {course} &bull;
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="/Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
          >
            my resume
          </a>
        </div>
      </div>
    </div>
  );
}
