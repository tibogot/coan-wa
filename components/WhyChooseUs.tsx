"use client";

import Image from "next/image";
import AnimatedText from "./AnimatedText3";
import { media } from "@/lib/media";

export default function WhyChooseUs() {
  return (
    <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
          <AnimatedText>
            <p className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm">
              WHY CHOOSE US
            </p>
          </AnimatedText>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row md:gap-12 md:items-center">
          {/* Left section - Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-tertiary relative h-400px w-full overflow-hidden md:h-500px">
              <Image
                src={media.joshua}
                alt="Why Choose Us"
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={70}
              />
            </div>
          </div>
          {/* Right section - Title and 3 paragraphs */}
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <AnimatedText>
              <h2 className="font-pp-neue-montreal text-foreground text-left text-4xl md:text-5xl">
                Why Choose COANWA
              </h2>
            </AnimatedText>
            <AnimatedText>
              <p className="font-pp-neue-montreal text-foreground text-left text-base md:text-lg">
                With over three decades of experience in road construction and
                civil engineering across West Africa, we bring unparalleled
                expertise to every project. Our deep understanding of local
                conditions, combined with international best practices, ensures
                that we deliver infrastructure solutions that are both robust and
                sustainable.
              </p>
            </AnimatedText>
            <AnimatedText>
              <p className="font-pp-neue-montreal text-foreground text-left text-base md:text-lg">
                Our integrated approach combines civil, mechanical, and electrical
                engineering services, allowing us to manage complex projects
                seamlessly from planning to execution. We prioritize quality,
                safety, and client satisfaction, maintaining the highest standards
                while adhering to strict timelines and budgets.
              </p>
            </AnimatedText>
            <AnimatedText>
              <p className="font-pp-neue-montreal text-foreground text-left text-base md:text-lg">
                Partner with us and benefit from our proven track record of
                successfully completed projects, dedicated professional team, and
                commitment to excellence. We build lasting infrastructure that
                transforms communities and drives economic growth across Nigeria
                and West Africa.
              </p>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}

