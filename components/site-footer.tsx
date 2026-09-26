import { ICON_URL, REPO_URL } from "../lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-bg">
      <div className="wrap footer-grid grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-7 md:gap-10 py-10 md:py-16 md:pb-8">
        <div>
          <div className="brand flex items-center gap-2.5">
            <img src={ICON_URL} alt="libremusic" className="border border-line rounded-[7px] w-7 h-7" />
            <span className="brand-name font-semibold tracking-[-0.01em]">libremusic</span>
          </div>
          <p className="text-ink-faint text-[14px] mt-4 max-w-[32ch] m-0">
            Music streaming for everyone.
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-col-title font-geist-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-4 m-0">
            Project
          </p>
          <ul className="flex flex-col gap-2.5 text-[14px] m-0 p-0 list-none">
            <li>
              <a href={REPO_URL} target="_blank" rel="noopener" className="text-ink-dim hover:text-ink">
                Repository
              </a>
            </li>
            <li>
              <a href={`${REPO_URL}/releases`} target="_blank" rel="noopener" className="text-ink-dim hover:text-ink">
                Releases
              </a>
            </li>
            <li>
              <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener" className="text-ink-dim hover:text-ink">
                Issues
              </a>
            </li>
            <li>
              <a
                href={`${REPO_URL}/blob/master/LICENSE`}
                target="_blank"
                rel="noopener"
                className="text-ink-dim hover:text-ink"
              >
                License (GPL-3.0)
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title font-geist-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-4 m-0">
            Disclaimer
          </p>
          <p className="text-ink-faint text-[13px] leading-[1.6] m-0">
            <strong>libremusic</strong> is not affiliated with, funded,
            authorized, endorsed by, or associated with YouTube, Google LLC, or
            any of its affiliates and subsidiaries.
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom flex flex-wrap items-center justify-between gap-2 border-t border-line-soft py-5 font-geist-mono text-[11px] text-ink-faint">
        <p>© {new Date().getFullYear()} libremusic · GPL-3.0</p>
        <p>- LZHC</p>
      </div>
    </footer>
  );
}