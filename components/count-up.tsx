"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export interface CountUpValue {
  from: number;
  to: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

function format(value: CountUpValue, current: number): string {
  const number = current.toLocaleString("en-US", {
    minimumFractionDigits: value.decimals,
    maximumFractionDigits: value.decimals,
  });
  return `${value.prefix ?? ""}${number}${value.suffix ?? ""}`;
}

// Counts from `from` to `to` once, the first time the number scrolls into view.
export function CountUp({ value }: { value: CountUpValue }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = format(value, value.to);
      return;
    }
    if (!inView) {
      node.textContent = format(value, value.from);
      return;
    }
    const controls = animate(value.from, value.to, {
      duration: 1.8,
      ease,
      onUpdate: (current) => {
        node.textContent = format(value, current);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{format(value, value.to)}</span>;
}
