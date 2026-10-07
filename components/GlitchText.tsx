"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*^?#";

type GlitchTextProps = {
  /** Plain text to render and glitch. */
  children: string;
  className?: string;
  /**
   * Element that triggers the effect on hover/focus.
   * Defaults to the closest `a`, `button` or `[data-glitch-trigger]` ancestor,
   * falling back to the text itself.
   */
  triggerSelector?: string;
  /** Seconds each character keeps scrambling before it locks back in. */
  duration?: number;
  /** Seconds between each character starting to scramble. */
  stagger?: number;
  /**
   * Scramble the text in when it scrolls into view (text stays hidden until
   * then). Replays when it re-enters from either side. Hover only applies if
   * the text sits inside a link/button.
   */
  appear?: boolean;
  /** ScrollTrigger start for `appear`. */
  appearStart?: string;
  /** Seconds to wait before an `appear` scramble starts. */
  delay?: number;
  /** Play the scramble once as soon as the component mounts (e.g. on refresh). */
  onLoad?: boolean;
};

/**
 * GSAP SplitText glitch: each character flickers through random glyphs (with a
 * tiny horizontal jitter), then locks back to the real letter, left to right.
 * Plays on hover of the parent link/button, and/or when scrolled into view
 * with `appear`.
 */
export default function GlitchText({
  children,
  className = "",
  triggerSelector = "a, button, [data-glitch-trigger]",
  duration = 0.4,
  stagger = 0.035,
  appear = false,
  appearStart = "top 85%",
  delay = 0,
  onLoad = false,
}: GlitchTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(el, {
        type: "chars",
        tag: "span",
        aria: "auto",
      });
      const chars = split.chars as HTMLElement[];
      const originals = chars.map((c) => c.textContent ?? "");
      gsap.set(chars, { display: "inline-block" });

      const linked = el.closest(triggerSelector) as HTMLElement | null;
      const trigger = linked ?? el;
      let tweens: gsap.core.Tween[] = [];

      const restore = (visible: boolean) => {
        tweens.forEach((t) => t.kill());
        tweens = [];
        chars.forEach((c, i) => {
          c.textContent = originals[i];
        });
        gsap.set(chars, { x: 0, opacity: visible ? 1 : 0 });
      };

      const play = (startHidden = false, extraDelay = 0) => {
        restore(!startHidden);

        chars.forEach((char, i) => {
          if (!originals[i].trim()) return;

          const state = { p: 0 };
          let lastStep = -1;
          const steps = 7;

          tweens.push(
            gsap.to(state, {
              p: 1,
              duration,
              delay: extraDelay + i * stagger,
              ease: "none",
              onUpdate: () => {
                const step = Math.floor(state.p * steps);
                if (step === lastStep) return;
                lastStep = step;
                char.textContent =
                  GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                gsap.set(char, {
                  x: gsap.utils.random(-1.5, 1.5),
                  opacity: gsap.utils.random(0.55, 1),
                });
              },
              onComplete: () => {
                char.textContent = originals[i];
                gsap.set(char, { x: 0, opacity: 1 });
              },
            }),
          );
        });
      };

      const onHover = () => play(false);

      if (!appear || linked) {
        trigger.addEventListener("mouseenter", onHover);
        trigger.addEventListener("focus", onHover);
      }

      if (onLoad) play(false, delay);

      let st: ScrollTrigger | undefined;
      if (appear) {
        // Hidden until the trigger fires, then scrambles in.
        restore(false);
        st = ScrollTrigger.create({
          trigger: el,
          start: appearStart,
          onEnter: () => play(true, delay),
          onEnterBack: () => play(true, delay),
          onLeaveBack: () => restore(false),
        });
      }

      return () => {
        trigger.removeEventListener("mouseenter", onHover);
        trigger.removeEventListener("focus", onHover);
        st?.kill();
        tweens.forEach((t) => t.kill());
        split.revert();
      };
    },
    {
      scope: textRef,
      dependencies: [
        children,
        duration,
        stagger,
        triggerSelector,
        appear,
        appearStart,
        delay,
        onLoad,
      ],
    },
  );

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
