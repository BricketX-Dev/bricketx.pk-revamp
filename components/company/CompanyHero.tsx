"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Building2, Globe2, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyHero() {
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // 1. Slow breathing zoom on background video
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.06,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // 2. Staggered Entrance
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

    // 3. Parallax Exit on Scroll
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
        y: -70,
        opacity: 0.2,
        filter: "blur(4px)",
        ease: "none",
      }, 0)
      .to(videoRef.current, {
        yPercent: 18,
        opacity: 0.12,
        ease: "none",
      }, 0);

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-[90vh] md:min-h-[95vh] w-full flex flex-col justify-center pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0a0a0b] text-[#f4f4f5] border-b border-zinc-800/80 overflow-hidden select-none"
    >
      {/* 3D Render Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125 will-change-transform"
        >
          <source src="/videos/company-hero.mp4" type="video/mp4" />
        </video>

        {/* Soft edge gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/80 z-10" />
      </div>

      {/* Background Architectural Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full z-10" />

      <div ref={contentRef} className="container mx-auto px-6 md:px-12 max-w-7xl relative z-20 will-change-transform">
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