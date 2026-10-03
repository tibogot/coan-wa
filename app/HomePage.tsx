"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/media";
import MediaImage from "@/components/MediaImage";
import AnimatedText from "@/components/AnimatedText3";
import ServicesHero from "@/components/ServicesHero";
import VisionSection from "@/components/VisionSection";
import GradientTextSection from "@/components/GradientTextSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProfilesTicker from "@/components/ProfilesTicker";
import FAQ from "@/components/FAQ";
import ProjectsPreview from "@/components/ProjectsPreview";

export default function HomePage() {
  const statsRowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!statsRowRef.current) return;

      const els = Array.from(
        statsRowRef.current.querySelectorAll<HTMLElement>("[data-count]"),
      );

      els.forEach((el) => {
        const endValue = Number(el.dataset.count ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const state = { value: 0 };

        el.textContent = `0${suffix}`;

        gsap.to(state, {
          value: endValue,
          ease: "none",
          scrollTrigger: {
            trigger: statsRowRef.current!,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });
    },
    { scope: statsRowRef },
  );

  return (
    <>
      <section className="bg-tertiary relative min-h-svh w-full overflow-hidden">
        <MediaImage
          src={media.vitalis}
          alt="COAN West Africa construction site"
          fill
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between p-6 md:p-10">
          <div className="flex flex-col items-start">
            <Image
              src="/images/newlogohero.svg"
              alt="COANWA"
              width={850}
              height={260}
              priority
              className="h-auto w-[min(60vw,520px)]"
            />
            <AnimatedText isHero={true} delay={0.8} duration={0.8}>
              <p className="font-pp-neue-montreal mt-2 text-sm text-white md:text-base">
                Construction West Africa Unlimited
              </p>
            </AnimatedText>
          </div>
          <div className="bg-secondary flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
            <ArrowDownRight className="h-4 w-4 text-white md:h-5 md:w-5" />
          </div>
        </div>
      </section>

      <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
            <AnimatedText>
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                WHO WE ARE
              </p>
            </AnimatedText>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="w-full text-left md:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-secondary mb-4 text-left text-base md:text-xl">
                  Three decades of expertise in construction and engineering
                  across West Africa. We deliver integrated solutions from
                  planning to execution, transforming infrastructure and shaping
                  the future of the region through quality, innovation, and
                  reliability in every project we undertake. Our commitment to
                  excellence drives us to push boundaries, embrace cutting-edge
                  technologies, and maintain the highest standards in safety and
                  sustainability. With a proven track record spanning major
                  highways, urban road networks, and critical infrastructure
                  projects, we have built lasting partnerships with communities,
                  governments, and private sector clients.
                </p>
              </AnimatedText>
              <Link
                href="/company"
                className="bg-secondary hover:bg-secondary/90 inline-flex w-fit cursor-pointer items-center gap-2 rounded-[1px] px-4 py-2 text-sm text-white transition-all duration-200 md:px-5 md:py-2.5 md:text-base"
              >
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div
          ref={statsRowRef}
          className="mt-auto flex w-full flex-col gap-8 pt-20 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 md:pt-28 md:pb-14"
        >
          <div className="text-left">
            <div
              data-count="89"
              data-suffix="%"
              className="font-pp-neue-montreal-mono text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              89%
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              client satisfaction
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="34"
              data-suffix="+"
              className="font-pp-neue-montreal-mono text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              34+
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              delivering excellence
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="48"
              data-suffix="+"
              className="font-pp-neue-montreal-mono text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              48+
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              completed successfully
            </div>
          </div>
        </div>
      </section>

      <ServicesHero />

      <VisionSection />

      <GradientTextSection
        textColor="rgba(255, 51, 0, 0.3)"
        highlightColor="#ff3300"
        pin={false}
        animationStart="center bottom"
        animationEnd="center 30%"
        className="py-32 md:py-80"
        contentClassName="mx-auto w-full max-w-4xl px-4 md:px-8"
      >
        <h4 className="font-pp-neue-montreal text-4xl leading-tight md:text-6xl">
          Leading road construction and civil engineering solutions across
          Nigeria and West Africa.
        </h4>
      </GradientTextSection>

      <WhyChooseUs />

      <section className="bg-primary relative w-full py-24">
        <div className="mb-16 px-4 md:mb-24 md:px-8">
          <div className="flex flex-col items-start">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <AnimatedText>
                <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                  TEAM
                </p>
              </AnimatedText>
            </div>
            <div className="text-left">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-secondary mb-8 max-w-2xl text-left text-4xl md:text-6xl">
                  Our People
                </p>
              </AnimatedText>
            </div>
            <div className="text-left">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-secondary/80 max-w-2xl text-left text-base sm:text-lg md:text-xl">
                  Meet the dedicated professionals driving excellence across all
                  our construction and engineering projects.
                </p>
              </AnimatedText>
            </div>
          </div>
        </div>
        <ProfilesTicker />
      </section>

      <FAQ />

      <ProjectsPreview />

      <section className="bg-tertiary relative flex min-h-svh w-full items-end justify-start">
        <MediaImage
          src={media.vitalis}
          alt="Infrastructure across West Africa"
          fill
          sizes="100vw"
          quality={75}
        />
        <div className="relative z-10 p-4 md:p-8 md:pb-12">
          <p className="font-pp-neue-montreal max-w-5xl text-left text-2xl text-white md:text-6xl">
            Transforming landscapes and shaping futures through innovative
            construction solutions.
          </p>
        </div>
      </section>
    </>
  );
}
