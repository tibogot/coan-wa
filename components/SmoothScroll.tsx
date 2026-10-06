"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { type ReactNode, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

function LenisScrollTriggerSync() {
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    ScrollTrigger.refresh();

    // ScrollTrigger only measures positions when refreshed. Anything that
    // changes page height afterwards (font swap, SplitText re-wrapping, images,
    // FAQ accordions opening) leaves triggers below it at stale positions, which
    // is what makes scroll animations start too early or too late. Watch the
    // document height and refresh (debounced) when it really changes.
    let lastHeight = document.documentElement.scrollHeight;
    let timer: number | undefined;

    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const height = document.documentElement.scrollHeight;
        if (Math.abs(height - lastHeight) < 2) return;
        ScrollTrigger.refresh();
        lastHeight = document.documentElement.scrollHeight;
      }, 150);
    });
    observer.observe(document.body);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: prefersReducedMotion ? 0 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: false,
        smoothWheel: true,
        autoRaf: true,
        anchors: true,
        lerp: 0.1,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
