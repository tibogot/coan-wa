"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "src" | "placeholder" | "alt"> & {
  src: StaticImageData | string;
  alt: string;
  /** Solid color under the image so navigation never shows empty white */
  tone?: "dark" | "light";
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
  onLoad,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const isStatic = typeof src !== "string";

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        tone === "dark" ? "bg-tertiary" : "bg-primary"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        className={`object-cover transition-opacity duration-300 ease-out ${
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
