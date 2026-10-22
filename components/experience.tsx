"use client";

import { useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { CountUp, type CountUpValue } from "@/components/count-up";

interface Metric extends CountUpValue {
  was?: string;
  label: string;
}

interface Role {
  company: string;
  title: string;
  dates: string;
  location: string;
  accent: string;
  metric: Metric;
  stack: readonly string[];
  summary: readonly string[];
  details: readonly string[];
}

const roles: readonly Role[] = [
  {
    company: "NucleusTeq",
    title: "AI engineer intern",
    dates: "Jun – Aug 2026",
    location: "Phoenix, AZ",
    accent: "#fb7185",
    metric: {
      from: 0,
      to: 4740,
      decimals: 0,
      prefix: "$",
      label: "LLM spend saved in one month of live use",
    },
    stack: ["LLM proxy", "Redis", "async", "Thompson Sampling"],
    summary: [
      "Built a tool-output compression engine for a production LLM proxy, guarded by a 3-stage correctness check.",
      "Engineered a Redis-backed model router across 6 provider endpoints with under 2ms of overhead per request.",
    ],
    details: [
      "Designed and built a 5-part tool-output compression engine with a 3-stage correctness check (byte-identical file paths, error codes, and version numbers) for a production LLM proxy, saving $4,740 in LLM spend during one month of live use.",
      "Engineered an async, Redis-backed model router (Thompson Sampling bandit) across 6 provider endpoints with <2ms overhead per request, isolating genuine model-quality failures from transient errors and adding cache-state-aware cost logic to block routing decisions that would silently destroy a provider's warm prompt cache.",
    ],
  },
  {
    company: "Lumity Media",
    title: "software developer intern",
    dates: "Jan – May 2026",
    location: "Tempe, AZ",
    accent: "#22d3ee",
    metric: {
      from: 0,
      to: 39.8,
      decimals: 1,
      suffix: "k",
      label: "lines of strict-mode React 19 and TypeScript",
    },
    stack: ["React 19", "TypeScript", "React Context", "REST"],
    summary: [
      "Architected the API integration layer that reconciles an iOS-first backend with the web app.",
      "Unified mutation state across 6 core surfaces and removed duplicate requests under StrictMode.",
    ],
    details: [
      "Architected an API integration layer (9 domain-specific client modules and a defensive normalization layer) reconciling an inconsistently-shaped, iOS-first backend across a 39.8k-line React 19/TypeScript codebase, while keeping strict-mode TypeScript compiling clean across every surface.",
      "Implemented a unified mutation-state architecture using React Context to synchronize post edits, deletes, and live updates across 6 core surfaces (Home, Explore, Library, Profile, Messages, Notifications) instantly, and fixed duplicate network calls under React StrictMode by deduplicating concurrent in-flight GET requests at the fetch layer.",
    ],
  },
  {
    company: "Sherlocks.ai",
    title: "software engineer intern",
    dates: "May – Aug 2025",
    location: "Palo Alto, CA",
    accent: "#a3e635",
    metric: {
      from: 4.2,
      to: 1.1,
      decimals: 1,
      suffix: "s",
      was: "4.2s",
      label: "p95 tool-execution latency after going concurrent",
    },
    stack: ["Python", "FastAPI", "asyncio", "Pydantic", "SQL"],
    summary: [
      "Moved an LLM agent's tool calls from sequential to concurrent async execution.",
      "Traced a dashboard slowdown to connection-pool exhaustion and fixed the queries behind it.",
    ],
    details: [
      "Redesigned a sequential LLM agent tool-calling pipeline into concurrent async execution (Python/FastAPI, asyncio.gather), cutting p95 tool-execution latency from ~4.2s to ~1.1s.",
      "Diagnosed a dashboard slowdown traced to database connection-pool exhaustion from unclosed sessions, beyond the initial indexing hypothesis, then added Pydantic request validation and composite indexes on (tenant_id, created_at) for execution-log queries.",
    ],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function MetricFigure({ metric, accent }: { metric: Metric; accent: string }) {
  return (
    <div className="md:col-span-5 flex flex-col">
      <span
        className="block h-0.5 w-10 mb-6"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      {metric.was && (
        <span
          className={`text-sm tracking-tighter text-gray-400 line-through ${GeistMono.className}`}
        >
          {metric.was}
        </span>
      )}
      <div className="text-6xl md:text-7xl font-medium tracking-tighter tabular-nums leading-none">
        <CountUp value={metric} />
      </div>
      <p
        className={`mt-4 max-w-[24ch] text-xs tracking-tighter text-gray-500 ${GeistMono.className}`}
      >
        {metric.label}
      </p>
    </div>
  );
}

function RoleDetails({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const listId = useId();
  const items = open ? role.details : role.summary;
  const shift = reduce ? 0 : 6;

  return (
    <div className="md:col-span-7 flex flex-col justify-between gap-8">
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={open ? "details" : "summary"}
          id={listId}
          initial={{ opacity: 0, y: shift }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -shift }}
          transition={{ duration: 0.25, ease }}
          className="space-y-4"
        >
          {items.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-sm md:text-base tracking-tighter leading-relaxed text-gray-700 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-black"
            >
              {item}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-gray-300 pt-4 text-xs tracking-tighter ${GeistMono.className}`}
      >
        <span className="text-gray-400">{role.stack.join(" / ")}</span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={listId}
          className="text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-colors"
        >
          {open ? "Show less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

function TimelineNode({ accent }: { accent: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -left-8 md:-left-14 top-[0.3rem] h-[11px] w-[11px] border border-black bg-white"
      whileInView={{ backgroundColor: accent }}
      viewport={{ once: true, margin: "0px 0px -40% 0px" }}
      transition={{ duration: 0.6, ease }}
    />
  );
}

function RoleEntry({ role }: { role: Role }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease }}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
    >
      <TimelineNode accent={role.accent} />

      <div
        className={`lg:col-span-3 lg:sticky lg:top-8 lg:self-start flex lg:flex-col justify-between lg:justify-start gap-1 text-sm lg:text-base tracking-tighter ${GeistMono.className}`}
      >
        <span className="text-black">{role.dates}</span>
        <span className="text-gray-500">{role.location}</span>
      </div>

      <div className="lg:col-span-9 flex flex-col gap-10">
        <div>
          <h3 className="text-5xl md:text-7xl font-medium tracking-tighter">
            {role.company}
          </h3>
          <p className="mt-2 text-xl md:text-2xl font-medium tracking-tighter text-gray-400">
            {role.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <MetricFigure metric={role.metric} accent={role.accent} />
          <RoleDetails role={role} />
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div id="experience" className="w-full py-10">
      <div ref={timelineRef} className="relative pl-8 md:pl-14">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-[0.3rem] bottom-0 border-l border-dashed border-gray-300"
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-[5px] top-[0.3rem] bottom-0 w-px bg-black origin-top"
          style={{ scaleY: reduce ? 1 : progress }}
        />

        <div className="flex flex-col gap-24 md:gap-32">
          {roles.map((role) => (
            <RoleEntry key={role.company} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
}
