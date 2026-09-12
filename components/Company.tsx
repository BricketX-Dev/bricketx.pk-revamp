"use client";

import { useState, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Terminal, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Globe2, 
  Zap, 
  Scale, 
  ArrowUpRight 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const institutionalPillars = [
  {
    id: "01",
    tag: "MANDATE",
    label: "Core Architecture",
    title: "Proprietary Infrastructure",
    desc: "We exclusively architect and maintain internal systems powering the global BricketX network. We do not operate as an external agency or take third-party client briefs.",
    icon: Layers,
    badge: "100% In-House",
    deliverables: ["Zero External Dependencies", "Direct Core Integration", "Private Source Repos"],
  },
  {
    id: "02",
    tag: "TOPOLOGY",
    label: "Global Reach",
    title: "Four Strategic Nodes",
    desc: "Continuous operational execution connecting our Karachi central engineering engine room directly with executive desks in London, Dubai, and on-site facilities in Kenya.",
    icon: Globe2,
    badge: "4 Regions Linked",
    deliverables: ["UK/BVI Holdings", "Dubai Leadership", "Kenya Mining", "Karachi Engine"],
  },
  {
    id: "03",
    tag: "THROUGHPUT",
    label: "Execution Protocol",
    title: "Institutional Scale",
    desc: "Built for continuous operation. Zero-downtime deployment pipelines, deterministic agentic workflows, low-latency microservices, and verified ledger synchronization.",
    icon: Zap,
    badge: "Continuous Runtime",
    deliverables: ["Deterministic Pipelines", "Sub-100ms Responses", "Automated Failover"],
  },
  {
    id: "04",
    tag: "COMPLIANCE",
    label: "Governance",
    title: "Shariah Compliant",
    desc: "Ethical logic and immutable auditing records are mathematically encoded directly into the core database schemas and financial balance ledgers.",
    icon: Scale,
    badge: "AAOIFI Verified",
    deliverables: ["Zero-Variance Audits", "Cryptographic Ledgers", "Shariah Aligned"],
  },
];

export default function Company() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<SVGGElement>(null);
  const [activePillar, setActivePillar] = useState(institutionalPillars[0]);

  const xToOrb = useRef<gsap.QuickToFunc | null>(null);
  const yToOrb = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // Parallax mouse binding
    if (orbitalRef.current) {
      xToOrb.current = gsap.quickTo(orbitalRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToOrb.current = gsap.quickTo(orbitalRef.current, "y", { duration: 1.2, ease: "power2.out" });
    }

    // Continuous ambient slow rotation
    gsap.to(".company-vector-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 65,
      repeat: -1,
      ease: "none",
    });

    // Left Column narrative reveal
    gsap.fromTo(
      ".company-reveal-left",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Right Column grid cards stagger
    gsap.fromTo(
      ".pillar-card-box",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillars-grid-wrap",
          start: "top 82%",
        },
      }
    );
  }, { scope: containerRef });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToOrb.current?.(x * 0.035);
    yToOrb.current?.(y * 0.035);
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
      id="company" 
      onMouseMove={handleMouseMove}
      className="relative w-full py-28 md:py-36 bg-[#050507] text-[#F4F5F7] border-y border-zinc-800/80 overflow-hidden select-none"
    >
      {/* Precision Structural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-80" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[350px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Interactive Vector Orbital Ambience */}
      <div className="absolute inset-0 flex items-center justify-start pl-[5%] pointer-events-none overflow-hidden opacity-25">
        <svg viewBox="0 0 600 600" className="w-[500px] h-[500px] lg:w-[620px] lg:h-[620px] will-change-transform" fill="none">
          <g ref={orbitalRef}>
            <circle cx="300" cy="300" r="260" stroke="#52525b" strokeWidth="1" strokeDasharray="10 14" className="company-vector-spin" />
            <circle cx="300" cy="300" r="180" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="300" cy="300" r="100" stroke="#3f3f46" strokeWidth="0.8" />
            <line x1="60" y1="300" x2="540" y2="300" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <line x1="300" y1="60" x2="300" y2="540" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="300" cy="300" r="4" fill="#C39967" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Institutional Prospectus Sticky Anchor */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-32">
            
            <div className="company-reveal-left inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#C39967]/10 text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest w-fit">
              <Terminal size={13} />
              Institutional DNA // Karachi Node
            </div>

            <h2 className="company-reveal-left text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[0.98]">
              Engineered for <br />
              <span className="text-[#C39967]">Sovereign Trust.</span>
            </h2>

            <p className="company-reveal-left text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-8">
              BricketX operates at the intersection of private wealth syndication and hardened infrastructure. As the centralized Engine Room in Karachi, our mandate is exclusively focused on continuous architecture, zero-variance governance, and cross-border execution.
            </p>

            {/* Active Pillar Telemetry HUD box */}
            <div className="company-reveal-left p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 font-mono text-xs mb-8 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  INSPECTING PROTOCOL
                </span>
                <span className="text-[#C39967] font-bold">PILLAR {activePillar.id} // 04</span>
              </div>
              <div className="text-white font-bold text-sm mb-1">{activePillar.title}</div>
              <div className="text-zinc-400 text-xs font-light leading-relaxed">{activePillar.label} &mdash; {activePillar.badge}</div>
            </div>

            <div className="company-reveal-left">
              <a
                href="/careers"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-[#C39967] bg-zinc-900/50 hover:bg-[#C39967]/10 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all"
              >
                <span>View Engineering Culture</span>
                <ArrowRight size={14} className="text-[#C39967] transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* Right Column: 2x2 Architectural Cards Grid */}
          <div className="lg:col-span-7 pillars-grid-wrap grid grid-cols-1 sm:grid-cols-2 gap-5">
            {institutionalPillars.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activePillar.id === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActivePillar(pillar)}
                  onMouseMove={handleCardMouseMove}
                  className={`pillar-card-box group relative p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-zinc-900/70 border-[#C39967]/80 shadow-[0_15px_40px_rgba(195,153,103,0.1)] -translate-y-1"
                      : "bg-zinc-950/50 border-zinc-800/70 hover:border-zinc-700 hover:bg-zinc-900/40"
                  }`}
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.1), transparent 80%), rgba(12, 13, 16, 0.65)`,
                  }}
                >
                  {/* Top Identifier */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs pb-4 mb-5 border-b border-zinc-800/70">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#C39967]">NODE {pillar.id}</span>
                        <span className="text-zinc-600">/</span>
                        <span className="text-zinc-500 uppercase">{pillar.tag}</span>
                      </div>
                      {/* Badge has been removed from here */}
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] group-hover:scale-105 group-hover:bg-[#C39967] group-hover:text-black transition-all duration-300">
                        <Icon size={22} />
                      </div>
                      <div className="w-7 h-7 rounded-full border border-zinc-800 group-hover:border-[#C39967] flex items-center justify-center text-zinc-500 group-hover:text-white transition-all">
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#A5ADB6] block mb-1">
                      {pillar.label}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3 group-hover:text-[#C39967] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Micro Deliverables Chips */}
                  <div className="pt-4 border-t border-zinc-800/70">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800/80 text-[10px] font-mono text-zinc-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Corporate Footnote */}
        <div className="mt-16 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-[#C39967]" />
            <span>BRICKETX HOLDINGS (UK/BVI) &mdash; SOVEREIGN CAPITAL RUNTIME</span>
          </div>
          <span className="text-zinc-400">100% AUDIT VERIFIED // ZERO VARIANCE</span>
        </div>

      </div>
    </section>
  );
}