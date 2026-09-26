import { SCREENSHOT_GROUPS, screenshotUrl } from "../content/site";

export default function Screenshots() {
  return (
    <section id="screenshots">
      <div className="wrap py-12 md:py-24 lg:py-30">
        <details className="screenshots-section border-none">
          <summary className="screenshots-header flex items-center justify-between cursor-pointer select-none list-none">
            <h2 className="section-title m-0">Screenshots</h2>
            <span className="feature-chevron text-ink-faint text-[18px] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ml-3">›</span>
          </summary>
          {SCREENSHOT_GROUPS.map((group) => (
            <div className="shot-version-group mt-6" key={group.label}>
              <p className="shot-version-label text-ink-faint font-geist-mono text-[12px] mb-3 m-0">
                {group.label}
              </p>
              <div className="shot-row flex gap-3 pb-1 overflow-x-auto scroll-snap-x proximity md:grid md:grid-cols-3 md:gap-3 md:pb-0 md:overflow-hidden md:scroll-snap-none">
                {group.shots.map((name, i) => (
                  <img
                    key={name}
                    src={screenshotUrl(group, name)}
                    alt={`libremusic screenshot ${group.label} ${i + 1}`}
                    loading="lazy"
                    className="rounded-[9px] border border-line w-full max-h-[65vh] flex-shrink-0 basis-[80%] scroll-snap-start transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] md:max-h-none md:flex-none md:basis-auto hover:border-ink-faint hover:scale-[1.02]"
                  />
                ))}
              </div>
            </div>
          ))}
        </details>
      </div>
    </section>
  );
}