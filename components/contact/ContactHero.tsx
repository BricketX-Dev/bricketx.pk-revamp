"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal, ShieldCheck } from "lucide-react";

export default function ContactHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".contact-badge",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
    )
      .fromTo(
        ".contact-title-line",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.8, stagger: 0.1 },
        "-=0.6"
      )
      .fromTo(
        ".contact-copy",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".contact-meta",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.4"
      );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative pt-36 pb-16 md:pt-48 md:pb-20 bg-[#050505] text-[#f4f4f5] overflow-hidden select-none"
    >
      {/* Institutional Drafting Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="contact-badge inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest shadow-sm">
          <Terminal size={12} className="text-[#C39967]" />
          Communications // Node KHI-01
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.05] max-w-4xl">
          <div className="overflow-hidden pb-1.5">
            <span className="contact-title-line block">Direct access to the</span>
          </div>
          <div className="overflow-hidden pb-1.5">
            <span className="contact-title-line block text-[#C39967]">Karachi engine room.</span>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-800/80 pb-12">
          <p className="contact-copy text-sm sm:text-base text-zinc-400 max-w-xl font-light leading-relaxed">
            Bypass standard channels. This secure gateway routes directly to our internal engineering and operations desks for immediate institutional evaluation.
          </p>
          
          <div className="contact-meta flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800/50">
            <ShieldCheck size={14} className="text-[#C39967]" />
            <span>256-BIT ENCRYPTED TUNNEL</span>
          </div>
        </div>
      </div>
    </section>
  );
}