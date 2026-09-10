"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal, Activity, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DepartmentsHeroProps {
  departments: {
    num: string;
    name: string;
  }[];
}

export default function DepartmentsHero({ departments }: DepartmentsHeroProps) {
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const xToSpot = useRef<gsap.QuickToFunc | null>(null);
  const yToSpot = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Mouse spotlight physics
    if (spotlightRef.current) {
      xToSpot.current = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power2.out" });
      yToSpot.current = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power2.out" });
    }

    // 2. Slow breathing zoom on background video
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.06,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // 3. Staggered Entrance
    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    introTl
      .fromTo(
        ".dept-hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
      .fromTo(
        ".dept-hero-title-line",
        { yPercent: 100 },
        { yPercent: 0, duration: 1, stagger: 0.12 },
        "-=0.5"
      )
      .fromTo(
        ".dept-hero-copy",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".dept-pill-item",
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06 },
        "-=0.5"
      )
      .fromTo(
        ".dept-metric-chip",
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 },
        "-=0.4"
      );

    // 4. Parallax Exit on Scroll
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    exitTl
      .to(contentRef.current, {
        y: -80,
        opacity: 0,
        filter: "blur(2px)",
        ease: "none",
      }, 0)
      .to(videoRef.current, {
        yPercent: 18,
        opacity: 0.12,
        ease: "none",
      }, 0);

  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xToSpot.current?.(x - 250);
    yToSpot.current?.(y - 250);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] md:min-h-[95vh] w-full flex flex-col justify-center pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0a0a0b] text-[#f4f4f5] border-b border-zinc-800/80 overflow-hidden select-none"
    >
      {/* 3D Render Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125 will-change-transform"
        >
          <source src="/videos/departments-hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Soft edge gradients to secure typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/80 z-10" />
      </div>

      {/* Dynamic Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,#C39967_0%,transparent_70%)] opacity-20 blur-3xl z-10 will-change-transform"
      />

      {/* Precision Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80 z-10" />

      {/* Atmospheric Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full z-10" />

      <div ref={contentRef} className="container mx-auto px-6 md:px-12 max-w-7xl relative z-20 will-change-transform">
        
        {/* Monospace Badge */}
        <div className="dept-hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 backdrop-blur-md text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
          <Terminal size={13} />
          Our Departments // Node KHI-01
        </div>

        {/* Masked Line Entrance */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[0.95] max-w-4xl">
          <div className="overflow-hidden pb-1">
            <span className="dept-hero-title-line block">Five Teams.</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="dept-hero-title-line block text-[#C39967]">One Engine Room.</span>
          </div>
        </h1>

        {/* Narrative Copy */}
        <p className="dept-hero-copy text-base sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed mb-10">
          Every part of the BricketX ecosystem - from the investor portal to global coordination - is built, run and scaled by a dedicated department inside the Karachi hub. This is how the work is divided.
        </p>

        {/* Nav Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 font-mono text-xs mb-10">
          {departments.map((d) => (
            <a
              key={d.num}
              href={`#${d.name.toLowerCase().replace(/ /g, "-")}`}
              className="dept-pill-item group px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:border-[#C39967] text-zinc-300 transition-all duration-300 backdrop-blur-md shadow-xs"
            >
              <span className="text-[#C39967] font-bold mr-1.5">{d.num}</span>
              <span className="group-hover:text-white transition-colors">{d.name}</span>
            </a>
          ))}
        </div>

        {/* Live Operational Metrics */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
          <div className="dept-metric-chip flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-200 font-bold">5 Departments</span>
            <span>Synchronized</span>
          </div>
          <div className="dept-metric-chip hidden sm:flex items-center gap-2">
            <Activity size={13} className="text-[#C39967]" />
            <span>Central Hub Latency:</span>
            <span className="text-[#C39967] font-bold">14ms Core</span>
          </div>
          <div className="dept-metric-chip hidden md:flex items-center gap-2">
            <Cpu size={13} className="text-zinc-500" />
            <span>Deployment Protocol:</span>
            <span className="text-zinc-300">Continuous Production CI/CD</span>
          </div>
        </div>

      </div>
    </section>
  );
}