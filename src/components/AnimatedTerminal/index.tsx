"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AnimatedTerminalProps } from "@/types/terminal";

type SequenceState = {
  completedLines: string[];
  currentLineIndex: number;
  currentLineText: string;
};

const LINE_INTERVAL = 16;
const DEFAULT_LINE_DELAY = 140;

const typeClassMap: Record<AnimatedTerminalProps["lines"][number]["type"], string> = {
  success: "text-accent-primary",
  error: "text-accent-error",
  repair: "text-accent-repair",
  info: "text-text-muted",
  output: "text-text-primary",
};

const baseState: SequenceState = {
  completedLines: [],
  currentLineIndex: -1,
  currentLineText: "",
};

export function AnimatedTerminal({
  lines,
  title = "agentic://runtime",
  autoPlay = true,
  loop = false,
  loopDelay = 1600,
}: AnimatedTerminalProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportObserverRef = useRef<IntersectionObserver | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(autoPlay);
  const [sequenceState, setSequenceState] = useState<SequenceState>(baseState);

  const decoratedLines = useMemo(
    () =>
      lines.map((line, index) => ({
        ...line,
        key: `${line.text}-${index}`,
      })),
    [lines],
  );

  useEffect(() => {
    if (autoPlay) return;

    const element = rootRef.current;
    if (!element) return;

    viewportObserverRef.current?.disconnect();
    viewportObserverRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setHasStarted(true);
          viewportObserverRef.current?.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    viewportObserverRef.current.observe(element);

    return () => {
      viewportObserverRef.current?.disconnect();
    };
  }, [autoPlay]);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion, sequenceState]);

  useEffect(() => {
    const clearTimers = () => {
      timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      timeoutsRef.current = [];
    };

    if (!hasStarted) {
      clearTimers();
      return clearTimers;
    }

    if (prefersReducedMotion) {
      const immediateTimeout = window.setTimeout(() => {
        setSequenceState({
          completedLines: decoratedLines.map((line) => line.text),
          currentLineIndex: -1,
          currentLineText: "",
        });
      }, 0);
      timeoutsRef.current.push(immediateTimeout);

      if (loop) {
        const timeout = window.setTimeout(() => {
          setSequenceState(baseState);
          setHasStarted(false);
          const restartTimeout = window.setTimeout(() => setHasStarted(true), 16);
          timeoutsRef.current.push(restartTimeout);
        }, loopDelay);
        timeoutsRef.current.push(timeout);
      }

      return clearTimers;
    }

    const resetTimeout = window.setTimeout(() => {
      setSequenceState(baseState);
    }, 0);
    timeoutsRef.current.push(resetTimeout);

    let accumulatedDelay = 0;

    decoratedLines.forEach((line, lineIndex) => {
      const startTypingTimeout = window.setTimeout(() => {
        setSequenceState((previous) => ({
          ...previous,
          currentLineIndex: lineIndex,
          currentLineText: "",
        }));

        line.text.split("").forEach((_, characterIndex) => {
          const characterTimeout = window.setTimeout(() => {
            setSequenceState((previous) => ({
              ...previous,
              currentLineIndex: lineIndex,
              currentLineText: line.text.slice(0, characterIndex + 1),
            }));
          }, characterIndex * LINE_INTERVAL);

          timeoutsRef.current.push(characterTimeout);
        });

        const completeLineTimeout = window.setTimeout(() => {
          setSequenceState((previous) => ({
            completedLines: [...previous.completedLines, line.text],
            currentLineIndex: -1,
            currentLineText: "",
          }));
        }, line.text.length * LINE_INTERVAL + 24);

        timeoutsRef.current.push(completeLineTimeout);
      }, accumulatedDelay);

      timeoutsRef.current.push(startTypingTimeout);
      accumulatedDelay += line.text.length * LINE_INTERVAL + (line.delay ?? DEFAULT_LINE_DELAY);
    });

    if (loop) {
      const loopTimeout = window.setTimeout(() => {
        setSequenceState(baseState);
        setHasStarted(false);
        const restartTimeout = window.setTimeout(() => setHasStarted(true), 16);
        timeoutsRef.current.push(restartTimeout);
      }, accumulatedDelay + loopDelay);

      timeoutsRef.current.push(loopTimeout);
    }

    return clearTimers;
  }, [decoratedLines, hasStarted, loop, loopDelay, prefersReducedMotion]);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="trace-outline overflow-hidden rounded-xl border border-border bg-bg-terminal"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-accent-error/70" />
          <span className="h-3 w-3 rounded-full bg-accent-repair/70" />
          <span className="h-3 w-3 rounded-full bg-accent-primary/70" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
          {title}
        </span>
        <span className="h-3 w-12" />
      </div>

      <div
        ref={scrollRef}
        className="terminal-scroll h-[22rem] space-y-2 overflow-y-auto px-4 py-4 font-mono text-[0.82rem] leading-6 md:px-5"
      >
        {sequenceState.completedLines.map((lineText, index) => (
          <div
            key={`${lineText}-${index}`}
            className={cn(
              "whitespace-pre-wrap break-words",
              typeClassMap[decoratedLines[index]?.type ?? "output"],
            )}
          >
            {lineText}
          </div>
        ))}

        {sequenceState.currentLineIndex >= 0 && decoratedLines[sequenceState.currentLineIndex] ? (
          <div
            className={cn(
              "whitespace-pre-wrap break-words",
              typeClassMap[decoratedLines[sequenceState.currentLineIndex].type],
            )}
          >
            {sequenceState.currentLineText}
            <span className="animate-cursor-blink text-text-primary">_</span>
          </div>
        ) : null}

        {!hasStarted ? (
          <div className="pt-4 text-text-muted">Waiting for viewport trigger...</div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default AnimatedTerminal;
