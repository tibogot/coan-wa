"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { routeHeroes } from "@/lib/media";
import GlitchText from "@/components/GlitchText";

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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const hiddenRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const slideNav = (hide: boolean) => {
    if (hiddenRef.current === hide || !navRef.current) return;
    hiddenRef.current = hide;
    gsap.to(navRef.current, {
      yPercent: hide ? -100 : 0,
      duration: 0.5,
      ease: hide ? "power3.inOut" : "power3.out",
      overwrite: "auto",
    });
  };

  // Transparent over the hero; soft-white once the hero has mostly scrolled away.
  // Slide away on scroll down, slide back on scroll up (stays visible near the top
  // and while the mobile menu is open).
  useLenis(({ scroll, direction }) => {
    const solidThreshold = Math.max(window.innerHeight * 0.7, 120);
    const nextSolid = scroll > solidThreshold;
    setSolid((prev) => (prev === nextSolid ? prev : nextSolid));

    if (isOpenRef.current || scroll < 64) {
      slideNav(false);
      lastScrollRef.current = scroll;
      return;
    }

    const delta = scroll - lastScrollRef.current;
    if (Math.abs(delta) < 4) return;

    if (direction === 1) {
      slideNav(true);
    } else if (direction === -1) {
      slideNav(false);
    }

    lastScrollRef.current = scroll;
  });

  // Reset to the hero (transparent) look on every route change.
  useEffect(() => {
    setSolid(false);
    setIsOpen(false);
    lastScrollRef.current = 0;
    hiddenRef.current = false;
    if (navRef.current) {
      gsap.killTweensOf(navRef.current);
      gsap.set(navRef.current, { yPercent: 0 });
    }
  }, [pathname]);

  // Animate menu open/close with GSAP
  useEffect(() => {
    if (!menuRef.current || !menuContainerRef.current) return;

    const menuItems = menuContainerRef.current.querySelectorAll("a");

    gsap.killTweensOf([menuRef.current, menuItems]);

    if (isOpen) {
      menuRef.current.style.display = "block";

      const items = menuContainerRef.current.querySelectorAll("a");

      menuRef.current.style.height = "auto";
      const height = menuRef.current.scrollHeight;
      menuRef.current.style.height = "0px";

      items.forEach((item) => {
        gsap.set(item, { opacity: 0, y: -10 });
      });

      const tl = gsap.timeline();

      tl.to(menuRef.current, {
        height: height,
        duration: 0.4,
        ease: "power2.out",
      });

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
      const items = menuContainerRef.current.querySelectorAll("a");

      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none";
          }
        },
      });

      tl.to(items, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });

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

  const linkTone = solid
    ? "text-foreground hover:text-secondary"
    : "text-primary/90 hover:text-secondary";

  // Same colors + hover as the dark page CTA (instant color swap, no fill wipe).
  const contactLinkClass =
    "font-pp-neue-montreal-mono hidden cursor-pointer rounded-px bg-charcoal px-3.5 py-1.5 text-sm tracking-wide text-primary uppercase transition-colors duration-200 hover:bg-secondary md:inline-block";
  const contactMobileClass =
    "font-pp-neue-montreal-mono cursor-pointer rounded-px bg-charcoal px-4 py-3 text-base text-primary uppercase no-underline transition-colors duration-200 hover:bg-secondary";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 z-50 w-full px-4 py-3 will-change-transform transition-[background-color,border-color] duration-500 ease-out md:px-8 ${
        solid
          ? "border-foreground/15 bg-primary border-b"
          : "border-b border-transparent bg-transparent"
      }`}
    >
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
              src="/images/logo2026.svg"
              alt="COAN Logo"
              width={130}
              height={30}
              priority
              className={`h-5 w-auto transition-[filter] duration-500 ease-out md:h-6 ${
                solid ? "brightness-0" : ""
              }`}
            />
          </Link>
        </div>

        {/* Desktop Navigation - Perfectly Centered - HIDDEN ON MOBILE */}
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => warmHero(link.href)}
              onFocus={() => warmHero(link.href)}
              className={`font-pp-neue-montreal-mono cursor-pointer py-1 text-sm tracking-wide uppercase transition-colors duration-500 ease-out ${linkTone}`}
            >
              <GlitchText onLoad delay={0.12 + index * 0.08}>
                {link.label}
              </GlitchText>
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
            className={contactLinkClass}
          >
            <GlitchText onLoad delay={0.12 + navLinks.length * 0.08}>
              Contact
            </GlitchText>
          </Link>
          {/* Mobile Menu Button - Mobile Only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex cursor-pointer items-center justify-center border-none bg-transparent p-2 text-2xl transition-colors duration-500 ease-out md:hidden ${
              solid ? "text-foreground" : "text-primary"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Expands below */}
      <div
        ref={menuRef}
        className={`overflow-hidden transition-colors duration-500 ease-out md:hidden ${
          solid ? "bg-primary" : "bg-tertiary"
        }`}
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
              className={`font-pp-neue-montreal-mono cursor-pointer rounded px-4 py-3 text-base uppercase no-underline transition-colors duration-200 ${linkTone}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={contactMobileClass}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
