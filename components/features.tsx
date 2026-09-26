import { FEATURES } from "../content/site";

export default function Features() {
  return (
    <section id="features">
      <div className="wrap section-pad">
        <details className="features-section">
          <summary className="features-header">
            <h2 className="section-title">Features</h2>
            <span className="feature-chevron">›</span>
          </summary>
          <div className="feature-grid" data-testid="features-grid">
            {FEATURES.map((feature, i) => (
              <div
                className="feature-card"
                data-testid={`feature-card-${i}`}
                key={feature.t}
              >
                <div className="feature-title">{feature.t}</div>
                <p className="feature-desc">{feature.d}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
