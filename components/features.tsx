import { FEATURES } from "../content/site";

export default function Features() {
  return (
    <section id="features">
      <div className="wrap py-12 md:py-24 lg:py-30">
        <details className="features-section border-none">
          <summary className="features-header flex items-center justify-between cursor-pointer select-none list-none">
            <h2 className="section-title m-0">Features</h2>
            <span className="feature-chevron text-ink-faint text-[18px] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ml-3">›</span>
          </summary>
          <div
            className="feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-[14px] overflow-hidden mt-5"
            data-testid="features-grid"
          >
            {FEATURES.map((feature, i) => (
              <div
                className="feature-card bg-bg-card p-4 md:p-5 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#181818]"
                data-testid={`feature-card-${i}`}
                key={feature.t}
              >
                <div className="feature-title text-ink text-[14px] font-medium">
                  {feature.t}
                </div>
                <p className="feature-desc text-ink-faint mt-1 text-[13px] leading-[1.5] m-0">
                  {feature.d}
                </p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}