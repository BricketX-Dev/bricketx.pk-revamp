"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal, Users, Sparkles, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareersHero() {
  const container = useRef<HTMLElement>(null);
  const orbitalRef = useRef<SVGGElement>(null);
  const xToOrb = useRef<gsap.QuickToFunc | null>(null);
  const yToOrb = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (orbitalRef.current) {
      xToOrb.current = gsap.quickTo(orbitalRef.current, "x", { duration: 1, ease: "power2.out" });
      yToOrb.current = gsap.quickTo(orbitalRef.current, "y", { duration: 1, ease: "power2.out" });
    }

    gsap.to(".career-ring-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 55,
      repeat: -1,
      ease: "none",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".career-badge",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
    )
    .fromTo(
      ".career-title-line",
      { yPercent: 100 },
      { yPercent: 0, duration: 1, stagger: 0.12 },
      "-=0.5"
    )
    .fromTo(
      ".career-copy",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      ".career-stat",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 },
      "-=0.4"
    );
  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    xToOrb.current?.(x * 0.035);
    yToOrb.current?.(y * 0.035);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0a0a0b] text-[#f4f4f5] border-b border-zinc-800/80 overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Decorative Blueprint Vector */}
      <div className="absolute inset-0 flex items-center justify-end pr-[5%] lg:pr-[10%] pointer-events-none opacity-30">
        <svg viewBox="0 0 600 600" className="w-[480px] h-[480px] lg:w-[600px] lg:h-[600px]" fill="none">
          <g ref={orbitalRef}>
            <circle cx="300" cy="300" r="260" stroke="#52525b" strokeWidth="1" strokeDasharray="10 14" className="career-ring-spin" />
            <circle cx="300" cy="300" r="180" stroke="#C39967" strokeWidth="1.2" strokeDasharray="6 8" />
            <circle cx="300" cy="300" r="100" stroke="#3f3f46" strokeWidth="0.8" />
            <line x1="80" y1="300" x2="520" y2="300" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <line x1="300" y1="80" x2="300" y2="520" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="300" cy="300" r="4" fill="#C39967" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="career-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
          <Terminal size={13} />
          Culture &amp; Careers // Karachi Hub
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[0.95] max-w-4xl">
          <div className="overflow-hidden pb-1">
            <span className="career-title-line block">The People Behind</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="career-title-line block text-[#C39967]">The Engine Room.</span>
          </div>
        </h1>

        <p className="career-copy text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed mb-10">
          BricketX Pakistan isn&apos;t an agency taking briefs — it&apos;s the in-house team building a global investment network from Karachi. Here&apos;s how we think, how we work, and where you fit in.
        </p>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-500">
          <div className="career-stat flex items-center gap-2">
            <Users size={14} className="text-[#C39967]" />
            <span className="text-zinc-200 font-bold">In-House Dedicated Team</span>
          </div>
          <div className="career-stat flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#C39967] font-bold">Zero Outsourcing</span>
          </div>
          <div className="career-stat hidden md:flex items-center gap-2">
            <Compass size={13} className="text-zinc-500" />
            <span>HQ Coordinate:</span>
            <span className="text-zinc-300">Karachi Node (UTC+5)</span>
          </div>
        </div>
      </div>
    </section>
  );
}