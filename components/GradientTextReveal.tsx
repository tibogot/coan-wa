"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

interface GradientTextRevealProps {
  children: ReactNode;
  textColor?: string; // Grey color for initial state (default: #808080)
  highlightColor?: string; // Final color for reveal (default: #000000)
  scrollDistance?: string; // ScrollTrigger end (default: "+=200%")
  stagger?: number; // Stagger between lines (default: 0.8)
  className?: string;
  trigger?: string | HTMLElement; // Custom trigger element (selector is resolved from the closest ancestor first)
  start?: string; // ScrollTrigger start (default: "top top")
}

export default function GradientTextReveal({
  children,
  textColor = "#808080", // Grey color for initial state
  highlightColor = "#000000", // Black color for final state
  scrollDistance = "+=200%",
  stagger = 0.8,
  className = "",
  trigger,
  start = "top top",
}: GradientTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Resolve the trigger relative to this instance so several reveals on the
      // same page never grab each other's element.
      const resolveTrigger = (): Element => {
        if (!trigger) return container;
        if (typeof trigger !== "string") return trigger;
        return (
          container.closest(trigger) ??
          document.querySelector(trigger) ??
          container
        );
      };

      const headings = container.querySelectorAll<HTMLElement>(
        "h1, h2, h3, h4, h5, h6",
      );
      const targets =
        headings.length > 0 ? Array.from(headings) : [container];

      // autoSplit re-splits when fonts finish loading and when the container
      // width changes, then calls onSplit again. The returned timeline is
      // reverted/rebuilt automatically, so line breaks and scroll positions are
      // always measured against the final layout.
      const split = SplitText.create(targets, {
        type: "lines",
        linesClass: "gradient-text-line++",
        autoSplit: true,
        onSplit(self) {
          const lines = self.lines.filter(
            (line): line is HTMLElement =>
              line instanceof HTMLElement && !!line.textContent?.trim(),
          );
          if (lines.length === 0) return undefined;

          // Text starts grey and sweeps to the highlight color (left to right).
          // Gradient: highlight (right half) | grey (left half); position 0%
          // shows grey, -100% shows highlight.
          lines.forEach((line) => {
            Object.assign(line.style, {
              background: `linear-gradient(to left, ${highlightColor} 50%, ${textColor} 50%)`,
              backgroundSize: "200% 100%",
              backgroundPosition: reduceMotion ? "-100% 0%" : "0% 0%",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              display: "inline-block",
              whiteSpace: "pre-wrap",
            });
          });

          if (reduceMotion) return undefined;

          return gsap
            .timeline({
              scrollTrigger: {
                trigger: resolveTrigger(),
                start,
                end: scrollDistance,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to(lines, {
              backgroundPosition: "-100% 0%",
              duration: 1,
              stagger,
              ease: "none",
            });
        },
      });

      return () => split.revert();
    },
    {
      scope: containerRef,
      dependencies: [
        textColor,
        highlightColor,
        scrollDistance,
        stagger,
        trigger,
        start,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
