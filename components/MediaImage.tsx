"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = Omit<ImageProps, "src" | "placeholder" | "alt"> & {
  src: StaticImageData | string;
  alt: string;
  /** Solid color under the image so navigation never shows empty white */
  tone?: "dark" | "light";
  /** Slow Y shift on scroll. Image is scaled so the move never gaps. */
  parallax?: boolean;
};

/**
 * next/image with blur (for static imports) + always-painted underlay.
 * Fades the bitmap in once decoded so you never see a blank hole.
 */
export default function MediaImage({
  src,
  alt,
  className = "",
  tone = "dark",
  parallax = false,
  onLoad,
  ...rest
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const isStatic = typeof src !== "string";

  useGSAP(
    () => {
      if (!parallax) return;
      const wrap = wrapRef.current;
      const img = wrap?.querySelector("img");
      const trigger = wrap?.parentElement;
      if (!wrap || !img || !trigger) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.set(img, { scale: 1.2, transformOrigin: "50% 50%" });
      gsap.fromTo(
        img,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: wrapRef, dependencies: [parallax, src] },
  );

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 overflow-hidden ${
        tone === "dark" ? "bg-tertiary" : "bg-primary"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        className={`object-cover will-change-transform transition-opacity duration-300 ease-out ${
          loaded ? "opacity-100" : isStatic ? "opacity-100" : "opacity-0"
        } ${className}`}
        placeholder={isStatic ? "blur" : "empty"}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        {...rest}
      />
    </div>
  );
}
