"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import stealth from "@/public/stealth.jpg";
import Link from "next/link";

// Shared hook that drives multiple typewriter texts off one clock
function useSyncedTypewriter(
  texts: string[],
  {
    typeSpeed = 120,
    deleteSpeed = 50,
    pauseAfterType = 2000,
    pauseAfterDelete = 500,
  } = {}
) {
  const maxLen = Math.max(...texts.map((t) => t.length));
  // Total steps: type maxLen chars, pause, delete maxLen chars, pause
  const totalTypeSteps = maxLen;
  const totalDeleteSteps = maxLen;

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pauseType" | "deleting" | "pauseDelete">("typing");

  useEffect(() => {
    let delay: number;

    if (phase === "typing") {
      if (step >= totalTypeSteps) {
        setPhase("pauseType");
        return;
      }
      delay = typeSpeed;
    } else if (phase === "pauseType") {
      delay = pauseAfterType;
    } else if (phase === "deleting") {
      if (step <= 0) {
        setPhase("pauseDelete");
        return;
      }
      delay = deleteSpeed;
    } else {
      delay = pauseAfterDelete;
    }

    const timer = setTimeout(() => {
      if (phase === "typing") {
        setStep((s) => s + 1);
      } else if (phase === "pauseType") {
        setPhase("deleting");
        setStep(totalTypeSteps);
      } else if (phase === "deleting") {
        setStep((s) => s - 1);
      } else {
        setPhase("typing");
        setStep(0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [step, phase, totalTypeSteps, totalDeleteSteps, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  // step goes 0..maxLen. For each text, map step proportionally to its length.
  return texts.map((text) => {
    const len = text.length;
    const charIndex = Math.round((step / maxLen) * len);
    const clamped = Math.min(charIndex, len);
    return text.substring(0, clamped);
  });
}

function TypewriterDisplay({ text }: { text: string }) {
  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Info() {
  const [display1, display2] = useSyncedTypewriter(
    ["SWE-In-Build_v0.1", "building "],
    { typeSpeed: 120, deleteSpeed: 50, pauseAfterType: 2000, pauseAfterDelete: 500 }
  );

  return (
    <div className="w-full flex flex-col items-stretch gap-2">
      <div className="w-full flex flex-col items-center justify-center min-h-[500px]">
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
          <div className="text-black text-4xl font-semibold tracking-tighter text-center flex items-center justify-center">
            <span className="font-medium mx-2">
              <TypewriterDisplay text={display1} />
            </span>
          </div>
          <div className="text-black text-2xl font-normal tracking-tighter text-center my-2">
            &
          </div>
          <div className="text-black flex items-center justify-center gap-2 text-2xl font-medium tracking-tighter text-center">
            <TypewriterDisplay text={display2} />{" "}
            <span className="pl-1 tracking-tighter bg-black text-white flex items-center justify-center gap-">
              <Link href="https://meridian-in.com" target="_blank">
                Noriv.ai
              </Link>{" "}
              <Image
                src={stealth}
                alt="noriv"
                width={30}
                height={30}
                className="rounded-full"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-10">
        <div className="w-full lg:w-1/2 flex flex-col p-20">
          <div className="flex-1 relative">
            <div className="grid grid-cols-4 grid-rows-4 gap-0 w-full h-full min-h-[300px]">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-dashed border-gray-300 aspect-square"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-black text-5xl font-medium tracking-tighter text-center bg-white/80 px-4 py-2">
                building
              </div>
              <div className="text-black text-5xl font-medium tracking-tighter text-center bg-white/80 px-4 py-2">
                software at scale.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-black text flex flex-col p-20">
          <div className="flex-1 flex flex-col items-end justify-center p-4 leading-2">
            <span className="text-white text-5xl font-semibold tracking-tighter">
              i code
            </span>
            <span className="text-lime-300 text-5xl font-semibold tracking-tighter">
              i cook
            </span>
            <span className="text-rose-400 text-5xl font-semibold tracking-tighter">
              i golf
            </span>
            <span className="text-blue-400 text-5xl font-semibold tracking-tighter">
              i travel
            </span>

            <span className="text-purple-300 text-5xl font-semibold tracking-tighter">
              i play badminton
            </span>
            <span className="text-orange-400 text-5xl font-semibold tracking-tighter">
              i photograph
            </span>
            <span className="text-white text-5xl font-semibold tracking-tighter">
              that&apos;s what&apos;s up!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
