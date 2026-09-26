import { REPO_URL } from "../lib/site";
import { HeroDownload } from "./releases";

export default function Hero() {
  return (
    <section className="hero border-b border-line-soft">
      <div className="wrap hero-inner py-20 md:py-30 md:py-25">
        <div>
          <h1 className="font-geist-pixel font-semibold text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.025em] text-[hsl(0,0%,98%)] mb-4 md:mb-5">
            Music streaming
            <br />
            for <em className="opacity-60 not-italic">everyone</em>.
          </h1>
          <p className="lede text-ink-dim max-w-[44ch] text-[17px] leading-[1.6]">
            Lightweight, customizable, No Ads, sync Lyrics, Play almost
            anything.
          </p>

          <div className="cta-row flex flex-wrap gap-3 mt-8" data-testid="hero-cta-group">
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