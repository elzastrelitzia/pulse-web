"use client";

import { useEffect, useState, type CSSProperties } from "react";
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
    <span id="nav-version" className="brand-version mono">
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
      className="btn btn-primary"
      data-testid="hero-download-btn"
    >
      Download{" "}
      <span className="mono" style={{ opacity: 0.7 }}>
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

const fallbackStyle: CSSProperties = {
  padding: 24,
  color: "var(--ink-faint)",
  fontSize: 14,
};
const linkStyle: CSSProperties = {
  textDecoration: "underline",
  color: "var(--ink)",
};
const growStyle: CSSProperties = { minWidth: 0 };
const titleRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
};
const titleStyle: CSSProperties = { color: "var(--ink)", fontWeight: 500 };
const metaStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--ink-faint)",
  marginTop: 8,
};
const actionsStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  flexShrink: 0,
};

function ReleaseRow({ release: rel, index }: { release: Release; index: number }) {
  const asset = pickAsset(rel);
  return (
    <div className="release-row" data-testid={`release-row-${index}`}>
      <div style={growStyle}>
        <div style={titleRowStyle}>
          <span style={titleStyle}>{rel.name || rel.tag_name || ""}</span>
          {rel.prerelease && <span className="badge-pre">pre-release</span>}
          {index === 0 && <span className="badge-latest">latest</span>}
        </div>
        <div className="mono" style={metaStyle}>
          {formatDate(rel.published_at)}
          {asset && (
            <>
              {" · "}
              <span className="release-filename">{asset.name}</span>
              {" · "}
              {formatBytes(asset.size)}
            </>
          )}
        </div>
      </div>
      <div style={actionsStyle}>
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
        <div className="release-row">
          <div className="skeleton" style={{ height: 20, width: 160 }} />
        </div>
        <div className="release-row">
          <div className="skeleton" style={{ height: 20, width: 130 }} />
        </div>
      </>
    );
  }

  if (state.status === "error") {
    return (
      <p style={fallbackStyle}>
        Unable to fetch releases.{" "}
        <a
          href={`${REPO_URL}/releases`}
          target="_blank"
          rel="noopener"
          style={linkStyle}
        >
          View on GitHub
        </a>
        .
      </p>
    );
  }

  if (state.releases.length === 0) {
    return <p style={fallbackStyle}>No releases found.</p>;
  }

  return state.releases.map((release, index) => (
    <ReleaseRow key={release.id} release={release} index={index} />
  ));
}

export default function Releases() {
  return (
    <section id="releases">
      <div className="wrap section-pad">
        <details className="releases-section">
          <summary className="releases-header">
            <h2 className="section-title">Releases</h2>
            <span className="feature-chevron">›</span>
          </summary>

          <div className="releases-list" data-testid="releases-list">
            <ReleaseList />
          </div>

          <div className="releases-footer">
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
