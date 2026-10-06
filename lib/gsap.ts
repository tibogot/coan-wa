"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

// Match the draft stack: ScrollTrigger + SplitText + Draggable (+ inertia for tickers)
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
);

// Mobile URL-bar show/hide fires resize events; refreshing on those makes
// pinned sections jump. Real width changes are handled by components.
ScrollTrigger.config({ ignoreMobileResize: true });

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
};
