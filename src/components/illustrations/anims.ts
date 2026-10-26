import type { Anim, Label } from "./Illustration";

/* Idle animations per illustration.
   Layer indices refer to the arrays in data.ts (0-based). */

type Spec = { layers: Record<number, Anim>; labels: Record<string, Partial<Label>> };

function range(from: number, to: number, anim: Anim, step = 0): Record<number, Anim> {
  const out: Record<number, Anim> = {};
  for (let i = from; i <= to; i++) out[i] = [anim[0], anim[1] + (i - from) * step];
  return out;
}

/** ARCHITECT — the core cube floats, the little cube hops, blueprint wireframes blink in turn. */
export const architectAnims: Spec = {
  layers: {
    ...range(22, 33, ["a-blink", 0]),
    ...range(34, 45, ["a-blink", 0.9]),
    ...range(46, 57, ["a-blink", 1.8]),
    ...range(16, 18, ["a-float", 0]),
    ...range(19, 21, ["a-hop", 0]),
  },
  labels: {
    CORE: { anim: ["a-float", 0] },
    "SPEC 01": { anim: ["a-blink", 0] },
    "H—84": { anim: ["a-blink", 0] },
  },
};

/** DESIGNER — the three layers breathe apart (interface highest), token dots bounce in sequence. */
export const designerAnims: Spec = {
  layers: {
    ...range(22, 31, ["a-lift-lg", 0]),
    ...range(11, 17, ["a-lift-sm", 0]),
    3: ["a-dot", 0],
    4: ["a-dot", 0.15],
    5: ["a-dot", 0.3],
    6: ["a-dot", 0.45],
  },
  labels: {
    "03 INTERFACE": { anim: ["a-lift-lg", 0] },
    "02 COMPONENTS": { anim: ["a-lift-sm", 0] },
  },
};

/** BUILDER — modules lift and thud back into place one after another. */
export const builderAnims: Spec = {
  layers: {
    ...range(16, 18, ["a-drop", 0]), // AUTH
    ...range(19, 21, ["a-drop", 0.35]), // API
    ...range(5, 7, ["a-drop", 0.7]), // CORE
    ...range(13, 15, ["a-drop", 1.05]), // UI
  },
  labels: {
    AUTH: { anim: ["a-drop", 0] },
    API: { anim: ["a-drop", 0.35] },
    CORE: { anim: ["a-drop", 0.7] },
    UI: { anim: ["a-drop", 1.05] },
    "MODULE 04": { anim: ["a-drop", 1.05] },
  },
};

/** TESTER — passing cubes hop in order, the bug cube shakes, the scan plane pulses, the marker bobs. */
export const testerAnims: Spec = {
  layers: {
    ...range(6, 9, ["a-pass", 0]),
    ...range(10, 13, ["a-pass", 0.25]),
    ...range(14, 18, ["a-shake", 0.5]),
    ...range(19, 22, ["a-pass", 0.75]),
    ...range(23, 26, ["a-pass", 1]),
    27: ["a-pulse", 0],
    28: ["a-bob", 0],
    29: ["a-bob", 0],
  },
  labels: {
    "BUG #01": { anim: ["a-bob", 0] },
  },
};

/** OPTIMIZER — latency bars equalise, ring segments light up in a chase, score counts up to 98. */
export const optimizerAnims: Spec = {
  layers: {
    ...range(1, 3, ["a-eq", 0]),
    ...range(4, 6, ["a-eq", 0.2]),
    ...range(7, 9, ["a-eq", 0.4]),
    ...range(10, 12, ["a-eq", 0.6]),
    ...range(15, 24, ["a-seg", 0], 0.18),
    25: ["a-breathe", 0],
    26: ["a-breathe", 0],
  },
  labels: {
    "1.8S": { anim: ["a-eq", 0] },
    "1.1S": { anim: ["a-eq", 0.2] },
    "0.7S": { anim: ["a-eq", 0.4] },
    "0.4S": { anim: ["a-eq", 0.6] },
    "98": { countTo: 98 },
  },
};

export function withLabelAnims(labels: Label[], spec: Spec): Label[] {
  return labels.map((l) => ({ ...l, ...spec.labels[l.text] }));
}
