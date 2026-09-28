"use client";

import { useRef, MouseEvent, UIEvent } from "react";
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
  Activity
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const bgSvgSlowRef = useRef<SVGGElement>(null);
  const bgSvgFastRef = useRef<SVGGElement>(null);

  const xToSlow = useRef<gsap.QuickToFunc | null>(null);
  const yToSlow = useRef<gsap.QuickToFunc | null>(null);
  const xToFast = useRef<gsap.QuickToFunc | null>(null);
  const yToFast = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Ambient Background Effects
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

    // 2. Native Sticky Horizontal Scrolling Logic
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      // Pure reading function: determines exactly how far to slide laterally
      const getTravelDistance = () => track.scrollWidth - window.innerWidth;

      // Safe layout setter: Pushes the invisible wrapper height to match the travel distance.
      // This happens cleanly BEFORE ScrollTrigger calculates its math.
      const updateHeight = () => {
        const travel = getTravelDistance();
        // Fallback safety to ensure it doesn't break if track isn't fully rendered
        const safeTravel = travel > 0 ? travel : systems.length * 450; 
        wrapper.style.height = `${safeTravel + window.innerHeight}px`;
      };

      updateHeight();
      ScrollTrigger.addEventListener("refreshInit", updateHeight);

      // Create the animation bound to the wrapper's natural scroll height
      const horizontalTween = gsap.to(track, {
        x: () => -getTravelDistance(), // Strict evaluation without DOM manipulation
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom", 
          scrub: 1, // Smooth interpolation
          invalidateOnRefresh: true,
          // Notice: No pin: true! We use native CSS position: sticky instead.
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }

            const activeNodeIndex = Math.min(
              systems.length,
              Math.max(1, Math.ceil(self.progress * systems.length))
            );
            
            if (counterRef.current) {
              counterRef.current.innerText = `${String(activeNodeIndex).padStart(2, "0")} / 10`;
            }
          },
        },
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", updateHeight);
        wrapper.style.height = "auto";
        horizontalTween.kill();
      };
    });

    return () => mm.revert();
  }, { scope: wrapperRef }); // Scope is strictly enforced

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    xToSlow.current?.(x * 0.03);
    yToSlow.current?.(y * 0.03);
    xToFast.current?.(x * 0.06);
    yToFast.current?.(y * 0.06);
  };

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMobileScroll = (e: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return; 
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

    const activeIndex = Math.min(
      systems.length,
      Math.max(1, Math.round(progress * (systems.length - 1)) + 1)
    );

    if (counterRef.current) counterRef.current.innerText = `${String(activeIndex).padStart(2, "0")} / 10`;
    if (progressBarRef.current) progressBarRef.current.style.width = `${progress * 100}%`;
  };

  return (
    <div ref={wrapperRef} className="w-full relative z-10 bg-[#0D0E12]">
      
      {/* 
        Native sticky ensures flawless scroll handoffs. 
        It locks to the viewport during the wrapper's scroll duration, then releases cleanly.
      */}
      <section 
        ref={containerRef}
        id="what-we-build" 
        onMouseMove={handleMouseMove}
        className="md:sticky top-0 left-0 w-full h-[100svh] bg-[#0D0E12] text-white border-y border-zinc-800/80 overflow-hidden flex flex-col justify-between pt-20 pb-8 md:pt-24 md:pb-10 select-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-80" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

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

        <div className="container mx-auto px-6 md:px-12 max-w-7xl shrink-0 relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-zinc-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest">
                <Terminal size={12} />
                Systems Portfolio // 10 Active Nodes
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Not Services. <span className="text-[#C39967]">Systems.</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full my-auto overflow-visible relative z-20">
          <div 
            ref={trackRef} 
            onScroll={handleMobileScroll}
            className="flex w-[calc(100%+3rem)] -ml-6 px-[10vw] md:w-max md:ml-0 md:pl-12 md:pr-[5vw] overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 will-change-transform items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2"
          >
            {systems.map((system) => {
              const Icon = system.icon;

              return (
                <div
                  key={system.id}
                  onMouseMove={handleCardMouseMove}
                  className="w-[80vw] md:w-[410px] shrink-0 snap-center h-[340px] md:h-[380px] p-7 md:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden hover:border-[#C39967]/70 transition-colors group select-none relative"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 75%), rgba(18, 19, 24, 0.65)`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] md:text-xs pb-4 mb-5 border-b border-zinc-800/70">
                      <span className="text-[#C39967] font-bold">NODE // {system.id}</span>
                      <span className="text-[9px] md:text-[10px] uppercase font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] shrink-0 group-hover:bg-[#C39967] group-hover:text-black transition-all duration-300">
                        <Icon size={24} />
                      </div>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#C39967] transition-all shrink-0">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                      {system.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#C39967] transition-colors">
                      {system.name}
                    </h3>

                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      {system.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl shrink-0 relative z-20">
          <div className="relative pt-4 border-t border-zinc-800/80">
            <div 
              ref={progressBarRef} 
              className="absolute top-0 left-0 h-[2px] bg-[#C39967] transition-all duration-75"
              style={{ width: "10%" }}
            />

            <div className="flex items-center justify-between text-[10px] md:text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <Activity size={13} className="text-[#C39967]" />
                <span className="hidden md:inline">SCROLL DOWN TO ADVANCE ARCHITECTURAL NODES</span>
                <span className="md:hidden">SWIPE TO EXPLORE ARCHITECTURAL NODES</span>
              </span>
              <span ref={counterRef} className="font-bold text-white">
                01 / 10
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}