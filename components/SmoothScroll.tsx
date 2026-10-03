"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { type ReactNode, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

function LenisScrollTriggerSync() {
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    ScrollTrigger.refresh();
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
