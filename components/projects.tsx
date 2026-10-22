"use client";

import { useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { GeistMono } from "geist/font/mono";
import {
  FaultInjectionDiagram,
  RunbookDiagram,
} from "@/components/project-diagrams";

interface Stat {
  value: string;
  label: string;
}

interface Project {
  name: string;
  subtitle: string;
  dates: string;
  accent: string;
  pitch: string;
  Diagram: (props: { accent: string }) => JSX.Element;
  stats: readonly Stat[];
  stack: readonly string[];
  bullets: readonly string[];
}

const projects: readonly Project[] = [
  {
    name: "Agent Monkey",
    subtitle: "Distributed fault-injection platform",
    dates: "Mar – Apr 2026",
    accent: "#f97316",
    pitch:
      "Sits between an AI agent and its tools and breaks things on purpose, so you can see how the agent copes without changing a line of its code.",
    Diagram: FaultInjectionDiagram,
    stats: [
      { value: "4", label: "services" },
      { value: "9", label: "failure scenarios" },
      { value: "15+", label: "MCP tools" },
    ],
    stack: ["Express", "Next.js", "MCP", "Supabase Postgres", "WebSocket"],
    bullets: [
      "Created a 4-service fault-injection platform (Express, Next.js, evaluation worker, MCP proxy) that intercepts tool calls across HTTP, stdio, and SSE transports to simulate 9 failure scenarios (timeouts, rate limits, schema corruption) transparently, without modifying the agents under test.",
      "Built a concurrent upstream MCP connection manager (Promise.allSettled) aggregating 15+ external server tools into a unified registry, backed by a 7-migration Supabase Postgres schema with row-level security and real-time WebSocket trace streaming.",
    ],
  },
  {
    name: "Noriv.ai",
    subtitle: "Incident orchestration and response engine",
    dates: "Jan – Feb 2026",
    accent: "#22d3ee",
    pitch:
      "Runs incident runbooks as versioned task graphs, keeps Slack and Jira in sync both ways, and writes every privileged step to an audit log.",
    Diagram: RunbookDiagram,
    stats: [
      { value: "20+", label: "REST and WebSocket endpoints" },
      { value: "2-way", label: "Slack and Jira sync" },
    ],
    stack: ["Redis", "WebSocket", "REST", "Slack", "Jira"],
    bullets: [
      "Developed a multi-tenant incident response backend spanning 20+ REST/WebSocket endpoints with object-level authorization and a Redis-backed token-bucket rate limiter enforcing per-tenant request caps with 429 handling.",
      "Built a versioned runbook DAG execution engine with append-only audit logging for privileged state transitions, executing multi-step task graphs with bi-directional sync to Slack and Jira.",
    ],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function HowItWorks({ bullets }: { bullets: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className="border-t border-dashed border-gray-300">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`w-full flex items-center justify-between py-4 text-sm tracking-tighter text-black group ${GeistMono.className}`}
      >
        How it works
        <motion.span
          aria-hidden="true"
          className="text-gray-400 group-hover:text-black transition-colors"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease }}
            className="overflow-hidden"
          >
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="relative pl-4 pb-4 text-sm tracking-tighter leading-relaxed text-gray-700 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-black"
              >
                {bullet}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const reduce = useReducedMotion();
  const { Diagram } = project;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
    >
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Diagram accent={project.accent} />
      </div>

      <div className="lg:col-span-5 flex flex-col gap-8">
        <div
          className={`flex items-center gap-3 text-sm tracking-tighter ${GeistMono.className}`}
        >
          <span
            className="block h-0.5 w-6"
            style={{ backgroundColor: project.accent }}
            aria-hidden="true"
          />
          <span className="text-gray-400">{project.dates}</span>
        </div>

        <div>
          <h3 className="text-5xl md:text-6xl font-medium tracking-tighter">
            {project.name}
          </h3>
          <p className="mt-2 text-xl font-medium tracking-tighter text-gray-400">
            {project.subtitle}
          </p>
        </div>

        <p className="text-base tracking-tighter leading-relaxed text-gray-700 max-w-[52ch]">
          {project.pitch}
        </p>

        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt
                className={`text-xs tracking-tighter text-gray-500 ${GeistMono.className}`}
              >
                {stat.label}
              </dt>
              <dd className="text-3xl font-medium tracking-tighter">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-col gap-4">
          <p
            className={`text-xs tracking-tighter text-gray-400 ${GeistMono.className}`}
          >
            {project.stack.join(" / ")}
          </p>
          <HowItWorks bullets={project.bullets} />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <div id="projects" className="w-full py-10 flex flex-col gap-24 md:gap-32">
      {projects.map((project, index) => (
        <ProjectRow key={project.name} project={project} flip={index % 2 === 1} />
      ))}
    </div>
  );
}
