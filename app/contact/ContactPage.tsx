"use client";

import AnimatedText from "@/components/AnimatedText3";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { media } from "@/lib/media";
import { siteConfig } from "@/lib/site";

const contactDetails = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Phone",
    value: siteConfig.phones[0],
    href: `tel:${siteConfig.phones[0].replace(/\s/g, "")}`,
  },
  {
    label: "Phone",
    value: siteConfig.phones[1],
    href: `tel:${siteConfig.phones[1].replace(/\s/g, "")}`,
  },
  {
    label: "Office",
    value: siteConfig.address,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero image={media.john} alt="Contact Background">
        <div className="p-4 md:p-8 md:pb-12">
          <AnimatedText isHero={true}>
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
              Let&apos;s Build Together and Transform Your Vision Into Reality
            </h1>
          </AnimatedText>
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
              Get in touch with our team to discuss your construction and
              engineering project needs.
            </p>
          </AnimatedText>
        </div>
      </PageHero>

      <section className="bg-primary relative w-full overflow-hidden px-4 py-20 md:px-8 md:py-30">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
            <AnimatedText>
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                CONTACT
              </p>
            </AnimatedText>
          </div>

          <div className="flex w-full flex-col gap-16 lg:flex-row lg:gap-20">
            <div className="flex w-full flex-col gap-10 lg:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-5xl">
                  Ready to start your project? Connect with our team.
                </h2>
              </AnimatedText>

              <div className="flex flex-col">
                {contactDetails.map((item, index) => (
                  <div key={`${item.label}-${index}`}>
                    <div className="border-secondary border-t" />
                    <div className="flex flex-col gap-2 py-6 md:flex-row md:gap-8">
                      <p className="font-pp-neue-montreal-mono text-secondary w-full text-xs md:w-1/3 md:text-sm">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-pp-neue-montreal text-secondary w-full text-base transition-opacity hover:opacity-70 md:w-2/3 md:text-xl"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-pp-neue-montreal text-secondary w-full text-base md:w-2/3 md:text-xl">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="border-secondary border-t" />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <p className="font-pp-neue-montreal-mono text-secondary mb-6 text-xs md:text-sm">
                SEND A MESSAGE
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
