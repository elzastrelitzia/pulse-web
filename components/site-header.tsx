import { ICON_URL, REPO_URL } from "../lib/site";
import { NavVersion } from "./releases";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-[12px] bg-bg/82 border-b border-line-soft">
      <div className="wrap flex h-14 md:h-16 items-center justify-between gap-3">
        <a href="#" className="brand flex items-center gap-2.5" data-testid="brand-link">
          <img src={ICON_URL} alt="libremusic logo" className="border border-line rounded-[7px] w-7 h-7" />
          <span className="brand-name font-semibold tracking-[-0.01em]">libremusic</span>
          <NavVersion />
        </a>

        <nav className="site-nav hidden md:flex items-center gap-7 text-ink-dim text-sm">
          <a href="#features" data-testid="nav-features" className="hover:text-ink">
            Features
          </a>
          <a href="#screenshots" data-testid="nav-screenshots" className="hover:text-ink">
            Screenshots
          </a>
          <a href="#releases" data-testid="nav-releases" className="hover:text-ink">
            Releases
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            data-testid="nav-github"
            className="hover:text-ink"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}