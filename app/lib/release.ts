const REPO = "elzastrelitzia/libremusic";
const API = `https://api.github.com/repos/${REPO}/releases/latest`;

export type Release = {
  version: string;
  published: string;
  pageUrl: string;
  apkUrl: string;
  apkSize: number | null;
};

type GitHubAsset = {
  name: string;
  size: number;
  browser_download_url: string;
};

type GitHubRelease = {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets?: GitHubAsset[];
};

/** Newest published GitHub release, or null when the API is unreachable. */
export async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch(API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as GitHubRelease;
    if (!data.tag_name) return null;

    const apk = data.assets?.find((a) => a.name.toLowerCase().endsWith(".apk"));

    return {
      version: data.tag_name,
      published: data.published_at,
      pageUrl: data.html_url,
      apkUrl: apk?.browser_download_url ?? data.html_url,
      apkSize: apk?.size ?? null,
    };
  } catch {
    return null;
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
