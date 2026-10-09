"use client";

/**
 * Pinned "footprint" section. As you scroll, the Nigeria outline traces itself
 * like a survey line, then roads draw out from the Abuja HQ to each site — a
 * marker drives along each road, the pin drops, the list entry lights up and
 * the counter climbs.
 */

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { NIGERIA_PATH, NIGERIA_VIEWBOX } from "@/lib/nigeriaPath";
import GlitchText from "@/components/GlitchText";

const VB_W = 1019;
const VB_H = 827;

// Map coordinates are in the SVG viewBox (roughly linear lon/lat → x/y).
// Placeholder locations and counts — swap for real project data.
const HUB = { name: "Abuja", note: "Head office · FCT", x: 410, y: 414 };

const SITES = [
  { name: "Lagos", note: "Urban roads", projects: 14, x: 60, y: 633, bend: -0.18 },
  { name: "Kano", note: "Highway works", projects: 9, x: 497, y: 162, bend: 0.22 },
  { name: "Port Harcourt", note: "Drainage & civil", projects: 11, x: 368, y: 781, bend: 0.2 },
  { name: "Maiduguri", note: "Engineering infrastructure", projects: 14, x: 890, y: 175, bend: -0.2 },
];

const STATS = { years: 34, projects: SITES.reduce((n, s) => n + s.projects, 0) };

