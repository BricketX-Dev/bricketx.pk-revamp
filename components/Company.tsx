"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    id: "01",
    label: "Core Mandate",
    value: "Proprietary Infrastructure",
    desc: "We exclusively build the internal systems that power the global BricketX network. We do not operate as an external agency.",
  },
  {
    id: "02",
    label: "Global Reach",
    value: "Four Strategic Nodes",
    desc: "Direct operational telemetry connecting our Karachi engineering hub with institutional desks in London, Dubai, and Nairobi.",
  },
  {
    id: "03",
    label: "Execution",
    value: "Institutional Scale",
    desc: "Built for continuous operation. Zero-downtime deployments, deterministic workflows, and high-frequency data pipelines.",
  },
  {
    id: "04",
    label: "Governance",
    value: "Shariah Compliant",
    desc: "Ethical logic and immutable auditing ledgers are mathematically baked directly into the core codebase.",
  },
];

export default function Company() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant, slow fade-up for the narrative
    gsap.fromTo(
      ".company-narrative",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    // Precise line-by-line reveal for the list
    gsap.fromTo(
      ".company-list-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".company-list",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="company" 
      className="relative w-full py-32 md:py-40 bg-[#050505] text-[#F4F5F7] border-y border-zinc-800/50"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Clean Narrative */}
          <div className="lg:col-span-5 flex flex-col sticky top-32">
            <h2 className="company-narrative text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.05]">
              <span className="font-light text-zinc-500 block mb-2 tracking-tight">Institutional DNA.</span>
              <span>Engineering Precision.</span>
            </h2>
            
            <p className="company-narrative text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
              BricketX operates at the intersection of sovereign capital and high-performance technology. As the dedicated Engine Room, our mandate is exclusively focused on architecture, deployment, and operational continuity.
            </p>

            <div className="company-narrative">
              <a
                href="#careers"
                className="group inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-[#C39967] hover:text-white transition-colors"
              >
                <span>View Engineering Culture</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Minimalist Data List */}
          <div className="lg:col-span-7 company-list">
            <div className="border-t border-zinc-800/80">
              {stats.map((stat) => (
                <div 
                  key={stat.id}
                  className="company-list-item group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-10 border-b border-zinc-800/80 hover:border-zinc-600 transition-colors"
                >
                  {/* Monospace Identifier */}
                  <div className="font-mono text-xs font-bold text-zinc-600 pt-1 shrink-0 group-hover:text-[#C39967] transition-colors">
                    {stat.id} //
                  </div>
                  
                  {/* Content Block */}
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2">
                      {stat.label}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-lg">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}