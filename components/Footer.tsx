"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-tertiary w-full px-4 pt-10 pb-6 text-white md:px-8">
      <div className="flex flex-col justify-between gap-8">
        {/* Top Section */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-4">
          {/* Company Info */}
          <div className="flex flex-col gap-4 md:max-w-md">
            <Link href="/" className="inline-block cursor-pointer">
              <Image
                src="/images/newlogohero.svg"
                alt="COAN Logo"
                width={110}
                height={34}
                className="h-10 w-auto"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="font-pp-neue-montreal text-base leading-relaxed text-white/80">
              A leading construction company offering integrated solutions and
              related services.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="/company"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:info@coanwa.com"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    info@coanwa.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2348037869334"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    +234 803 786 9334
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2347033668523"
                    className="font-pp-neue-montreal cursor-pointer text-base text-white/80 transition-opacity hover:opacity-80 md:text-lg"
                  >
                    +234 703 366 8523
                  </a>
                </li>
                <li className="text-white/80">
                  <p className="font-pp-neue-montreal text-base md:text-lg">
                    22 Durban Street, Wuse 2,
                    <br />
                    Abuja, Nigeria.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} COAN West Africa Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
