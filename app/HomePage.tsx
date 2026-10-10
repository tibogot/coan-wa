"use client";

import Image from "next/image";
import Link from "next/link";
// import { useRef } from "react";
// import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/media";
import MediaImage from "@/components/MediaImage";
import BlockScrollReveal from "@/components/BlockScrollReveal";
import AnimatedText from "@/components/AnimatedText3";
import CtaLink from "@/components/CtaLink";
import GlitchText from "@/components/GlitchText";
// import ServicesHero from "@/components/ServicesHero";
import VisionSection from "@/components/VisionSection";
import GradientTextSection from "@/components/GradientTextSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesOverview from "@/components/ServicesOverview";
// import ProfilesTicker from "@/components/ProfilesTicker";
import FAQ from "@/components/FAQ";
import ProjectsPreview from "@/components/ProjectsPreview";
import OvaScrollSlider from "@/components/OvaScrollSlider";
import FootprintMap from "@/components/FootprintMap";

export default function HomePage() {
  // const statsRowRef = useRef<HTMLDivElement | null>(null);

  // useGSAP(
  //   () => {
  //     if (!statsRowRef.current) return;

  //     const els = Array.from(
  //       statsRowRef.current.querySelectorAll<HTMLElement>("[data-count]"),
  //     );

  //     els.forEach((el) => {
  //       const endValue = Number(el.dataset.count ?? "0");
  //       const suffix = el.dataset.suffix ?? "";
  //       const state = { value: 0 };

  //       el.textContent = `0${suffix}`;

  //       gsap.to(state, {
  //         value: endValue,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: statsRowRef.current!,
  //           start: "top 85%",
  //           end: "top 45%",
  //           scrub: true,
  //         },
  //         onUpdate: () => {
  //           el.textContent = `${Math.round(state.value)}${suffix}`;
  //         },
  //       });
  //     });
  //   },
  //   { scope: statsRowRef },
  // );

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
          // Image is ~2.06:1 and covers a full-height hero, so on tall/narrow
          // screens the rendered width is driven by viewport height, not width.
          sizes="max(100vw, 206vh)"
          quality={75}
        />
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between px-4 py-3 md:px-8 md:py-6">
          <div className="flex flex-col items-start">
            <Image
              src="/images/newlogohero.svg"
              alt="COANWA"
              width={850}
              height={260}
              priority
              loading="eager"
              fetchPriority="high"
              className="h-auto w-[min(60vw,520px)]"
            />
            <AnimatedText
              isHero
              delay={0.8}
              duration={0.8}
              className="mt-2 w-full"
            >
              <p className="font-pp-neue-montreal text-primary text-sm md:text-base">
                Construction company, Abuja, Nigeria
              </p>
            </AnimatedText>
          </div>
          {/* <div className="bg-secondary flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
            <ArrowDownRight className="text-foreground h-4 w-4 md:h-5 md:w-5" />
          </div> */}
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
        {/* Numbers / stats row
        <div
          ref={statsRowRef}
          className="mt-auto flex w-full flex-col gap-8 pt-20 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 md:pt-28 md:pb-14"
        >
          <div className="text-left">
            <div
              data-count="89"
              data-suffix="%"
              className="font-pp-neue-montreal-mono text-foreground text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              89%
            </div>
            <div className="font-pp-neue-montreal text-foreground mt-2 text-sm md:text-base">
              client satisfaction
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="34"
              data-suffix="+"
              className="font-pp-neue-montreal-mono text-foreground text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              34+
            </div>
            <div className="font-pp-neue-montreal text-foreground mt-2 text-sm md:text-base">
              delivering excellence
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="48"
              data-suffix="+"
              className="font-pp-neue-montreal-mono text-foreground text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              48+
            </div>
            <div className="font-pp-neue-montreal text-foreground mt-2 text-sm md:text-base">
              completed successfully
            </div>
          </div>
        </div>
        */}
      </section>

      <section className="relative h-[120vh] w-full overflow-hidden">
        <MediaImage
          src={media.transitionImage}
          alt="Highway works in Nigeria"
          fill
          parallax
          sizes="100vw"
          quality={75}
        />
        <BlockScrollReveal topColor="#000000" bottomColor="#f0f0f0" />
      </section>

      <section className="bg-primary relative flex min-h-svh w-full flex-col justify-center overflow-hidden px-4 py-24 md:px-8 md:py-36">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
          <p className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm">
            <GlitchText appear>THE WORK</GlitchText>
          </p>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <AnimatedText>
            <h2 className="font-pp-neue-montreal text-foreground max-w-3xl text-left text-4xl md:text-6xl">
              One contractor, from first survey to handover.
            </h2>
          </AnimatedText>
          <CtaLink href="/services" variant="split" tone="orange">
            Explore services
          </CtaLink>
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

      <OvaScrollSlider />

      {/* Pinned services section
      <ServicesHero />
      */}

      <FootprintMap />

      <VisionSection />

      <GradientTextSection
        textColor="rgba(23, 23, 23, 0.3)"
        highlightColor="#ff5f02"
        pin={false}
        animationStart="top 80%"
        animationEnd="bottom 50%"
        className="py-16 md:py-36"
        contentClassName="mx-auto w-full max-w-4xl px-4 md:px-8"
      >
        <h4 className="font-pp-neue-montreal text-4xl leading-tight md:text-6xl">
          Leading road construction and civil engineering solutions across
          Nigeria and West Africa.
        </h4>
      </GradientTextSection>

      <WhyChooseUs />

      <ServicesOverview />

      {/* TEAM section (hidden for now)
      <section className="bg-primary relative w-full py-24">
        <div className="mb-16 px-4 md:mb-24 md:px-8">
          <div className="flex flex-col items-start">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <p className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm">
                <GlitchText appear>TEAM</GlitchText>
              </p>
            </div>
            <div className="text-left">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-foreground mb-8 max-w-2xl text-left text-4xl md:text-6xl">
                  Our People
                </p>
              </AnimatedText>
            </div>
            <div className="text-left">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-foreground/80 max-w-2xl text-left text-base sm:text-lg md:text-xl">
                  Meet the dedicated professionals driving excellence across all
                  our construction and engineering projects.
                </p>
              </AnimatedText>
            </div>
          </div>
        </div>
        <ProfilesTicker />
      </section>
      */}

      <FAQ />

      <ProjectsPreview />

      <section className="bg-tertiary relative flex min-h-svh w-full items-end justify-start overflow-hidden">
        <MediaImage
          src={media.vitalis}
          alt="Infrastructure across West Africa"
          fill
          sizes="100vw"
          quality={75}
        />
        <div className="relative z-10 p-4 md:p-8 md:pb-12">
          <p className="font-pp-neue-montreal max-w-5xl text-left text-2xl text-primary md:text-6xl">
            Transforming landscapes and shaping futures through innovative
            construction solutions.
          </p>
        </div>
      </section>
    </>
  );
}
