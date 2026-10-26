import type { CSSProperties } from "react";

/** [src, default inset, hover inset, svg outset] — straight from the Figma Default/Hover variants. */
export type Layer = [src: string, d: string, h: string, pad: string];

/** Idle animation: [keyframe class, delay in seconds]. */
export type Anim = [name: string, delay: number];

/** Isometric text label. Transforms match Figma's rotate/skew/scale combos. */
export type Label = {
  text: string;
  left: number;
  w: number;
  h: number;
  d: number; // top (default)
  hv: number; // top (hover)
  t: "A" | "B" | "C";
  weight: 400 | 500 | 600;
  color: string;
  size: number;
  anim?: Anim;
  /** Renders a number that counts up from 0 (e.g. the speed score). */
  countTo?: number;
};

const TRANSFORMS = {
  A: "rotate(30deg) scale(1, 0.87) skewX(-30deg)",
  B: "rotate(-30deg) scale(1, 0.87) skewX(30deg)",
  C: "rotate(-30deg) scale(1, 0.87) skewX(-30deg)",
};

function animProps(anim?: Anim) {
  if (!anim) return {};
  return { className: `illu-anim ${anim[0]}`, style: { animationDelay: `${anim[1]}s` } };
}

export function Illustration({
  layers,
  labels,
  anims = {},
}: {
  layers: Layer[];
  labels: Label[];
  /** layer index → idle animation */
  anims?: Record<number, Anim>;
}) {
  return (
    <div className="illu-canvas" aria-hidden>
      {layers.map(([src, d, h, pad], i) => {
        const a = animProps(anims[i]);
        return (
          <div key={i} className="illu-layer" style={{ "--d": d, "--h": h } as CSSProperties}>
            <div className={`absolute ${a.className ?? ""}`} style={{ inset: pad, ...a.style }}>
              <img src={src} alt="" className="block size-full max-w-none" />
            </div>
          </div>
        );
      })}
      {labels.map((l) => {
        const a = animProps(l.anim);
        return (
          <div
            key={l.text}
            className={`illu-label flex items-center justify-center ${a.className ?? ""}`}
            style={{ left: l.left, width: l.w, height: l.h, "--d": `${l.d}px`, "--h": `${l.hv}px`, ...a.style } as CSSProperties}
          >
            <p
              className="shrink-0 whitespace-nowrap font-mono"
              style={{
                transform: TRANSFORMS[l.t],
                fontWeight: l.weight,
                color: l.color,
                fontSize: l.size,
                letterSpacing: l.size * 0.04,
                lineHeight: "normal",
              }}
            >
              {l.countTo !== undefined ? (
                <span className="count-up" style={{ "--to": l.countTo } as CSSProperties} data-final={l.countTo} />
              ) : (
                l.text
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
