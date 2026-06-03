"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { heroTickerItems } from "@/lib/buildstack-content";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import HeroSkeleton from "@/components/Hero/HeroSkeleton";

const HeroScene = dynamic(() => import("@/components/Hero/HeroScene"), { ssr: false });

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);

  const textLines = useMemo(
    () => [
      "The AI agent",
      "for silicon.",
    ],
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const chars = headingRef.current?.querySelectorAll("[data-char]");
        if (chars?.length) {
          gsap.fromTo(
            chars,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.01, // Instant switch for typewriter effect
              stagger: 0.035, // Fast sequence
              ease: "none",
            },
          );
        }

        if (tickerRef.current) {
          gsap.to(tickerRef.current, {
            xPercent: -50,
            duration: 18,
            repeat: -1,
            ease: "none",
          });
        }
      }, rootRef);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0 z-0">
        <div className="trace-pattern absolute inset-0 z-10 opacity-25 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_88%)] pointer-events-none" />
      </div>

      <div className="container relative z-10 flex flex-col pt-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Side: 3D Scene */}
          <div className="relative h-[450px] w-full lg:h-[650px]">
            <Suspense fallback={<HeroSkeleton />}>
              <HeroScene />
            </Suspense>
          </div>

          {/* Right Side: Text Context */}
          <Reveal className="max-w-xl text-left">
            <p className="eyebrow mb-6">BUILDSTACK EDA LAB - v1.0</p>

          <h1 ref={headingRef} className="display-title">
            <span className="block">
              {textLines[0].split(" ").map((word, wordIndex, arr) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, index) => (
                    <span key={index} data-char className="inline-block">
                      {char}
                    </span>
                  ))}
                  {wordIndex < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </span>
            <span className="block text-accent-primary">
              {textLines[1].split(" ").map((word, wordIndex, arr) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, index) => (
                    <span key={index} data-char className="inline-block">
                      {char}
                    </span>
                  ))}
                  {wordIndex < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </span>
          </h1>

          <p className="body-copy mt-8 max-w-[32rem] text-balance text-lg">
            From plain English to a fabrication-ready layout—entirely on your own machine.
            AgentIC builds your chips autonomously while your IP stays completely secure.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/agentic">
                Launch AgentIC
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/#methodology">Read Methodology</Link>
            </Button>
          </div>
        </Reveal>
        </div>

        <div className="mt-16 w-full overflow-hidden rounded-full border border-border bg-bg-surface/65 px-0 py-3">
          <div
            ref={tickerRef}
            className="flex w-[200%] shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted"
          >
            {[...heroTickerItems, ...heroTickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="mx-4 whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
