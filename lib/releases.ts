import { REPO } from "./site";

const HEADERS = { Accept: "application/vnd.github+json" };

export type Asset = {
  name: string;
  size: number;
  browser_download_url: string;
};

export type Release = {
  id: number;
  name: string | null;
  tag_name: string;
  published_at: string;
  prerelease: boolean;
  html_url: string;
  assets?: Asset[];
};

// ponytail: one shared promise, so nav badge and hero button cost one request,
// not two. Add a TTL cache if the 60 req/hr IP limit starts to bite.
let latestRequest: Promise<Release> | undefined;

export function fetchLatestRelease() {
  latestRequest ??= fetch(
    `https://api.github.com/repos/${REPO}/releases/latest`,
    { headers: HEADERS },
  ).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<Release>;
  });
  return latestRequest;
}

export function fetchReleases() {
  return fetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=10`,
    { headers: HEADERS },
  ).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<Release[]>;
  });
}

export function pickAsset(release: Release) {
  const assets = release.assets || [];
  return (
    assets.find((asset) => asset.name.toLowerCase().endsWith(".apk")) || assets[0]
  );
}

export function formatBytes(bytes: number | null | undefined) {
  if (bytes === null || bytes === undefined) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`;
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
