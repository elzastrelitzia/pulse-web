"use client";

import { useEffect, useRef } from "react";

const COUNT = 24;
const CELL = 18;
const GAP = CELL / 2;

const BLOCKS = [
  "/blocks/block1.png",
  "/blocks/block2.png",
  "/blocks/block3.png",
  "/blocks/block4.png",
  "/blocks/block5.png",
  "/blocks/block6.png",
  "/blocks/block7.png",
  "/blocks/block8.png",
  "/blocks/block9.png",
  "/blocks/block10.png",
  "/blocks/block11.png",
  "/blocks/block12.png",
];

export default function CursorTrail() {
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const last = useRef({ x: 0, y: 0 });
  const next = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (Math.hypot(clientX - last.current.x, clientY - last.current.y) < GAP) {
        return;
      }
      last.current = { x: clientX, y: clientY };

      const slot = slots.current[next.current % COUNT];
      next.current += 1;
      const block = slot?.firstElementChild as HTMLElement | null;
      if (!slot || !block) return;

      const cx = Math.round(clientX / CELL);
      const cy = Math.round(clientY / CELL);
      slot.style.transform = `translate3d(${cx * CELL}px, ${cy * CELL}px, 0)`;

      const img = BLOCKS[(cx + cy) % BLOCKS.length];
      block.style.backgroundImage = `url(${img})`;

      block.getAnimations().forEach((animation) => animation.cancel());
      block.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 0,
            offset: 0,
            easing: "steps(2, end)",
          },
          {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
            offset: 0.08,
            easing: "linear",
          },
          {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
            offset: 0.55,
            easing: "steps(4, end)",
          },
          {
            transform: "translate(-50%, -50%) scale(0.6)",
            opacity: 0,
          },
        ],
        { duration: 900, fill: "forwards" },
      );
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: COUNT }, (_, i) => (
        <div
          className="flair-slot"
          key={i}
          ref={(el) => {
            slots.current[i] = el;
          }}
        >
          <div className="flair" />
        </div>
      ))}
    </div>
  );
}
