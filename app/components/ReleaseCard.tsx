"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { formatBytes, formatDate, type Release } from "../lib/release";

const RELEASES_URL =
  "https://github.com/elzastrelitzia/libremusic/releases/latest";
const ALL_RELEASES_URL =
  "https://github.com/elzastrelitzia/libremusic/releases";
const API =
  "https://api.github.com/repos/elzastrelitzia/libremusic/releases/latest";
const VIRUSTOTAL_BADGE =
  "https://img.shields.io/badge/VirusTotal-Clean-brightgreen?style=flat-square&logo=virustotal&logoColor=white";

type GitHubRelease = {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets?: { name: string; size: number; browser_download_url: string }[];
};

export function ReleaseCard({ initial }: { initial: Release | null }) {
  const [release, setRelease] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    fetch(API, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: GitHubRelease | null) => {
        if (cancelled || !data?.tag_name) return;

        const apk = data.assets?.find((a) =>
          a.name.toLowerCase().endsWith(".apk"),
        );

        setRelease({
          version: data.tag_name,
          published: data.published_at,
          pageUrl: data.html_url,
          apkUrl: apk?.browser_download_url ?? data.html_url,
          apkSize: apk?.size ?? null,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="r-panel mt-12 border border-line bg-canvas">
      <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <div>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                Version
              </dt>
              <dd className="mt-1.5 font-mono text-sm">
                {release?.version ?? "latest"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                Size
              </dt>
              <dd className="mt-1.5 font-mono text-sm">
                {release?.apkSize ? formatBytes(release.apkSize) : "n/a"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                Released
              </dt>
              <dd className="mt-1.5 font-mono text-sm">
                {release ? formatDate(release.published) : "n/a"}
              </dd>
            </div>
          </dl>
          <a
            href={VIRUSTOTAL_BADGE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VIRUSTOTAL_BADGE}
              alt="VirusTotal reports the latest libremusic APK as clean"
              width={140}
              height={20}
            />
          </a>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <a
            href={release?.apkUrl ?? RELEASES_URL}
            className="r-btn inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[15px] font-medium whitespace-nowrap text-canvas transition-colors hover:bg-ink-2 active:scale-[0.98]"
          >
            <DownloadSimple size={17} weight="bold" />
            Download APK
          </a>
          <a
            href={ALL_RELEASES_URL}
            className="r-btn inline-flex w-full items-center justify-center gap-2 border border-line-strong px-6 py-3.5 text-[15px] font-medium whitespace-nowrap text-ink transition-colors hover:border-ink active:scale-[0.98]"
          >
            All releases
          </a>
        </div>
      </div>
    </div>
  );
}
