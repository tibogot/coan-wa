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
      if (!wrapperRef.current || !fontsReady) return;

      const createSplitTextInstances = () => {
        splitRefs.current.forEach((split) => split.revert());
        splitRefs.current = [];

        const childEls = Array.from(
          wrapperRef.current!.children,
        ) as HTMLElement[];
        if (childEls.length === 0) return;

        childEls.forEach((child, index) => {
          try {
            child.offsetHeight;

            const split = SplitText.create(child, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              aria: "none",
            });

            if (!split?.lines?.length) return;

            splitRefs.current.push(split);
            fixMask({ elements: [child], masks: split.lines });

            gsap.set(split.lines, {
              yPercent: 100,
              autoAlpha: 0,
            });

            if (isHero) {
              gsap.to(split.lines, {
                yPercent: 0,
                autoAlpha: 1,
                stagger,
                duration,
                ease,
                delay: delay + index * 0.1,
              });
            } else {
              gsap.to(split.lines, {
                yPercent: 0,
                autoAlpha: 1,
                stagger,
                duration,
                ease,
                delay,
                scrollTrigger: {
                  trigger: trigger || wrapperRef.current || child,
                  start,
                  toggleActions,
                },
              });
            }
          } catch {
            gsap.set(child, { autoAlpha: 1 });
          }
        });
      };

      const raf = requestAnimationFrame(() => {
        setTimeout(createSplitTextInstances, 100);
      });

      return () => {
        cancelAnimationFrame(raf);
        splitRefs.current.forEach((split) => split.revert());
        splitRefs.current = [];
      };
    },
    {
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
    },
  );

  return (
    <div
      ref={wrapperRef}
      className={`animated-text-wrapper overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedText;
