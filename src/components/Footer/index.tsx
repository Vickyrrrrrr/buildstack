import Link from "next/link";
import { Github, MessageSquare, Twitter } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { navItems } from "@/lib/buildstack-content";

export function Footer() {
  return (
    <footer id="about" className="border-t border-border bg-bg-surface/70">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <Wordmark />
          <p className="body-copy max-w-xs">Where Silicon Meets Intent</p>
          <p className="eyebrow">(c) 2026 Buildstack Lab</p>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">Navigation</p>
          <div className="grid gap-2 text-sm text-text-primary">
            <Link href="/agentic">AgentIC</Link>
            <Link href={navItems[2].href}>Methodology</Link>
            <Link href={navItems[1].href}>Technology</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">Legal</p>
          <div className="grid gap-2 text-sm text-text-primary">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund">Refund Policy</Link>
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">Community</p>
          <p className="body-copy max-w-xs">Part of the open-source EDA community</p>
          <div className="flex items-center gap-4 text-text-muted">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord">
              <MessageSquare className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-4">
        <div className="container flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
          <span>Built with OpenLane | Sky130 | React Three Fiber | GSAP | Self-Healing Repair Engine</span>
          <span className="flex gap-4">
            <Link href="/terms" className="hover:text-accent-primary transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-accent-primary transition-colors">Privacy</Link>
            <Link href="/refund" className="hover:text-accent-primary transition-colors">Refunds</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
