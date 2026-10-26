import type { CSSProperties } from "react";
import { Illustration, type Anim, type Label, type Layer } from "./illustrations/Illustration";
import {
  architectAnims,
  builderAnims,
  designerAnims,
  optimizerAnims,
  testerAnims,
  withLabelAnims,
} from "./illustrations/anims";
import {
  architectLabels,
  architectLayers,
  builderLabels,
  builderLayers,
  designerLabels,
  designerLayers,
  optimizerLabels,
  optimizerLayers,
  testerLabels,
  testerLayers,
} from "./illustrations/data";

type Agent = {
  role: string;
  description: string;
  bg: string;
  width: 391 | 608;
  layers: Layer[];
  labels: Label[];
  anims: Record<number, Anim>;
  span: string;
};

const agents: Agent[] = [
  {
    role: "ARCHITECT",
    description: "Turns your ideas into structured plans, clear requirements, and a solid foundation for development.",
    bg: "#eef4ff",
    width: 391,
    layers: architectLayers,
    labels: withLabelAnims(architectLabels, architectAnims),
    anims: architectAnims.layers,
    span: "lg:col-span-2",
  },
  {
    role: "DESIGNER",
    description:
      "Transforms concepts into thoughtful interfaces, intuitive user experiences, and polished designs ready to be built.",
    bg: "#fff0f5",
    width: 391,
    layers: designerLayers,
    labels: withLabelAnims(designerLabels, designerAnims),
    anims: designerAnims.layers,
    span: "lg:col-span-2",
  },
  {
    role: "BUILDER",
    description: "Writes clean, reliable code and brings designs to life as functional software, built to work seamlessly.",
    bg: "#fff5ea",
    width: 391,
    layers: builderLayers,
    labels: withLabelAnims(builderLabels, builderAnims),
    anims: builderAnims.layers,
    span: "lg:col-span-2",
  },
  {
    role: "TESTER",
    description: "Finds bugs, checks functionality, and makes sure everything works as expected before it ships.",
    bg: "#ecfbf3",
    width: 608,
    layers: testerLayers,
    labels: withLabelAnims(testerLabels, testerAnims),
    anims: testerAnims.layers,
    span: "lg:col-span-3",
  },
  {
    role: "OPTIMIZER",
    description: "Refines performance, improves code quality, and helps your software run faster and smoother.",
    bg: "#f4f0ff",
    width: 608,
    layers: optimizerLayers,
    labels: withLabelAnims(optimizerLabels, optimizerAnims),
    anims: optimizerAnims.layers,
    span: "md:col-span-2 lg:col-span-3",
  },
];

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <article
      tabIndex={0}
      data-reveal="scale"
      style={{ "--delay": `${(index < 3 ? index : index - 3) * 0.12}s` } as CSSProperties}
      className={`agent-card flex flex-col gap-5 overflow-clip rounded-[20px] border border-border-default bg-white px-[10px] pt-[10px] pb-6 outline-none hover:shadow-[0_12px_32px_-12px_rgba(23,23,23,0.18)] focus-visible:ring-2 focus-visible:ring-brand ${agent.span}`}
    >
      <div className="illu-fit w-full">
        <div
          className="illu-box relative w-full overflow-clip rounded-[14px] border border-border-subtle"
          style={{ background: agent.bg, "--illu-w": `${agent.width}px` } as CSSProperties}
        >
          <Illustration layers={agent.layers} labels={agent.labels} anims={agent.anims} />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-[14px]">
        <h3 className="font-display text-[20px] leading-normal text-neutral-900">{agent.role}</h3>
        <p className="text-base leading-[1.55] text-fg-muted">{agent.description}</p>
      </div>
    </article>
  );
}

export default function Agents() {
  return (
    <section id="agents" className="relative scroll-mt-28 bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]">
        <img src="/figma/agents/ca5f1.svg" alt="" className="spin-slow absolute top-[-2px] right-[-56px] size-[159px] max-w-none md:top-[-3px] md:right-[-88px] md:size-[247px] lg:top-[-4px] lg:right-[-125px] lg:size-[353px]" />
        <img src="/figma/agents/ef981.svg" alt="" className="spin-slow-reverse absolute top-[802px] left-[-80px] size-[159px] max-w-none md:left-[-124px] md:size-[247px] lg:left-[-177px] lg:size-[353px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12 px-4 py-20 md:gap-20 md:px-10 md:py-[120px] lg:px-20">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <h2 data-reveal="left" className="font-display text-[32px] leading-[1.2] tracking-[-0.64px] text-neutral-900 md:text-[44px] md:leading-[52px] md:tracking-[-0.88px]">
            Different minds. One mission
          </h2>
          <p data-reveal="right" style={{ "--delay": "0.15s" } as CSSProperties} className="max-w-[566px] text-lg leading-7 font-medium text-fg-muted md:text-[20px] lg:text-right">
            Meet the agents behind Nietzsche, each built for a specific role, working together to turn ideas into
            functional software
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-6">
          {agents.map((a, i) => (
            <AgentCard key={a.role} agent={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
