import Image from "next/image";
import {
  ArrowsClockwise,
  Car,
  DownloadSimple,
  GithubLogo,
  Palette,
  TextT,
  Waveform,
} from "@phosphor-icons/react/dist/ssr";

import { formatBytes, formatDate, getLatestRelease } from "./lib/release";

const REPO_URL = "https://github.com/elzastrelitzia/libremusic";
const RELEASES_URL = `${REPO_URL}/releases/latest`;
const VIRUSTOTAL_BADGE =
  "https://img.shields.io/badge/VirusTotal-Clean-brightgreen?style=flat-square&logo=virustotal&logoColor=white";

const shots = [
  { src: "/screenshots/1.png", width: 393, height: 872 },
  { src: "/screenshots/2.png", width: 393, height: 872 },
  { src: "/screenshots/3.png", width: 393, height: 872 },
  { src: "/screenshots/4.jpg", width: 720, height: 1600 },
  { src: "/screenshots/5.jpg", width: 720, height: 1600 },
  { src: "/screenshots/6.jpg", width: 720, height: 1600 },
];

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <>
      <div className="ambient" aria-hidden="true" />

      <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] dark:invert"
            />
            <span className="text-[15px] font-medium tracking-tight">Pulse</span>
          </a>
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={REPO_URL}
              className="r-btn hidden px-3 py-2 text-sm text-muted transition-colors hover:text-ink sm:inline-block"
            >
              Source code
            </a>
            <a
              href={release?.apkUrl ?? RELEASES_URL}
              className="r-btn inline-flex items-center gap-2 bg-ink px-3.5 py-2 text-sm font-medium text-canvas transition-colors hover:bg-ink-2 active:scale-[0.98]"
            >
              <DownloadSimple size={16} weight="bold" />
              Download APK
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero: asymmetric split. Text left, real device screenshot right. */}
        <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="reveal">
              <h1 className="max-w-[15ch] text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
                Music streaming for everyone.
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
                Pulse plays almost any song from YouTube Music, keeps lyrics in
                sync, and caches tracks so you can listen offline.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={release?.apkUrl ?? RELEASES_URL}
                  className="r-btn inline-flex items-center gap-2 bg-ink px-5 py-3 text-[15px] font-medium text-canvas transition-colors hover:bg-ink-2 active:scale-[0.98]"
                >
                  <DownloadSimple size={17} weight="bold" />
                  Download APK
                </a>
                <a
                  href={REPO_URL}
                  className="r-btn inline-flex items-center gap-2 border border-line-strong px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink active:scale-[0.98]"
                >
                  <GithubLogo size={17} weight="bold" />
                  Source code
                </a>
              </div>
            </div>

            <div className="reveal mx-auto w-full max-w-[260px] lg:max-w-[280px]">
              <div className="r-panel border border-line bg-surface-2 p-2.5">
                <div className="overflow-hidden rounded-[4px] border border-line">
                  <Image
                    src="/screenshots/1.png"
                    alt="Pulse home screen showing the library and playback controls"
                    width={393}
                    height={872}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery: horizontal scroll-snap, deliberately not a card row. */}
        <section
          id="screenshots"
          className="scroll-mt-20 border-y border-line bg-surface-2 py-20 lg:py-24"
        >
          <div className="mx-auto w-full max-w-6xl px-5">
            <h2 className="max-w-[20ch] text-3xl font-medium tracking-tight sm:text-4xl">
              Screenshots
            </h2>
            <p className="mt-4 max-w-[52ch] text-muted">
              Six screens from the current release. Swipe the row to see the
              rest.
            </p>
          </div>

          <div className="mt-12 snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="mx-auto flex w-max items-start gap-5 px-5">
              {shots.map((shot, i) => (
                <li key={shot.src} className="snap-start">
                  <figure className="r-panel w-[196px] border border-line bg-canvas p-2 sm:w-[232px]">
                    <div className="overflow-hidden rounded-[4px]">
                      <Image
                        src={shot.src}
                        alt={`Pulse app screen ${i + 1} of ${shots.length}`}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bento grid: 5 cells, 5 items, no empty tile. Mixed surfaces. */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 lg:py-28">
          <h2 className="max-w-[22ch] text-3xl font-medium tracking-tight sm:text-4xl">
            What it does
          </h2>
          <p className="mt-4 max-w-[52ch] text-muted">
            Everything below ships in the current release. The full list lives
            in the project README.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="relative col-span-1 overflow-hidden rounded-lg border border-line sm:col-span-2 lg:col-span-4">
              <Image
                src="/screenshots/3.png"
                alt="Pulse lyrics view with a time-synchronized line highlighted"
                width={393}
                height={872}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/92 via-canvas/35 to-transparent" />
              <div className="relative p-6 sm:p-8">
                <TextT size={22} weight="bold" className="text-ink" />
                <h3 className="mt-4 text-xl font-medium tracking-tight">
                  Synchronized lyrics
                </h3>
                <p className="mt-2 max-w-[38ch] text-muted">
                  Fetch, read, and edit lyrics. Synced lines follow the track.
                </p>
              </div>
            </div>

            <div className="col-span-1 rounded-lg border border-line bg-tint p-6 sm:col-span-2 lg:col-span-2">
              <Palette size={22} weight="bold" className="text-tint-ink" />
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Material You themes
              </h3>
              <p className="mt-2 text-muted">
                Dynamic color pulled from your wallpaper, on your terms.
              </p>
            </div>

            <div className="hatch col-span-1 rounded-lg border border-line p-6 sm:col-span-1 lg:col-span-2">
              <Waveform size={22} weight="bold" className="text-ink" />
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Audio normalization
              </h3>
              <p className="mt-2 text-muted">
                Even volume across every track, quiet or loud.
              </p>
            </div>

            <div className="col-span-1 rounded-lg border border-line p-6 sm:col-span-1 lg:col-span-2">
              <ArrowsClockwise size={22} weight="bold" className="text-ink" />
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Offline cache
              </h3>
              <p className="mt-2 text-muted">
                Save a song once, then play it with no connection at all.
              </p>
            </div>

            <div className="col-span-1 rounded-lg border border-line p-6 sm:col-span-1 lg:col-span-2">
              <Car size={22} weight="bold" className="text-ink" />
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Android Auto
              </h3>
              <p className="mt-2 text-muted">
                Take the library on the drive, hands on the wheel.
              </p>
            </div>
          </div>
        </section>

        {/* Download: real release metadata, read from the GitHub API. */}
        <section
          id="download"
          className="scroll-mt-20 border-t border-line bg-surface py-20 lg:py-28"
        >
          <div className="mx-auto w-full max-w-6xl px-5">
            <h2 className="max-w-[18ch] text-3xl font-medium tracking-tight sm:text-4xl">
              Download
            </h2>
            <p className="mt-4 max-w-[52ch] text-muted">
              Builds are published straight to the project&apos;s GitHub
              releases. The page always links to the newest one, so there is
              nothing to keep in sync here.
            </p>

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
                      alt="VirusTotal reports the latest Pulse APK as clean"
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
                    href={release?.pageUrl ?? RELEASES_URL}
                    className="r-btn inline-flex w-full items-center justify-center gap-2 border border-line-strong px-6 py-3.5 text-[15px] font-medium whitespace-nowrap text-ink transition-colors hover:border-ink active:scale-[0.98]"
                  >
                    All releases
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-[62ch]">
              <p className="text-sm leading-relaxed text-muted">
                Pulse is based on{" "}
                <a
                  href="https://github.com/bartoostveen/ViTune"
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                >
                  ViTune
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/vfsfitvnm/ViMusic"
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                >
                  ViMusic
                </a>
                . This project and its contents are not affiliated with, funded,
                authorized, endorsed by, or in any way associated with YouTube,
                Google LLC or any of its affiliates and subsidiaries. Any
                trademark, service mark, trade name, or other intellectual
                property rights used in this project are owned by the respective
                owners.
              </p>
            </div>

            <div className="shrink-0">
              <h3 className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                Built on
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://github.com/zerodytrash/YouTube-Internal-Clients"
                    className="text-muted transition-colors hover:text-ink"
                  >
                    YouTube-Internal-Clients
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ionic-team/ionicons"
                    className="text-muted transition-colors hover:text-ink"
                  >
                    ionicons
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/chaquopy/chaquopy"
                    className="text-muted transition-colors hover:text-ink"
                  >
                    Python for Android
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Open source, licensed under GPL-3.0.
            </p>
            <a
              href={REPO_URL}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <GithubLogo size={16} weight="bold" />
              elzastrelitzia/libremusic
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
