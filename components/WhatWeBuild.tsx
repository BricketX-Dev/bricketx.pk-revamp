"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
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
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const systems = [
  { id: "01", name: "Investor Portal", desc: "The dashboard investors log into to track holdings and returns.", icon: MonitorSmartphone },
  { id: "02", name: "Web Platforms", desc: "The public sites and applications across the ecosystem.", icon: Network },
  { id: "03", name: "AI Systems", desc: "Models and assistants that automate research and support.", icon: Cpu },
  { id: "04", name: "CRM Solutions", desc: "Systems that manage investor and partner relationships.", icon: Database },
  { id: "05", name: "Dashboards", desc: "Live reporting views for teams and stakeholders.", icon: LineChart },
  { id: "06", name: "Automations", desc: "Workflows that remove manual, repetitive work.", icon: Workflow },
  { id: "07", name: "Marketing Funnels", desc: "The paths that turn interest into qualified investors.", icon: Filter },
  { id: "08", name: "Reporting Systems", desc: "Structured, auditable performance and compliance reporting.", icon: FileSearch },
  { id: "09", name: "Brand Guidelines", desc: "The rules that keep every touchpoint consistent.", icon: Paintbrush },
  { id: "10", name: "Operational Systems", desc: "The internal tooling that runs day-to-day execution.", icon: TerminalSquare },
];

