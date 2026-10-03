import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import MediaImage from "@/components/MediaImage";

type PageHeroProps = {
  image: StaticImageData;
  alt: string;
  children: ReactNode;
  priority?: boolean;
};

/** Full-viewport hero: dark canvas paints immediately, image blurs in on top. */
export default function PageHero({
  image,
  alt,
  children,
  priority = true,
}: PageHeroProps) {
  return (
    <section className="bg-tertiary relative h-svh w-full overflow-hidden">
      <MediaImage
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={75}
      />
      <div className="relative z-10 flex h-full items-end justify-start">
        {children}
      </div>
    </section>
  );
}
