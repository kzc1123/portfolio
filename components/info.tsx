"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { createBoard, type BoardFrame } from "@/components/flap-board";

const HEADER = "BUILDING SOFTWARE AT SCALE.";
const MOTTO = "HARD WORK BEATS TALENT.";

const frames: readonly BoardFrame[] = [
  { text: "I CODE", tile: "#09090b", ink: "#fafafa" },
  { text: "I COOK", tile: "#bef264", ink: "#09090b" },
  { text: "I GOLF", tile: "#fb7185", ink: "#09090b" },
  { text: "I TRAVEL", tile: "#60a5fa", ink: "#09090b" },
  { text: "I PLAY BADMINTON", compact: "I PLAY BAD- MINTON", tile: "#d8b4fe", ink: "#09090b" },
  { text: "I PHOTOGRAPH", compact: "I PHOTO- GRAPH", tile: "#fb923c", ink: "#09090b" },
  { text: "THAT'S WHAT'S UP!", tile: "#09090b", ink: "#fafafa" },
];

const MAX_GUEST = 14;
const COMPACT_WORD = 7;

// Splits any word longer than COMPACT_WORD letters in two, so a long company name still fits a phone.
function compactGreeting(text: string): string {
  return text
    .split(" ")
    .map((word) => {
      if (word.length <= COMPACT_WORD) return word;
      const half = Math.ceil(word.length / 2);
      return `${word.slice(0, half)}- ${word.slice(half)}`;
    })
    .join(" ");
}

// `?to=stripe` greets that company first. Only letters, digits and a few separators get through.
function guestName(): string | null {
  const raw = new URLSearchParams(window.location.search).get("to") ?? "";
  const clean = raw
    .toUpperCase()
    .replace(/[^A-Z0-9 &.-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_GUEST)
    .trim();
  return clean || null;
}

export default function Info() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    document.fonts.ready.then(() => {
      if (disposed) return;
      const guest = guestName();
      const board = createBoard(canvas, {
        frames: guest
          ? [
              {
                text: `HELLO ${guest}`,
                compact: compactGreeting(`HELLO ${guest}`),
                tile: "#09090b",
                ink: "#fafafa",
              },
              ...frames,
            ]
          : frames,
        header: HEADER,
        headerRight: MOTTO,
        sans: GeistSans.style.fontFamily,
        mono: GeistMono.style.fontFamily,
        reduce: Boolean(reduce),
      });

      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        board.point(e.clientX - rect.left, e.clientY - rect.top);
      };
      const onClick = () => board.next();

      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      let lastWidth = canvas.parentElement?.clientWidth ?? 0;
      const resizer = new ResizeObserver(() => {
        const width = canvas.parentElement?.clientWidth ?? 0;
        if (width === lastWidth) return;
        lastWidth = width;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => board.resize(), 150);
      });
      const watcher = new IntersectionObserver(
        ([entry]) => board.setVisible(entry.isIntersecting),
        { threshold: 0.25 }
      );

      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerdown", onMove);
      canvas.addEventListener("click", onClick);
      if (canvas.parentElement) resizer.observe(canvas.parentElement);
      watcher.observe(canvas);

      cleanup = () => {
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerdown", onMove);
        canvas.removeEventListener("click", onClick);
        clearTimeout(resizeTimer);
        resizer.disconnect();
        watcher.disconnect();
        board.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduce]);

  return (
    <div className="relative w-full h-[520px] md:h-[600px]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-pointer touch-pan-y"
      />
      <p className="sr-only">
        Building software at scale. Hard work beats talent. I code, cook, golf, travel, play badminton,
        and photograph.
      </p>
    </div>
  );
}
