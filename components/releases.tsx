"use client";

import { useEffect, useState } from "react";
import { REPO_URL } from "../lib/site";
import {
  fetchLatestRelease,
  fetchReleases,
  formatBytes,
  formatDate,
  pickAsset,
  type Release,
} from "../lib/releases";

type ReleasesState = {
  status: "loading" | "ready" | "error";
  releases: Release[];
};

export function NavVersion() {
  const release = useLatestRelease();
  return (
    <span id="nav-version" className="brand-version mono border border-line rounded-full px-2 py-[2px] text-[11px] text-ink-faint">
      {release?.tag_name || "—"}
    </span>
  );
}

export function HeroDownload() {
  const release = useLatestRelease();
  const asset = release ? pickAsset(release) : null;
  return (
    <a
      id="hero-download-btn"
      href={asset?.browser_download_url || "#releases"}
      target="_top"
      rel="noopener"
      className="bg-white/80 rounded-lg py-4 px-6 text-black"
      data-testid="hero-download-btn"
    >
      Download{" "}
      <span className="mono opacity-50">
        {release?.tag_name || "—"}
      </span>
    </a>
  );
}

function useLatestRelease() {
  const [release, setRelease] = useState<Release | null>(null);
  useEffect(() => {
    fetchLatestRelease().then(setRelease).catch(() => {});
  }, []);
  return release;
}

const downloadIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

function ReleaseRow({ release: rel, index }: { release: Release; index: number }) {
  const asset = pickAsset(rel);
  return (
    <div className="release-row flex flex-wrap items-center justify-between gap-3 px-4.5 py-3.5 border-b border-line-soft transition-colors duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] md:gap-4 md:px-6 md:py-5" data-testid={`release-row-${index}`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-ink font-medium truncate">{rel.name || rel.tag_name || ""}</span>
          {rel.prerelease && <span className="badge-pre">pre-release</span>}
          {index === 0 && <span className="badge-latest">latest</span>}
        </div>
        <div className="mono text-[12px] text-ink-faint mt-2 flex items-center gap-1 flex-wrap">
          <span>{formatDate(rel.published_at)}</span>
          {asset && (
            <>
              <span className="text-ink-faint">·</span>
              <span className="release-filename text-ink-faint">{asset.name}</span>
              <span className="text-ink-faint">·</span>
              <span className="text-ink-faint">{formatBytes(asset.size)}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <a
          href={rel.html_url}
          target="_blank"
          rel="noopener"
          className="release-notes-btn btn btn-ghost btn-sm"
          data-testid={`release-notes-${index}`}
        >
          Notes
        </a>
        <a
          href={asset?.browser_download_url || rel.html_url}
          rel="noopener"
          className="btn btn-primary btn-sm"
          data-testid={`release-download-${index}`}
        >
          {downloadIcon}
          <span className="download-text">Download</span>
        </a>
      </div>
    </div>
  );
}

function ReleaseList() {
  const [state, setState] = useState<ReleasesState>({
    status: "loading",
    releases: [],
  });

  useEffect(() => {
    fetchReleases()
      .then((releases) => setState({ status: "ready", releases }))
      .catch(() => setState({ status: "error", releases: [] }));
  }, []);

  if (state.status === "loading") {
    return (
      <>
        <div className="release-row flex flex-wrap items-center justify-between gap-3 px-4.5 py-3.5 border-b border-line-soft">
          <div className="skeleton h-5 w-40" />
        </div>
        <div className="release-row flex flex-wrap items-center justify-between gap-3 px-4.5 py-3.5 border-b border-line-soft">
          <div className="skeleton h-5 w-32" />
        </div>
      </>
    );
  }

  if (state.status === "error") {
    return (
      <p className="px-6 py-6 text-ink-faint text-[14px]">
        Unable to fetch releases.{" "}
        <a
          href={`${REPO_URL}/releases`}
          target="_blank"
          rel="noopener"
          className="underline text-ink"
        >
          View on GitHub
        </a>
        .
      </p>
    );
  }

  if (state.releases.length === 0) {
    return <p className="px-6 py-6 text-ink-faint text-[14px]">No releases found.</p>;
  }

  return state.releases.map((release, index) => (
    <ReleaseRow key={release.id} release={release} index={index} />
  ));
}

export default function Releases() {
  return (
    <section id="releases">
      <div className="wrap py-12 md:py-24 lg:py-30">
        <details className="releases-section border-none">
          <summary className="releases-header flex items-center justify-between cursor-pointer select-none list-none">
            <h2 className="section-title m-0">Releases</h2>
            <span className="feature-chevron text-ink-faint text-[18px] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ml-3">›</span>
          </summary>

          <div className="releases-list border border-line rounded-[14px] overflow-hidden mt-5" data-testid="releases-list">
            <ReleaseList />
          </div>

          <div className="releases-footer mt-4">
            <a
              href={`${REPO_URL}/releases`}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost btn-sm"
              data-testid="releases-github-link"
            >
              All on GitHub →
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
