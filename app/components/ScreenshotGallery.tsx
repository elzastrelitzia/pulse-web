"use client";

import { useRef, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";

import type { Screenshot } from "../lib/release";

/** Marquee on desktop, snap carousel on mobile, one shared lightbox. A single
 *  dialog holds the selected image rather than one dialog per card, so 18
 *  thumbnails cost one dialog and one piece of state. */
export function ScreenshotGallery({ shots }: { shots: Screenshot[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  const show = (s: Screenshot) => {
    setSrc(s.src);
    ref.current?.showModal();
  };

  return (
    <>
      {/* The list renders twice so the CSS loop has two identical halves to
          wrap between. The second copy is hidden on mobile so the snap
          carousel still only cycles through the real screenshots. */}
      <div className="marquee mt-12 snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] sm:snap-none sm:overflow-hidden [&::-webkit-scrollbar]:hidden">
        {/* 80vw card plus 10vw padding each side equals one viewport, so
            snap-center parks every image dead centre with the next peeking. */}
        <ul className="marquee-track flex w-max items-start gap-5 px-[10vw] sm:px-0">
          {[...shots, ...shots].map((shot, i) => (
            <li
              key={`${shot.src}-${i}`}
              className={`snap-center sm:snap-none ${i >= shots.length ? "hidden sm:block" : ""}`}
            >
              <button
                type="button"
                onClick={() => show(shot)}
                aria-label={`Enlarge libremusic app screen ${(i % shots.length) + 1} of ${shots.length}`}
                className="r-panel block w-[80vw] cursor-zoom-in border border-line bg-canvas p-2 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:w-[232px]"
              >
                {/* Fixed box, so every card is the same height even though the
                    source images differ by 3% in aspect. */}
                <span className="block aspect-[400/860] overflow-hidden rounded-[4px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt=""
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* No position utility here on purpose. The UA gives dialog:modal
          position:fixed, which is what stops the browser scrolling to the
          dialog's spot in the document. Adding `relative` overrides that and
          puts it back in flow. Fixed still anchors the close button, since a
          fixed element is a containing block for absolute children.

          w-fit, not w-auto: the UA also sets inset:0, and width:auto between
          left:0 and right:0 means fill, not shrink-wrap. w-fit hugs the image
          and leaves margin:auto something to distribute, which is what centres
          it. max-w is only a guard against a source image wider than a phone. */}
      <dialog
        ref={ref}
        onClose={() => setSrc(null)}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        className="r-panel m-auto w-fit max-w-[calc(100vw-2.5rem)] border border-line bg-canvas p-3 text-ink backdrop:bg-black/50"
      >

        {src && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt=""
            className="max-h-[90dvh] w-auto rounded-[4px]"
          />
        )}
      </dialog>
    </>
  );
}
