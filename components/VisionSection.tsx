"use client";

import AnimatedText from "./AnimatedText3";
import GlitchText from "./GlitchText";

export default function VisionSection() {
  return (
    <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
          {/* Left section - Title */}
          <div className="w-full md:w-1/2">
            <div className="w-full text-left">
              <div className="mb-8 flex items-center gap-3">
                <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
                <p className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm">
                  <GlitchText appear>VISION</GlitchText>
                </p>
              </div>
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-foreground text-left text-4xl md:text-5xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
          </div>
          {/* Right section - Content */}
          <div className="flex w-full flex-col md:mt-60 md:w-1/2">
            {/* Top border */}
            <div className="border-foreground mb-4 border-t"></div>

            {/* First content block */}
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-foreground text-left text-xl md:text-2xl">
                    Our Mission
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-foreground text-left text-sm md:text-base">
                    We deliver world-class construction and engineering
                    solutions that transform communities and drive economic
                    growth across West Africa.
                  </p>
                </AnimatedText>
              </div>
            </div>

            {/* Border between blocks */}
            <div className="border-foreground mb-4 border-t"></div>

            {/* Second content block */}
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-foreground text-left text-xl md:text-2xl">
                    Our Values
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-foreground text-left text-sm md:text-base">
                    Integrity, excellence, and innovation guide everything we
                    do, with safety, sustainability, and client satisfaction in
                    every project.
                  </p>
                </AnimatedText>
              </div>
            </div>

            {/* Border between blocks */}
            <div className="border-foreground mb-4 border-t"></div>

            {/* Third content block */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-foreground text-left text-xl md:text-2xl">
                    Our Vision
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-foreground text-left text-sm md:text-base">
                    To be West Africa&apos;s leading construction and
                    engineering firm, recognized for transforming
                    infrastructure with technology and uncompromising quality.
                  </p>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
