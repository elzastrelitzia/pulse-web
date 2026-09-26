import { SCREENSHOT_GROUPS, screenshotUrl } from "../content/site";

export default function Screenshots() {
  return (
    <section id="screenshots">
      <div className="wrap section-pad">
        <details className="screenshots-section">
          <summary className="screenshots-header">
            <h2 className="section-title">Screenshots</h2>
            <span className="feature-chevron">›</span>
          </summary>
          {SCREENSHOT_GROUPS.map((group) => (
            <div className="shot-version-group" key={group.label}>
              <p className="shot-version-label">{group.label}</p>
              <div className="shot-row">
                {group.shots.map((name, i) => (
                  <img
                    key={name}
                    src={screenshotUrl(group, name)}
                    alt={`libremusic screenshot ${group.label} ${i + 1}`}
                    loading="lazy"
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
