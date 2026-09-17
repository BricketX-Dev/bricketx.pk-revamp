"use client";

import { useRef, MouseEvent } from "react";
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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Dynamic glow tracking
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D physics calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      z: 20,
      scale: 1.02,
      y: -8,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Smooth reset
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      y: 0,
      ease: "power3.out",
      duration: 0.7,
    });
  };

  return (
    <section ref={container} className="py-24 md:py-32 bg-[#0a0a0b] text-white border-y border-zinc-800/80 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest">
              <Layers size={13} />
              How We Build
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
              From Idea To <span className="text-[#C39967]">Shipped System.</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed">
              Every system follows the same disciplined path through the hub to ensure institutional resilience.
            </p>
          </div>
        </div>

        {/* 4-Stage Process */}
        <div 
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-[calc(100%+3rem)] -ml-6 px-[8vw] sm:px-[6vw] md:w-full md:ml-0 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ perspective: "1200px" }}
        >
          {buildStages.map((st, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="stage-card group w-[80vw] sm:w-[50vw] md:w-auto shrink-0 snap-center relative p-7 rounded-2xl border border-zinc-800/80 hover:border-[#C39967]/70 hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.25)] transition-[border-color,box-shadow] duration-500 ease-out flex flex-col justify-between cursor-pointer will-change-transform overflow-hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.15), transparent 70%), rgba(24, 24, 27, 0.4)`,
              }}
            >
              {/* Animated Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 group-hover:h-1.5 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-30 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none" />

              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6 group-hover:text-zinc-400 transition-colors duration-300">
                  <span className="font-bold text-[#C39967]">{st.phase}</span>
                  {idx < 3 && (
                    <ArrowRight size={14} className="text-zinc-600 hidden lg:block group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C39967] transition-colors duration-300">
                  {st.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 pointer-events-none">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/70 group-hover:border-[#C39967]/30 flex items-center gap-2 text-[11px] font-mono text-zinc-300 transition-colors duration-500">
                <CheckCircle2 size={13} className="text-[#C39967] shrink-0" />
                <span className="truncate group-hover:text-white transition-colors duration-300">{st.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}