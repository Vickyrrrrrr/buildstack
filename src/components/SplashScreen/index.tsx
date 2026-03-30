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
      setIsVisible(false);
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
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-base px-6 text-center before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,theme(colors.bg-surface/0.5),transparent)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="pointer-events-auto relative z-10 w-full max-w-3xl space-y-10"
          >
            <div className="space-y-6">
              <h1 className="font-sans text-5xl font-extrabold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
                Do you <span className="text-accent-primary italic">seriously</span> want to automate silicon?
              </h1>
              <p className="mx-auto max-w-xl text-lg text-text-muted md:text-xl">
                (Or do you genuinely enjoy fixing DRC violations manually at 3:00 AM while questioning your life choices?)
              </p>
            </div>

            <div className="relative mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Button 
                size="lg" 
                onClick={handleEnter} 
                className="h-14 px-8 text-lg font-bold shadow-glow"
              >
                Yes, save me from EDA hell.
              </Button>
              
              <Button
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
                className="h-14 px-8 text-lg font-medium text-text-muted transition-transform duration-200 hover:bg-bg-surface hover:text-text-primary"
              >
                {noHoverCount === 0 ? "No, I love suffering." : 
                 noHoverCount === 1 ? "Wait, are you sure?" : 
                 noHoverCount === 2 ? "Are you a masochist?" : 
                 noHoverCount === 3 ? "Please, just click Yes." :
                 "Okay fine, click me."}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
