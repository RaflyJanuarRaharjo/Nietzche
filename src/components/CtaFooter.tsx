import type { CSSProperties, ReactNode } from "react";

/* Absolute helper: coordinates are px inside the 1440×354 scene canvas (Figma frame y − 340). */
function At({
  x,
  y,
  w,
  h,
  className = "",
  style,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={`absolute ${className}`} style={{ left: x, top: y, width: w, height: h, ...style }}>
      {children}
    </div>
  );
}

/** Rotated prop: outer box = Figma bounding box, inner = unrotated size. */
function Rot({
  x,
  y,
  w,
  h,
  iw,
  ih,
  transform,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  iw: number;
  ih: number;
  transform: string;
  children: ReactNode;
}) {
  return (
    <At x={x} y={y} w={w} h={h} className="flex items-center justify-center">
      <div className="relative shrink-0" style={{ width: iw, height: ih, transform }}>
        {children}
      </div>
    </At>
  );
}

function Img({ src, style }: { src: string; style?: CSSProperties }) {
  return <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" style={style} />;
}

function Coin({
  size,
  edge,
  face,
  shines,
  glyph,
  glyphPos,
  glyphSize,
}: {
  size: [number, number, number];
  edge: string;
  face: string;
  shines: [string, number, number, number, number, string][];
  glyph: string;
  glyphPos: [number, number];
  glyphSize: number;
}) {
  const [w, faceH] = size;
  return (
    <>
      <div className="absolute left-0" style={{ top: 10, width: w, height: faceH }}>
        <Img src={edge} />
      </div>
      <div className="absolute top-0 left-0" style={{ width: w, height: faceH }}>
        <Img src={face} />
      </div>
      {shines.map(([src, x, y, sw, sh, pad]) => (
        <div key={src} className="absolute" style={{ left: x, top: y, width: sw, height: sh }}>
          <div className="absolute" style={{ inset: pad }}>
            <img src={src} alt="" className="block size-full max-w-none" />
          </div>
        </div>
      ))}
      <p
        className="absolute font-bold whitespace-nowrap text-[#b7791f]"
        style={{ left: glyphPos[0], top: glyphPos[1], fontSize: glyphSize, lineHeight: "normal" }}
      >
        {glyph}
      </p>
    </>
  );
}

function Confetti({ x, y, box, rotate, color }: { x: number; y: number; box: number; rotate: number; color: string }) {
  return (
    <At x={x} y={y} w={box} h={box} className="flex items-center justify-center">
      <div className="size-4 shrink-0 rounded-[3px]" style={{ background: color, transform: `rotate(${rotate}deg)` }} />
    </At>
  );
}

const GROUND_PATH =
  "M0 0L280 0C340 0 380 26.05 410 60.78C440 91.18 470 104.2 520 105.94C580 108.54 600 130.25 630 156.3C660 182.35 690 191.04 720 191.04C750 191.04 780 182.35 810 156.3C840 130.25 860 108.54 920 105.94C970 104.2 1000 91.18 1030 60.78C1060 26.05 1100 0 1160 0L1440 0L1440 897L0 897Z" +
  // flat extensions so screens wider than 1440px stay filled at the sides
  "M-3000 0H0V897H-3000Z M1440 0H4440V897H1440Z";

