# libremusic web

Marketing and download site for [libremusic](https://github.com/elzastrelitzia/libremusic), an Android music player for YouTube Music.

The site itself does not host the app. Every download link points at the project's GitHub releases.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Release data and screenshots

Both are read from the GitHub API at build time, never from a local copy:

- `app/lib/release.ts` reads the newest release for version, APK size, and publish date. The download buttons link straight to the release asset, so there is no APK in this repository and no version to keep in sync.
- Screenshots come from `assets/screenshots/{tag}/` in the app repository, served through GitHub's CDN. The version folder is listed first, then the folder root, so the newest release appears on the left and older shots follow on the right.

Both calls run during `next build`. GitHub Pages is a static host, so the data is frozen at build time and a new release appears on the next deploy, which runs on every push to `master`. Add a nightly `schedule` trigger to `deploy.yml` if you want it to refresh without a push. If either API call fails the page still renders: the download buttons fall back to the releases page, and the screenshot section unmounts.

Brand assets in `public/` are copies of files from the app repository. The favicon and Open Graph image come from the Play Store icon.

## Deployment

Static export, served by GitHub Pages at `/pulse-web/`.

- `next.config.ts` sets `output: "export"` and `basePath: "/pulse-web"`.
- `public/.nojekyll` stops Pages from trying to build a Jekyll site.
- `.github/workflows/deploy.yml` builds on every push to `master` and publishes the `out/` directory. Note the branch is `master`, not `main`.
- Set `NEXT_PUBLIC_SITE_URL` if you move to a custom domain, so Open Graph URLs resolve. It defaults to the GitHub Pages origin.

`basePath` rewrites Next assets but not raw `<img>` or metadata paths, so `/pulse-web/logo.svg` and `/pulse-web/icon.png` are spelled out by hand. Change both if the repo slug changes.

## License

libremusic is GPL-3.0. See [LICENSE](https://github.com/elzastrelitzia/libremusic/blob/main/LICENSE) in the app repository.

libremusic is based on [ViTune](https://github.com/bartoostveen/ViTune) and [ViMusic](https://github.com/vfsfitvnm/ViMusic). It is not affiliated with YouTube or Google LLC.
