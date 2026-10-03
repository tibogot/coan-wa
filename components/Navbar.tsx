"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { routeHeroes } from "@/lib/media";

const navLinks = [
  { href: "/company", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
] as const;

function warmHero(href: string) {
  const image = routeHeroes[href];
  if (!image) return;
  const el = new window.Image();
  el.decoding = "async";
  el.src = image.src;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Animate menu open/close with GSAP
  useEffect(() => {
    if (!menuRef.current || !menuContainerRef.current) return;

    const menuItems = menuContainerRef.current.querySelectorAll("a");

    // Kill any existing animations
    gsap.killTweensOf([menuRef.current, menuItems]);

    if (isOpen) {
      // Show menu first so we can query items
      menuRef.current.style.display = "block";

      // Get fresh reference to items now that menu is visible
      const items = menuContainerRef.current.querySelectorAll("a");

      // Measure height
      menuRef.current.style.height = "auto";
      const height = menuRef.current.scrollHeight;
      menuRef.current.style.height = "0px";

      // Set initial state for items
      items.forEach((item) => {
        gsap.set(item, { opacity: 0, y: -10 });
      });

      // Create timeline for smooth animation
      const tl = gsap.timeline();

      // Expand container
      tl.to(menuRef.current, {
        height: height,
        duration: 0.4,
        ease: "power2.out",
      });

      // Fade in and stagger items
      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );
    } else {
      // Get fresh reference to items
      const items = menuContainerRef.current.querySelectorAll("a");

      // Create timeline for closing
      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none";
          }
        },
      });

      // Fade out items first
      tl.to(items, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });

      // Collapse container
      tl.to(
        menuRef.current,
        {
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.1",
      );
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-8 left-1/2 z-50 w-calc(100%-2rem) max-w-4xl -translate-x-1/2 rounded-md bg-linear-to-b from-black/10 via-black/10 to-black/5 px-6 py-2 backdrop-blur-xl md:w-full">
      {/* Top Bar - Logo, Nav, Contact */}
      <div className="flex w-full items-center">
        {/* Left Section - Logo */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="flex cursor-pointer items-center"
            onMouseEnter={() => warmHero("/")}
            onFocus={() => warmHero("/")}
          >
            <Image
              src="/images/newlogohero.svg"
              alt="COAN Logo"
              width={110}
              height={34}
              priority
              className="h-5 w-auto md:h-6"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Perfectly Centered - HIDDEN ON MOBILE */}
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => warmHero(link.href)}
              onFocus={() => warmHero(link.href)}
              className="cursor-pointer py-1 text-0.95rem tracking-wide text-white/90 transition-colors duration-200 hover:text-white/60"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section - Contact Link & Mobile Button */}
        <div className="flex flex-1 items-center justify-end">
          {/* Contact Link - Desktop Only */}
          <Link
            href="/contact"
            onMouseEnter={() => warmHero("/contact")}
            onFocus={() => warmHero("/contact")}
            className="bg-secondary hover:bg-secondary hidden cursor-pointer rounded-px px-4 py-2 text-0.95rem tracking-wide text-white transition-all duration-200 md:block"
          >
            Contact
          </Link>
          {/* Mobile Menu Button - Mobile Only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer items-center justify-center border-none bg-transparent p-2 text-2xl text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Expands below */}
      <div
        ref={menuRef}
        className="overflow-hidden md:hidden"
        style={{ display: "none", height: 0 }}
      >
        <div
          ref={menuContainerRef}
          className="mt-4 flex w-full flex-col gap-2 pb-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded px-4 py-3 text-base text-white/90 no-underline hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-secondary hover:bg-secondary cursor-pointer rounded-px px-4 py-3 text-base text-white no-underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
