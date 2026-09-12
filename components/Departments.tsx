"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Code2, 
  Megaphone, 
  Briefcase, 
  Palette, 
  Workflow, 
  CheckCircle2, 
  Terminal,
  Activity
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const departmentData = [
  {
    num: "01",
    tag: "SYS-TECH // ARCHITECTURE",
    name: "Technology",
    unit: "Core Digital Infrastructure",
    description: "Architecting high-concurrency web platforms, autonomous AI workflows, proprietary investor portals, and hardened cybersecurity perimeters that power the entire global network.",
    icon: Code2,
    accentColor: "from-[#C39967]/20 via-[#C39967]/5 to-transparent",
    borderColor: "border-[#C39967]/40",
    shadowColor: "shadow-[#C39967]/15",
    accentLine: "bg-gradient-to-r from-[#C39967] to-[#C39967]/10",
    badge: "99.99% Uptime",
    capabilities: ["Web Architecture", "AI & Autonomous Systems", "Automation Pipelines", "Hardened Cyber Security"],
    stats: [
      { label: "Latency", val: "< 18ms" },
      { label: "Core Node", val: "Karachi DC" },
      { label: "Uptime SLA", val: "99.99%" }
    ]
  },
  {
    num: "02",
    tag: "MKT-DIST // REACH",
    name: "Marketing",
    unit: "Global Demand Engine",
    description: "Scaling international audience reach across search surfaces, data-driven paid acquisition, cinematic video production, and high-impact investor relations outreach.",
    icon: Megaphone,
    accentColor: "from-amber-500/20 via-amber-500/5 to-transparent",
    borderColor: "border-amber-500/40",
    shadowColor: "shadow-amber-500/15",
    accentLine: "bg-gradient-to-r from-amber-500 to-amber-500/10",
    badge: "Global Channels",
    capabilities: ["Search Engine Optimization", "Institutional PR", "Video Production", "Targeted Paid Ads"],
    stats: [
      { label: "Distribution", val: "4 Regions" },
      { label: "Velocity", val: "High Scale" },
      { label: "Outreach", val: "Multi-Tier" }
    ]
  },
  {
    num: "03",
    tag: "OPS-FLOW // GOVERNANCE",
    name: "Operations",
    unit: "Liquidity & Structured Compliance",
    description: "Managing frictionless partner onboarding, auditable compliance protocols, real-time CRM governance, and automated financial settlements across all active territories.",
    icon: Briefcase,
    accentColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-500/40",
    shadowColor: "shadow-emerald-500/15",
    accentLine: "bg-gradient-to-r from-emerald-500 to-emerald-500/10",
    badge: "Audited & Regulated",
    capabilities: ["Investor Relations", "Enterprise CRM", "Performance Reporting", "Legal Documentation"],
    stats: [
      { label: "Settlement", val: "T+0 Verified" },
      { label: "Compliance", val: "Shariah Aligned" },
      { label: "Status", val: "Audited" }
    ]
  },
  {
    num: "04",
    tag: "CRT-UX // INTERACTION",
    name: "Creative",
    unit: "Brand Systems & Spatial Motion",
    description: "Crafting institutional design systems, interactive financial interfaces, 3D motion graphics, and fluid digital experiences that define how the network looks and feels.",
    icon: Palette,
    accentColor: "from-blue-500/20 via-blue-500/5 to-transparent",
    borderColor: "border-blue-500/40",
    shadowColor: "shadow-blue-500/15",
    accentLine: "bg-gradient-to-r from-blue-500 to-blue-500/10",
    badge: "Design System 2.4",
    capabilities: ["Brand Architecture", "UI/UX Architecture", "3D & Motion Graphics", "Product Prototyping"],
    stats: [
      { label: "Framerate", val: "60 FPS" },
      { label: "Tokens", val: "1,200+" },
      { label: "Tokens Sync", val: "Automated" }
    ]
  },
  {
    num: "05",
    tag: "PRD-EXEC // ACCELERATION",
    name: "Production",
    unit: "Research & Sprint Delivery",
    description: "Bridging exploratory concepts and market research into deployed, enterprise-scale products through rigorous sprint methodologies and cross-hub coordination.",
    icon: Workflow,
    accentColor: "from-[#C39967]/20 via-[#C39967]/5 to-transparent",
    borderColor: "border-[#C39967]/40",
    shadowColor: "shadow-[#C39967]/15",
    accentLine: "bg-gradient-to-r from-[#C39967] to-[#C39967]/10",
    badge: "Active Sprints",
    capabilities: ["Market Intelligence", "Agile Process Management", "Internal Upskilling", "Cross-Hub Coordination"],
    stats: [
      { label: "Cycle Speed", val: "Bi-Weekly" },
      { label: "Global Sync", val: "Continuous" },
      { label: "Pipeline", val: "Active" }
    ]
  }
];

