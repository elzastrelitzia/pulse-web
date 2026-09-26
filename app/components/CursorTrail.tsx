"use client";

import { useEffect, useRef } from "react";

// Music glyphs that spawn under the pointer, pop in, spin, and fall out of the
// viewport. One is spawned each time the pointer has travelled past GAP, cycling
// through the pool, so the effect is driven by distance rather than by time.
//
// Built on the Web Animations API, which is native, so there is no library here.
// GSAP's elastic.out(1, 0.3) and back.in(.4) are approximated with cubic-beziers:
//   elastic.out -> cubic-bezier(0.34, 1.56, 0.64, 1)  overshoots and settles
//   back.in     -> cubic-bezier(0.36, 0, 0.66, -0.56)  accelerates into the fall
//
// ponytail: one rAF loop that only measures distance, one animated element per
// spawn. No chase chain, no per-frame transform writes, no React state. The
// container clips at the viewport, so a glyph that has fallen 120vh is gone
// without any cleanup.
const GLYPHS = [
  "/pulse-web/notes/clef-treble.svg",
  "/pulse-web/notes/music-2.svg",
  "/pulse-web/notes/music-3.svg",
  "/pulse-web/notes/music-4.svg",
  "/pulse-web/notes/music.svg",
  "/pulse-web/notes/audio-waveform.svg",
  "/pulse-web/notes/clef-alto.svg",
  "/pulse-web/notes/clef-bass.svg",
  "/pulse-web/notes/list-music.svg",
];

// Pointer travel between spawns, in pixels.
const GAP = 100;
const SIZE = 22;
const DUR = 1000;

const POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const FALL = "cubic-bezier(0.36, 0, 0.66, -0.56)";

export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Pointer only, and nothing for anyone who asked for reduced motion.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pool = Array.from(root.children) as HTMLElement[];
    const mouse = { x: 0, y: 0 };
    const last = { x: 0, y: 0 };
    let index = 0;
    let raf = 0;

    const spawn = () => {
      const el = pool[index % pool.length];
      index++;

      // Cancel whatever this glyph was doing. Cancelling reverts it to the base
      // opacity-0 style, so the next animation always starts from a clean slate.
      for (const a of el.getAnimations()) a.cancel();

      // left/top place it under the pointer. The static transform centres it on
      // that point, and the animated translate/rotate/scale below compose with
      // it rather than replacing it, so no extra wrapper element is needed.
      el.style.left = `${mouse.x}px`;
      el.style.top = `${mouse.y}px`;

      const spin = Math.random() * 720 - 360;

      el.animate(
        [
          { opacity: 0, scale: 0, offset: 0 },
          { opacity: 1, scale: 1, offset: 0.18 },
          { opacity: 1, scale: 1, offset: 0.7 },
          { opacity: 0, scale: 1, offset: 1 },
        ],
        { duration: DUR, easing: POP, fill: "forwards" },
      );

      el.animate([{ rotate: "0deg" }, { rotate: `${spin}deg` }], {
        duration: DUR,
        easing: "linear",
        fill: "forwards",
      });

      el.animate([{ translate: "0px 0px" }, { translate: "0px 120vh" }], {
        duration: DUR,
        easing: FALL,
        fill: "forwards",
      });
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      if (Math.hypot(last.x - mouse.x, last.y - mouse.y) > GAP) {
        spawn();
        last.x = mouse.x;
        last.y = mouse.y;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      for (const el of pool) for (const a of el.getAnimations()) a.cancel();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden text-ink"
    >
      {GLYPHS.map((src) => (
        // Masked rather than <img>, because currentColor does not cross an
        // <img> boundary: an external SVG resolves it against its own default
        // and would render black-on-black in dark mode. As a mask the file only
        // supplies the shape and bg-current supplies the colour, so the glyph
        // follows the theme token with no dark-mode code of its own.
        <div
          key={src}
          className="absolute top-0 left-0 opacity-0"
          style={{
            width: SIZE,
            height: SIZE,
            transform: "translate(-50%, -50%)",
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            backgroundColor: "currentColor",
          }}
        />
      ))}
    </div>
  );
}
