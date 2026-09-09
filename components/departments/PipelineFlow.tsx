"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Layers } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pipelineSteps = [
  { num: "01", name: "Production", action: "Research, scope & process architecture" },
  { num: "02", name: "Creative", action: "Identity, interfaces & asset systems" },
  { num: "03", name: "Technology", action: "Engineering, intelligence & automation" },
  { num: "04", name: "Operations", action: "Reporting, CRM & investor pipelines" },
  { num: "05", name: "Marketing", action: "Distribution, search & public trust" },
];

export default function PipelineFlow() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".pipeline-step",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-[#0a0a0b] text-white border-y border-zinc-800/80">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest">
              <Layers size={13} />
              How They Connect
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Five Departments, <span className="text-[#C39967]">One Pipeline.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            No department works alone. Every project flows through the hub in the same rigorous sequence from research to institutional distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pipelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="pipeline-step relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6">
                  <span className="font-bold text-[#C39967]">STEP {step.num}</span>
                  {idx < 4 && (
                    <ArrowRight size={14} className="text-zinc-600 hidden md:block" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.name}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {step.action}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}