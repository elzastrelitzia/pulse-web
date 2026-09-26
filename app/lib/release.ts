const REPO = "elzastrelitzia/libremusic";
const API = `https://api.github.com/repos/${REPO}/releases/latest`;

export type Release = {
  version: string;
  published: string;
  pageUrl: string;
  apkUrl: string;
  apkSize: number | null;
};

export type Screenshot = {
  src: string;
  width: number;
  height: number;
};

const CONTENTS_API = `https://api.github.com/repos/${REPO}/contents`;

/** Intrinsic size only. The rendered box is locked by an aspect-ratio on the
 *  wrapper, so the 3% aspect gap between the 400x860 and 720x1600 batches never
 *  reaches layout. Read real dimensions from the blob header only if something
 *  starts relying on the intrinsic size again. */
const SHOT_W = 400;
const SHOT_H = 860;

function isImage(name: string) {
  return /\.(png|jpe?g|webp)$/i.test(name);
}

/** Screenshots served straight from GitHub's CDN, newest release first.
 *  Each release keeps its own folder under assets/screenshots, so the release
 *  folder is listed before the folder root and the older shots trail on the
 *  right. Returns null when nothing is found, so the gallery unmounts instead
 *  of rendering broken images. */
export async function getScreenshots(version?: string): Promise<Screenshot[] | null> {
  const dirs = [
    ...(version ? [`assets/screenshots/${version.replace(/^v/, "")}`] : []),
    "assets/screenshots",
  ];

  const seen = new Set<string>();
  const shots: Screenshot[] = [];

  for (const dir of dirs) {
    try {
      const res = await fetch(`${CONTENTS_API}/${dir}?ref=main`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      });
      if (!res.ok) continue;

      const entries = (await res.json()) as {
        name: string;
        download_url: string | null;
      }[];

      for (const e of entries.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { numeric: true }),
      )) {
        const src = e.download_url;
        if (!isImage(e.name) || !src || seen.has(src)) continue;
        seen.add(src);
        shots.push({ src, width: SHOT_W, height: SHOT_H });
      }
    } catch {
      // try the next candidate
    }
  }

  return shots.length ? shots : null;
}

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
