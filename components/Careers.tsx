"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Terminal, 
  ShieldAlert, 
  Zap, 
  Scale, 
  Cpu,
  ArrowRight,
  Fingerprint
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const principles = [
  {
    title: "Zero-Downtime Deployments",
    desc: "Our CI/CD pipelines are built for continuous institutional execution. We ship to the edge globally without dropping a single frame or transaction.",
    icon: Zap,
    colSpan: "lg:col-span-8",
  },
  {
    title: "Cryptographic Security",
    desc: "Zero-trust architecture by default. Every endpoint, database, and webhook is hardened against intrusion.",
    icon: Fingerprint,
    colSpan: "lg:col-span-4",
  },
  {
    title: "Shariah-Compliant Architecture",
    desc: "Ethical logic baked into the codebase. Automated ledger compliance across all cross-border capital routing.",
    icon: Scale,
    colSpan: "lg:col-span-5",
  },
  {
    title: "Autonomous Execution",
    desc: "We favor deterministic AI agents and micro-services over manual operations. If a task repeats, it gets automated.",
    icon: Cpu,
    colSpan: "lg:col-span-7",
  },
];

const openRoles = [
  {
    id: "REQ-092",
    title: "Senior Next.js Systems Architect",
    type: "Full-Time",
    location: "Karachi Node / Hybrid",
    status: "URGENT",
  },
  {
    id: "REQ-095",
    title: "AI Prompt Engineer & Data Ops",
    type: "Contract",
    location: "Karachi Node / Remote",
    status: "OPEN",
  },
  {
    id: "REQ-104",
    title: "Database Reliability Engineer",
    type: "Full-Time",
    location: "Karachi Node",
    status: "OPEN",
  },
];

export default function Careers() {
  const container = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal headers and text
    gsap.fromTo(
      ".culture-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );

    // Stagger in the Bento Box cards
    gsap.fromTo(
      ".bento-card",
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );

    // Requisitions list reveal
    gsap.fromTo(
      ".req-row",
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".req-container",
          start: "top 85%",
        },
      }
    );
  }, { scope: container });

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
      id="careers" 
      className="relative w-full py-28 md:py-36 bg-[#0a0a0b] text-white border-y border-zinc-800/80 overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-50" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C39967]/5 blur-[150px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="culture-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-zinc-700/50 bg-zinc-800/30 text-xs font-mono font-semibold text-zinc-300 uppercase tracking-widest shadow-xs">
              <ShieldAlert size={13} className="text-[#C39967]" />
              Culture & Engineering Standards
            </div>
            <h2 className="culture-reveal text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              We don't write code. <br />
              <span className="text-[#C39967]">We engineer infrastructure.</span>
            </h2>
          </div>
          <p className="culture-reveal text-sm md:text-base text-zinc-400 max-w-sm font-light leading-relaxed">
            The Karachi hub operates with the precision of a high-frequency trading desk. No bloat, no bureaucracy—just elite talent building bulletproof systems.
          </p>
        </div>

        {/* Culture Bento Box Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mb-24">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onMouseMove={handleCardMouseMove}
                className={`bento-card group relative p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#C39967]/50 ${item.colSpan}`}
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(195, 153, 103, 0.08), transparent 40%), rgba(24, 24, 27, 0.3)`,
                }}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-[#C39967] mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Open Requisitions Terminal */}
        <div className="req-container max-w-4xl mx-auto">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-zinc-800 flex-1" />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C39967]">
              <Terminal size={14} />
              Open Requisitions
            </div>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          <div className="flex flex-col border-t border-zinc-800/80">
            {openRoles.map((role, idx) => (
              <a
                key={idx}
                href="#contact"
                className="req-row group flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-zinc-800/80 hover:bg-zinc-900/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 sm:mb-0">
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-[#C39967] transition-colors">
                    {role.id}
                  </span>
                  <span className="text-base font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {role.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-zinc-500 hidden md:block">{role.location}</span>
                  <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-zinc-300">
                    {role.type}
                  </span>
                  <span className={`px-2 py-1 rounded font-bold ${
                    role.status === 'URGENT' 
                      ? 'bg-[#C39967]/10 text-[#C39967] border border-[#C39967]/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {role.status}
                  </span>
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all ml-2" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a 
              href="#contact"
              className="text-xs font-mono text-zinc-500 hover:text-[#C39967] transition-colors underline decoration-zinc-800 underline-offset-4"
            >
              Don't see your role? Submit a generalized data packet.
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}