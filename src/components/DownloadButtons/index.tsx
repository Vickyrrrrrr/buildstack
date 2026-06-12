"use client";

import { useEffect, useState } from "react";
import {
  Apple,
  ChevronRight,
  Download,
  Github,
  Monitor,
  Star,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AGENTIC_ALL_DOWNLOADS_URL,
  AGENTIC_DOWNLOADS,
  AGENTIC_PLATFORMS,
  AGENTIC_RELEASE_NOTES_URL,
  AGENTIC_REPO_URL,
  AGENTIC_VERSION,
  PlatformKey,
  PlatformDownloads,
  ReleaseData,
  downloadUrl,
} from "@/lib/downloads";

type Platform = PlatformKey | "unknown";
type Arch = "x64" | "arm64" | "unknown";

function detectPlatform(): { platform: Platform; arch: Arch } {
  if (typeof window === "undefined") {
    return { platform: "unknown", arch: "unknown" };
  }

  const ua = navigator.userAgent || "";
  const uaData = (navigator as { userAgentData?: { platform?: string } })
    .userAgentData;
  const platformHint = uaData?.platform?.toLowerCase() ?? "";

  if (platformHint.includes("mac")) return { platform: "macos", arch: "unknown" };
  if (platformHint.includes("win")) return { platform: "windows", arch: "unknown" };
  if (platformHint.includes("linux")) return { platform: "linux", arch: "unknown" };

  if (/Windows/i.test(ua)) return { platform: "windows", arch: "unknown" };
  if (/Mac OS X|macOS/i.test(ua)) return { platform: "macos", arch: "unknown" };
  if (/Linux/i.test(ua)) return { platform: "linux", arch: "unknown" };

  return { platform: "unknown", arch: "unknown" };
}

function PlatformIcon({ platform }: { platform: PlatformKey }) {
  if (platform === "windows") return <Monitor className="h-5 w-5 text-accent-primary" />;
  if (platform === "macos") return <Apple className="h-5 w-5 text-accent-primary" />;
  return <Terminal className="h-5 w-5 text-accent-primary" />;
}

function PrimaryIcon({ platform }: { platform: PlatformKey }) {
  if (platform === "windows") return <Monitor className="h-4 w-4" />;
  if (platform === "macos") return <Apple className="h-4 w-4" />;
  return <Terminal className="h-4 w-4" />;
}

function pickPrimaryAsset(
  platform: PlatformKey,
  downloads: Record<PlatformKey, PlatformDownloads>
) {
  const assets = downloads[platform].assets;
  return assets.find((a) => a.primary) ?? assets[0];
}

export function DownloadButtons({ initialData }: { initialData?: ReleaseData }) {
  const version = initialData?.version ?? AGENTIC_VERSION;
  const downloads = initialData?.downloads ?? AGENTIC_DOWNLOADS;
  const releaseNotesUrl = initialData?.releaseNotesUrl ?? AGENTIC_RELEASE_NOTES_URL;
  const allDownloadsUrl = initialData?.allDownloadsUrl ?? AGENTIC_ALL_DOWNLOADS_URL;

  const [detected, setDetected] = useState<{ platform: Platform; arch: Arch }>({
    platform: "unknown",
    arch: "unknown",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Two-pass render is required for client-only OS detection in an SSR app.
    // The initial render (server + first client paint) uses "unknown" so the
    // markup matches. After hydration this effect runs once to read the
    // browser's navigator and re-render with the real detected platform.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetected(detectPlatform());
    setMounted(true);
  }, []);

  const primaryPlatform: PlatformKey | null =
    detected.platform !== "unknown" ? detected.platform : null;
  const primaryAsset = primaryPlatform ? pickPrimaryAsset(primaryPlatform, downloads) : null;
  const primaryPlatformName = primaryPlatform
    ? downloads[primaryPlatform].name
    : null;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        {primaryAsset && primaryPlatformName && primaryPlatform ? (
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a id="download-link-primary" href={primaryAsset.url || downloadUrl(primaryAsset.file)}>
              <PrimaryIcon platform={primaryPlatform} />
              Download for {primaryPlatformName} ({primaryAsset.label})
            </a>
          </Button>
        ) : (
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a id="download-link-primary-fallback" href={allDownloadsUrl} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              Download AgentIC Desktop
            </a>
          </Button>
        )}
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
          {primaryAsset ? `${primaryAsset.size} • ${version}` : version}
          {mounted && primaryPlatformName ? ` • Detected ${primaryPlatformName}` : ""}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="eyebrow">Or pick your platform</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {AGENTIC_PLATFORMS.map((platform) => {
            const data = downloads[platform];
            const isDetected = mounted && detected.platform === platform;
            return (
              <div
                key={platform}
                className={
                  isDetected
                    ? "elevated-panel trace-outline relative space-y-4 p-6"
                    : "surface-panel relative space-y-4 p-6"
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={platform} />
                    <h3 className="font-semibold tracking-[-0.01em] text-text-primary">
                      {data.name}
                    </h3>
                  </div>
                  {isDetected ? (
                    <Badge variant="accent" className="shrink-0">
                      Recommended
                    </Badge>
                  ) : null}
                </div>

                <div className="space-y-2">
                  {data.assets.map((asset) => {
                    const isPrimary = asset.primary;
                    const fileExt = asset.file.split(".").pop() || "unknown";
                    return (
                      <a
                        id={`download-link-${platform}-${asset.arch}-${fileExt}`}
                        key={asset.file}
                        href={asset.url || downloadUrl(asset.file)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-surface/60 px-4 py-3 transition hover:border-accent-primary hover:bg-accent-primary/5"
                      >
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
                            <span>{asset.label}</span>
                            {isPrimary ? (
                              <Star className="h-3 w-3 fill-accent-primary text-accent-primary" />
                            ) : null}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                            {asset.size} • .{fileExt}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-muted transition group-hover:text-accent-primary" />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
        <a
          id="link-release-notes"
          href={releaseNotesUrl}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-accent-primary"
        >
          View release notes
        </a>
        <span className="text-text-muted/40">·</span>
        <a
          id="link-all-downloads"
          href={allDownloadsUrl}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-accent-primary"
        >
          All downloads
        </a>
        <span className="text-text-muted/40">·</span>
        <a
          id="link-source-code"
          href={AGENTIC_REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 transition hover:text-accent-primary"
        >
          <Github className="h-3.5 w-3.5" />
          Source
        </a>
      </div>
    </div>
  );
}

export default DownloadButtons;
