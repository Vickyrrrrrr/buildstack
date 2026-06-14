export const AGENTIC_VERSION = "v1.0.13";
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
  url?: string;
};

export type PlatformDownloads = {
  name: string;
  assets: DownloadAsset[];
};

export interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

export interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
  html_url: string;
}

export type ReleaseData = {
  version: string;
  releaseNotesUrl: string;
  allDownloadsUrl: string;
  downloads: Record<PlatformKey, PlatformDownloads>;
};

export const AGENTIC_DOWNLOADS: Record<PlatformKey, PlatformDownloads> = {
  windows: {
    name: "Windows",
    assets: [
      {
        label: "Installer (x64)",
        file: "agentic-desktop-win-x64.exe",
        size: "155 MB",
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
        file: "agentic-desktop-mac-arm64.dmg",
        size: "150 MB",
        arch: "arm64",
        primary: true,
      },
      {
        label: "Intel",
        file: "agentic-desktop-mac-x64.dmg",
        size: "155 MB",
        arch: "x64",
      },
    ],
  },
  linux: {
    name: "Linux",
    assets: [
      {
        label: "AppImage (x86_64)",
        file: "agentic-desktop-linux-x86_64.AppImage",
        size: "171 MB",
        arch: "x64",
        primary: true,
      },
      {
        label: "AppImage (arm64)",
        file: "agentic-desktop-linux-arm64.AppImage",
        size: "165 MB",
        arch: "arm64",
      },
      {
        label: ".deb (Debian / Ubuntu)",
        file: "agentic-desktop-linux-x64.deb",
        size: "160 MB",
        arch: "x64",
      },
    ],
  },
};

export const AGENTIC_PLATFORMS: PlatformKey[] = ["windows", "macos", "linux"];

export function downloadUrl(file: string): string {
  return `${AGENTIC_RELEASE_BASE}/${file}`;
}

export async function fetchLatestRelease(): Promise<ReleaseData | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/Vickyrrrrrr/buildstack/releases/latest",
      {
        next: { revalidate: 3600 }, // Cache response for 1 hour
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "buildstack-web-app",
        },
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch release: ${res.statusText}`);
    const data: GitHubRelease = await res.json();
    
    const version = data.tag_name;
    const releaseNotesUrl = data.html_url;
    const allDownloadsUrl = `https://github.com/Vickyrrrrrr/buildstack/releases/expanded_assets/${version}`;
    
    const formatSize = (bytes: number) => `${Math.round(bytes / (1024 * 1024))} MB`;
    
    const windowsAssets: DownloadAsset[] = [];
    const macosAssets: DownloadAsset[] = [];
    const linuxAssets: DownloadAsset[] = [];
    
    for (const asset of data.assets) {
      const name = asset.name;
      const size = formatSize(asset.size);
      const url = asset.browser_download_url;
      
      if (name.endsWith(".exe")) {
        windowsAssets.push({
          label: "Installer (x64)",
          file: name,
          size,
          arch: "x64",
          primary: true,
          url,
        });
      } else if (name.endsWith(".dmg")) {
        const isArm = name.includes("arm64");
        macosAssets.push({
          label: isArm ? "Apple Silicon" : "Intel",
          file: name,
          size,
          arch: isArm ? "arm64" : "x64",
          primary: isArm,
          url,
        });
      } else if (name.endsWith(".AppImage")) {
        const isArm = name.includes("arm64");
        linuxAssets.push({
          label: isArm ? "AppImage (arm64)" : "AppImage (x86_64)",
          file: name,
          size,
          arch: isArm ? "arm64" : "x64",
          primary: !isArm,
          url,
        });
      } else if (name.endsWith(".deb")) {
        linuxAssets.push({
          label: ".deb (Debian / Ubuntu)",
          file: name,
          size,
          arch: "x64",
          url,
        });
      }
    }
    
    // Sort assets to ensure correct ordering if returned randomly
    macosAssets.sort((a, b) => (a.arch === "arm64" ? -1 : b.arch === "arm64" ? 1 : 0));
    linuxAssets.sort((a, b) => {
      if (a.primary) return -1;
      if (b.primary) return 1;
      return 0;
    });
    
    return {
      version,
      releaseNotesUrl,
      allDownloadsUrl,
      downloads: {
        windows: { name: "Windows", assets: windowsAssets.length ? windowsAssets : AGENTIC_DOWNLOADS.windows.assets },
        macos: { name: "macOS", assets: macosAssets.length ? macosAssets : AGENTIC_DOWNLOADS.macos.assets },
        linux: { name: "Linux", assets: linuxAssets.length ? linuxAssets : AGENTIC_DOWNLOADS.linux.assets },
      },
    };
  } catch (error) {
    console.error("Failed to fetch latest release from GitHub, falling back to static config:", error);
    return null;
  }
}
