"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  MonitorSmartphone, 
  Network, 
  Cpu, 
  Database, 
  LineChart, 
  Workflow, 
  Filter, 
  FileSearch, 
  Paintbrush, 
  TerminalSquare, 
  ArrowUpRight, 
  Terminal, 
  Activity,
  ShieldCheck
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const systems = [
  { id: "01", name: "Investor Portal", desc: "The dashboard investors log into to track holdings and returns in real time.", icon: MonitorSmartphone, tag: "CAPITAL" },
  { id: "02", name: "Web Platforms", desc: "The public sites and applications operating across the entire ecosystem.", icon: Network, tag: "DELIVERY" },
  { id: "03", name: "AI Systems", desc: "Models and assistants that automate research, analysis, and investor support.", icon: Cpu, tag: "INTELLIGENCE" },
  { id: "04", name: "CRM Solutions", desc: "Centralized systems managing every investor and partner relationship.", icon: Database, tag: "OPERATIONS" },
  { id: "05", name: "Dashboards", desc: "Live operational and analytical views delivering unified telemetry.", icon: LineChart, tag: "ANALYTICS" },
  { id: "06", name: "Automations", desc: "Workflows that eliminate manual, repetitive operations end to end.", icon: Workflow, tag: "PIPELINE" },
  { id: "07", name: "Marketing Funnels", desc: "The end-to-end paths converting market interest into verified capital.", icon: Filter, tag: "DISTRIBUTION" },
  { id: "08", name: "Reporting Systems", desc: "Structured, auditable performance and AAOIFI compliance reporting.", icon: FileSearch, tag: "COMPLIANCE" },
  { id: "09", name: "Brand Guidelines", desc: "The tokens and design rules that keep every network touchpoint uniform.", icon: Paintbrush, tag: "IDENTITY" },
  { id: "10", name: "Operational Systems", desc: "The internal tooling running day-to-day execution across the hub.", icon: TerminalSquare, tag: "INFRASTRUCTURE" },
];

