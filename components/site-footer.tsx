import { ICON_URL, REPO_URL } from "../lib/site";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <div className="brand">
            <img src={ICON_URL} alt="libremusic" />
            <span className="brand-name">libremusic</span>
          </div>
          <p
            style={{
              color: "var(--ink-faint)",
              fontSize: 14,
              marginTop: 16,
              maxWidth: "32ch",
            }}
          >
            Music streaming for everyone.
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Project</p>
          <ul>
            <li>
              <a href={REPO_URL} target="_blank" rel="noopener">
                Repository
              </a>
            </li>
            <li>
              <a href={`${REPO_URL}/releases`} target="_blank" rel="noopener">
                Releases
              </a>
            </li>
            <li>
              <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener">
                Issues
              </a>
            </li>
            <li>
              <a
                href={`${REPO_URL}/blob/master/LICENSE`}
                target="_blank"
                rel="noopener"
              >
                License (GPL-3.0)
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Disclaimer</p>
          <p
            style={{
              color: "var(--ink-faint)",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            <strong>libremusic</strong> is not affiliated with, funded,
            authorized, endorsed by, or associated with YouTube, Google LLC, or
            any of its affiliates and subsidiaries.
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} libremusic · GPL-3.0</p>
        <p>- LZHC</p>
      </div>
    </footer>
  );
}
