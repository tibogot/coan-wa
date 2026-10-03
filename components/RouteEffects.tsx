"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll to top on route change and refresh ScrollTrigger.
 * Do NOT kill all triggers here — that races with Lenis init and
 * wipes pin/scrub animations (ServicesHero, AnimatedText, etc.).
 * useGSAP already cleans up per-component on unmount.
 */
export default function RouteEffects() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const instance = lenisRef.current;
    if (instance) {
      instance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Wait a frame so the new page layout exists, then measure
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // When Lenis mounts, refresh measurements once — never kill triggers
  useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lenis]);

  return null;
}
