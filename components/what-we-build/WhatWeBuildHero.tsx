"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal, ShieldCheck, Activity, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatWeBuildHero() {
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGGElement>(null);

  const xToSvg = useRef<gsap.QuickToFunc | null>(null);
  const yToSvg = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (svgRef.current) {
      xToSvg.current = gsap.quickTo(svgRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToSvg.current = gsap.quickTo(svgRef.current, "y", { duration: 1.2, ease: "power2.out" });
    }

    gsap.to(".matrix-radar-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 50,
      repeat: -1,
      ease: "none",
    });

    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    introTl
      .fromTo(
        ".build-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
      .fromTo(
        ".build-title-line",
        { yPercent: 100 },
        { yPercent: 0, duration: 1, stagger: 0.12 },
        "-=0.5"
      )
      .fromTo(
        ".build-copy",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".build-metric-chip",
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 },
        "-=0.4"
      );

    gsap.to(contentRef.current, {
      y: -70,
      opacity: 0.2,
      filter: "blur(4px)",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToSvg.current?.(x * 0.03);
    yToSvg.current?.(y * 0.03);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0a0a0b] text-[#f4f4f5] border-b border-zinc-800/80 overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Vector Hardware Grid */}
      <div className="absolute inset-0 flex items-center justify-end pr-[5%] lg:pr-[8%] pointer-events-none overflow-hidden opacity-35">
        <svg viewBox="0 0 700 700" className="w-[500px] h-[500px] lg:w-[650px] lg:h-[650px] will-change-transform" fill="none">
          <g ref={svgRef}>
            <circle cx="350" cy="350" r="280" stroke="#52525b" strokeWidth="1" strokeDasharray="8 12" className="matrix-radar-spin" />
            <circle cx="350" cy="350" r="190" stroke="#C39967" strokeWidth="1.2" strokeDasharray="6 6" />
            <circle cx="350" cy="350" r="110" stroke="#3f3f46" strokeWidth="0.8" />
            <line x1="100" y1="350" x2="600" y2="350" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <line x1="350" y1="100" x2="350" y2="600" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="350" cy="350" r="4" fill="#C39967" />
          </g>
        </svg>
      </div>

      <div ref={contentRef} className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 will-change-transform">
        <div className="build-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
          <Terminal size={13} />
          What We Build // Systems Portfolio
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[0.95] max-w-4xl">
          <div className="overflow-hidden pb-1">
            <span className="build-title-line block">Not Services.</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="build-title-line block text-[#C39967]">Systems.</span>
          </div>
        </h1>

        <p className="build-copy text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed mb-10">
          BricketX Pakistan doesn&apos;t ship one-off deliverables. It builds and runs the infrastructure that keeps the entire BricketX network moving — from the portal investors log into to the tooling that runs behind the scenes.
        </p>

        {/* Operational Readouts */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-500">
          <div className="build-metric-chip flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#C39967]" />
            <span className="text-zinc-200 font-bold">10 Core Systems</span>
            <span>· Built In-House</span>
          </div>
          <div className="build-metric-chip flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#C39967] font-bold">Maintained 24/7</span>
            <span>· Continuous Execution</span>
          </div>
          <div className="build-metric-chip hidden md:flex items-center gap-2">
            <Cpu size={13} className="text-zinc-500" />
            <span>Deployment:</span>
            <span className="text-zinc-300">Deterministic Pipelines</span>
          </div>
        </div>
      </div>
    </section>
  );
}