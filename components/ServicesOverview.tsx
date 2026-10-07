import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedText from "./AnimatedText3";
import CtaLink from "./CtaLink";
import GlitchText from "./GlitchText";

const services = [
  {
    title: "Road Construction & Infrastructure",
    description:
      "Highways, urban roads and transportation infrastructure that connect communities and drive economic growth across West Africa.",
  },
  {
    title: "Civil Engineering Solutions",
    description:
      "Comprehensive engineering from planning to execution, delivering sustainable and innovative solutions for complex projects.",
  },
  {
    title: "Project Management & Development",
    description:
      "End-to-end project management ensuring quality, safety and timely delivery across diverse sectors.",
  },
  {
    title: "Consulting & Advisory Services",
    description:
      "Expert consultation to guide infrastructure planning, feasibility studies and sustainable development initiatives.",
  },
] as const;

/** Dark (charcoal) services overview for the home page. */
export default function ServicesOverview() {
  return (
    <section className="bg-charcoal relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-28">
      <div className="relative z-10 mx-auto w-full">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
          <p className="font-pp-neue-montreal-mono text-primary text-xs md:text-sm">
            <GlitchText appear>WHAT WE DO</GlitchText>
          </p>
        </div>

        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="w-full md:w-2/3">
            <AnimatedText>
              <h2 className="font-pp-neue-montreal text-primary text-left text-4xl md:text-6xl">
                Engineering the roads and systems that move West Africa.
              </h2>
            </AnimatedText>
          </div>
          <div className="w-full md:w-1/3">
            <AnimatedText>
              <p className="font-pp-neue-montreal text-primary/70 text-left text-base md:text-lg">
                Four integrated services, one accountable team, from the first
                survey to the final handover.
              </p>
            </AnimatedText>
          </div>
        </div>

        <ul>
          {services.map((service, index) => (
            <li key={service.title} className="border-primary/20 border-t">
              <Link
                href="/services"
                className="group grid cursor-pointer grid-cols-1 gap-3 py-6 md:grid-cols-12 md:items-start md:gap-8 md:py-8"
              >
                <span className="font-pp-neue-montreal-mono text-primary/50 text-xs md:col-span-1 md:pt-2 md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-pp-neue-montreal text-primary group-hover:text-secondary text-left text-2xl transition-colors duration-300 md:col-span-6 md:text-4xl">
                  {service.title}
                </h3>
                <p className="font-pp-neue-montreal text-primary/70 text-left text-sm md:col-span-4 md:text-base">
                  {service.description}
                </p>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <ArrowUpRight className="text-primary group-hover:text-secondary h-6 w-6 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </li>
          ))}
          <li className="border-primary/20 border-t" aria-hidden="true" />
        </ul>

        <div className="mt-10 md:mt-14">
          <CtaLink href="/services" variant="split">
            Explore Our Services
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
