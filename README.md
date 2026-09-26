# Pulse web

Marketing and download site for [Pulse](https://github.com/elzastrelitzia/libremusic), an Android music player for YouTube Music.

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

Both calls use `revalidate: 3600`. A new release shows up within the hour, with no redeploy. If either API call fails the page still renders: the download buttons fall back to the releases page, and the screenshot section unmounts.

Brand assets in `public/` are copies of files from the app repository. The favicon and Open Graph image come from the Play Store icon.

## Deployment

Deploys as a static site with ISR. Set `NEXT_PUBLIC_SITE_URL` to the production origin so Open Graph URLs resolve.

## License

Pulse is GPL-3.0. See [LICENSE](https://github.com/elzastrelitzia/libremusic/blob/main/LICENSE) in the app repository.

Pulse is based on [ViTune](https://github.com/bartoostveen/ViTune) and [ViMusic](https://github.com/vfsfitvnm/ViMusic). It is not affiliated with YouTube or Google LLC.
