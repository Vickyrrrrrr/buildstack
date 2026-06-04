"use client";

import { useState } from "react";
import { ExternalLink, MonitorUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const DESKTOP_SUCCESS_URL = "agentic://license/success";

export function OpenDesktopButton() {
  const [attempted, setAttempted] = useState(false);

  const openDesktop = () => {
    setAttempted(true);
    window.location.href = DESKTOP_SUCCESS_URL;

    // Fallback: If the app isn't installed, the browser won't navigate away.
    // After 2.5 seconds, if the user is still on the page, redirect to download.
    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = "/agentic/download";
      }
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="lg" onClick={openDesktop} className="w-full sm:w-auto">
        <MonitorUp className="h-4 w-4" />
        Open AgentIC Desktop
      </Button>
      <a
        href={DESKTOP_SUCCESS_URL}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted hover:text-accent-primary"
      >
        Open with protocol link
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      {attempted && (
        <p className="mx-auto max-w-md text-center text-sm text-text-muted">
          If your browser asks for permission, choose Open AgentIC. If nothing opens,
          start the desktop app manually and click Recheck License.
        </p>
      )}
    </div>
  );
}
