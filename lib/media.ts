import type { StaticImageData } from "next/image";

// Compressed WebP sources (see /public/media) — smaller decode = faster paint
import hero from "@/public/images/hero.webp";
import vitalis from "@/public/media/vitalis-nwenyi.webp";
import joshua from "@/public/media/joshua-oluwagbemiga.webp";
import john from "@/public/media/john-kakuk.webp";
import chuks from "@/public/media/chuks-ugwuh.webp";
import chairman from "@/public/media/Chairman-scaled-tiny.webp";
import sticky1 from "@/public/media/sticky-cards/stickycard-1.webp";
import sticky2 from "@/public/media/sticky-cards/stickycard-2.webp";
import sticky3 from "@/public/media/sticky-cards/stickycard-3.webp";
import sticky4 from "@/public/media/sticky-cards/stickycard-4.webp";
import project1 from "@/public/media/projects-1.webp";
import project2 from "@/public/media/projects-2.webp";
import project3 from "@/public/media/projects-3.webp";
import project4 from "@/public/media/projects-4.webp";
import project5 from "@/public/media/projects-5.webp";
import project6 from "@/public/media/projects-6.webp";

export const media = {
  hero,
  vitalis,
  joshua,
  john,
  chuks,
  chairman,
  sticky1,
  sticky2,
  sticky3,
  sticky4,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
} as const;

/** Hero image used at the top of each primary route — prefetched on app load. */
export const routeHeroes: Record<string, StaticImageData> = {
  "/": media.hero,
  "/company": media.chuks,
  "/services": media.sticky4,
  "/projects": media.sticky3,
  "/gallery": media.sticky1,
  "/contact": media.john,
};

export type LocalImage = StaticImageData;
