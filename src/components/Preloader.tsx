"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen loading screen (Figma node 361:948).
 * Stays until the page — including the hero background image — has loaded,
 * then lifts away like a curtain and lets the hero entrance animations start.
 */
const MIN_VISIBLE_MS = 900; // avoid a flash on fast connections
const MAX_WAIT_MS = 8000; // never block the page forever

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    const start = performance.now();
    let timer: ReturnType<typeof setTimeout>;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      timer = setTimeout(() => {
        setPhase("leaving");
        document.documentElement.classList.remove("loading");
        timer = setTimeout(() => setPhase("done"), 900);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const failSafe = setTimeout(finish, MAX_WAIT_MS);

    return () => {
      clearTimeout(timer);
      clearTimeout(failSafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "leaving" ? "preloader-out" : ""}`} role="status" aria-label="Loading">
      <svg className="preloader-logo" viewBox="0 0 451 541" fill="none" aria-hidden>
        <g className="preloader-rays">
          <path
            d="M282.875 56.9609L238.53 45.083L201.16 184.499L167.422 58.6333L123.076 70.5112L159.528 206.499L68.7346 115.74L36.2716 148.191L135.861 247.744L11.8383 214.524L-0.0439453 258.853L135.466 295.149C133.915 288.46 133.094 281.49 133.094 274.329C133.094 223.637 174.203 182.543 224.913 182.543C275.624 182.543 316.733 223.637 316.733 274.329C316.733 281.444 315.922 288.371 314.39 295.021L437.543 328.007L449.425 283.679L313.376 247.238L437.407 214.016L425.524 169.688L289.481 206.126L380.274 115.367L347.811 82.9162L249.603 181.088L282.875 56.9609Z"
            fill="white"
          />
          <path d="M314.26 295.537C310.458 311.605 302.431 326.039 291.418 337.604L380.637 426.792L413.1 394.341L314.26 295.537Z" fill="white" />
          <path d="M290.517 338.537C279.371 349.917 265.285 358.409 249.489 362.786L281.954 483.903L326.298 472.024L290.517 338.537Z" fill="white" />
          <path d="M247.832 363.229C240.503 365.112 232.822 366.113 224.906 366.113C216.424 366.113 208.212 364.964 200.415 362.812L167.92 484.039L212.265 495.916L247.832 363.229Z" fill="white" />
          <path d="M198.847 362.365C183.292 357.771 169.457 349.17 158.538 337.757L69.0989 427.164L101.562 459.615L198.847 362.365Z" fill="white" />
          <path d="M157.801 336.967C147.069 325.482 139.252 311.24 135.531 295.421L11.9757 328.515L23.8579 372.843L157.801 336.967Z" fill="white" />
        </g>
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  );
}
