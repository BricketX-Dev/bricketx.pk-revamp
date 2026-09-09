"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Building2, Globe2, ShieldCheck, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyHero() {
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<SVGGElement>(null);

  const xToOrbital = useRef<gsap.QuickToFunc | null>(null);
  const yToOrbital = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (orbitalRef.current) {
      xToOrbital.current = gsap.quickTo(orbitalRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToOrbital.current = gsap.quickTo(orbitalRef.current, "y", { duration: 1.2, ease: "power2.out" });
    }

    gsap.to(".company-radar-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    introTl
      .fromTo(
        ".comp-hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
      .fromTo(
        ".comp-hero-title-line",
        { yPercent: 100 },
        { yPercent: 0, duration: 1, stagger: 0.12 },
        "-=0.5"
      )
      .fromTo(
        ".comp-hero-copy",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".comp-metric-chip",
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

    xToOrbital.current?.(x * 0.03);
    yToOrbital.current?.(y * 0.03);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0a0a0b] text-[#f4f4f5] border-b border-zinc-800/80 overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Vector Orbital Canvas */}
      <div className="absolute inset-0 flex items-center justify-end pr-[5%] lg:pr-[8%] pointer-events-none overflow-hidden opacity-35">
        <svg viewBox="0 0 700 700" className="w-[500px] h-[500px] lg:w-[650px] lg:h-[650px] will-change-transform" fill="none">
          <g ref={orbitalRef}>
            <circle cx="350" cy="350" r="290" stroke="#52525b" strokeWidth="1" strokeDasharray="10 14" className="company-radar-spin" />
            <circle cx="350" cy="350" r="200" stroke="#C39967" strokeWidth="1.2" strokeDasharray="6 8" />
            <circle cx="350" cy="350" r="120" stroke="#3f3f46" strokeWidth="0.8" />
            <line x1="120" y1="350" x2="580" y2="350" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <line x1="350" y1="120" x2="350" y2="580" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="350" cy="350" r="4" fill="#C39967" />
          </g>
        </svg>
      </div>

      <div ref={contentRef} className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 will-change-transform">
        <div className="comp-hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
          <Building2 size={13} />
          The Company // Karachi Engine Room
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[0.95] max-w-4xl">
          <div className="overflow-hidden pb-1">
            <span className="comp-hero-title-line block">The Engine Behind</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="comp-hero-title-line block text-[#C39967]">The Network.</span>
          </div>
        </h1>

        <p className="comp-hero-copy text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed mb-10">
          BricketX Pakistan is the operational core of a network that spans four regions. Here&apos;s how it&apos;s structured, how it operates, and where its next ideas come from.
        </p>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-500">
          <div className="comp-metric-chip flex items-center gap-2">
            <Globe2 size={14} className="text-[#C39967]" />
            <span className="text-zinc-200 font-bold">4 Global Regions</span>
            <span>· Synchronized</span>
          </div>
          <div className="comp-metric-chip flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#C39967] font-bold">Idea-To-Scale</span>
            <span>· Deterministic Process</span>
          </div>
          <div className="comp-metric-chip hidden md:flex items-center gap-2">
            <ShieldCheck size={13} className="text-zinc-500" />
            <span>Governance:</span>
            <span className="text-zinc-300">Continuous Centralized Oversight</span>
          </div>
        </div>
      </div>
    </section>
  );
}