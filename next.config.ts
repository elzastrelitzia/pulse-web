import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves files, not a Node server, so the app has to be a static
  // export. This also means the revalidate windows in app/lib/release.ts are
  // ignored: release data and screenshots freeze at build time.
  output: "export",

  // The repo slug. Every internal URL is served from /pulse-web/, so Next
  // assets need the prefix. Raw <img> and metadata paths do not get it for
  // free and are written out by hand in app/page.tsx and app/layout.tsx.
  basePath: "/pulse-web",
};

export default nextConfig;
