"use client";

import { useEffect, useState, type ReactNode } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { GeistMono } from "geist/font/mono";

export interface FigureProps {
  accent: string;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pad = (n: number) => String(n).padStart(2, "0");

function useCountUp(target: number, duration = 1.6): number {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [target, duration, reduce]);

  return value;
}

function Pipeline({ steps }: { steps: readonly string[] }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-tight ${GeistMono.className}`}
    >
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-400">&rarr;</span>}
          <span className="border border-black bg-white px-2 py-1">{step}</span>
        </span>
      ))}
    </div>
  );
}

function FigureFooter({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note: ReactNode;
}) {
  return (
    <div className="mt-auto flex items-end justify-between gap-4 border-t border-black pt-4">
      <div>
        <div className="text-4xl font-medium tracking-tighter tabular-nums">
          {value}
        </div>
        <div
          className={`text-[11px] uppercase tracking-tight text-gray-500 ${GeistMono.className}`}
        >
          {label}
        </div>
      </div>
      <div
        className={`text-[11px] uppercase tracking-tight text-right text-gray-500 ${GeistMono.className}`}
      >
        {note}
      </div>
    </div>
  );
}

/* Fig. 01: NucleusTeq model router (Thompson Sampling bandit) */

const ROUTER_TARGET: readonly number[] = [0.34, 0.22, 0.16, 0.12, 0.09, 0.07];
const WARM_ENDPOINT = 3;
const ROUTER_TICK_MS = 1400;

const uniformShares: readonly number[] = ROUTER_TARGET.map(
  () => 1 / ROUTER_TARGET.length
);

function sampleShares(): readonly number[] {
  const noisy = ROUTER_TARGET.map((share) =>
    Math.max(0.03, share + (Math.random() - 0.5) * 0.14)
  );
  const total = noisy.reduce((sum, share) => sum + share, 0);
  return noisy.map((share) => share / total);
}

export function RouterFigure({ accent }: FigureProps) {
  const reduce = useReducedMotion();
  const [shares, setShares] = useState<readonly number[]>(uniformShares);
  const saved = useCountUp(4740);

  useEffect(() => {
    if (reduce) {
      setShares(ROUTER_TARGET);
      return;
    }

    const id = setInterval(() => setShares(sampleShares()), ROUTER_TICK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const picked = shares.indexOf(Math.max(...shares));

  return (
    <div className="flex h-full flex-col gap-6">
      <Pipeline steps={["request", "compress ×5", "verify ×3", "route"]} />

      <div className="flex flex-col gap-2">
        {shares.map((share, i) => {
          const isPicked = i === picked;

          return (
            <div
              key={i}
              className={`grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 text-[11px] uppercase tracking-tight ${GeistMono.className}`}
            >
              <span className={isPicked ? "text-black" : "text-gray-400"}>
                endpoint {pad(i + 1)}
                {i === WARM_ENDPOINT && " ◆"}
              </span>
              <div className="relative h-4 border border-gray-300 bg-white">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  initial={false}
                  animate={{
                    width: `${share * 100}%`,
                    backgroundColor: isPicked ? accent : "#000000",
                  }}
                  transition={{ duration: 0.8, ease }}
                />
              </div>
              <span className="text-right tabular-nums">
                {Math.round(share * 100)}%
              </span>
            </div>
          );
        })}
      </div>

      <FigureFooter
        value={`$${saved.toLocaleString("en-US")}`}
        label="LLM spend saved, 1 month live"
        note={
          <>
            +&lt;2ms per request
            <br />◆ warm cache kept warm
          </>
        }
      />
    </div>
  );
}

/* Fig. 02: Lumity Media mutation sync across surfaces */

const SURFACES = [
  "Home",
  "Explore",
  "Library",
  "Profile",
  "Messages",
  "Notifications",
] as const;
const SYNC_TICK_MS = 2200;

interface SyncEdit {
  version: number;
  origin: number;
}

export function SyncFigure({ accent }: FigureProps) {
  const reduce = useReducedMotion();
  const [edit, setEdit] = useState<SyncEdit>({ version: 1, origin: 0 });

  useEffect(() => {
    if (reduce) return;

    const id = setInterval(() => {
      const hop = 1 + Math.floor(Math.random() * (SURFACES.length - 1));
      setEdit((prev) => ({
        version: prev.version + 1,
        origin: (prev.origin + hop) % SURFACES.length,
      }));
    }, SYNC_TICK_MS);

    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex h-full flex-col gap-6">
      <Pipeline steps={["9 api clients", "normalize", "context", "6 surfaces"]} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SURFACES.map((surface, i) => {
          const isOrigin = i === edit.origin;

          return (
            <div
              key={surface}
              className={`flex flex-col gap-2 border bg-white p-2 transition-colors duration-300 ${
                isOrigin ? "border-black" : "border-gray-300"
              }`}
            >
              <div
                className={`flex justify-between text-[10px] uppercase tracking-tight ${GeistMono.className}`}
              >
                <span>{surface}</span>
                <span className={isOrigin ? "text-black" : "text-gray-400"}>
                  {isOrigin ? "edit" : "sync"}
                </span>
              </div>
              <motion.div
                key={edit.version}
                initial={{ backgroundColor: reduce ? "#f5f5f5" : accent }}
                animate={{ backgroundColor: "#f5f5f5" }}
                transition={{
                  duration: 1.2,
                  delay: isOrigin ? 0 : 0.15 + i * 0.04,
                }}
                className="flex flex-col gap-1 p-2"
              >
                <div className="h-1.5 w-3/4 bg-black/80" />
                <div className="h-1.5 w-1/2 bg-black/20" />
                <div
                  className={`mt-1 text-[10px] tracking-tight text-gray-600 tabular-nums ${GeistMono.className}`}
                >
                  post #128 · v{edit.version}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <FigureFooter
        value={`v${edit.version}`}
        label="same post, every surface"
        note={
          <>
            in-flight GETs deduped
            <br />
            39.8k lines, strict TS
          </>
        }
      />
    </div>
  );
}

/* Fig. 03: Sherlocks.ai sequential vs concurrent tool calls */

const AXIS_SECONDS = 4.5;
const SECONDS_TO_DRAW = 0.35;
const TOOL_CALLS: readonly number[] = [1.1, 1.0, 1.1, 1.0];
const AXIS_TICKS: readonly number[] = [0, 1, 2, 3, 4];

const sequentialStarts: readonly number[] = TOOL_CALLS.map((_, i) =>
  TOOL_CALLS.slice(0, i).reduce((sum, d) => sum + d, 0)
);
const sequentialTotal = TOOL_CALLS.reduce((sum, d) => sum + d, 0);
const concurrentTotal = Math.max(...TOOL_CALLS);

const pct = (seconds: number) => `${(seconds / AXIS_SECONDS) * 100}%`;

function Lane({
  label,
  starts,
  total,
  color,
  run,
}: {
  label: string;
  starts: readonly number[];
  total: number;
  color: string;
  run: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex justify-between text-[11px] uppercase tracking-tight ${GeistMono.className}`}
      >
        <span>{label}</span>
        <span className="tabular-nums">{total.toFixed(1)}s</span>
      </div>
      <div className="relative flex flex-col gap-1">
        {TOOL_CALLS.map((duration, i) => (
          <div key={i} className="relative h-3 bg-white">
            <motion.div
              key={run}
              className="absolute inset-y-0"
              style={{ left: pct(starts[i]), backgroundColor: color }}
              initial={{ width: reduce ? pct(duration) : "0%" }}
              animate={{ width: pct(duration) }}
              transition={{
                duration: duration * SECONDS_TO_DRAW,
                delay: starts[i] * SECONDS_TO_DRAW,
                ease: "linear",
              }}
            />
          </div>
        ))}
        <div
          className="absolute -inset-y-1 border-l border-dashed border-black"
          style={{ left: pct(total) }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function TimelineFigure({ accent }: FigureProps) {
  const [run, setRun] = useState(0);

  return (
    <div className="flex h-full flex-col gap-6">
      <Pipeline steps={["agent", "4 tool calls", "asyncio.gather", "answer"]} />

      <div className="flex flex-col gap-5">
        <Lane
          label="Before: one at a time"
          starts={sequentialStarts}
          total={sequentialTotal}
          color="#000000"
          run={run}
        />
        <Lane
          label="After: all at once"
          starts={TOOL_CALLS.map(() => 0)}
          total={concurrentTotal}
          color={accent}
          run={run}
        />
        <div
          className={`relative h-4 border-t border-black text-[10px] text-gray-500 ${GeistMono.className}`}
        >
          {AXIS_TICKS.map((tick) => (
            <span
              key={tick}
              className="absolute top-1 -translate-x-1/2 first:translate-x-0"
              style={{ left: pct(tick) }}
            >
              {tick}s
            </span>
          ))}
        </div>
      </div>

      <FigureFooter
        value={`${sequentialTotal.toFixed(1)}s → ${concurrentTotal.toFixed(1)}s`}
        label="p95 tool-execution latency"
        note={
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="border border-black px-3 py-1 uppercase text-black transition-colors hover:bg-black hover:text-white"
          >
            Replay ↺
          </button>
        }
      />
    </div>
  );
}
