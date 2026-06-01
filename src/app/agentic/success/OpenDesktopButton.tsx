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
  };

  return (
    <div className="space-y-3">
      <Button size="lg" onClick={openDesktop} className="w-full sm:w-auto">
        <MonitorUp className="h-4 w-4" />
        Open AgentIC Desktop
      </Button>
      {attempted && (
        <p className="mx-auto max-w-md text-sm text-text-muted">
          If your browser asks for permission, choose Open AgentIC. If nothing opens,
          start the desktop app manually and click Recheck License.
        </p>
      )}
      <a
        href={DESKTOP_SUCCESS_URL}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted hover:text-accent-primary"
      >
        Open with protocol link
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
