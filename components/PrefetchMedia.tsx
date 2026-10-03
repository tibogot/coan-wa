"use client";

import { useEffect } from "react";
import { routeHeroes } from "@/lib/media";

/**
 * Warm the browser cache with every route hero as soon as the app mounts,
 * so client navigations already have the bitmap ready.
 */
export default function PrefetchMedia() {
  useEffect(() => {
    Object.values(routeHeroes).forEach((image) => {
      const el = new window.Image();
      el.decoding = "async";
      el.src = image.src;
    });
  }, []);

  return null;
}