export default function WhatWeBuild() {
  const container = useRef<HTMLDivElement>(null);
  const bgSvgSlowRef = useRef<SVGGElement>(null);
  const bgSvgFastRef = useRef<SVGGElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  const xToSlow = useRef<gsap.QuickToFunc | null>(null);
  const yToSlow = useRef<gsap.QuickToFunc | null>(null);
  const xToFast = useRef<gsap.QuickToFunc | null>(null);
  const yToFast = useRef<gsap.QuickToFunc | null>(null);

  // Responsive Carousel Logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 5-Second Auto-Advance Timer
  useEffect(() => {
    if (isHovered) return;
    const maxIndex = systems.length - cardsToShow;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [cardsToShow, isHovered]);

  const handleNext = () => {
    const maxIndex = systems.length - cardsToShow;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    const maxIndex = systems.length - cardsToShow;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useGSAP(() => {
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

    gsap.to(".matrix-node-float", {
      y: -14,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.7,
    });

    gsap.fromTo(
      ".build-header-item",
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

    gsap.fromTo(
      trackRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: container });

  const handleSectionMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
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
      ref={container} 
      id="what-we-build" 
      onMouseMove={handleSectionMouseMove}
      className="relative w-full py-28 md:py-36 bg-[#0D0E12] text-white border-y border-zinc-800/80 overflow-hidden"
    >
      {/* Top Right Telemetry & Architecture Node */}
      <div className="build-header-item absolute top-10 right-6 md:right-12 z-40 hidden sm:flex flex-col items-end gap-2">
        <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md rounded-lg shadow-xl">
          <ShieldCheck size={14} className="text-[#C39967]" />
          <div className="flex flex-col text-right font-mono">
            <span className="text-[9px] uppercase tracking-widest text-zinc-500">Core Network</span>
            <span className="text-xs font-bold text-zinc-200 tracking-wide">ENTERPRISE CLUSTER 01</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-950/40 border border-zinc-800/50 backdrop-blur-md rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-400">BRICKETX PK // SYSTEMS ONLINE</span>
        </div>
      </div>

      {/* Interactive Vector Topology SVG Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          className="w-[130%] h-[130%] max-w-none opacity-40 will-change-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Depth Layer 1: Conduits & Telemetry Rings (Slow) */}
          <g ref={bgSvgSlowRef}>
            <line x1="160" y1="120" x2="720" y2="450" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
            <line x1="720" y1="450" x2="1280" y2="240" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
            <line x1="720" y1="450" x2="720" y2="820" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />

            <circle cx="720" cy="450" r="260" stroke="#C39967" strokeWidth="1" strokeDasharray="12 16" strokeOpacity="0.25" className="matrix-radar-spin" />
            <circle cx="720" cy="450" r="420" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.1" />
            <circle cx="720" cy="450" r="5" fill="#C39967" />
          </g>

          {/* Depth Layer 2: 3D Hardware Nodes & Crosshairs (Fast) */}
          <g ref={bgSvgFastRef}>
            <g transform="translate(180, 160)" className="matrix-node-float">
              <polygon points="45,0 90,26 45,52 0,26" fill="#18191E" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.7" />
              <polygon points="0,26 45,52 45,104 0,78" fill="#121317" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.5" />
              <polygon points="45,52 90,26 90,78 45,104" fill="#0D0E12" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx="45" cy="52" r="3" fill="#C39967" />
            </g>

            <g transform="translate(1220, 600)" className="matrix-node-float">
              <polygon points="50,0 100,28 50,56 0,28" fill="#18191E" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
              <polygon points="0,28 50,56 50,112 0,84" fill="#121317" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <polygon points="50,56 100,28 100,84 50,112" fill="#0D0E12" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <circle cx="50" cy="56" r="3" fill="#ffffff" fillOpacity="0.8" />
            </g>

            <g transform="translate(1260, 200)">
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#C39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#C39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="0" cy="0" r="18" stroke="#C39967" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
            </g>
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-80" />

      <div className="absolute top-1/4 -left-20 w-[600px] h-[350px] bg-[#C39967]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-[550px] h-[350px] bg-zinc-700/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header & Carousel Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl mt-12 md:mt-0">
            <div className="build-header-item inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest">
              <Terminal size={13} />
              What We Build
            </div>
            <h2 className="build-header-item text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Not Services. <br />
              <span className="text-[#C39967]">Systems.</span>
            </h2>
          </div>
          
          <div className="build-header-item flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
            <p className="text-sm text-zinc-400 max-w-xs font-light leading-relaxed hidden sm:block">
              The infrastructure that runs the BricketX ecosystem end to end.
            </p>
            
            {/* Terminal Style Navigation Controls */}
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-2">
                [{String(currentIndex + 1).padStart(2, '0')} / {String(systems.length - cardsToShow + 1).padStart(2, '0')}]
              </div>
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900/80 flex items-center justify-center hover:bg-[#C39967] hover:text-black hover:border-[#C39967] transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900/80 flex items-center justify-center hover:bg-[#C39967] hover:text-black hover:border-[#C39967] transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track Wrapper */}
        <div 
          className="relative w-full overflow-hidden -mx-3 px-3 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={trackRef}
            className="flex transition-transform duration-700 ease-in-out will-change-transform"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` 
            }}
          >
            {systems.map((system) => {
              const Icon = system.icon;

              return (
                <div 
                  key={system.id} 
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3 flex"
                >
                  <div
                    onMouseMove={handleCardMouseMove}
                    className="system-card w-full group relative p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 backdrop-blur-md shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#C39967]/60 hover:bg-zinc-900/80"
                    style={{
                      background: `radial-gradient(350px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 80%), rgba(24, 24, 27, 0.45)`,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs text-zinc-400 pb-4 mb-5 border-b border-zinc-800/70">
                        <span className="text-[#C39967] font-bold">NODE // {system.id}</span>
                        <span className="text-[10px] uppercase font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] shrink-0 group-hover:bg-[#C39967] group-hover:text-black transition-colors duration-300">
                          <Icon size={22} />
                        </div>
                        <div className="w-7 h-7 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#C39967] transition-all shrink-0">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#C39967] transition-colors">
                        {system.name}
                      </h3>

                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                        {system.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-2">
            <Activity size={13} className="text-[#C39967]" />
            CENTRAL KARACHI LAB // 10 ACTIVE HARDWARE NODES
          </span>
          <span>ENTERPRISE SPECIFICATION // 100% OPERATIONAL</span>
        </div>

      </div>
    </section>
  );
}