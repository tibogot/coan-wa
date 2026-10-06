import type { Metadata } from "next";
import ProfileGrid from "@/components/ProfileGrid";
import AnimatedText from "@/components/AnimatedText3";
import PageHero from "@/components/PageHero";
import MediaImage from "@/components/MediaImage";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about COAN West Africa Limited — mission, values, vision, and leadership in construction and engineering.",
  openGraph: {
    title: "Company | COAN West Africa Limited",
    description:
      "Three decades of construction and engineering excellence across West Africa.",
  },
};

export default function Company() {
  return (
    <>
      <PageHero image={media.chuks} alt="Company Background">
        <div className="p-4 md:p-8 md:pb-12">
          <AnimatedText isHero={true}>
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-primary md:text-6xl">
              Building Excellence Across West Africa
            </h1>
          </AnimatedText>
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-primary/90 md:text-lg">
              Three decades of expertise in construction and engineering,
              delivering integrated solutions from planning to execution.
            </p>
          </AnimatedText>
        </div>
      </PageHero>

      <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
            <AnimatedText>
              <p className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm">
                VISION
              </p>
            </AnimatedText>
          </div>
          <div className="text-left">
            <div className="w-full md:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-foreground text-left text-4xl md:text-6xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
          </div>
          <div className="flex w-full gap-4 py-20">
            <div className="hidden w-1/2 md:block"></div>
            <div className="flex w-full flex-col md:w-1/2">
              <div className="border-foreground mb-4 border-t"></div>

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
                      We are committed to delivering world-class construction
                      and engineering solutions that transform communities and
                      drive economic growth across West Africa. Through
                      innovative approaches and sustainable practices, we build
                      infrastructure that stands the test of time.
                    </p>
                  </AnimatedText>
                </div>
              </div>

              <div className="border-foreground mb-4 border-t"></div>

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
                      do. We prioritize safety, sustainability, and client
                      satisfaction in every project, ensuring lasting impact and
                      meaningful contributions to the communities we serve.
                    </p>
                  </AnimatedText>
                </div>
              </div>

              <div className="border-foreground mb-4 border-t"></div>

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
                      To be the leading construction and engineering firm in
                      West Africa, recognized for transforming infrastructure
                      through cutting-edge technology, sustainable practices,
                      and unwavering commitment to quality that shapes the
                      future of the region.
                    </p>
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary px-4 md:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
          <p className="font-pp-neue-montreal-mono text-foreground text-left text-xs md:text-sm">
            LEADERSHIP
          </p>
        </div>
      </div>
      <ProfileGrid />
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
            <p className="font-pp-neue-montreal max-w-6xl text-left text-2xl text-primary md:text-6xl">
              Transforming landscapes and shaping futures through innovative
              construction solutions and engineering excellence across West
              Africa.
            </p>
          </AnimatedText>
        </div>
      </section>
    </>
  );
}
