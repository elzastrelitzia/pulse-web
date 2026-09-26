import { REPO_URL } from "../lib/site";
import { HeroDownload } from "./releases";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div>
          <h1>
            Music streaming
            <br />
            for <em>everyone</em>.
          </h1>
          <p className="lede">
            Lightweight, customizable, No Ads, sync Lyrics, Play almost
            anything.
          </p>

          <div className="cta-row" data-testid="hero-cta-group">
            <HeroDownload />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
              data-testid="hero-github-btn"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
