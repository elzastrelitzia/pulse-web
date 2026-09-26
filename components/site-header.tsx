import { ICON_URL, REPO_URL } from "../lib/site";
import { NavVersion } from "./releases";

export default function SiteHeader() {
  return (
    <header className="site">
      <div className="wrap">
        <a href="#" className="brand" data-testid="brand-link">
          <img src={ICON_URL} alt="libremusic logo" />
          <span className="brand-name">libremusic</span>
          <NavVersion />
        </a>

        <nav className="site-nav">
          <a href="#features" data-testid="nav-features">
            Features
          </a>
          <a href="#screenshots" data-testid="nav-screenshots">
            Screenshots
          </a>
          <a href="#releases" data-testid="nav-releases">
            Releases
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            data-testid="nav-github"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
