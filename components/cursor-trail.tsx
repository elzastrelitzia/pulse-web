"use client";

import { useEffect, useRef } from "react";

const COUNT = 24; // pooled blocks
const GAP = 8; // px of cursor travel between spawns, half a cell, so blocks
// overlap instead of leaving holes on diagonal moves
const CELL = 16; // grid the blocks snap to, matches .flair-slot in globals.css

export default function CursorTrail() {
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const last = useRef({ x: 0, y: 0 });
  const next = useRef(0);

  useEffect(() => {
    // No trail on touch devices, and none when the user asked for less motion.
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

      slot.style.transform = `translate3d(${
        Math.round(clientX / CELL) * CELL
      }px, ${Math.round(clientY / CELL) * CELL}px, 0)`;

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
