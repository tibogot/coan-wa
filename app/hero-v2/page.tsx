"use client";

import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";
import MediaImage from "@/components/MediaImage";
import BlockScrollReveal from "@/components/BlockScrollReveal";
import AnimatedText from "@/components/AnimatedText3";
import CtaLink from "@/components/CtaLink";
import GlitchText from "@/components/GlitchText";

/**
 * Alternate home hero: same image, SVG mark big and centered.
 * Compare at /hero-v2 — original stays on /.
 */
export default function HeroV2Page() {
  return (
    <>
      <section className="bg-tertiary relative min-h-svh w-full overflow-hidden">
        <MediaImage
          src={media.hero}
          alt="COAN West Africa construction site"
          fill
          parallax
          priority
          fetchPriority="high"
          sizes="max(100vw, 206vh)"
          quality={75}
        />
        <BlockScrollReveal bottomColor="#000000" />

        {/* Guide lines — parked for now
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-4 z-20 w-px bg-white/30 md:left-8"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-4 z-20 w-px bg-white/30 md:right-8"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-16 right-0 left-0 z-20 h-px bg-white/30 md:top-[4.25rem]"
        />
        */}

        <div className="pointer-events-none absolute inset-0 z-10 flex justify-center px-4 md:px-8">
          <div className="relative h-full w-[min(72vw,640px)]">
            {/* Logo edge guides — parked for now
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 z-20 w-px bg-white/30"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 z-20 w-px bg-white/30"
            />
            */}

            {/* Logo alone — vertically centered */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
              <div className="relative w-full">
                {/*
                <div
                  aria-hidden
                  className="absolute top-0 left-1/2 z-20 h-px w-screen -translate-x-1/2 bg-white/30"
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-1/2 z-20 h-px w-screen -translate-x-1/2 bg-white/30"
                />
                */}
                <Image
                  src="/images/logo2026.svg"
                  alt="COANWA"
                  width={520}
                  height={120}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="relative z-10 h-auto w-full"
                  style={{ height: "auto" }}
                />
              </div>
            </div>

            {/* Copy under logo — parked for now
            <div className="absolute top-[calc(50%+(min(72vw,640px)*120/520/2)+1rem)] left-0 flex w-full flex-col items-center md:top-[calc(50%+(min(72vw,640px)*120/520/2)+1.25rem)]">
              <div className="relative w-max max-w-full">
                <div
                  aria-hidden
                  className="absolute top-0 left-1/2 z-20 h-px w-screen -translate-x-1/2 bg-white/30"
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-1/2 z-20 h-px w-screen -translate-x-1/2 bg-white/30"
                />
                <p className="font-pp-neue-montreal whitespace-nowrap text-center text-lg leading-none font-semibold text-primary sm:text-xl md:text-2xl md:leading-none lg:text-3xl">
                  Construction Company, Solution & Related Services
                </p>
              </div>
              <div className="relative mt-8 w-full max-w-[16rem] md:mt-10 md:max-w-[18rem]">
                <div
                  aria-hidden
                  className="absolute top-0 left-1/2 z-20 h-px w-screen -translate-x-1/2 bg-white/30"
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-1/2 z-20 h-px w-screen -translate-x-1/2 bg-white/30"
                />
                <p className="font-pp-neue-montreal-mono text-center text-[0.65rem] leading-tight tracking-wide text-primary uppercase md:text-xs md:leading-tight">
                  Civil, electrical and mechanical engineering from first survey
                  to handover — Abuja, Nigeria
                </p>
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      <section className="bg-black relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
            <p className="font-pp-neue-montreal-mono text-primary text-xs md:text-sm">
              <GlitchText appear>WHO WE ARE</GlitchText>
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="w-full text-left md:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-primary text-left text-4xl md:text-6xl">
                  A construction company for complex civil, electrical and
                  mechanical work.
                </h2>
              </AnimatedText>
            </div>
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-primary text-left text-base leading-relaxed md:text-xl md:leading-relaxed">
                  COAN West Africa Limited is based in Abuja. For more than
                  thirty years we have planned, designed, built and maintained
                  works for public and private clients across Nigeria — roads,
                  civil infrastructure, and the electrical and mechanical
                  systems that make a project complete. One contractor, from
                  first survey to handover.
                  <br />
                  <br />
                  Complex jobs need more than a single trade. We sequence
                  civil, electrical and mechanical work on the same site, keep
                  to programme, and finish to spec. After handover we remain
                  available for operation and maintenance, so the asset keeps
                  doing the job it was built for.
                </p>
              </AnimatedText>
              <CtaLink href="/company" variant="split" tone="orange">
                Learn more
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black relative w-full overflow-hidden px-4 md:px-8">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <MediaImage
            src={media.transitionImage}
            alt="Highway works in Nigeria"
            fill
            parallax
            sizes="100vw"
            quality={75}
          />
          <BlockScrollReveal bottomColor="#000000" />
        </div>
      </section>

      <section className="bg-black relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
          <p className="font-pp-neue-montreal-mono text-primary text-xs md:text-sm">
            <GlitchText appear>CAPABILITIES</GlitchText>
          </p>
        </div>
        <AnimatedText>
          <h2 className="font-pp-neue-montreal text-primary mb-10 max-w-3xl text-left text-4xl md:mb-14 md:text-6xl">
            Civil, electrical and mechanical under one roof.
          </h2>
        </AnimatedText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {[
            {
              src: media.sticky1,
              alt: "Civil engineering works",
              title: "Civil",
              text: "Roads, earthworks, drainage and structures — from first survey to finished pavement.",
            },
            {
              src: media.sticky4,
              alt: "Electrical engineering works",
              title: "Electrical",
              text: "Power, lighting and site electrical, designed, installed and handed over as one package.",
            },
            {
              src: media.sticky3,
              alt: "Mechanical engineering works",
              title: "Mechanical",
              text: "Plant, piping and mechanical systems sequenced with the civil works on the same site.",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href="/services"
              aria-label={card.title}
              className="group flex cursor-pointer flex-col no-underline"
            >
              <div className="relative h-[70vh] w-full overflow-hidden">
                <MediaImage
                  src={card.src}
                  alt={card.alt}
                  fill
                  parallax
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={70}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-black px-5 py-6 transition-transform duration-500 ease-out group-hover:translate-y-0 md:px-6 md:py-8">
                  <p className="font-pp-neue-montreal text-primary text-xl md:text-2xl">
                    {card.title}
                  </p>
                  <p className="font-pp-neue-montreal text-primary/80 mt-2 text-sm leading-snug md:text-base">
                    {card.text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
