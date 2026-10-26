"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Inline mascots sit in the sentence like words. */

function BrandBadge() {
  return (
    <span className="badge relative mx-2 inline-block size-[1.417em] overflow-clip rounded-xl border-2 border-white/12 bg-brand align-middle">
      <span
        className="absolute -inset-[2px]"
        style={{ backgroundImage: "linear-gradient(177.6deg, rgba(255,255,255,0) 2%, rgba(255,255,255,0.12) 98%)" }}
      />
      <span className="badge-sheen absolute inset-0" />
      {/* Logomark wrapper 30×36, centred; SVG outset as in Figma */}
      <span className="logo-spin absolute top-[calc(50%+0.5px)] left-[calc(50%+0.5px)] h-[0.706em] w-[0.588em] -translate-x-1/2 -translate-y-1/2">
        <img
          src="/figma/intro/84e32.svg"
          alt=""
          className="absolute block max-w-none"
          style={{ top: 0, left: "-10%", width: "119.65%", height: "106.25%" }}
        />
      </span>
    </span>
  );
}

function BlueMascot() {
  return (
    <span className="blue-mascot mx-2 inline-block size-[1.72em] align-middle">
      <span className="blue-bob block size-full">
        <img src="/figma/intro/f1dc3.svg" alt="" className="block size-full max-w-none -scale-x-100" />
      </span>
    </span>
  );
}

/** "Component 1" — pink mascot peeking behind a grey card (71×59 at 36px type). */
function PeekMascot() {
  return (
    <span className="peek relative mx-2 inline-block h-[1.64em] w-[1.97em] align-middle">
      <span className="peek-pink absolute top-[9.08%] right-0 bottom-[16.48%] left-[37.93%]">
        <img src="/figma/intro/fd2a0.svg" alt="" className="absolute inset-0 block size-full max-w-none" />
      </span>
      <span className="peek-glow absolute top-[1.73%] right-[22.97%] bottom-[10.12%] left-[27.31%] flex items-center justify-center">
        <span
          className="h-[90%] w-[75%] shrink-0 -rotate-11 blur-[2px]"
          style={{ backgroundImage: "linear-gradient(97.35deg, rgb(255,170,0) 10.4%, rgba(255,170,0,0) 89.6%)" }}
        />
      </span>
      <span className="peek-card absolute top-0 right-[44.32%] bottom-0 left-0 flex items-center justify-center">
        <span className="h-[92.5%] w-[77.7%] shrink-0 rotate-[-9.72deg] rounded-lg bg-[#d9d9d9]" />
      </span>
      <span className="peek-card absolute top-[0.46%] right-[46.56%] bottom-0 left-0 flex items-center justify-center">
        <span className="h-[93%] w-[76.7%] shrink-0 rotate-[-9.72deg] rounded-lg bg-gradient-to-b from-neutral-500 to-neutral-600" />
      </span>
    </span>
  );
}

/**
 * Tokens (words + mascots) get an index --i. The section exposes scroll progress --p (0 → 1);
 * CSS turns that into a per-token progress --w, so the paragraph "lights up" as you scroll.
 */
function makeTokens() {
  let i = 0;
  const words = (text: string) =>
    text
      .trim()
      .split(/\s+/)
      .map((w) => (
        <span key={i} className="sword" style={{ "--i": i++ } as CSSProperties}>
          {w}
        </span>
      ))
      .flatMap((el, k, arr) => (k < arr.length - 1 ? [el, " "] : [el]));
  const mascot = (node: ReactNode) => (
    <span className="smascot inline-block" style={{ "--i": i++ } as CSSProperties}>
      {node}
    </span>
  );
  return { words, mascot, count: () => i };
}

/** Writes scroll progress of the paragraph into --p (0 when it enters, 1 when it reaches mid-screen). */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.9 - r.top) / (r.height + vh * 0.4);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return ref;
}

export default function Intro() {
  const ref = useScrollProgress<HTMLElement>();
  const { words, mascot, count } = makeTokens();

  const content = (
    <>
      {words("We are")}
      {mascot(<BrandBadge />)}
      {words(", a team of AI agents")}
      {mascot(<BlueMascot />)}
      {words(
        "working together to turn ideas into software. Each agent brings its own expertise, from planning and writing code to testing",
      )}{" "}
      <span>
        {words("and refining, making software development")}
        {mascot(<PeekMascot />)}
        {words("simpler, faster, and more seamless from start to finish.")}
      </span>
    </>
  );

  return (
    <section
      ref={ref}
      id="about"
      className="scroll-intro relative scroll-mt-28 bg-white"
      style={{ "--p": 0, "--n": count() } as CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]">
        <img src="/figma/intro/216b2.svg" alt="" className="burst-r spin-slow absolute top-[-127px] right-[-78px] h-[276px] w-[274.5px] max-w-none" />
        <img src="/figma/intro/427d7.svg" alt="" className="burst-l spin-slow-reverse absolute top-[-282px] left-[-165px] h-[517px] w-[518px] max-w-none" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-[120px] lg:px-20">
        <p className="mx-auto max-w-[1280px] text-center font-display text-[22px] leading-[2] tracking-[-0.44px] text-neutral-900 md:text-[30px] lg:text-[36px] lg:tracking-[-0.72px]">
          {content}
        </p>
      </div>
    </section>
  );
}
