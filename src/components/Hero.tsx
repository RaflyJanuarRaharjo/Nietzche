"use client";

import { useEffect, useRef, useState } from "react";

type Attachment = { id: number; name: string };

const ICONS: Record<string, string> = {
  pdf: "/figma/hero/2ee58.svg",
  jpg: "/figma/hero/d5da7.svg",
  png: "/figma/hero/d5da7.svg",
  jpeg: "/figma/hero/d5da7.svg",
  zip: "/figma/hero/def74.svg",
};

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return ICONS[ext] ?? ICONS.pdf;
}

const initial: Attachment[] = [
  { id: 1, name: "brief-requirement.pdf" },
  { id: 2, name: "char.png" },
  { id: 3, name: "reference.zip" },
];

const PHRASES = [
  "Add instructions from  attached images...",
  "Turn the brief into a working landing page...",
  "Use char.png as the onboarding mascot...",
  "Ship a dashboard with auth and billing...",
];

/** Types each phrase, pauses, deletes it, then moves to the next. */
function useTypewriter(phrases: string[]) {
  const [out, setOut] = useState(phrases[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let p = 0;
    let i = phrases[0].length;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = phrases[p];
      if (!deleting && i === phrase.length) {
        deleting = true;
        t = setTimeout(tick, 2200);
        return;
      }
      if (deleting && i === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
        t = setTimeout(tick, 300);
        return;
      }
      i += deleting ? -1 : 1;
      setOut(phrases[p].slice(0, i));
      t = setTimeout(tick, deleting ? 18 : 42);
    };
    t = setTimeout(tick, 2600);
    return () => clearTimeout(t);
  }, [phrases]);
  return out;
}

function PromptBox() {
  const [files, setFiles] = useState<Attachment[]>(initial);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(initial.length + 1);
  const typed = useTypewriter(PHRASES);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const added = Array.from(list).map((f) => ({ id: nextId.current++, name: f.name }));
    setFiles((prev) => [...prev, ...added]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() && files.length === 0) return;
    setSent(true);
    setText("");
    setTimeout(() => setSent(false), 2600);
  }

  return (
    <form
      onSubmit={submit}
      className="relative flex w-full max-w-[1087px] flex-col gap-2 rounded-[20px] border border-neutral-200 bg-neutral-100 p-2"
    >
      {files.length > 0 && (
        <ul className="flex flex-wrap items-center gap-2">
          {files.map((f, i) => (
            <li
              key={f.id}
              style={{ "--delay": `${f.id <= initial.length ? 0.9 + i * 0.12 : 0}s` } as React.CSSProperties}
              className="chip-in flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white py-2 pr-4 pl-2 md:gap-4"
            >
              <img src={iconFor(f.name)} alt="" width={36} height={36} className="size-7 md:size-9" />
              <span className="max-w-[180px] truncate text-base leading-7 font-medium text-neutral-800 md:max-w-none md:text-2xl md:leading-9">
                {f.name}
              </span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                className="rounded-md transition-opacity hover:opacity-60"
              >
                <img src="/figma/hero/3142e.svg" alt="" width={24} height={24} className="size-5 md:size-6" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex w-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white px-4 py-4 md:gap-8 md:px-8 md:py-6">
        <label htmlFor="prompt" className="sr-only">
          Instructions
        </label>
        <textarea
          id="prompt"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={sent ? "Your agents are on it…" : typed}
          className="w-full resize-none bg-transparent text-lg leading-8 text-neutral-800 outline-none placeholder:text-neutral-600 md:text-2xl md:leading-9"
        />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[9px]">
            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              aria-label="Attach files"
              onClick={() => inputRef.current?.click()}
              className="grid size-11 place-items-center rounded-xl border border-neutral-200 bg-white transition-colors hover:bg-neutral-100 md:size-[52px]"
            >
              <img src="/figma/hero/06206.svg" alt="" width={24} height={24} className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Voice input"
              className="grid size-11 place-items-center rounded-xl border border-neutral-200 bg-white transition-colors hover:bg-neutral-100 md:size-[52px]"
            >
              <img src="/figma/hero/03932.svg" alt="" width={24} height={24} className="size-6" />
            </button>
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 whitespace-nowrap transition-colors hover:bg-neutral-100 md:h-[52px] md:px-4 md:py-3"
            >
              <img src="/figma/hero/b9576.svg" alt="" width={24} height={28} className="h-7 w-6" />
              <span className="text-base leading-9 font-semibold text-neutral-800">NTZ 5.0</span>
            </button>
          </div>
          <button
            type="submit"
            aria-label="Send"
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-neutral-800 bg-neutral-950 md:size-[52px] transition-transform hover:scale-105 hover:-rotate-6 active:scale-95"
          >
            <img src="/figma/hero/6e13e.svg" alt="" width={24} height={24} className="size-6" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-neutral-50">
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-4 pt-14 pb-14 md:gap-20 md:px-10 md:pt-20 md:pb-20 lg:px-20">
        <div className="flex flex-col items-center gap-4 text-center md:gap-6">
          <h1 className="font-display text-[32px] leading-[1.25] tracking-[-0.64px] text-neutral-900 md:text-[48px] md:leading-[72px] md:tracking-[-0.96px]">
            {"Build and launch high performing software with AI".split(" ").map((w, i) => (
              <span key={i} className="word-enter" style={{ "--i": i } as React.CSSProperties}>
                {w}
                {i < 7 ? "\u00a0" : ""}
              </span>
            ))}
          </h1>
          <p style={{ "--delay": "0.55s" } as React.CSSProperties} className="enter max-w-[1135px] text-lg leading-7 font-medium text-neutral-600 md:text-2xl md:leading-9">
            A different kind of digital studio, bringing design, technology, and distinct minds together to build what’s
            next
          </p>
        </div>

        <div
          id="prompt"
          style={{ "--delay": "0.7s" } as React.CSSProperties}
          className="enter-scale relative flex w-full max-w-[1177px] scroll-mt-32 justify-center overflow-clip border-[5px] border-neutral-200 p-3 md:p-10"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80">
            <img
              src="/figma/hero/88739.png"
              alt=""
              className="drift absolute top-0 left-[-3.14%] h-auto min-h-full w-[108.33%] max-w-none object-cover object-top"
            />
          </div>
          <PromptBox />
        </div>
      </div>
    </section>
  );
}