function Scene() {
  return (
    <div className="scene-fit w-full" aria-hidden>
      <div data-reveal="group" className="scene-box relative w-full overflow-clip">
        <div className="scene-canvas">
          {/* ground + shadows */}
          {/* Orange ground — vector path from Figma node 353:1027 (inline, no asset needed) */}
          <At x={0} y={100} w={1440} h={897}>
            <svg viewBox="0 0 1440 897" width="1440" height="897" overflow="visible" className="absolute inset-0 block" aria-hidden>
              <path fill="var(--brand)" d={GROUND_PATH} />
            </svg>
          </At>
          <At x={372} y={241} w={60} h={14}>
            <Img src="/figma/cta/58315.svg" />
          </At>
          <At x={1000} y={263} w={140} h={22}>
            <Img src="/figma/cta/b0bc0.svg" />
          </At>

          {/* jar with mascot */}
          <At x={628} y={269} w={184} h={30} className="rounded-[15px] bg-brand-dark" />
          <At x={632} y={63} w={176.071} h={224}>
            <div className="absolute" style={{ inset: "-1.12% -1.42%" }}>
              <img src="/figma/cta/beacb.svg" alt="" className="block size-full max-w-none" />
            </div>
          </At>
          <At x={636.5} y={63} w={167} h={24}>
            <Img src="/figma/cta/29762.svg" />
          </At>
          <At x={640} y={159} w={160} h={118} className="overflow-clip">
            <div className="float-slow absolute" style={{ left: 22, top: 6, width: 116, height: 193.957 }}>
              <Img src="/figma/cta/c5501.svg" />
            </div>
          </At>
          <At x={634} y={277} w={172} h={12} className="rounded-[6px] bg-brand-light" />

          {/* left cluster: cubes + gems */}
          <div className="burst float absolute inset-0" style={{ "--delay": "0.1s" } as CSSProperties}>
            <At x={350} y={85} w={96} h={110.4}>
              <Img src="/figma/cta/14279.svg" />
            </At>
            <At x={384} y={63} w={30} h={34.5}>
              <Img src="/figma/cta/e60a5.svg" />
            </At>
            <Rot x={437.79} y={133.13} w={28.428} h={31.348} iw={24} ih={27.6} transform="rotate(-10deg)">
              <Img src="/figma/cta/5825f.svg" />
            </Rot>
            <Rot x={465.61} y={158.99} w={26.779} h={29.321} iw={22} ih={25.3} transform="rotate(12deg)">
              <Img src="/figma/cta/2f514.svg" />
            </Rot>
            <Rot x={389.75} y={197.08} w={34.51} h={38.339} iw={30} ih={34.5} transform="rotate(-8deg)">
              <Img src="/figma/cta/5b39a.svg" />
            </Rot>
            <Rot x={476} y={206} w={26.779} h={29.321} iw={22} ih={25.3} transform="rotate(168deg) scale(1, -1)">
              <Img src="/figma/cta/29e04.svg" />
            </Rot>
          </div>

          {/* left coins */}
          <div className="burst float-slow absolute inset-0" style={{ "--delay": "0.2s" } as CSSProperties}>
            <Rot x={498.18} y={20.28} w={73.633} h={40.44} iw={70} ih={31} transform="rotate(8deg)">
              <Img src="/figma/cta/42c65.svg" />
            </Rot>
            <Rot x={487.36} y={66.96} w={101.279} h={54.881} iw={96} ih={38.8} transform="rotate(10deg)">
              <Coin
                size={[96, 28.8, 38.8]}
                edge="/figma/cta/43085.svg"
                face="/figma/cta/217a8.svg"
                shines={[
                  ["/figma/cta/20ebc.svg", 21.12, 6.34, 17.28, 14.4, "-17.36% -14.47%"],
                  ["/figma/cta/f84a8.svg", 32.64, 5.76, 11.52, 15.84, "-12.63% -17.36%"],
                ]}
                glyph="{ }"
                glyphPos={[44.8, 5.9]}
                glyphSize={14}
              />
            </Rot>
            <Rot x={524} y={130} w={137.993} h={78.994} iw={130} ih={49} transform="rotate(14deg)">
              <Coin
                size={[130, 39, 49]}
                edge="/figma/cta/8d2cb.svg"
                face="/figma/cta/18db3.svg"
                shines={[
                  ["/figma/cta/77dbd.svg", 28.6, 8.58, 23.4, 19.5, "-12.82% -10.68%"],
                  ["/figma/cta/0cb18.svg", 44.2, 7.8, 15.6, 21.45, "-9.32% -12.82%"],
                ]}
                glyph="</>"
                glyphPos={[54.5, 7.5]}
                glyphSize={20}
              />
            </Rot>
          </div>

          {/* heart */}
          <div className="burst float-fast absolute inset-0" style={{ "--delay": "0.3s" } as CSSProperties}>
            <Rot x={586.59} y={58.81} w={68.311} h={64.123} iw={57.5} ih={51.75} transform="rotate(-14deg)">
              <Img src="/figma/cta/a1b66.svg" />
            </Rot>
            <At x={604} y={75} w={10} h={10}>
              <Img src="/figma/cta/dc798.svg" />
            </At>
          </div>

          {/* right cluster */}
          <div className="burst float absolute inset-0" style={{ "--delay": "0.25s", animationDelay: "-1.5s" } as CSSProperties}>
            <Rot x={987} y={18} w={112.732} h={50.568} iw={110} ih={43} transform="rotate(4deg)">
              <Img src="/figma/cta/dd40e.svg" />
            </Rot>
            <Rot x={857.72} y={147} w={168.562} h={89.998} iw={160} ih={58} transform="rotate(12deg)">
              <div className="absolute" style={{ inset: "-6% 0 0 -25.84%" }}>
                <img src="/figma/cta/9303a.svg" alt="" className="block size-full max-w-none" />
              </div>
            </Rot>
          </div>
          <div className="burst float-fast absolute inset-0" style={{ "--delay": "0.35s", animationDelay: "-0.6s" } as CSSProperties}>
            <At x={896} y={59} w={46} h={80}>
              <Img src="/figma/cta/5b793.svg" />
            </At>
            <At x={893} y={54} w={43} h={81}>
              <Img src="/figma/cta/2ca17.svg" />
            </At>
          </div>
          <div className="burst float-slow absolute inset-0" style={{ "--delay": "0.4s" } as CSSProperties}>
            <Rot x={997.94} y={178.2} w={144.123} h={73.61} iw={140} ih={64} transform="rotate(4deg)">
              <Img src="/figma/cta/c39e1.svg" />
            </Rot>
          </div>

          {/* confetti */}
          <div className="burst float-fast absolute inset-0" style={{ "--delay": "0.5s" } as CSSProperties}>
            <Confetti x={1012.37} y={106.37} box={21.263} rotate={25} color="#b6ccff" />
            <Confetti x={467.07} y={10.07} box={21.856} rotate={-30} color="#ffc83d" />
            <Confetti x={958.2} y={11.2} box={19.596} rotate={15} color="#ff8cc4" />
          </div>
        </div>
      </div>
    </div>
  );
}

