"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const ROWS = 4;
const COLS = 16;

type Props = {
  /** Previous section color — starts solid and dissolves away */
  topColor?: string;
  /** Next section color — pixels in as you leave */
  bottomColor?: string;
};

function BlockGrid({ color, side }: { color: string; side: "top" | "bottom" }) {
  return (
    <div
      data-blocks={side}
      className={`absolute inset-x-0 flex h-[min(25rem,42vh)] w-full flex-col ${
        side === "top" ? "top-0" : "bottom-0"
      }`}
    >
      {Array.from({ length: ROWS }, (_, row) => (
        <div key={row} data-blocks-row className="flex h-full w-full">
          {Array.from({ length: COLS }, (_, col) => (
            <div
              key={col}
              data-block
              className="h-full min-w-0 flex-1"
              style={{
                backgroundColor: color,
                opacity: side === "top" ? 1 : 0,
                transition: "opacity 250ms",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Nord Quantique / Codegrid mosaic: a grid of blocks that randomly
 * dissolve the previous color out and the next color in as you scroll
 * through a full-bleed image.
 */
export default function BlockScrollReveal({ topColor, bottomColor }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.querySelectorAll<HTMLElement>("[data-block]").forEach((block) => {
          block.style.opacity = "0";
        });
        return;
      }

      const trigger = root.parentElement ?? root;
      const containers = root.querySelectorAll<HTMLElement>("[data-blocks]");

      containers.forEach((container) => {
        const rows = container.querySelectorAll<HTMLElement>("[data-blocks-row]");
        const numRows = rows.length;
        const isTop = container.dataset.blocks === "top";

        rows.forEach((row, rowIndex) => {
          const blocks = Array.from(
            row.querySelectorAll<HTMLElement>("[data-block]"),
          );
          const order = gsap.utils.shuffle(blocks.map((_, idx) => idx));

          ScrollTrigger.create({
            trigger,
            // Top band dissolves as the image enters; bottom band
            // pixels-in only as the image starts to leave.
            start: isTop ? "top bottom" : "bottom bottom",
            end: isTop ? "top 18%" : "bottom top",
            scrub: true,
            onUpdate: (self) => {
              const rowDelay = 0.25 * (numRows - rowIndex - 1);
              const progress = Math.max(
                0,
                Math.min(1, self.progress - rowDelay),
              );

              blocks.forEach((block, idx) => {
                const offset = order.indexOf(idx) / blocks.length;
                const adjusted = (progress - offset) * blocks.length;
                const clamped = Math.min(1, Math.max(0, adjusted));
                block.style.opacity = String(isTop ? 1 - clamped : clamped);
              });
            },
          });
        });
      });
    },
    { scope: rootRef, dependencies: [topColor, bottomColor] },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden
    >
      {topColor ? <BlockGrid color={topColor} side="top" /> : null}
      {bottomColor ? <BlockGrid color={bottomColor} side="bottom" /> : null}
    </div>
  );
}
