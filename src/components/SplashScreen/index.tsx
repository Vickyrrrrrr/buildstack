"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if they've already passed the gate in this session to prevent annoyance
    const hasSeenSplash = sessionStorage.getItem("buildstack_splash_seen");
    if (hasSeenSplash) {
      const timeoutId = setTimeout(() => setIsVisible(false), 0);
      return () => clearTimeout(timeoutId);
    } else {
      document.body.style.overflow = "hidden"; // Lock scrolling while splash is active
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("buildstack_splash_seen", "true");
    document.body.style.overflow = "";
    setIsVisible(false);
    // Trigger a window resize event to poke GSAP scroll triggers into recalculating
    setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
  };

  const handleNoHover = () => {
    if (!noButtonRef.current) return;
    setNoHoverCount((c) => c + 1);
    
    // Funny move away logic: randomly jump the button around
    const maxX = 150;
    const maxY = 100;
    const x = (Math.random() - 0.5) * maxX * 2;
    const y = (Math.random() - 0.5) * maxY * 2;
    
    noButtonRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  if (!isVisible && typeof window !== "undefined" && sessionStorage.getItem("buildstack_splash_seen")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-base px-6 select-none"
        >
          {/* Layout Tracer Line Background */}
          <div className="absolute inset-0 bg-trace-grid bg-[size:32px_32px] opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--bg-base)_80%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative z-10 w-full max-w-lg rounded-xl border border-border bg-bg-surface/90 p-8 shadow-surface backdrop-blur-md md:p-10"
          >
            {/* Header / Sub-status bar */}
            <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6 text-[10px] font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-primary"></span>
                </span>
                <span className="font-semibold text-text-primary">AgentIC // AUTH_GATE</span>
              </div>
              <div>
                BUILDSTACK_EDA
              </div>
            </div>

            {/* Core Typography section */}
            <div className="space-y-4 text-left">
              <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary leading-[1.15]">
                Do you <span className="text-accent-primary italic font-medium">seriously</span> want to automate silicon?
              </h2>
              
              <p className="text-sm text-text-muted font-sans leading-relaxed">
                Or do you genuinely enjoy fixing DRC violations manually at 3:00 AM while questioning your life choices?
              </p>

              {/* Minimal Datasheet Box (Technical specifications look) */}
              <div className="font-mono text-[11px] text-text-muted border-t border-b border-border/40 py-4 my-6 flex justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted/50 font-semibold">Application</span>
                  <span className="font-medium text-text-primary">AgentIC by Buildstack</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-border/40 pl-4">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted/50 font-semibold">Scope</span>
                  <span className="font-medium text-text-primary">Secure Local EDA Synthesis</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-border/40 pl-4 hidden sm:flex">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted/50 font-semibold">Verified</span>
                  <span className="font-medium text-text-primary">buildstack.live</span>
                </div>
              </div>
            </div>

            {/* Buttons (Minimal Premium Vibe) */}
            <div className="mt-8 flex flex-col gap-2 sm:flex-row-reverse sm:items-center sm:justify-start">
              <Button 
                id="splash-btn-enter"
                size="lg" 
                onClick={handleEnter} 
                className="w-full sm:w-auto h-11 px-6 bg-accent-primary hover:bg-accent-primary/95 text-white font-mono text-xs uppercase tracking-wider rounded transition-all duration-200"
              >
                Yes, save me from EDA hell
              </Button>
              
              <Button
                id="splash-btn-reject"
                ref={noButtonRef}
                variant="ghost"
                size="lg"
                onMouseEnter={handleNoHover}
                onClick={() => {
                   if (noHoverCount > 3) {
                     alert("Fine. We'll automate it anyway.");
                     handleEnter();
                   } else {
                     handleNoHover();
                   }
                }}
                className="w-full sm:w-auto h-11 px-6 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary hover:bg-bg-base transition-all duration-200"
              >
                {noHoverCount === 0 ? "No, I love suffering" : 
                 noHoverCount === 1 ? "Wait, are you sure?" : 
                 noHoverCount === 2 ? "Are you a masochist?" : 
                 noHoverCount === 3 ? "Please, just click Yes" :
                 "Okay fine, click me"}
              </Button>
            </div>

            {/* Bottom Status Panel */}
            <div className="mt-8 pt-4 border-t border-border/30 flex justify-between items-center text-[9px] font-mono text-text-muted/50 uppercase tracking-widest">
              <div>System: Waiting_For_Handshake</div>
              <div>IP_SECURE: TRUE</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
