export const AGENTIC_VERSION = "v1.0.5";
export const AGENTIC_RELEASE_BASE = `https://github.com/Vickyrrrrrr/buildstack/releases/download/${AGENTIC_VERSION}`;

export const AGENTIC_RELEASE_NOTES_URL = `https://github.com/Vickyrrrrrr/buildstack/releases/tag/${AGENTIC_VERSION}`;
export const AGENTIC_ALL_DOWNLOADS_URL = `https://github.com/Vickyrrrrrr/buildstack/releases/expanded_assets/${AGENTIC_VERSION}`;
export const AGENTIC_REPO_URL = "https://github.com/Vickyrrrrrr/buildstack";

export type PlatformKey = "windows" | "macos" | "linux";

export type DownloadAsset = {
  label: string;
  file: string;
  size: string;
  arch: "x64" | "arm64";
  primary?: boolean;
};

export type PlatformDownloads = {
  name: string;
  assets: DownloadAsset[];
};

export const AGENTIC_DOWNLOADS: Record<PlatformKey, PlatformDownloads> = {
  windows: {
    name: "Windows",
    assets: [
      {
        label: "Installer (x64)",
        file: "AgentIC-Setup-1.0.5.exe",
        size: "144 MB",
        arch: "x64",
        primary: true,
      },
    ],
  },
  macos: {
    name: "macOS",
    assets: [
      {
        label: "Apple Silicon",
        file: "AgentIC-1.0.5-arm64.dmg",
        size: "158 MB",
        arch: "arm64",
        primary: true,
      },
      {
        label: "Intel",
        file: "AgentIC-1.0.5-x64.dmg",
        size: "161 MB",
        arch: "x64",
      },
    ],
  },
  linux: {
    name: "Linux",
    assets: [
      {
        label: "AppImage (x86_64)",
        file: "AgentIC-1.0.5-x86_64.AppImage",
        size: "164 MB",
        arch: "x64",
        primary: true,
      },
      {
        label: "AppImage (arm64)",
        file: "AgentIC-1.0.5-arm64.AppImage",
        size: "159 MB",
        arch: "arm64",
      },
      {
        label: ".deb (Debian / Ubuntu)",
        file: "agentic-desktop_1.0.5_amd64.deb",
        size: "200 MB",
        arch: "x64",
      },
    ],
  },
};

export const AGENTIC_PLATFORMS: PlatformKey[] = ["windows", "macos", "linux"];

export function downloadUrl(file: string): string {
  return `${AGENTIC_RELEASE_BASE}/${file}`;
}
