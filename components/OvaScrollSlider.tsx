"use client";

/**
 * Full-viewport pinned slider. Right-side tick ruler charges top-to-bottom
 * like a battery, in lockstep with scroll. Each fifth of the charge is one
 * slide — image, title, and number light up on the same progress.
 */

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";
import { media } from "@/lib/media";
import GlitchText from "@/components/GlitchText";

export interface SlideItem {
  title: string;
  image: string;
}

const defaultSlides: SlideItem[] = [
  {
    title: "A construction company,\noffering integrated\nsolution",
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

const TICK_COUNT = 44;
const TICK_H_PX = 4;
const DIM_OPACITY = 0.22;

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
  const tickTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const imagesEl = sliderImagesRef.current;
      const titleEl = sliderTitleRef.current;
      const rulerEl = rulerRef.current;
      const trackEl = tickTrackRef.current;
      if (!sliderRef.current || !imagesEl || !titleEl || !rulerEl || !trackEl) {
        return;
      }

      const n = slides.length;
      let activeSlide = 0;
      let currentSplit: SplitText | null = null;

      slides.forEach((slide) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = slide.image;
      });

      const ticks = trackEl.querySelectorAll<HTMLElement>("[data-tick]");
      const labels = rulerEl.querySelectorAll<HTMLElement>("[data-label]");

      const applyProgress = (progress: number) => {
        const lit = 1 + Math.round(progress * (TICK_COUNT - 1));

        ticks.forEach((tick, i) => {
          tick.style.opacity = i < lit ? "1" : String(DIM_OPACITY);
        });

        const index = Math.min(Math.floor(progress * n), n - 1);

        labels.forEach((label, i) => {
          label.style.opacity = i <= index ? "1" : "0.28";
        });

        return index;
      };

      const animateNewTitle = (index: number) => {
        currentSplit?.revert();
        titleEl.textContent = "";

        const h2 = document.createElement("h2");
        h2.className =
          "font-pp-neue-montreal whitespace-pre-line text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] font-normal tracking-[-0.02em]";
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
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const animateNewSlide = (index: number) => {
        gsap.killTweensOf(imagesEl.querySelectorAll("img"));

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
        for (let i = 0; i < all.length - 2; i++) {
          imagesEl.removeChild(all[i]);
        }

        animateNewTitle(index);
      };

      applyProgress(0);
      animateNewTitle(0);

      const trigger = ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * n}px`,
        scrub: 0.25,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          applyProgress(self.progress);
        },
        onUpdate: (self) => {
          const next = applyProgress(self.progress);
          if (next !== activeSlide) {
            activeSlide = next;
            animateNewSlide(next);
          }
        },
      });

      return () => {
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
          className="pointer-events-none absolute inset-0 bg-black/40"
          aria-hidden
        />
      </div>

      <div className="absolute top-20 left-4 z-10 flex items-center gap-3 md:top-24 md:left-8 lg:left-10">
        <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
        <p className="font-pp-neue-montreal-mono text-xs text-white md:text-sm">
          <GlitchText appear>OUR WORK</GlitchText>
        </p>
      </div>

      <div
        ref={sliderTitleRef}
        className="font-pp-neue-montreal absolute top-1/2 left-4 z-10 max-w-[min(52rem,72vw)] -translate-y-1/2 text-white md:left-8 lg:left-10"
        aria-live="polite"
      />

      <div
        ref={rulerRef}
        className="absolute top-1/2 right-4 z-10 flex -translate-y-1/2 items-stretch gap-2.5 md:right-8 md:gap-3"
        aria-hidden
      >
        <div className="relative w-8 md:w-9">
          {slides.map((_, index) => (
            <p
              key={index}
              data-label
              className="font-pp-neue-montreal-mono absolute right-0 flex items-center gap-1.5 text-[11px] leading-none text-white md:text-xs"
              style={{
                top: `${((index + 0.5) / slides.length) * 100}%`,
                transform: "translateY(-50%)",
                opacity: index === 0 ? 1 : 0.28,
              }}
            >
              {String(index + 1).padStart(2, "0")}
              <span className="h-px w-2.5 bg-current" />
            </p>
          ))}
        </div>

        <div
          ref={tickTrackRef}
          className="flex w-7 flex-col gap-[3px] md:w-8"
        >
          {Array.from({ length: TICK_COUNT }).map((_, i) => (
            <span
              key={i}
              data-tick
              className="block w-full shrink-0 bg-white"
              style={{
                height: TICK_H_PX,
                opacity: i === 0 ? 1 : DIM_OPACITY,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
