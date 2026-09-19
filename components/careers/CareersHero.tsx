"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal, Users, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareersHero() {
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const xToSpot = useRef<gsap.QuickToFunc | null>(null);
  const yToSpot = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    
    if (spotlightRef.current) {
      xToSpot.current = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power2.out" });
      yToSpot.current = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power2.out" });
    }

    
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.06,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    
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
      {/* 3D Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125 will-change-transform"
        >
          <source src="/videos/careers-hero.mp4" type="video/mp4" />
        </video>

        {/* Soft edge gradients to secure typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/80 z-10" />
      </div>

      {/* Dynamic Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,#C39967_0%,transparent_70%)] opacity-20 blur-3xl z-10 will-change-transform"
      />

      {/* Architectural Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80 z-10" />

      {/* Warm Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full z-10" />

      {/* Typography & Metrics Container */}
      <div ref={contentRef} className="container mx-auto px-6 md:px-12 max-w-7xl relative z-20 will-change-transform">
        <div className="career-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 backdrop-blur-md text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
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

        <p className="career-copy text-base sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed mb-10">
          BricketX Pakistan isn&apos;t an agency taking briefs - it&apos;s the in-house team building a global investment network from Karachi. Here&apos;s how we think, how we work, and where you fit in.
        </p>

        {/* Live Metrics Strip */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
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