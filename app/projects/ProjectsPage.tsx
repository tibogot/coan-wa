"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import AnimatedText from "@/components/AnimatedText3";
import PageHero from "@/components/PageHero";
import { media } from "@/lib/media";

const projects: {
  image: StaticImageData;
  status: string;
  title: string;
}[] = [
  {
    image: media.project1,
    status: "Ongoing",
    title:
      "Award of Contract of the Construction of Yaba-Kpache Road (LOT EWR) Project, Abuja Under Satellite Town Development Agency (STDA)",
  },
  {
    image: media.project2,
    status: "Ongoing",
    title:
      "Award of Contract for the provision of Engineering Infrastructure to Plot 4075, Asokoro Extension (Comprising 50 Plots) Abuja",
  },
  {
    image: media.project3,
    status: "Completed",
    title:
      "Award of Contract for the Provision of Engineering Infrastructure to Plot 1038 Extension, Cadastral Zone AD5, Maitama District, Abuja",
  },
  {
    image: media.project4,
    status: "Completed",
    title:
      "Award of Contract for the provision of Infrastructure to outstanding Areas in Phase I (Lot1 – Provision of Infrastructure to Plot 447 Extension Maitama District) Abuja",
  },
  {
    image: media.project5,
    status: "Completed",
    title:
      "Award of Contract for the Construction of Road Infrastructure (Lot 11) for Jibi Resettlement Town",
  },
  {
    image: media.project6,
    status: "Completed",
    title:
      "Award of Contract for the upgrading of the existing Engineering Infrastructure at APO/GARKI Resettlement Village, Abuja (Lot – Roads Works)",
  },
];

export default function Projects() {
  return (
    <>
      <PageHero image={media.sticky3} alt="Projects Background">
        <div className="p-4 md:p-8 md:pb-12">
          <AnimatedText isHero={true}>
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
              Transforming Infrastructure Through Innovation
            </h1>
          </AnimatedText>
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
              Explore our portfolio of successful construction and engineering
              projects across West Africa.
            </p>
          </AnimatedText>
        </div>
      </PageHero>

      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <AnimatedText>
                <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                  PROJECTS
                </p>
              </AnimatedText>
            </div>
            <AnimatedText>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                Our portfolio showcases excellence,
                <br />
                featuring transformative projects
                <br />
                that shape communities and infrastructure.
              </h2>
            </AnimatedText>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-8 md:mt-32 md:grid-cols-3 md:gap-12">
            {projects.map((project) => (
              <div key={project.image.src} className="group relative flex flex-col">
                <div className="bg-tertiary relative h-[300px] w-full overflow-hidden md:h-[380px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    placeholder="blur"
                    className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={70}
                  />
                </div>
                <div className="mt-4">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                      {project.status}
                    </p>
                  </AnimatedText>
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                      {project.title}
                    </h3>
                  </AnimatedText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
