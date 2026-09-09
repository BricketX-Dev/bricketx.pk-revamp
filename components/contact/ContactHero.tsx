"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin, Terminal, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactHero() {
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

    gsap.to(".contact-radar-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    introTl
      .fromTo(
        ".contact-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
      .fromTo(
        ".contact-title-line",
        { yPercent: 100 },
        { yPercent: 0, duration: 1, stagger: 0.12 },
        "-=0.5"
      )
      .fromTo(
        ".contact-copy",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".contact-info-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );

    gsap.to(contentRef.current, {
      y: -70,
      opacity: 0.1,
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

    xToSvg.current?.(x * 0.035);
    yToSvg.current?.(y * 0.035);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0a0a0b] text-[#f4f4f5] border-b border-zinc-800/80 overflow-hidden select-none"
    >
      {/* Structural Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Interactive Vector Gateway Canvas */}
      <div className="absolute inset-0 flex items-center justify-end pr-[5%] lg:pr-[10%] pointer-events-none overflow-hidden opacity-30">
        <svg viewBox="0 0 700 700" className="w-[500px] h-[500px] lg:w-[650px] lg:h-[650px] will-change-transform" fill="none">
          <g ref={svgRef}>
            <circle cx="350" cy="350" r="280" stroke="#52525b" strokeWidth="1" strokeDasharray="10 14" className="contact-radar-spin" />
            <circle cx="350" cy="350" r="200" stroke="#C39967" strokeWidth="1.2" strokeDasharray="6 8" />
            <circle cx="350" cy="350" r="120" stroke="#3f3f46" strokeWidth="0.8" />
            <line x1="80" y1="350" x2="620" y2="350" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <line x1="350" y1="80" x2="350" y2="620" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="350" cy="350" r="4" fill="#C39967" />
          </g>
        </svg>
      </div>

      <div ref={contentRef} className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 will-change-transform">
        <div className="contact-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
          <Terminal size={13} />
          Get In Touch // Comm Gateway
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[0.95] max-w-4xl">
          <div className="overflow-hidden pb-1">
            <span className="contact-title-line block">Let&apos;s build the</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="contact-title-line block text-[#C39967]">next system.</span>
          </div>
        </h1>

        <p className="contact-copy text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed mb-16">
          Whether you&apos;re looking to partner with the operational hub, integrate our infrastructure, or join the team, the engine room is open.
        </p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {/* Direct Email Card */}
          <a
            href="mailto:Info@bricketx.pk"
            className="contact-info-card group p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-[#C39967]/60 hover:bg-zinc-900/90 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967]">
                <Mail size={18} />
              </div>
              <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-[#C39967] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                Direct Email
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-[#C39967] transition-colors">
                Info@bricketx.pk
              </h3>
            </div>
          </a>

          {/* Location Card */}
          <div className="contact-info-card p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967]">
                <MapPin size={18} />
              </div>
              <span className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                The Hub // Karachi, Pakistan
              </span>
              <h3 className="text-xl font-bold text-white">
                Operations &amp; <br /> Innovation Center
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}