/** Gentle curve from the hub to a site, bowed perpendicular to the straight line. */
function roadPath(to: { x: number; y: number; bend: number }) {
  const mx = (HUB.x + to.x) / 2;
  const my = (HUB.y + to.y) / 2;
  const dx = to.x - HUB.x;
  const dy = to.y - HUB.y;
  const cx = mx - dy * to.bend;
  const cy = my + dx * to.bend;
  return `M${HUB.x} ${HUB.y} Q${cx} ${cy} ${to.x} ${to.y}`;
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export default function FootprintMap() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const q = gsap.utils.selector(section);
      const outline = q("[data-outline]");
      const outlineFill = q("[data-outline-fill]");
      const grid = q("[data-grid]");
      const hub = q("[data-hub]");
      const roads = Array.from(
        section.querySelectorAll<SVGPathElement>("[data-road]"),
      );
      const trucks = q("[data-truck]");
      const pins = q("[data-pin]");
      const labels = q("[data-label]");
      const items = q("[data-item]");
      const counter = q("[data-counter]")[0];
      const bar = q("[data-bar]");

      const setCount = (n: number) => {
        if (counter) counter.textContent = String(Math.round(n)).padStart(2, "0");
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([outlineFill, grid, hub, pins, labels, items], { opacity: 1 });
        gsap.set(trucks, { opacity: 0 });
        setCount(STATS.projects);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.5}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(outline, { drawSVG: "0%" });
        gsap.set(roads, { drawSVG: "0%" });
        gsap.set([outlineFill, grid, hub, labels, trucks], { opacity: 0 });
        gsap.set(pins, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(items, { opacity: 0.25 });
        setCount(0);

        // 1. Survey the country outline.
        tl.to(outline, { drawSVG: "100%", duration: 2, ease: "power1.inOut" })
          .to(grid, { opacity: 1, duration: 1 }, 0.4)
          .to(outlineFill, { opacity: 1, duration: 0.8 }, 1.4)
          .to(hub, { opacity: 1, duration: 0.4 }, 1.8);

        // 2. Build a road to each site.
        const counterState = { value: 0 };
        let total = 0;

        SITES.forEach((site, i) => {
          const at = `road${i}`;
          total += site.projects;

          tl.addLabel(at, "+=0.3")
            .to(roads[i], { drawSVG: "100%", duration: 1.4, ease: "power1.inOut" }, at)
            .to(trucks[i], { opacity: 1, duration: 0.15 }, at)
            .to(
              trucks[i],
              {
                duration: 1.4,
                ease: "power1.inOut",
                motionPath: {
                  path: roads[i],
                  align: roads[i],
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                },
              },
              at,
            )
            .to(trucks[i], { opacity: 0, duration: 0.15 }, `${at}+=1.3`)
            .to(pins[i], { scale: 1, duration: 0.35, ease: "back.out(3)" }, `${at}+=1.25`)
            .to(labels[i], { opacity: 1, duration: 0.3 }, `${at}+=1.3`)
            .to(items[i], { opacity: 1, duration: 0.3 }, `${at}+=1.2`)
            .to(
              counterState,
              {
                value: total,
                duration: 1.2,
                onUpdate: () => setCount(counterState.value),
              },
              `${at}+=0.2`,
            )
            .to(bar, { scaleX: (i + 1) / SITES.length, duration: 1.4 }, at);
        });

        tl.to({}, { duration: 0.6 }); // hold the finished map before unpinning
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal text-primary relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      <div className="relative z-10 grid h-full w-full grid-rows-[auto_1fr] gap-6 px-4 pt-20 pb-6 md:grid-cols-[5fr_7fr] md:grid-rows-1 md:gap-10 md:px-8 md:pt-24 md:pb-10">
        {/* Copy + live stats */}
        <div className="flex flex-col md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <p className="font-pp-neue-montreal-mono text-xs md:text-sm">
                <GlitchText appear>FOOTPRINT</GlitchText>
              </p>
            </div>
            <h2 className="font-pp-neue-montreal max-w-xl text-3xl leading-[1.08] tracking-[-0.02em] md:text-5xl">
              From Abuja, roads that reach every corner of Nigeria.
            </h2>
          </div>

          <div className="mt-6 flex items-end gap-8 md:mt-0 md:gap-12">
            <div>
              <div
                data-counter
                className="font-pp-neue-montreal-mono text-6xl leading-none tracking-[-0.05em] tabular-nums md:text-8xl"
              >
                00
              </div>
              <p className="font-pp-neue-montreal text-primary/60 mt-2 text-sm md:text-base">
                projects delivered
              </p>
            </div>
            <div>
              <div className="font-pp-neue-montreal-mono text-6xl leading-none tracking-[-0.05em] tabular-nums md:text-8xl">
                {STATS.years}
                <span className="text-secondary">+</span>
              </div>
              <p className="font-pp-neue-montreal text-primary/60 mt-2 text-sm md:text-base">
                years building
              </p>
            </div>
          </div>

          <ul className="mt-8 hidden border-t border-white/15 md:block">
            {SITES.map((site, i) => (
              <li
                key={site.name}
                data-item
                className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3"
              >
                <span className="font-pp-neue-montreal-mono text-secondary text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-pp-neue-montreal flex-1 text-lg">
                  {site.name}
                </span>
                <span className="font-pp-neue-montreal text-primary/60 text-sm">
                  {site.note}
                </span>
                <span className="font-pp-neue-montreal-mono w-8 text-right text-sm tabular-nums">
                  {site.projects}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 h-0.5 w-full bg-white/15 md:mt-8">
            <div
              data-bar
              className="bg-secondary h-full w-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* Map */}
        <div className="relative flex min-h-0 items-center justify-center">
          <div
            className="relative max-h-full w-full"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            {/* Blueprint grid, faded toward the edges */}
            <div
              data-grid
              aria-hidden
              className="pointer-events-none absolute -inset-[8%]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              }}
            />

            <svg
              viewBox={NIGERIA_VIEWBOX}
              className="absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-label="Map of Nigeria showing COANWA project locations"
            >
              <path
                data-outline-fill
                d={NIGERIA_PATH}
                fill="rgba(255,255,255,0.035)"
              />
              <path
                data-outline
                d={NIGERIA_PATH}
                fill="none"
                stroke="rgba(240,240,240,0.7)"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />

              {SITES.map((site) => (
                <path
                  key={site.name}
                  data-road
                  d={roadPath(site)}
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              {SITES.map((site) => (
                <g key={site.name} data-pin>
                  <circle
                    cx={site.x}
                    cy={site.y}
                    r={22}
                    fill="none"
                    stroke="var(--secondary)"
                    strokeOpacity={0.5}
                    className="footprint-pulse"
                  />
                  <circle cx={site.x} cy={site.y} r={7} fill="var(--secondary)" />
                </g>
              ))}

              {/* Marker that drives along each road while it's being built */}
              {SITES.map((site) => (
                <g key={site.name} data-truck>
                  <rect
                    x={-11}
                    y={-6}
                    width={22}
                    height={12}
                    fill="var(--primary)"
                  />
                  <rect x={5} y={-6} width={6} height={12} fill="var(--secondary)" />
                </g>
              ))}

              <g data-hub>
                <circle
                  cx={HUB.x}
                  cy={HUB.y}
                  r={34}
                  fill="none"
                  stroke="var(--primary)"
                  strokeOpacity={0.35}
                  className="footprint-pulse"
                />
                <rect
                  x={HUB.x - 10}
                  y={HUB.y - 10}
                  width={20}
                  height={20}
                  fill="var(--primary)"
                />
              </g>
            </svg>

            {/* HTML labels stay legible at any map size */}
            <MapLabel x={HUB.x} y={HUB.y} title={HUB.name} note={HUB.note} hub />
            {SITES.map((site) => (
              <MapLabel
                key={site.name}
                x={site.x}
                y={site.y}
                title={site.name}
                note={`${site.projects} projects`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapLabel({
  x,
  y,
  title,
  note,
  hub = false,
}: {
  x: number;
  y: number;
  title: string;
  note: string;
  hub?: boolean;
}) {
  // Flip labels on the right half of the map so they don't run off-screen.
  const flip = x > VB_W * 0.6;
  return (
    <div
      data-label={hub ? undefined : true}
      data-hub={hub ? true : undefined}
      className="bg-charcoal/80 pointer-events-none absolute px-1.5 py-1 backdrop-blur-sm"
      style={{
        left: pct(x, VB_W),
        top: pct(y, VB_H),
        transform: `translate(${flip ? "calc(-100% - 18px)" : "18px"}, -50%)`,
      }}
    >
      <p className="font-pp-neue-montreal text-sm leading-tight whitespace-nowrap md:text-base">
        {title}
      </p>
      <p className="font-pp-neue-montreal-mono text-primary/60 text-[10px] whitespace-nowrap uppercase md:text-xs">
        {note}
      </p>
    </div>
  );
}