export default function Departments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const bgSvgSlowRef = useRef<SVGGElement>(null);
  const bgSvgFastRef = useRef<SVGGElement>(null);

  // QuickTo interpolators for cursor physics
  const xToSlow = useRef<gsap.QuickToFunc | null>(null);
  const yToSlow = useRef<gsap.QuickToFunc | null>(null);
  const xToFast = useRef<gsap.QuickToFunc | null>(null);
  const yToFast = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Setup mouse parallax bindings
    if (bgSvgSlowRef.current && bgSvgFastRef.current) {
      xToSlow.current = gsap.quickTo(bgSvgSlowRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToSlow.current = gsap.quickTo(bgSvgSlowRef.current, "y", { duration: 1.2, ease: "power2.out" });
      xToFast.current = gsap.quickTo(bgSvgFastRef.current, "x", { duration: 0.6, ease: "power3.out" });
      yToFast.current = gsap.quickTo(bgSvgFastRef.current, "y", { duration: 0.6, ease: "power3.out" });
    }

    // 2. Idle geometric rotation
    gsap.to(".dept-radar-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    const cards = gsap.utils.toArray<HTMLElement>(".dept-card-wrapper");
    if (!cards.length || !pinTargetRef.current) return;

    // Set initial card states
    cards.forEach((card, i) => {
      if (i !== 0) {
        gsap.set(card, { yPercent: 100, autoAlpha: 1 });
      } else {
        gsap.set(card, { yPercent: 0, autoAlpha: 1 });
      }
    });

    // Master Pinned Stacking Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${cards.length * 100}%`,
        pin: pinTargetRef.current,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeIndex = Math.min(
            cards.length,
            Math.max(1, Math.ceil(self.progress * cards.length))
          );
          const counterEl = document.getElementById("dept-progress-counter");
          if (counterEl) {
            counterEl.innerText = `0${activeIndex} / 05`;
          }
          const barEl = document.getElementById("dept-progress-bar");
          if (barEl) {
            barEl.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Sequence card shift & previous card scale-down
    cards.forEach((card, index) => {
      if (index === 0) return;
      const prevCard = cards[index - 1];

      tl.to(card, {
        yPercent: 0,
        ease: "none",
        duration: 1,
      })
      .to(
        prevCard,
        {
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          duration: 1,
        },
        "<"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToSlow.current?.(x * 0.03);
    yToSlow.current?.(y * 0.03);
    xToFast.current?.(x * 0.07);
    yToFast.current?.(y * 0.07);
  };

  return (
    <section 
      ref={containerRef} 
      id="departments" 
      onMouseMove={handleMouseMove}
      className="relative bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          className="w-[125%] h-[125%] max-w-none opacity-45 will-change-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Depth Layer 1 (Slow Parallax Grid & Circuits) */}
          <g ref={bgSvgSlowRef}>
            <line x1="200" y1="180" x2="720" y2="450" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
            <line x1="720" y1="450" x2="1240" y2="280" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
            <line x1="720" y1="450" x2="720" y2="800" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />

            <circle cx="720" cy="450" r="220" stroke="#C39967" strokeWidth="1" strokeDasharray="10 14" strokeOpacity="0.3" className="dept-radar-spin" />
            <circle cx="720" cy="450" r="340" stroke="#A5ADB6" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.35" />
            <circle cx="720" cy="450" r="5" fill="#C39967" />
          </g>

          {/* Depth Layer 2 (Fast Parallax 3D Nodes) */}
          <g ref={bgSvgFastRef}>
            {/* Top-Left Floating Isometric Node */}
            <g transform="translate(180, 160)">
              <polygon points="45,0 90,26 45,52 0,26" fill="#FFFFFF" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.8" />
              <polygon points="0,26 45,52 45,104 0,78" fill="#FAF5EE" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.6" />
              <polygon points="45,52 90,26 90,78 45,104" fill="#F0E5D5" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.6" />
              <circle cx="45" cy="52" r="3" fill="#C39967" />
            </g>

            {/* Bottom-Right Crosshair & Target Node */}
            <g transform="translate(1220, 620)">
              <polygon points="45,0 90,26 45,52 0,26" fill="#FFFFFF" stroke="#A5ADB6" strokeWidth="1.2" strokeOpacity="0.7" />
              <polygon points="0,26 45,52 45,104 0,78" fill="#F8F9FA" stroke="#A5ADB6" strokeWidth="1.2" strokeOpacity="0.5" />
              <polygon points="45,52 90,26 90,78 45,104" fill="#E8EBED" stroke="#A5ADB6" strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx="45" cy="52" r="3" fill="#A5ADB6" />
            </g>

            {/* Top-Right Telemetry Reticle */}
            <g transform="translate(1260, 200)">
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#C39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#C39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="0" cy="0" r="18" stroke="#C39967" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>
          </g>
        </svg>
      </div>

      {/* Atmospheric Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C39967]/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-60 pointer-events-none" />

      {/* Target Pin Viewport Container */}
      <div 
        ref={pinTargetRef} 
        className="w-full h-screen flex flex-col justify-between py-10 px-6 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden"
      >
        {/* Header Strip */}
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
              <Terminal size={14} />
              The Karachi Engine Room
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] leading-tight">
              Five Teams. <span className="text-[#C39967]">One Engine Room.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            Every layer of the BricketX network is engineered, audited, and maintained by specialized in-house divisions operating from Karachi.
          </p>
        </div>

        {/* Card Stage Wrapper */}
        {/* Card Stage Wrapper */}
        <div className="relative w-full max-w-5xl mx-auto h-[480px] md:h-[510px] my-auto">
          {departmentData.map((dept, idx) => {
            const Icon = dept.icon;

            return (
              <div
                key={dept.num}
                // ADDED: 'group' class and smooth transitions for shadow and border. 
                // Note: We avoid transitioning 'transform' here so GSAP doesn't break.
                className="dept-card-wrapper group absolute inset-0 w-full h-full rounded-3xl border border-[#C39967]/30 hover:border-[#C39967]/70 bg-white/85 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(195,153,103,0.25)] hover:shadow-[0_30px_80px_-15px_rgba(195,153,103,0.45)] transition-[box-shadow,border-color] duration-500 ease-out overflow-hidden flex flex-col justify-between p-8 md:p-12 will-change-transform"
                style={{ zIndex: idx + 10 }}
              >
                {/* Sleek Top Accent Line - Expands and brightens on hover */}
                <div className="absolute top-0 left-0 w-full h-1.5 group-hover:h-2 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none" />

                {/* Subtle Warm Ambient Glow - Intensifies on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C39967]/15 group-hover:from-[#C39967]/25 via-transparent to-transparent transition-colors duration-700 ease-out pointer-events-none" />

                {/* Big Architectural Watermark - Scales up, shifts, and darkens slightly on hover */}
                <div className="absolute top-6 right-8 font-mono text-8xl md:text-9xl font-black text-[#18181B]/5 group-hover:text-[#18181B]/10 group-hover:-translate-x-2 group-hover:scale-110 origin-top-right transition-all duration-700 ease-out select-none pointer-events-none">
                  {dept.num}
                </div>

                {/* Card Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#C39967]/20 group-hover:border-[#C39967]/40 transition-colors duration-500 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#C39967] tracking-wider uppercase">
                      {dept.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C39967]" />
                    <span className="text-xs font-mono text-[#5E646D] hidden sm:inline">
                      {dept.unit}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C39967]/30 text-xs font-mono font-medium text-[#18181B] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#C39967] animate-pulse" />
                    {dept.badge}
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative z-10 my-auto py-2">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Themed Icon Box - Inverts color, floats up, and casts a gold shadow on hover */}
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF5EE] group-hover:bg-[#C39967] border border-[#C39967]/40 group-hover:border-[#C39967] shadow-sm group-hover:shadow-[0_10px_25px_-5px_rgba(195,153,103,0.6)] flex items-center justify-center text-[#C39967] group-hover:text-white group-hover:-translate-y-1.5 transition-all duration-500 ease-out shrink-0">
                      <Icon size={26} className="group-hover:scale-110 transition-transform duration-500 ease-out" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#5E646D] group-hover:text-[#C39967] transition-colors duration-300 uppercase tracking-wider block">
                        Engine Division {dept.num}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-black tracking-tight text-[#18181B]">
                        {dept.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[#5E646D] text-base md:text-lg max-w-2xl leading-relaxed font-normal">
                    {dept.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="relative z-10 pt-5 border-t border-[#C39967]/20 group-hover:border-[#C39967]/40 transition-colors duration-500 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex flex-wrap gap-2">
                    {dept.capabilities.map((cap, cIdx) => (
                      <span 
                        key={cIdx} 
                        // Individual Pill Hover - Lifts up and glows when the user mouses over specific capabilities
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white backdrop-blur-sm border border-[#C39967]/20 hover:border-[#C39967]/60 hover:shadow-[0_4px_12px_-4px_rgba(195,153,103,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-default text-xs font-semibold text-[#18181B]"
                      >
                        <CheckCircle2 size={13} className="text-[#C39967]" />
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 font-mono text-xs text-[#5E646D] self-end md:self-auto shrink-0">
                    {dept.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-right">
                        <span className="block text-[10px] uppercase text-[#C39967] tracking-wider">{stat.label}</span>
                        <span className="font-bold text-[#18181B] text-sm group-hover:text-[#C39967] transition-colors duration-300">{stat.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Progress Footer Bar */}
        <div className="relative pt-4 border-t border-[#E8EBED] shrink-0">
          <div className="absolute top-0 left-0 h-[2px] bg-[#C39967] transition-all duration-100" id="dept-progress-bar" style={{ width: "20%" }} />
          <div className="flex items-center justify-between text-xs font-mono text-[#A5ADB6]">
            <span className="flex items-center gap-2">
              <Activity size={13} className="text-[#C39967]" />
              SCROLL TO SHIFT ENGINE DISCIPLINES
            </span>
            <span id="dept-progress-counter" className="font-bold text-[#18181B]">01 / 05</span>
          </div>
        </div>

      </div>
    </section>
  );
}