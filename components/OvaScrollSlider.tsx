"use client";

/**
 * OvaScrollSlider — 100svh scroll-pinned slider: headline center-left, dense tick
 * ruler on the right (Figma layout). Ticks charge top-to-bottom with scroll progress.
 */

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";
import { media } from "@/lib/media";

export interface SlideItem {
  title: string;
  image: string;
}

const defaultSlides: SlideItem[] = [
  {
    title:
      "A construction company,\noffering integrated\nsolution",
    image: media.vitalis.src,
  },
  {
    title:
      "Highways and urban roads built to connect communities and carry West Africa's growth.",
    image: media.project1.src,
  },
  {
    title:
      "From Yaba-Kpache Road to Abuja's new districts, infrastructure delivered on schedule and to standard.",
    image: media.joshua.src,
  },
  {
    title:
      "Engineering infrastructure for fifty plots at Asokoro Extension, from first survey to handover.",
    image: media.project2.src,
  },
  {
    title:
      "Three decades of expertise shaping the roads and systems that move West Africa.",
    image: media.project3.src,
  },
];

/** Horizontal ticks — packed with gap-[2px] in the column (not justify-between). */
const RULER_TICK_COUNT = 96;

interface OvaScrollSliderProps {
  slides?: SlideItem[];
}

export default function OvaScrollSlider({
  slides = defaultSlides,
}: OvaScrollSliderProps) {
  const sliderRef = useRef<HTMLElement>(null);
  const sliderImagesRef = useRef<HTMLDivElement>(null);
  const sliderTitleRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const imagesEl = sliderImagesRef.current;
      const titleEl = sliderTitleRef.current;
      const rulerEl = rulerRef.current;
      if (!sliderRef.current || !imagesEl || !titleEl || !rulerEl) return;

      let activeSlide = 0;
      let currentSplit: SplitText | null = null;

      slides.forEach((slide) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = slide.image;
      });

      const ticks = rulerEl.querySelectorAll<HTMLElement>("[data-tick]");
      const labels = rulerEl.querySelectorAll<HTMLElement>("[data-label]");
      const total = ticks.length;
      const MIN_OPACITY = 0.18;
      const charge = { value: 0 };

      const renderRuler = () => {
        const filled = charge.value * total;

        ticks.forEach((tick, i) => {
          const amount = Math.min(Math.max(filled - i, 0), 1);
          tick.style.opacity = String(MIN_OPACITY + (1 - MIN_OPACITY) * amount);
        });

        labels.forEach((label, i) => {
          const midpoint = ((i + 0.5) / slides.length) * total;
          const segment = total / slides.length;
          const reach = Math.min(
            Math.max((filled - midpoint + segment / 2) / segment, 0),
            1,
          );
          const opacity = 0.32 + 0.68 * reach;
          label.style.opacity = String(opacity);
          const dash = label.querySelector<HTMLElement>("[data-dash]");
          if (dash) dash.style.opacity = String(opacity);
        });
      };

      const animateNewTitle = (index: number) => {
        currentSplit?.revert();
        titleEl.textContent = "";

        const h2 = document.createElement("h2");
        h2.className =
          "font-pp-neue-montreal whitespace-pre-line text-[clamp(2.25rem,5.2vw,4.25rem)] leading-[1.06] font-normal tracking-[-0.02em]";
        h2.textContent = slides[index].title;
        titleEl.appendChild(h2);

        currentSplit = SplitText.create(h2, {
          type: "lines",
          linesClass: "ova-slider-line",
          mask: "lines",
        });

        gsap.set(currentSplit.lines, { yPercent: 100, opacity: 0 });
        gsap.to(currentSplit.lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });
      };

      const animateNewSlide = (index: number) => {
        const img = document.createElement("img");
        img.src = slides[index].image;
        img.alt = "";
        img.className =
          "absolute h-full w-full origin-center object-cover will-change-[transform,opacity]";

        gsap.set(img, { opacity: 0, scale: 1.06 });
        imagesEl.appendChild(img);

        gsap.to(img, { opacity: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" });

        const all = imagesEl.querySelectorAll("img");
        for (let i = 0; i < all.length - 3; i++) {
          imagesEl.removeChild(all[i]);
        }

        animateNewTitle(index);
      };

      renderRuler();
      animateNewTitle(0);

      const trigger = ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * slides.length}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(charge, {
            value: self.progress,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
            onUpdate: renderRuler,
          });

          const next = Math.min(
            Math.floor(self.progress * slides.length + 0.5),
            slides.length - 1,
          );
          if (next !== activeSlide) {
            activeSlide = next;
            animateNewSlide(next);
          }
        },
      });

      return () => {
        gsap.killTweensOf(charge);
        trigger.kill();
        currentSplit?.revert();
      };
    },
    { scope: sliderRef, dependencies: [slides] },
  );

  return (
    <section
      ref={sliderRef}
      className="relative h-svh min-h-svh w-full overflow-hidden"
    >
      <div className="absolute inset-0 h-full w-full">
        <div ref={sliderImagesRef} className="absolute inset-0 h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[0]?.image ?? ""}
            alt=""
            className="absolute h-full w-full origin-center object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent"
          aria-hidden
        />
      </div>

      {/* Headline — vertical center, left (Figma) */}
      <div
        ref={sliderTitleRef}
        className="font-pp-neue-montreal absolute top-1/2 left-4 z-10 max-w-[min(36rem,88vw)] -translate-y-1/2 text-white md:left-8 lg:left-10"
        aria-live="polite"
      />

      {/* Dense horizontal tick ruler + 01–05 labels */}
      <div
        ref={rulerRef}
        className="absolute top-1/2 right-4 z-10 flex h-[min(62svh,640px)] min-h-[280px] -translate-y-1/2 items-stretch gap-2 md:right-8 md:gap-3"
        aria-hidden
      >
        <div className="relative h-full min-w-[2.5rem] md:min-w-[2.75rem]">
          {slides.map((_, index) => (
            <p
              key={index}
              data-label
              className="font-pp-neue-montreal-mono absolute right-0 flex items-center gap-2 text-[11px] leading-none text-white md:text-xs"
              style={{
                top: `${((index + 0.5) / slides.length) * 100}%`,
                transform: "translateY(-50%)",
                opacity: 0.32,
              }}
            >
              {String(index + 1).padStart(2, "0")}
              <span
                data-dash
                className="h-px w-2.5 bg-white md:w-3"
                style={{ opacity: 0.32 }}
              />
            </p>
          ))}
        </div>
        <div className="flex h-full flex-col gap-[2px] overflow-hidden">
          {Array.from({ length: RULER_TICK_COUNT }).map((_, i) => (
            <span
              key={i}
              data-tick
              className="block h-px w-11 shrink-0 bg-white md:w-14"
              style={{ opacity: 0.18 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
