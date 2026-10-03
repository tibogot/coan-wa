"use client";

import AnimatedText from "./AnimatedText3";

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
                <AnimatedText>
                  <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                    VISION
                  </p>
                </AnimatedText>
              </div>
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-5xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
          </div>
          {/* Right section - Content */}
          <div className="flex w-full flex-col md:mt-60 md:w-1/2">
            {/* Top border */}
            <div className="border-secondary mb-4 border-t"></div>

            {/* First content block */}
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Mission
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    We are committed to delivering world-class construction and
                    engineering solutions that transform communities and drive
                    economic growth across West Africa. Through innovative
                    approaches and sustainable practices, we build
                    infrastructure that stands the test of time.
                  </p>
                </AnimatedText>
              </div>
            </div>

            {/* Border between blocks */}
            <div className="border-secondary mb-4 border-t"></div>

            {/* Second content block */}
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Values
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    Integrity, excellence, and innovation guide everything we
                    do. We prioritize safety, sustainability, and client
                    satisfaction in every project, ensuring lasting impact and
                    meaningful contributions to the communities we serve.
                  </p>
                </AnimatedText>
              </div>
            </div>

            {/* Border between blocks */}
            <div className="border-secondary mb-4 border-t"></div>

            {/* Third content block */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Vision
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    To be the leading construction and engineering firm in West
                    Africa, recognized for transforming infrastructure through
                    cutting-edge technology, sustainable practices, and
                    unwavering commitment to quality that shapes the future of
                    the region.
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
