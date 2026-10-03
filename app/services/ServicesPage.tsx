"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/media";
import AnimatedText from "@/components/AnimatedText3";
import GradientTextSection from "@/components/GradientTextSection";
import PageHero from "@/components/PageHero";
import MediaImage from "@/components/MediaImage";

const services = [
  {
    title: "Civil Engineering",
    description:
      "Comprehensive civil engineering solutions including road construction, highway development, bridges, and drainage systems across West Africa.",
    capabilities: [
      "Highway & Road Construction",
      "Bridge Design & Construction",
      "Drainage & Water Management",
      "Site Development & Preparation",
    ],
  },
  {
    title: "Mechanical Services",
    description:
      "Advanced mechanical systems installation and maintenance for industrial and commercial infrastructure projects.",
    capabilities: [
      "HVAC Systems Installation",
      "Industrial Equipment Setup",
      "Mechanical Plant Design",
      "Maintenance & Servicing",
    ],
  },
  {
    title: "Electrical Engineering",
    description:
      "Complete electrical infrastructure solutions from design to installation and maintenance for large-scale projects.",
    capabilities: [
      "Power Distribution Systems",
      "Lighting Design & Installation",
      "Electrical Infrastructure",
      "Emergency Power Systems",
    ],
  },
  {
    title: "Project Management",
    description:
      "End-to-end project management services ensuring timely delivery, quality control, and budget adherence.",
    capabilities: [
      "Planning & Scheduling",
      "Quality Control",
      "Budget Management",
      "Stakeholder Coordination",
    ],
  },
  {
    title: "Consultancy Services",
    description:
      "Expert consultation for infrastructure projects, providing technical expertise and strategic guidance.",
    capabilities: [
      "Feasibility Studies",
      "Technical Advisory",
      "Risk Assessment",
      "Value Engineering",
    ],
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance and support services to ensure the longevity and optimal performance of infrastructure.",
    capabilities: [
      "Preventive Maintenance",
      "Emergency Repairs",
      "Asset Management",
      "Performance Monitoring",
    ],
  },
];

export default function Services() {
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
      <PageHero image={media.sticky4} alt="Services Background">
        <div className="p-4 md:p-8 md:pb-12">
          <AnimatedText isHero={true}>
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
              Comprehensive Construction Solutions
            </h1>
          </AnimatedText>
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
              From civil engineering to mechanical and electrical services, we
              deliver integrated solutions for your infrastructure needs.
            </p>
          </AnimatedText>
        </div>
      </PageHero>

      <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
            <AnimatedText>
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                OUR SERVICES
              </p>
            </AnimatedText>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="w-full text-left md:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                  Integrated construction and engineering services tailored to
                  your project needs.
                </h2>
              </AnimatedText>
            </div>
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-secondary text-left text-base md:text-xl">
                  We provide comprehensive construction solutions across civil,
                  mechanical, and electrical engineering disciplines. Our team
                  of experts delivers end-to-end services from initial planning
                  and design through to construction, commissioning, and ongoing
                  maintenance. With three decades of experience across West
                  Africa, we bring unmatched expertise to every project,
                  ensuring quality, safety, and timely delivery.
                </p>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary relative w-full overflow-hidden px-4 pb-10 md:px-8 md:pb-20">
        <div className="relative z-10 mx-auto w-full">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-secondary group flex flex-col border-t pt-6"
              >
                <AnimatedText>
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-2xl md:text-3xl">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="text-secondary mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:h-6 md:w-6" />
                  </div>
                </AnimatedText>
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary/80 mb-6 text-left text-sm md:text-base">
                    {service.description}
                  </p>
                </AnimatedText>
                <div className="mt-auto">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal-mono text-secondary mb-3 text-xs md:text-sm">
                      KEY CAPABILITIES
                    </p>
                  </AnimatedText>
                  <ul className="space-y-2">
                    {service.capabilities.map((capability, idx) => (
                      <AnimatedText key={idx}>
                        <li className="font-pp-neue-montreal text-secondary flex items-start gap-2 text-sm md:text-base">
                          <span className="bg-secondary mt-1.5 h-1 w-1 shrink-0" />
                          {capability}
                        </li>
                      </AnimatedText>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary relative w-full overflow-hidden px-4 pb-20 md:px-8 md:pb-32">
        <div
          ref={statsRowRef}
          className="flex w-full flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12"
        >
          <div className="text-left">
            <div
              data-count="6"
              data-suffix="+"
              className="font-pp-neue-montreal text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              6+
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              service areas
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="100"
              data-suffix="%"
              className="font-pp-neue-montreal text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              100%
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              integrated solutions
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="24"
              data-suffix="/7"
              className="font-pp-neue-montreal text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              24/7
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              support available
            </div>
          </div>
        </div>
      </section>

      <GradientTextSection
        textColor="rgba(255, 51, 0, 0.3)"
        highlightColor="#ff3300"
        pin={false}
        animationStart="center bottom"
        animationEnd="center 30%"
        className="py-32 md:py-48"
        contentClassName="mx-auto w-full max-w-4xl px-4 md:px-8"
      >
        <h4 className="font-pp-neue-montreal text-4xl leading-tight md:text-6xl">
          Leading road construction and civil engineering solutions across
          Nigeria and West Africa.
        </h4>
      </GradientTextSection>

      <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="w-full md:w-1/2">
              <div className="w-full text-left">
                <div className="mb-8 flex items-center gap-3">
                  <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
                  <AnimatedText>
                    <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                      EXPERTISE
                    </p>
                  </AnimatedText>
                </div>
                <AnimatedText>
                  <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-5xl">
                    Three decades of engineering excellence and innovation.
                  </h2>
                </AnimatedText>
              </div>
            </div>
            <div className="flex w-full flex-col md:mt-60 md:w-1/2">
              <div className="border-secondary mb-4 border-t"></div>

              <div className="flex flex-col gap-4 pb-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                      Our Approach
                    </h3>
                  </AnimatedText>
                </div>
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                      We take an integrated approach to construction, combining
                      civil, mechanical, and electrical expertise to deliver
                      comprehensive solutions. Our team works collaboratively
                      from initial concept through to final delivery, ensuring
                      seamless execution and exceptional results.
                    </p>
                  </AnimatedText>
                </div>
              </div>

              <div className="border-secondary mb-4 border-t"></div>

              <div className="flex flex-col gap-4 pb-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                      Quality Assurance
                    </h3>
                  </AnimatedText>
                </div>
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                      Every project undergoes rigorous quality control processes
                      to ensure compliance with international standards. We
                      maintain the highest levels of safety, sustainability, and
                      workmanship in all our services, protecting both our
                      clients&apos; investments and the communities we serve.
                    </p>
                  </AnimatedText>
                </div>
              </div>

              <div className="border-secondary mb-4 border-t"></div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                      Innovation
                    </h3>
                  </AnimatedText>
                </div>
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                      We continuously invest in cutting-edge technologies and
                      methodologies to improve efficiency, reduce costs, and
                      enhance project outcomes. Our commitment to innovation
                      ensures that clients benefit from the latest advances in
                      construction and engineering practices.
                    </p>
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tertiary relative flex min-h-svh w-full items-end justify-start">
        <MediaImage
          src={media.vitalis}
          alt="Background"
          fill
          sizes="100vw"
          quality={75}
        />
        <div className="relative z-10 p-4 md:p-8 md:pb-12">
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-6xl text-left text-2xl text-white md:text-6xl">
              Transforming infrastructure across West Africa through
              comprehensive construction and engineering excellence.
            </p>
          </AnimatedText>
        </div>
      </section>
    </>
  );
}
