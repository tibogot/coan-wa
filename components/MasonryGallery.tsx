"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface GalleryImage {
  src: StaticImageData | string;
  alt: string;
  tall?: boolean;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columnArrays: GalleryImage[][] = Array.from(
    { length: columns },
    () => [],
  );
  images.forEach((image, index) => {
    columnArrays[index % columns].push(image);
  });

  useGSAP(() => {
    if (!galleryRef.current) return;

    const imageItems = galleryRef.current.querySelectorAll(".gallery-item");

    imageItems.forEach((img) => {
      gsap.from(img, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: img,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { dependencies: [columns], scope: galleryRef, revertOnUpdate: true });

  return (
    <div ref={galleryRef} className="flex gap-4">
      {columnArrays.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-1 flex-col gap-4">
          {column.map((image, imgIndex) => {
            const isStatic = typeof image.src !== "string";
            return (
              <div
                key={`${colIndex}-${imgIndex}`}
                className={`gallery-item group bg-tertiary relative overflow-hidden ${
                  image.tall ? "h-[500px] md:h-[650px]" : "aspect-4/3"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  placeholder={isStatic ? "blur" : "empty"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={70}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
