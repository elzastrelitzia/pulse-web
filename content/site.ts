import { REPO_URL } from "../lib/site";

export const FEATURES = [
  { t: "No Ads", d: "Wanna break from the ads?😹" },
  { t: "Translate [BETA]", d: "Translate lyrics into your own language" },
  {
    t: "YouTube Music",
    d: "Play almost any song or video from YouTube Music.",
  },
  { t: "Local playback", d: "Play music stored directly on your device." },
  {
    t: "Background play",
    d: "Keep listening with the screen off, no interruptions.",
  },
  { t: "Offline cache", d: "Cache songs for offline playback anywhere." },
  {
    t: "Universal search",
    d: "Find songs, albums, artists, videos and playlists.",
  },
  { t: "Discover", d: "Find new tracks tailored by mood and genre." },
  { t: "Import playlists", d: "Bring in your existing YouTube playlists." },
  { t: "Synced lyrics", d: "Fetch, display and edit synchronized lyrics." },
  { t: "Cloud sync [broken]", d: "Manage playlists locally or sync to the cloud." },
  { t: "Material You", d: "Highly customizable, dynamic themes." },
  {
    t: "Audio normalize",
    d: "Even loudness for a balanced listening session.",
  },
  {
    t: "Android Auto",
    d: "Listen on the road with full Android Auto support.",
  },
  { t: "Hmmm🤔", d: "Explore yourself" },
];

export const SCREENSHOT_GROUPS = [
  { label: "v26.1", dir: "26.1", shots: ["1.png", "3.png", "2.png"] },
  { label: "v1.2.7", shots: ["4.jpg", "5.jpg", "6.jpg"] },
  { label: "v1.2.6", shots: ["1.png", "2.png", "3.png"] },
];

export function screenshotUrl(
  group: (typeof SCREENSHOT_GROUPS)[number],
  name: string,
) {
  const dir = group.dir ? `${group.dir}/` : "";
  return `${REPO_URL}/raw/main/assets/screenshots/${dir}${name}`;
}
