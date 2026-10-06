"use client";

import Link from "next/link";
import AnimatedText from "@/components/AnimatedText3";
import MasonryGallery from "@/components/MasonryGallery";
import PageHero from "@/components/PageHero";
import { media } from "@/lib/media";

const galleryImages = [
  { src: media.project1, alt: "Project 1", tall: true },
  { src: media.project2, alt: "Project 2" },
  { src: media.project3, alt: "Project 3" },
  { src: media.project4, alt: "Project 4" },
  { src: media.project5, alt: "Project 5", tall: true },
  { src: media.project6, alt: "Project 6" },
  { src: media.sticky1, alt: "Sticky Card 1" },
  { src: media.sticky2, alt: "Sticky Card 2" },
  { src: media.sticky3, alt: "Sticky Card 3" },
  { src: media.sticky4, alt: "Sticky Card 4" },
];

export default function Gallery() {
  return (
    <>
      <PageHero image={media.sticky1} alt="Gallery Background">
        <div className="p-4 md:p-8 md:pb-12">
          <AnimatedText isHero={true}>
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-primary md:text-6xl">
              Our Work in Focus: Showcasing Excellence Across West Africa
            </h1>
          </AnimatedText>
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-primary/90 md:text-lg">
              Discover the quality and craftsmanship behind our construction
              and engineering projects.
            </p>
          </AnimatedText>
        </div>
      </PageHero>

      <section className="bg-primary relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8 md:py-30">
        <div className="relative z-10 w-full">
          <div className="mb-16 text-left">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <AnimatedText>
                <p className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm">
                  GALLERY
                </p>
              </AnimatedText>
            </div>
            <AnimatedText>
              <h2 className="font-pp-neue-montreal text-foreground text-left text-4xl md:text-6xl">
                A visual journey through our
                <br />
                construction and engineering
                <br />
                excellence across West Africa.
              </h2>
            </AnimatedText>
          </div>

          <MasonryGallery images={galleryImages} />

          <div className="mt-20 flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="flex-1">
              <AnimatedText>
                <h3 className="font-pp-neue-montreal text-foreground text-left text-3xl md:text-5xl">
                  Ready to bring your vision to life? Let&apos;s collaborate on
                  your next construction and engineering project together.
                </h3>
              </AnimatedText>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-foreground text-left text-base leading-relaxed md:text-lg">
                  Let&apos;s discuss your construction and engineering project
                  needs in detail. Our experienced team is ready to help you
                  achieve your goals with quality craftsmanship, innovative
                  solutions, and a commitment to excellence. We bring years of
                  expertise across West Africa, delivering projects that exceed
                  expectations and stand the test of time. From initial
                  consultation to final completion, we work closely with you
                  every step of the way.
                </p>
              </AnimatedText>
              <AnimatedText>
                <Link
                  href="/contact"
                  className="font-pp-neue-montreal-mono bg-secondary text-foreground hover:bg-secondary/90 inline-block w-fit cursor-pointer rounded-px px-5 py-2.5 text-xs tracking-wide uppercase transition-colors duration-200 md:px-6 md:py-3"
                >
                  Get in Touch
                </Link>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