const columns: { title: string; links: string[] }[][] = [
  [{ title: "About us", links: ["Our story", "Mission", "How it works", "Meet the agents", "Research", "Careers", "Press", "Contact us"] }],
  [{ title: "Product", links: ["Nietzsche", "Architect", "Designer", "Builder", "Tester", "Optimizer", "Pricing"] }],
  [{ title: "Apps", links: ["Nietzsche for macOS", "Nietzsche for Windows"] }],
  [{ title: "Help and support", links: ["Docs", "FAQ", "Changelog", "Status"] }],
  [
    { title: "Privacy and terms", links: ["Community guidelines", "Terms", "Privacy"] },
    { title: "Social", links: ["Blog", "Instagram", "TikTok", "X / Twitter", "YouTube", "LinkedIn"] },
  ],
];

export default function CtaFooter() {
  return (
    <footer className="bg-white">
      {/* CTA */}
      <div data-reveal="group" className="flex flex-col items-center gap-[34px] px-4 pt-16 md:pt-[79px]">
        <h2 className="stagger-item max-w-[900px] text-center font-display text-[34px] leading-[1.12] text-brand sm:text-[48px] md:text-[64px]">
          build your next product
          <br />
          with a team of agents
        </h2>
        <a
          href="#prompt"
          style={{ "--i": 3 } as CSSProperties}
          className="stagger-item shine flex h-[50px] w-full max-w-[290px] items-center justify-center rounded-[14px] bg-brand text-[15px] font-bold tracking-[0.9px] text-white shadow-[0_5px_0_0_var(--brand-dark)] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_var(--brand-dark)] active:translate-y-[5px] active:shadow-none"
        >
          START BUILDING
        </a>
      </div>

      <div className="mt-[33px]">
        <Scene />
      </div>

      {/* Footer */}
      <div className="bg-brand">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[57px] px-4 pt-6 pb-[57px] md:px-10 lg:px-20 lg:pt-0">
          <nav data-reveal="group" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:flex lg:justify-between">
            {columns.map((col, i) => (
              <div key={i} className="stagger-item flex flex-col gap-10" style={{ "--i": i } as CSSProperties}>
                {col.map((g) => (
                  <div key={g.title} className="flex flex-col gap-4 font-bold lg:w-40">
                    <h3 className="text-[19px] leading-[1.3] text-white">{g.title}</h3>
                    <ul className="flex flex-col gap-4">
                      {g.links.map((l) => (
                        <li key={l}>
                          <a href="#" className="inline-block text-sm text-white/75 transition-all hover:translate-x-1 hover:text-white">
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </nav>

          <div className="h-[1.5px] w-full bg-white/55" />

          <div className="flex flex-col gap-[18px] font-bold whitespace-nowrap">
            <p className="text-[15px] text-white">Site language:</p>
            <div className="flex gap-7 text-sm text-white/75">
              <button type="button" className="transition-colors hover:text-white">
                English
              </button>
              <button type="button" className="transition-colors hover:text-white">
                Bahasa Indonesia
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
