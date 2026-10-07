"use client";

import { useRef, ReactNode, useState, useEffect } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

function fixMask(
  { elements, masks }: { elements: HTMLElement[]; masks: Element[] },
  baseLineHeight = 1.2,
) {
  const [firstElement] = elements;
  const lineHeightValue = gsap.getProperty(firstElement, "line-height", "em");
  const lineHeight = parseFloat(String(lineHeightValue));
  const lineHeightDifference = lineHeight - baseLineHeight;

  masks.forEach((mask, i) => {
    const isFirstMask = i === 0;
    const isLastMask = i === masks.length - 1;

    gsap.set(mask as HTMLElement, {
      lineHeight: baseLineHeight,
      marginTop: isFirstMask ? `${0.5 * lineHeightDifference}em` : "0",
      marginBottom: isLastMask
        ? `${0.5 * lineHeightDifference}em`
        : `${lineHeightDifference}em`,
    });
  });
}

interface AnimatedTextProps {
  children: ReactNode;
  trigger?: string | HTMLElement;
  start?: string;
  toggleActions?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  isHero?: boolean;
}

function AnimatedText({
  children,
  trigger,
  start = "top 75%",
  toggleActions = "play reverse play reverse",
  stagger = 0.15,
  duration = 0.8,
  delay = 0,
  ease = "power2.out",
  className = "",
  isHero = false,
}: AnimatedTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitText[]>([]);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const checkFontsLoaded = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
          if (active) setTimeout(() => setFontsReady(true), 50);
        } else if (active) {
          setTimeout(() => setFontsReady(true), 100);
        }
      } catch {
        if (active) setTimeout(() => setFontsReady(true), 100);
      }
    };

    checkFontsLoaded();
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(wrapper, { opacity: 1 });
        return;
      }

      if (!fontsReady) return;

      const childEls = Array.from(wrapper.children) as HTMLElement[];
      if (childEls.length === 0) return;

      const splits: SplitText[] = [];

      childEls.forEach((child, index) => {
        try {
          // Create everything synchronously inside the GSAP context (no timers),
          // so tweens and ScrollTriggers are cleaned up on unmount/route change.
          // autoSplit re-runs onSplit when the width changes, which rebuilds the
          // animation against the new line breaks instead of leaving stale lines.
          const split = SplitText.create(child, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            aria: "none",
            onSplit(self) {
              if (!self.lines.length) return undefined;

              fixMask({ elements: [child], masks: self.lines });

              gsap.set(self.lines, {
                yPercent: 100,
                autoAlpha: 0,
              });

              if (isHero) {
                return gsap.to(self.lines, {
                  yPercent: 0,
                  autoAlpha: 1,
                  stagger,
                  duration,
                  ease,
                  delay: delay + index * 0.1,
                });
              }

              return gsap.to(self.lines, {
                yPercent: 0,
                autoAlpha: 1,
                stagger,
                duration,
                ease,
                delay,
                scrollTrigger: {
                  trigger: trigger || wrapper,
                  start,
                  toggleActions,
                },
              });
            },
          });

          splits.push(split);
        } catch {
          gsap.set(child, { autoAlpha: 1 });
        }
      });

      gsap.set(wrapper, { opacity: 1 });

      splitRefs.current = splits;

      return () => {
        splits.forEach((split) => split.revert());
        splitRefs.current = [];
        gsap.set(wrapper, { opacity: 0 });
      };
    },
    {
      scope: wrapperRef,
      dependencies: [
        trigger,
        start,
        toggleActions,
        stagger,
        duration,
        delay,
        ease,
        fontsReady,
        isHero,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={wrapperRef}
      className={`animated-text-wrapper overflow-hidden ${isHero ? "min-h-[1.75rem] md:min-h-[2rem]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedText;
