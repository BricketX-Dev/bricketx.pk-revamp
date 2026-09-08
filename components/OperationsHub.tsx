"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Layers, Activity, ArrowUpRight, CheckCircle2, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OperationsHub() {
  const container = useRef<HTMLDivElement>(null);
  const bgSvgRef = useRef<SVGSVGElement>(null);
  const layerSlowRef = useRef<SVGGElement>(null);
  const layerFastRef = useRef<SVGGElement>(null);

  // QuickTo references for lag-free 60fps cursor parallax
  const xToSlow = useRef<gsap.QuickToFunc | null>(null);
  const yToSlow = useRef<gsap.QuickToFunc | null>(null);
  const xToFast = useRef<gsap.QuickToFunc | null>(null);
  const yToFast = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Initialize GSAP QuickTo for multi-depth mouse parallax
    if (layerSlowRef.current && layerFastRef.current) {
      xToSlow.current = gsap.quickTo(layerSlowRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToSlow.current = gsap.quickTo(layerSlowRef.current, "y", { duration: 1.2, ease: "power2.out" });
      xToFast.current = gsap.quickTo(layerFastRef.current, "x", { duration: 0.6, ease: "power3.out" });
      yToFast.current = gsap.quickTo(layerFastRef.current, "y", { duration: 0.6, ease: "power3.out" });
    }

    // 2. Ambient idle float on SVG geometry
    gsap.to(".svg-idle-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 50,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".svg-idle-float", {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.8,
    });

    // 3. Header reveal
    gsap.fromTo(
      ".header-reveal",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      }
    );

    // 4. Bento cards entrance (safe fromTo to avoid opacity locks)
    gsap.fromTo(
      ".bento-card",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: ".bento-grid-container",
          start: "top 85%",
        },
      }
    );

    // 5. Metric counters
    const counters = gsap.utils.toArray<HTMLElement>(".metric-counter");
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-val") || "0");
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: function () {
            el.innerText = Math.ceil(Number(this.targets()[0].innerText)).toString();
          },
        }
      );
    });
  }, { scope: container });

  // Handle section-level mouse tracking for the interactive SVG
  const handleSectionMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Shift the background layers at varying speeds for depth
    xToSlow.current?.(x * 0.025);
    yToSlow.current?.(y * 0.025);
    xToFast.current?.(x * 0.06);
    yToFast.current?.(y * 0.06);
  };

  // Internal card spotlight
  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glow = card.querySelector<HTMLElement>(".card-glow");
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        x: x - 130,
        y: y - 130,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleCardMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const glow = card.querySelector<HTMLElement>(".card-glow");
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <section
      ref={container}
      id="operations"
      onMouseMove={handleSectionMouseMove}
      className="relative py-24 md:py-32 bg-[#121316] text-white overflow-hidden border-y border-zinc-800/80"
    >
      {/* Warm Ambient Glow Spots */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-[#c39967]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[250px] bg-zinc-700/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-80" />

      {/* Interactive Mouse-Tracking SVG Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          ref={bgSvgRef}
          viewBox="0 0 1440 900"
          className="w-[130%] h-[130%] max-w-none opacity-50 will-change-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Depth Layer 1: Slow Drift (Background Lines & Grid Nodes) */}
          <g ref={layerSlowRef}>
            <line x1="150" y1="120" x2="720" y2="450" stroke="#c39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.3" />
            <line x1="720" y1="450" x2="1300" y2="280" stroke="#c39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.3" />
            <line x1="720" y1="450" x2="720" y2="820" stroke="#c39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.3" />

            {/* Central Rotating Radar Ring */}
            <circle cx="720" cy="450" r="220" stroke="#c39967" strokeWidth="1" strokeDasharray="12 16" strokeOpacity="0.25" className="svg-idle-spin" />
            <circle cx="720" cy="450" r="340" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.12" />
            <circle cx="720" cy="450" r="5" fill="#c39967" />
          </g>

          {/* Depth Layer 2: Fast Drift (Foreground 3D Isometric Elements) */}
          <g ref={layerFastRef}>
            {/* Upper Left Isometric Node */}
            <g transform="translate(180, 140)" className="svg-idle-float">
              <polygon points="45,0 90,26 45,52 0,26" fill="#1d1f24" stroke="#c39967" strokeWidth="1.2" strokeOpacity="0.7" />
              <polygon points="0,26 45,52 45,104 0,78" fill="#16171b" stroke="#c39967" strokeWidth="1.2" strokeOpacity="0.5" />
              <polygon points="45,52 90,26 90,78 45,104" fill="#121316" stroke="#c39967" strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx="45" cy="52" r="3" fill="#c39967" />
            </g>

            {/* Lower Right Data Reticle */}
            <g transform="translate(1180, 520)" className="svg-idle-float">
              <polygon points="50,0 100,28 50,56 0,28" fill="#1d1f24" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
              <polygon points="0,28 50,56 50,112 0,84" fill="#16171b" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <polygon points="50,56 100,28 100,84 50,112" fill="#121316" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <circle cx="50" cy="56" r="3" fill="#ffffff" fillOpacity="0.8" />
            </g>

            {/* Top Right Floating Crosshair */}
            <g transform="translate(1220, 180)">
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#c39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="0" y1="-15" x2="0" y2="15" stroke="#c39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="0" cy="0" r="18" stroke="#c39967" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
            </g>
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="header-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-md border border-[#c39967]/30 bg-[#c39967]/10 text-xs font-mono font-semibold text-[#c39967] uppercase tracking-widest">
            <Activity size={13} className="animate-pulse" />
            The Karachi Engine Room
          </div>
          <h2 className="header-reveal text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            The operational backbone of the{" "}
            <span className="text-[#c39967]">BricketX network</span>.
          </h2>
          <p className="header-reveal text-sm md:text-base text-zinc-400 leading-relaxed font-light max-w-2xl">
            Where institutional engineering, round-the-clock operations, and Shariah-compliant capital execution converge to support scaling platforms worldwide.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="bento-grid-container grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Core Infrastructure */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="bento-card group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-[#c39967]/50 hover:bg-zinc-900/80 transition-all duration-300"
          >
            <div className="card-glow pointer-events-none absolute w-[260px] h-[260px] rounded-full bg-[#c39967]/15 blur-[70px] opacity-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  <Terminal size={14} className="text-[#c39967]" />
                  Core Engineering Node
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Enterprise Systems Infrastructure
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Proprietary portal frameworks, automated research pipelines, multi-currency reporting interfaces, and investor relation backbones managed end-to-end.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800">
              <div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  <span className="metric-counter" data-val="500">0</span>
                  <span className="text-[#c39967]">+</span>
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1 font-mono">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  <span>24</span>
                  <span className="text-[#c39967]">/7</span>
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1 font-mono">
                  Operations
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Shariah Compliance */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="bento-card group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-[#c39967]/50 hover:bg-zinc-900/80 transition-all duration-300"
          >
            <div className="card-glow pointer-events-none absolute w-[260px] h-[260px] rounded-full bg-[#c39967]/15 blur-[70px] opacity-0" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center mb-6 text-[#c39967] group-hover:bg-[#c39967] group-hover:text-black transition-colors duration-300">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Shariah Compliant
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Institutional governance protocols built to audit, verify, and power transparent, ethical capital movements across all operational verticals.
              </p>
            </div>
            
            <div className="relative z-10 pt-6 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle2 size={16} />
                100% Operational Excellence
              </div>
              <span className="text-xs font-mono text-zinc-500">AUDITED</span>
            </div>
          </div>

          {/* Card 3: Global Operations */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="bento-card group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-[#c39967]/50 hover:bg-zinc-900/80 transition-all duration-300"
          >
            <div className="card-glow pointer-events-none absolute w-[260px] h-[260px] rounded-full bg-[#c39967]/15 blur-[70px] opacity-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Global Nodes</span>
                <ArrowUpRight size={18} className="text-[#c39967] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Global Operations
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Centralized hub coordinating cross-border execution and asset pipelines across four worldwide territories.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-xs font-semibold mb-6">
                <span className="px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-md border border-zinc-700">UK/BVI</span>
                <span className="px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-md border border-zinc-700">DUBAI</span>
                <span className="px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-md border border-zinc-700">KENYA</span>
                <span className="px-3 py-1 bg-[#c39967]/20 text-[#c39967] border border-[#c39967]/40 rounded-md">PAKISTAN</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-zinc-800 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-white tracking-tight">
                <span className="metric-counter" data-val="4">0</span>
                <span className="text-[#c39967]"> Regions</span>
              </div>
              <span className="text-xs font-mono text-zinc-500">ACTIVE HUBS</span>
            </div>
          </div>

          {/* Card 4: Five Teams Engine Strip */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="bento-card group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-[#c39967]/50 hover:bg-zinc-900/80 transition-all duration-300"
          >
            <div className="card-glow pointer-events-none absolute w-[260px] h-[260px] rounded-full bg-[#c39967]/15 blur-[70px] opacity-0" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#c39967] mb-6 group-hover:bg-[#c39967] group-hover:text-black transition-colors duration-300">
                <Layers size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Five Teams. One Engine Room.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Technology, Marketing, Operations, Creative, and Production powering execution and scaling our platform seamlessly.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-zinc-800 flex items-center justify-between">
              <div className="font-mono text-sm font-bold text-white">
                <span className="text-[#c39967]">05</span> Core Disciplines
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Sync
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}