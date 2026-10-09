"use client";

/**
 * Orange clip-path burger menu. Not wired — swap this in as the default
 * Navbar export if you want it back.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { routeHeroes } from "@/lib/media";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/company", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

function warmHero(href: string) {
  const image = routeHeroes[href];
  if (!image) return;
  const el = new window.Image();
  el.decoding = "async";
  el.src = image.src;
}

const PANEL_CLIP_CLOSED = "inset(0% 0% 100% 0%)";
const PANEL_CLIP_OPEN = "inset(0% 0% 0% 0%)";

export default function NavbarOverlay() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const hiddenRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const menuMountedRef = useRef(false);

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

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const links = panel.querySelectorAll<HTMLElement>("[data-menu-link]");
    const meta = panel.querySelectorAll<HTMLElement>("[data-menu-meta]");
    const closeBtn = panel.querySelector<HTMLElement>("[data-menu-close]");

    gsap.killTweensOf([panel, links, meta, closeBtn]);

    if (!menuMountedRef.current) {
      menuMountedRef.current = true;
      gsap.set(panel, { clipPath: PANEL_CLIP_CLOSED, pointerEvents: "none" });
      gsap.set([links, meta, closeBtn], { opacity: 0 });
      if (!isOpen) return;
    }

    if (isOpen) {
      panel.setAttribute("data-open", "true");
      gsap.set(panel, { pointerEvents: "auto" });
      gsap.set([links, meta, closeBtn], { opacity: 0, y: 16 });

      const tl = gsap.timeline();
      tl.to(panel, {
        clipPath: PANEL_CLIP_OPEN,
        duration: 0.7,
        ease: "power3.inOut",
      });
      tl.to(
        closeBtn,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.25",
      );
      tl.to(
        links,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.25",
      );
      tl.to(
        meta,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.25",
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (panelRef.current) {
            panelRef.current.setAttribute("data-open", "false");
            gsap.set(panelRef.current, { pointerEvents: "none" });
          }
        },
      });
      tl.to([links, meta, closeBtn], {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      });
      tl.to(
        panel,
        {
          clipPath: PANEL_CLIP_CLOSED,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.05",
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const burgerTone = solid ? "text-foreground" : "text-primary";

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 w-full px-6 pt-6 pb-4 will-change-transform transition-[background-color,border-color] duration-500 ease-out md:px-8 md:pt-8 md:pb-5 ${
          solid
            ? "border-foreground/15 bg-primary border-b"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="flex cursor-pointer items-center"
            onMouseEnter={() => warmHero("/")}
            onFocus={() => warmHero("/")}
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/images/logo2026.svg"
              alt="COAN Logo"
              width={130}
              height={30}
              priority
              className={`h-5 w-auto transition-[filter] duration-500 ease-out md:h-6 ${
                solid && !isOpen ? "brightness-0" : ""
              }`}
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`flex size-10 cursor-pointer items-center justify-center border-none bg-transparent ${burgerTone}`}
            aria-label="Open menu"
            aria-expanded={isOpen}
            hidden={isOpen}
          >
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-px w-7 bg-current" />
              <span className="block h-px w-7 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={panelRef}
        data-open="false"
        className="bg-secondary pointer-events-none fixed top-4 right-4 bottom-4 z-[60] flex w-[min(calc(100%-2rem),36rem)] flex-col justify-between p-8 md:top-6 md:right-6 md:bottom-6 md:w-[min(52vw,40rem)] md:p-12"
        style={{ clipPath: PANEL_CLIP_CLOSED }}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          data-menu-close
          onClick={() => setIsOpen(false)}
          className="text-primary absolute top-2 right-2 flex size-10 cursor-pointer items-center justify-center border-none bg-transparent text-3xl leading-none"
          aria-label="Close menu"
        >
          ×
        </button>

        <nav className="mt-10 flex flex-col gap-1 md:mt-4 md:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-menu-link
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => warmHero(link.href)}
              onFocus={() => warmHero(link.href)}
              className="font-pp-neue-montreal text-primary hover:text-primary/70 cursor-pointer text-4xl leading-[1.12] tracking-tight no-underline transition-colors duration-200 md:text-6xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-primary/90 font-pp-neue-montreal flex flex-col gap-6 pt-8 text-sm md:flex-row md:items-end md:justify-between md:gap-8 md:text-base">
          <p data-menu-meta className="max-w-[12rem] leading-snug">
            22 Durban Street, Wuse 2,
            <br />
            Abuja. Nigeria.
          </p>
          <p data-menu-meta className="flex flex-col gap-1 md:text-right">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-primary no-underline"
              >
                {phone}
              </a>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
