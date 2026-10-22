"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { GeistMono } from "geist/font/mono";

interface DiagramProps {
  accent: string;
}

interface NodeBox {
  id: string;
  label: string;
  x: number;
  y: number;
}

const NODE_W = 96;
const NODE_H = 52;
const ease = [0.16, 1, 0.3, 1] as const;

const idle = "#52525b";
const lit = "#fafafa";

// Advances a step counter on an interval, only while the diagram is on screen.
function useStepper(steps: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), intervalMs);
    return () => clearInterval(id);
  }, [inView, reduce, steps, intervalMs]);

  return { ref, step, reduce: Boolean(reduce) };
}

function Box({
  node,
  stroke,
  text,
  sub,
  w = NODE_W,
  h = NODE_H,
}: {
  node: NodeBox;
  stroke: string;
  text: string;
  sub?: string;
  w?: number;
  h?: number;
}) {
  return (
    <g>
      <motion.rect
        x={node.x}
        y={node.y}
        width={w}
        height={h}
        fill="#09090b"
        animate={{ stroke }}
        transition={{ duration: 0.5, ease }}
      />
      <motion.text
        x={node.x + w / 2}
        y={node.y + h / 2 + (sub ? -2 : 4)}
        textAnchor="middle"
        fontSize={13}
        animate={{ fill: text }}
        transition={{ duration: 0.5, ease }}
      >
        {node.label}
      </motion.text>
      {sub && (
        <text
          x={node.x + w / 2}
          y={node.y + h / 2 + 14}
          textAnchor="middle"
          fontSize={10}
          fill="#71717a"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Frame({
  caption,
  status,
  children,
  frameRef,
}: {
  caption: string;
  status: string;
  children: React.ReactNode;
  frameRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={frameRef}
      className={`bg-black text-white p-6 flex flex-col gap-6 h-full ${GeistMono.className}`}
    >
      <p className="text-xs tracking-tighter text-gray-500">{caption}</p>
      <div className="flex-1 flex items-center">{children}</div>
      <div className="h-5 text-xs tracking-tighter text-gray-400" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            className="block"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease }}
          >
            {status}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

const scenarios = [
  { fault: null, status: "forwarded to tool, agent untouched" },
  { fault: "timeout", status: "injected: timeout" },
  { fault: null, status: "forwarded to tool, agent untouched" },
  { fault: "rate limit", status: "injected: rate limit (429)" },
  { fault: null, status: "forwarded to tool, agent untouched" },
  { fault: "schema", status: "injected: schema corruption" },
] as const;

const amNodes = {
  agent: { id: "agent", label: "agent", x: 12, y: 74 },
  proxy: { id: "proxy", label: "MCP proxy", x: 192, y: 74 },
  tools: { id: "tools", label: "tools", x: 372, y: 74 },
} satisfies Record<string, NodeBox>;

const laneY = amNodes.agent.y + NODE_H / 2;
const PACKET = 10;

export function FaultInjectionDiagram({ accent }: DiagramProps) {
  const { ref, step, reduce } = useStepper(scenarios.length, 3200);
  const scenario = scenarios[step];
  const faulted = scenario.fault !== null;

  const start = amNodes.agent.x + NODE_W;
  const mid = amNodes.proxy.x + NODE_W / 2;
  const end = amNodes.tools.x;

  const packetX = faulted
    ? [start, mid, mid, start]
    : [start, mid, mid, end];
  const packetFill = faulted ? [lit, lit, accent, accent] : [lit, lit, lit, lit];

  return (
    <Frame
      frameRef={ref}
      caption="One tool call, passing through the proxy"
      status={reduce ? scenarios[0].status : scenario.status}
    >
      <svg
        viewBox="0 0 480 200"
        className="w-full h-auto"
        role="img"
        aria-label="An agent's tool call passes through the MCP proxy, which either forwards it to the tool or injects a failure such as a timeout, a rate limit, or schema corruption."
      >
        <line x1={start} y1={laneY} x2={amNodes.proxy.x} y2={laneY} stroke={idle} strokeDasharray="3 4" />
        <line x1={amNodes.proxy.x + NODE_W} y1={laneY} x2={end} y2={laneY} stroke={idle} strokeDasharray="3 4" />

        <Box node={amNodes.agent} stroke={idle} text={lit} />
        <Box
          node={amNodes.proxy}
          stroke={faulted && !reduce ? accent : lit}
          text={lit}
        />
        <Box node={amNodes.tools} stroke={idle} text={lit} sub="15+ servers" />

        {!reduce && (
          <motion.rect
            key={step}
            y={laneY - PACKET / 2}
            width={PACKET}
            height={PACKET}
            initial={{ x: start - PACKET / 2, opacity: 0 }}
            animate={{
              x: packetX.map((x) => x - PACKET / 2),
              fill: packetFill,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.4, times: [0, 0.35, 0.55, 1], ease: "easeInOut" }}
          />
        )}

        <text x={amNodes.proxy.x + NODE_W / 2} y={170} textAnchor="middle" fontSize={10} fill="#71717a">
          HTTP / stdio / SSE
        </text>
      </svg>
    </Frame>
  );
}

const dagNodes = {
  alert: { id: "alert", label: "alert", x: 4, y: 74 },
  triage: { id: "triage", label: "triage", x: 128, y: 74 },
  slack: { id: "slack", label: "Slack", x: 252, y: 14 },
  jira: { id: "jira", label: "Jira", x: 252, y: 134 },
  resolve: { id: "resolve", label: "resolve", x: 376, y: 74 },
} satisfies Record<string, NodeBox>;

const DAG_W = 100;

const levels: readonly (keyof typeof dagNodes)[][] = [
  ["alert"],
  ["triage"],
  ["slack", "jira"],
  ["resolve"],
];

const edges: readonly [keyof typeof dagNodes, keyof typeof dagNodes][] = [
  ["alert", "triage"],
  ["triage", "slack"],
  ["triage", "jira"],
  ["slack", "resolve"],
  ["jira", "resolve"],
];

const auditLines = [
  "audit: incident opened",
  "audit: versioned runbook started",
  "audit: synced to Slack and Jira",
  "audit: resolved, log sealed",
] as const;

const levelOf = (id: keyof typeof dagNodes) =>
  levels.findIndex((level) => level.includes(id));

// Two extra beats at the end so the finished graph rests before restarting.
const DAG_STEPS = levels.length + 2;

export function RunbookDiagram({ accent }: DiagramProps) {
  const { ref, step, reduce } = useStepper(DAG_STEPS, 1100);
  const reached = reduce ? levels.length - 1 : Math.min(step, levels.length - 1);
  const current = reduce ? -1 : step < levels.length ? step : -1;

  return (
    <Frame
      frameRef={ref}
      caption="An example runbook, executing as a task graph"
      status={auditLines[reached]}
    >
      <svg
        viewBox="0 0 480 200"
        className="w-full h-auto"
        role="img"
        aria-label="A runbook graph runs from alert to triage, then to Slack and Jira in parallel, then to resolve, with each step written to an audit log."
      >
        {edges.map(([from, to]) => {
          const a = dagNodes[from];
          const b = dagNodes[to];
          const on = levelOf(to) <= reached;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x + DAG_W}
              y1={a.y + NODE_H / 2}
              x2={b.x}
              y2={b.y + NODE_H / 2}
              animate={{ stroke: on ? lit : idle }}
              transition={{ duration: 0.5, ease }}
              strokeDasharray={on ? "0" : "3 4"}
            />
          );
        })}

        {(Object.keys(dagNodes) as (keyof typeof dagNodes)[]).map((id) => {
          const level = levelOf(id);
          const stroke =
            level === current ? accent : level <= reached ? lit : idle;
          return (
            <Box
              key={id}
              node={dagNodes[id]}
              stroke={stroke}
              text={level <= reached ? lit : "#71717a"}
              w={DAG_W}
            />
          );
        })}
      </svg>
    </Frame>
  );
}
