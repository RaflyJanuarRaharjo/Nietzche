"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Quote = {
  lead: string;
  rest: string;
  name: string;
  /** company shown under the name; "ollio" uses the Figma logo */
  company: { kind: "ollio" } | { kind: "image"; name: string; src: string; width: number };
};

// Placeholder testimonials — replace with real ones. The arrows cycle through this list.
const quotes: Quote[] = [
  {
    lead: "“Nietzsche makes the whole development process feel more connected. I can go from",
    rest: " an idea to a working product without constantly switching between tools.”",
    name: "Rafly Januar Raharjo",
    company: { kind: "ollio" },
  },
  {
    lead: "“The Architect turned our messy brief into a clear plan in minutes.",
    rest: " We started building the same afternoon instead of the next sprint.”",
    name: "Nadia Putri",
    company: { kind: "image", name: "Peregrin", src: "/logos/peregrin.png", width: 165 },
  },
  {
    lead: "“Having a Tester agent catch bugs before review changed how our team ships.",
    rest: " Releases feel calm now, not like a gamble.”",
    name: "Dimas Prasetyo",
    company: { kind: "image", name: "Railspeed", src: "/logos/railspeed.png", width: 170 },
  },
  {
    lead: "“Designer and Builder work like one person.",
    rest: " What I approve in the mockup is exactly what lands in production.”",
    name: "Sarah Wijaya",
    company: { kind: "image", name: "Voxel Labs", src: "/logos/voxel-labs.png", width: 191 },
  },
];

function OllioLogo() {
  return (
    <div className="flex items-start gap-2" aria-label="Ollio">
      <img src="/figma/testimonial/f2e0d.svg" alt="" width={40} height={48} className="h-12 w-10" />
      <img src="/figma/testimonial/83bf2.svg" alt="Ollio" width={57} height={48} className="h-12 w-[57px]" />
    </div>
  );
}

function CompanyMark({ company }: { company: Quote["company"] }) {
  if (company.kind === "ollio") return <OllioLogo />;
  return <img src={company.src} alt={company.name} width={company.width} height={48} className="h-12 w-auto" />;
}

function ArrowButton({ dir, onClick, label }: { dir: "prev" | "next"; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group grid place-items-center rounded border border-neutral-200 bg-off-white px-6 py-4 transition-all hover:-translate-y-0.5 hover:bg-neutral-200 active:scale-95"
    >
      <img
        src="/figma/testimonial/04ee5.svg"
        alt=""
        width={18}
        height={18}
        className={`size-[18px] transition-transform ${dir === "prev" ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
      />
    </button>
  );
}

export default function Testimonial() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const q = quotes[i];

  const go = (step: 1 | -1) => {
    setDir(step === 1 ? "next" : "prev");
    setI((n) => (n + step + quotes.length) % quotes.length);
  };

  // ← / → keys while the section is on screen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.getElementById("testimonial");
      if (!el || (e.target as HTMLElement)?.closest("input, textarea")) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const swap = dir === "next" ? "swap-next" : "swap-prev";

  return (
    <section id="testimonial" className="relative scroll-mt-28 bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]">
        <img src="/figma/testimonial/a66b8.svg" alt="" className="spin-slow absolute top-[28px] left-[-141px] h-[283px] w-[281px] max-w-none md:top-[43px] md:left-[-220px] md:h-[440px] md:w-[437px] lg:top-[62px] lg:left-[-314px] lg:h-[628px] lg:w-[624.6px]" />
        <img src="/figma/testimonial/a66b8.svg" alt="" className="spin-slow-reverse absolute top-[28px] right-[-141px] h-[283px] w-[281px] max-w-none md:top-[43px] md:right-[-220px] md:h-[440px] md:w-[437px] lg:top-[62px] lg:right-[-314px] lg:h-[628px] lg:w-[624.6px]" />
      </div>

      <figure
        data-reveal="scale"
        className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-10 px-4 py-24 md:px-10 md:py-40 lg:px-20"
      >
        {/* fixed min-height so the layout doesn't jump between quotes of different length */}
        <div className="grid min-h-[168px] w-full max-w-[1110px] place-items-center md:min-h-[216px]" aria-live="polite">
          <blockquote
            key={`q-${i}`}
            className={`${swap} text-center font-display text-[24px] leading-[1.75] tracking-[-0.48px] text-neutral-900 md:text-[32px] lg:text-[40px] lg:leading-[72px] lg:tracking-[-0.8px]`}
          >
            {q.lead}
            {q.rest}
          </blockquote>
        </div>

        <figcaption className="flex flex-col items-center gap-6">
          <div key={`a-${i}`} className={`${swap} flex flex-col items-center gap-4`} style={{ animationDelay: "0.08s" } as CSSProperties}>
            <span className="text-2xl leading-9 font-medium tracking-[-0.64px] text-neutral-500 md:text-[32px]">{q.name}</span>
            <CompanyMark company={q.company} />
          </div>

          <div className="flex items-center gap-4">
            <ArrowButton dir="prev" label="Previous testimonial" onClick={() => go(-1)} />
            <ArrowButton dir="next" label="Next testimonial" onClick={() => go(1)} />
          </div>

          <div className="flex gap-2" role="tablist" aria-label="Testimonials">
            {quotes.map((_, k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={`Testimonial ${k + 1}`}
                onClick={() => {
                  if (k === i) return;
                  setDir(k > i ? "next" : "prev");
                  setI(k);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-brand" : "w-1.5 bg-neutral-200 hover:bg-neutral-500"}`}
              />
            ))}
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
