"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Layers, ArrowRight, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const buildStages = [
  {
    phase: "PHASE 01",
    title: "Scoping & Blueprinting",
    desc: "Translating business and capital objectives into deterministic architecture specifications, data schemas, and API contracts.",
    deliverable: "System Requirements Doc & Schema Spec",
  },
  {
    phase: "PHASE 02",
    title: "Engineering & Hardening",
    desc: "Writing production-grade full-stack code with strict TypeScript enforcement, cryptographic security checks, and sub-100ms response targets.",
    deliverable: "Production Codebase & Security Review",
  },
  {
    phase: "PHASE 03",
    title: "Continuous Verification",
    desc: "Running synthetic stress testing, AAOIFI audit checks, and zero-downtime staging runs before any code reaches production.",
    deliverable: "Zero-Variance Audit Verification",
  },
  {
    phase: "PHASE 04",
    title: "Deployment & 24/7 Telemetry",
    desc: "Shipping to global edge CDN caches with round-the-clock live health monitoring, automated failover routing, and telemetry reporting.",
    deliverable: "Live Cluster Operational Status",
  },
];

export default function HowWeBuildTimeline() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".stage-card",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
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
    <section ref={container} className="py-24 md:py-32 bg-[#0a0a0b] text-white border-y border-zinc-800/80">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest">
              <Layers size={13} />
              How We Build
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              From Idea To <span className="text-[#C39967]">Shipped System.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Every system follows the same disciplined path through the hub to ensure institutional resilience.
          </p>
        </div>

        {/* 4-Stage Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildStages.map((st, idx) => (
            <div
              key={idx}
              className="stage-card relative p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6">
                  <span className="font-bold text-[#C39967]">{st.phase}</span>
                  {idx < 3 && (
                    <ArrowRight size={14} className="text-zinc-600 hidden lg:block" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {st.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/70 flex items-center gap-2 text-[11px] font-mono text-zinc-300">
                <CheckCircle2 size={13} className="text-[#C39967] shrink-0" />
                <span className="truncate">{st.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}