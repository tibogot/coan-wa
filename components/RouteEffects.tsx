"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll to top on route change and refresh ScrollTrigger.
 * Do NOT kill all triggers - that races with Lenis init and
 * wipes pin/scrub animations. useGSAP cleans up on unmount.
 */
export default function RouteEffects() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(id);
    // lenis is read at navigation time only; identity changes must not re-scroll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lenis]);

  return null;
}
