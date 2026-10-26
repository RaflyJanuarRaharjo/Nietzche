"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Feature", href: "#agents" },
  { label: "How it works", href: "#prompt" },
  { label: "Testimonial", href: "#testimonial" },
];

export function Logo() {
  return (
    <a href="#" className="flex items-start gap-[10px]" aria-label="Nietzsche home">
      <img src="/figma/hero/34cca.svg" alt="" width={40} height={48} className="h-12 w-10" />
      <img src="/figma/hero/dc392.svg" alt="Nietzsche" width={118} height={48} className="h-12 w-[118px]" />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`enter-down sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "nav-scrolled" : ""}`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-10 lg:px-20 lg:py-8">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="border border-neutral-200 bg-off-white px-[14px] py-2 text-[13px] leading-[1.2] font-medium tracking-[-0.13px] text-neutral-500">
            BETA
          </span>
        </div>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[20px] leading-9 tracking-[-0.4px] text-neutral-800 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#"
            className="rounded border border-neutral-200 bg-off-white px-6 py-4 text-base leading-[1.2] font-medium tracking-[-0.16px] text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="rounded border border-neutral-800 bg-neutral-900 px-6 py-4 text-base leading-[1.2] font-medium tracking-[-0.16px] text-neutral-50 transition-colors hover:bg-neutral-800"
          >
            Download
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded border border-neutral-200 bg-off-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#171717" strokeWidth="1.8" strokeLinecap="round">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="enter border-t border-neutral-200 bg-white px-4 pb-6 [--delay:0s] md:px-10 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg tracking-[-0.36px] text-neutral-800"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <a href="#" className="flex-1 rounded border border-neutral-200 bg-off-white px-6 py-4 text-center font-medium text-neutral-950">
              Sign Up
            </a>
            <a href="#" className="flex-1 rounded border border-neutral-800 bg-neutral-900 px-6 py-4 text-center font-medium text-neutral-50">
              Download
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
