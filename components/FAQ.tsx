"use client";

import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import AnimatedText from "./AnimatedText3";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What types of construction projects do you handle?",
    answer:
      "We specialize in a wide range of construction projects including commercial buildings, residential developments, infrastructure projects, industrial facilities, and renovation work. Our expertise spans from initial planning and design through to completion and ongoing maintenance.",
  },
  {
    question: "How long has your company been in operation?",
    answer:
      "We have over 18 years of experience in the construction and engineering industry, with a proven track record of delivering high-quality projects across West Africa. Our extensive experience allows us to handle complex projects with confidence and precision.",
  },
  {
    question: "What geographic areas do you serve?",
    answer:
      "We primarily operate across West Africa, delivering construction and engineering solutions throughout the region. Our team has experience working in various countries and can adapt to local requirements and regulations.",
  },
  {
    question: "Do you provide project management services?",
    answer:
      "Yes, we offer comprehensive project management services. Our expert team oversees every aspect of your project from conception to completion, ensuring timelines, budgets, and quality standards are consistently met throughout the construction process.",
  },
  {
    question: "What is your approach to quality assurance?",
    answer:
      "We maintain rigorous testing and inspection protocols at every stage of construction. Our quality assurance process includes regular site inspections, material testing, compliance checks, and final quality reviews to guarantee the highest standards of construction excellence.",
  },
  {
    question: "How do you handle project timelines and deadlines?",
    answer:
      "We use advanced project management tools and methodologies to ensure efficient scheduling and timely completion. Our team works closely with clients to establish realistic timelines and provides regular updates on project progress. We're committed to meeting deadlines while maintaining quality standards.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Initialize panels closed on mount.
  useGSAP(() => {
    FAQ_DATA.forEach((_, i) => {
      const content = contentRefs.current[i];
      const inner = innerRefs.current[i];
      if (!content || !inner) return;

      gsap.set(content, { height: 0, opacity: 0 });
      gsap.set(inner, { y: -4 });
    });
  }, []);

  // Smooth open/close animation driven by GSAP (height: 0 <-> auto).
  useGSAP(
    () => {
      FAQ_DATA.forEach((_, i) => {
        const content = contentRefs.current[i];
        const inner = innerRefs.current[i];
        if (!content || !inner) return;

        gsap.killTweensOf([content, inner]);

        const isOpen = openIndex === i;
        if (isOpen) {
          gsap.to(content, {
            height: "auto",
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          });
          gsap.to(inner, {
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          });
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
          });
          gsap.to(inner, {
            y: -4,
            duration: 0.35,
            ease: "power2.inOut",
          });
        }
      });
    },
    { dependencies: [openIndex] },
  );

  return (
    <section className="bg-primary relative w-full py-24">
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Left column (desktop): section label */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <AnimatedText>
                <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                  FAQ
                </p>
              </AnimatedText>
            </div>
          </div>

          {/* Right column: title + accordion */}
          <div className="md:col-span-8">
            <div className="mb-10 md:mb-14">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary mb-6 text-left text-4xl md:text-4xl">
                  Questions, answered.
                </h2>
              </AnimatedText>
            </div>

            {/* FAQ Items */}
            <div className="divide-secondary/25 divide-y">
              {FAQ_DATA.map((faq, index) => (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="text-secondary hover:text-secondary/80 flex w-full cursor-pointer items-center justify-between py-4 text-left transition-colors duration-200 md:py-6"
                    aria-expanded={openIndex === index}
                    aria-controls={`${baseId}-faq-panel-${index}`}
                  >
                    <h3 className="font-pp-neue-montreal text-secondary pr-8 text-base md:text-xl">
                      {faq.question}
                    </h3>
                    <div className="shrink-0">
                      <svg
                        className={`text-secondary h-6 w-6 transform transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    id={`${baseId}-faq-panel-${index}`}
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="overflow-hidden will-change-[height,opacity]"
                  >
                    <div
                      ref={(el) => {
                        innerRefs.current[index] = el;
                      }}
                      className="pb-4 md:pb-6"
                    >
                      <p className="font-pp-neue-montreal text-secondary/70 text-base leading-relaxed md:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