export default function WhatWeBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinViewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const bgSvgSlowRef = useRef<SVGGElement>(null);
  const bgSvgFastRef = useRef<SVGGElement>(null);

  const xToSlow = useRef<gsap.QuickToFunc | null>(null);
  const yToSlow = useRef<gsap.QuickToFunc | null>(null);
  const xToFast = useRef<gsap.QuickToFunc | null>(null);
  const yToFast = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Mouse Parallax setup for background vectors
    if (bgSvgSlowRef.current && bgSvgFastRef.current) {
      xToSlow.current = gsap.quickTo(bgSvgSlowRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToSlow.current = gsap.quickTo(bgSvgSlowRef.current, "y", { duration: 1.2, ease: "power2.out" });
      xToFast.current = gsap.quickTo(bgSvgFastRef.current, "x", { duration: 0.6, ease: "power3.out" });
      yToFast.current = gsap.quickTo(bgSvgFastRef.current, "y", { duration: 0.6, ease: "power3.out" });
    }

    gsap.to(".matrix-radar-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 50,
      repeat: -1,
      ease: "none",
    });

    const track = trackRef.current;
    if (!track || !pinViewportRef.current) return;

    // Calculate total horizontal travel distance needed
    const getScrollAmount = () => track.scrollWidth - window.innerWidth + (window.innerWidth < 768 ? 48 : 96);

    // 2. Pinned Horizontal Scroll Trigger
    const horizontalTween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: pinViewportRef.current,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Dynamic progress bar width
          const progressBar = document.getElementById("build-scroll-progress");
          if (progressBar) {
            progressBar.style.width = `${self.progress * 100}%`;
          }

          // Dynamic active node counter
          const activeNodeIndex = Math.min(
            systems.length,
            Math.max(1, Math.ceil(self.progress * systems.length))
          );
          const counterEl = document.getElementById("build-scroll-counter");
          if (counterEl) {
            counterEl.innerText = `${String(activeNodeIndex).padStart(2, "0")} / 10`;
          }
        },
      },
    });

    return () => {
      horizontalTween.kill();
    };
  }, { scope: containerRef });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToSlow.current?.(x * 0.03);
    yToSlow.current?.(y * 0.03);
    xToFast.current?.(x * 0.06);
    yToFast.current?.(y * 0.06);
  };

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      ref={containerRef} 
      id="what-we-build" 
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0D0E12] text-white border-y border-zinc-800/80 overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-80" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Vector Hardware Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg viewBox="0 0 1440 900" className="w-[130%] h-[130%] max-w-none opacity-35 will-change-transform" fill="none">
          <g ref={bgSvgSlowRef}>
            <circle cx="720" cy="450" r="260" stroke="#C39967" strokeWidth="1" strokeDasharray="12 16" strokeOpacity="0.3" className="matrix-radar-spin" />
            <circle cx="720" cy="450" r="420" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.1" />
          </g>
          <g ref={bgSvgFastRef}>
            <line x1="100" y1="450" x2="1340" y2="450" stroke="#C39967" strokeWidth="0.75" strokeDasharray="6 6" strokeOpacity="0.2" />
            <line x1="720" y1="100" x2="720" y2="800" stroke="#C39967" strokeWidth="0.75" strokeDasharray="6 6" strokeOpacity="0.2" />
          </g>
        </svg>
      </div>

      {/* Pinned Target Viewport (Locks to screen while scrolling horizontally) */}
      <div 
        ref={pinViewportRef} 
        className="w-full h-screen max-h-[100dvh] flex flex-col justify-between py-10 md:py-14 overflow-hidden relative z-10"
      >
        {/* Top Header Strip */}
        <div className="container mx-auto px-6 md:px-12 max-w-7xl shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest">
                <Terminal size={12} />
                Systems Portfolio // 10 Active Nodes
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Not Services. <span className="text-[#C39967]">Systems.</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60">
                <ShieldCheck size={13} className="text-[#C39967]" />
                <span>24/7 Production Deployment</span>
              </div>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest hidden md:inline">
                Scroll to slide catalog &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Track */}
        <div className="w-full my-auto overflow-visible pl-6 md:pl-12">
          <div 
            ref={trackRef} 
            className="flex gap-6 w-max pr-12 will-change-transform items-center"
          >
            {systems.map((system) => {
              const Icon = system.icon;

              return (
                <div
                  key={system.id}
                  onMouseMove={handleCardMouseMove}
                  className="w-[310px] sm:w-[360px] md:w-[410px] h-[360px] md:h-[390px] p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden hover:border-[#C39967]/70 transition-colors group select-none"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 75%), rgba(18, 19, 24, 0.65)`,
                  }}
                >
                  {/* Top Metadata Header */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-zinc-800/70">
                      <span className="text-[#C39967] font-bold">NODE // {system.id}</span>
                      <span className="text-[10px] uppercase font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] shrink-0 group-hover:bg-[#C39967] group-hover:text-black transition-all duration-300">
                        <Icon size={24} />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#C39967] transition-all shrink-0">
                        <ArrowUpRight size={15} />
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                      {system.tag}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#C39967] transition-colors">
                      {system.name}
                    </h3>

                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      {system.desc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-zinc-800/70 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                    <span>ENTERPRISE SPEC</span>
                    <span className="text-zinc-300">INTERNAL HUB</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status Ticker & Interactive Progress Bar */}
        <div className="container mx-auto px-6 md:px-12 max-w-7xl shrink-0">
          <div className="relative pt-4 border-t border-zinc-800/80">
            {/* Scroll Driven Gold Progress Indicator */}
            <div 
              id="build-scroll-progress" 
              className="absolute top-0 left-0 h-[2px] bg-[#C39967] transition-all duration-75"
              style={{ width: "10%" }}
            />

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <Activity size={13} className="text-[#C39967]" />
                SCROLL DOWN TO ADVANCE ARCHITECTURAL NODES
              </span>
              <span id="build-scroll-counter" className="font-bold text-white">
                01 / 10
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}