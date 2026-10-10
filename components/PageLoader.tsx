"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * First-load cover: black field, white mark. Blocks scroll until it wipes away.
 */
export default function PageLoader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (gone) {
      lenis?.start();
      return;
    }
    lenis?.stop();
  }, [lenis, gone]);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const logo = logoRef.current;
      if (!wrap || !logo) return;

      const finish = () => {
        ScrollTrigger.refresh();
        setGone(true);
      };

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const play = () => {
        const tl = gsap.timeline({ onComplete: finish });

        if (reduced) {
          tl.to(wrap, { autoAlpha: 0, duration: 0.2 });
          return;
        }

        gsap.set(logo, { autoAlpha: 0, y: 12 });
        tl.to(logo, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        })
          .to({}, { duration: 0.65 })
          .to(wrap, {
            yPercent: -100,
            duration: 0.9,
            ease: "power3.inOut",
          });
      };

      const ready = document.fonts?.ready ?? Promise.resolve();
      void ready.then(play);
    },
    { scope: wrapRef },
  );

  if (gone) return null;

  return (
    <div
      ref={wrapRef}
      data-page-loader
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
      aria-hidden
    >
      <div ref={logoRef} className="px-8">
        <Image
          src="/images/logo2026.svg"
          alt="COANWA"
          width={280}
          height={64}
          priority
          className="h-auto w-[min(52vw,280px)]"
          style={{ height: "auto" }}
        />
      </div>
    </div>
  );
}
