"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Code2, 
  Megaphone, 
  Workflow, 
  Palette, 
  Boxes,
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Activity,
  Radio
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface DepartmentShiftItem {
  id: string;
  num: string;
  tag: string;
  name: string;
  unit: string;
  summary: string;
  icon: typeof Code2;
  accentColor: string;
  badge: string;
  subTeams: {
    name: string;
    desc: string;
  }[];
}

const departmentsStackData: DepartmentShiftItem[] = [
  {
    id: "technology",
    num: "01",
    tag: "SYS-TECH // ARCHITECTURE",
    name: "Technology",
    unit: "Core Engineering Node",
    summary: "The engineering core of the network - the platforms, intelligence, automation and security everything else runs on.",
    icon: Code2,
    accentColor: "from-[#C39967]/15 via-white to-white",
    badge: "99.99% Uptime",
    subTeams: [
      { name: "Web Development", desc: "Investor portals, dashboards and public platforms built to scale." },
      { name: "AI", desc: "Models and assistants that automate research, support and reporting." },
      { name: "Automation", desc: "Workflows that remove manual, repetitive operational work." },
      { name: "Cyber Security", desc: "Protecting investor data and network infrastructure end to end." },
    ],
  },
  {
    id: "marketing",
    num: "02",
    tag: "MKT-DIST // REACH",
    name: "Marketing",
    unit: "Global Demand Engine",
    summary: "How the network is discovered, understood and trusted - demand, brand and investor reach across every channel and search surface.",
    icon: Megaphone,
    accentColor: "from-amber-500/10 via-white to-white",
    badge: "Global Reach",
    subTeams: [
      { name: "Social Media", desc: "Presence and community across every platform." },
      { name: "SEO", desc: "Ranking the network across search and AI answer engines." },
      { name: "Video Production", desc: "Films, explainers and investor-facing visual content." },
      { name: "Paid Ads", desc: "Performance campaigns that bring qualified investors." },
    ],
  },
  {
    id: "operations",
    num: "03",
    tag: "OPS-FLOW // GOVERNANCE",
    name: "Operations",
    unit: "Capital & Structured Compliance",
    summary: "The machinery that keeps capital, data and reporting moving - the day-to-day systems behind every investor relationship.",
    icon: Workflow,
    accentColor: "from-emerald-500/10 via-white to-white",
    badge: "Audited & Regulated",
    subTeams: [
      { name: "Investor Relations", desc: "Onboarding, communication and support for every investor." },
      { name: "CRM", desc: "Systems that manage each investor and partner relationship." },
      { name: "Reporting", desc: "Structured, auditable performance reporting." },
      { name: "Documentation", desc: "Records, compliance and process documentation." },
    ],
  },
  {
    id: "creative",
    num: "04",
    tag: "CRT-UX // INTERACTION",
    name: "Creative",
    unit: "Brand Systems & Spatial Motion",
    summary: "How the network looks, feels and communicates - the identity, interfaces and motion across the entire ecosystem.",
    icon: Palette,
    accentColor: "from-blue-500/10 via-white to-white",
    badge: "Design System 2.4",
    subTeams: [
      { name: "Branding", desc: "Identity and guidelines across the ecosystem." },
      { name: "UI/UX", desc: "Interfaces designed for clarity and trust." },
      { name: "Graphic Design", desc: "Visual assets for every channel and campaign." },
      { name: "Motion Graphics", desc: "Animation and motion for product and marketing." },
    ],
  },
  {
    id: "production",
    num: "05",
    tag: "PRD-EXEC // ACCELERATION",
    name: "Production",
    unit: "Research & Sprint Delivery",
    summary: "Turning ideas into shipped, coordinated, scalable work - the research, process and coordination that hold delivery together across regions.",
    icon: Boxes,
    accentColor: "from-[#C39967]/15 via-white to-white",
    badge: "Active Sprints",
    subTeams: [
      { name: "Research", desc: "Market, product and process research." },
      { name: "Process Management", desc: "Systems that keep delivery consistent and repeatable." },
      { name: "Training", desc: "Upskilling teams across the hub." },
      { name: "Global Coordination", desc: "Aligning execution across UK/BVI, Dubai and Kenya." },
    ],
  },
];

export default function DepartmentsStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const bgSvgSlowRef = useRef<SVGGElement>(null);
  const bgSvgFastRef = useRef<SVGGElement>(null);

  const xToSlow = useRef<gsap.QuickToFunc | null>(null);
  const yToSlow = useRef<gsap.QuickToFunc | null>(null);
  const xToFast = useRef<gsap.QuickToFunc | null>(null);
  const yToFast = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Mouse parallax bindings
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

    // Set initial positions
    cards.forEach((card, i) => {
      if (i !== 0) {
        gsap.set(card, { yPercent: 100, autoAlpha: 1 });
      } else {
        gsap.set(card, { yPercent: 0, autoAlpha: 1 });
      }
    });

    // Pinned Stacking Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${cards.length * 110}%`,
        pin: pinTargetRef.current,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeIndex = Math.min(
            cards.length,
            Math.max(1, Math.ceil(self.progress * cards.length))
          );
          const counterEl = document.getElementById("dept-shift-counter");
          if (counterEl) {
            counterEl.innerText = `0${activeIndex} / 05`;
          }
          const barEl = document.getElementById("dept-shift-progress-bar");
          if (barEl) {
            barEl.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Card slide-up & previous card scale-down
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
      id="departments-stack" 
      onMouseMove={handleMouseMove}
      className="relative bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          className="w-[125%] h-[125%] max-w-none opacity-40 will-change-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Depth Layer 1 */}
          <g ref={bgSvgSlowRef}>
            <line x1="200" y1="180" x2="720" y2="450" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
            <line x1="720" y1="450" x2="1240" y2="280" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
            <line x1="720" y1="450" x2="720" y2="800" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />

            <circle cx="720" cy="450" r="220" stroke="#C39967" strokeWidth="1" strokeDasharray="10 14" strokeOpacity="0.3" className="dept-radar-spin" />
            <circle cx="720" cy="450" r="340" stroke="#A5ADB6" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.35" />
            <circle cx="720" cy="450" r="5" fill="#C39967" />
          </g>

          {/* Depth Layer 2 */}
          <g ref={bgSvgFastRef}>
            <g transform="translate(180, 160)">
              <polygon points="45,0 90,26 45,52 0,26" fill="#FFFFFF" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.8" />
              <polygon points="0,26 45,52 45,104 0,78" fill="#FAF5EE" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.6" />
              <polygon points="45,52 90,26 90,78 45,104" fill="#F0E5D5" stroke="#C39967" strokeWidth="1.2" strokeOpacity="0.6" />
              <circle cx="45" cy="52" r="3" fill="#C39967" />
            </g>

            <g transform="translate(1220, 620)">
              <polygon points="45,0 90,26 45,52 0,26" fill="#FFFFFF" stroke="#A5ADB6" strokeWidth="1.2" strokeOpacity="0.7" />
              <polygon points="0,26 45,52 45,104 0,78" fill="#F8F9FA" stroke="#A5ADB6" strokeWidth="1.2" strokeOpacity="0.5" />
              <polygon points="45,52 90,26 90,78 45,104" fill="#E8EBED" stroke="#A5ADB6" strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx="45" cy="52" r="3" fill="#A5ADB6" />
            </g>

            <g transform="translate(1260, 200)">
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#C39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#C39967" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="0" cy="0" r="18" stroke="#C39967" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>
          </g>
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C39967]/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-60 pointer-events-none" />

      {/* Target Pin Viewport */}
      <div 
        ref={pinTargetRef} 
        className="w-full h-screen flex flex-col justify-between py-8 px-6 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden"
      >
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-2 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
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
        <div className="relative w-full max-w-5xl mx-auto h-[530px] md:h-[550px] my-auto">
          {departmentsStackData.map((dept, idx) => {
            const Icon = dept.icon;

            return (
              <div
                key={dept.num}
                onMouseMove={handleCardMouseMove}
                className="dept-card-wrapper absolute inset-0 w-full h-full rounded-3xl border border-[#E8EBED] bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between p-7 md:p-10 will-change-transform"
                style={{ 
                  zIndex: idx + 10,
                  background: `radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(195, 153, 103, 0.08), transparent 60%), #FFFFFF`,
                }}
              >
                {/* Subtle Gradient Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.accentColor} opacity-70 pointer-events-none`} />

                {/* Big Architectural Watermark */}
                <div className="absolute top-6 right-8 font-mono text-8xl md:text-9xl font-black text-[#18181B]/5 select-none pointer-events-none">
                  {dept.num}
                </div>

                {/* Card Header Strip */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#E8EBED]/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#C39967] tracking-wider uppercase flex items-center gap-1.5">
                      <Radio size={12} className="animate-pulse" />
                      {dept.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C39967]" />
                    <span className="text-xs font-mono text-[#5E646D] hidden sm:inline">
                      {dept.unit}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="group/link inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#18181B] hover:text-[#C39967] transition-colors"
                  >
                    <span>View department</span>
                    <ArrowRight size={13} className="text-[#C39967] transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>

                {/* Card Body */}
                <div className="relative z-10 my-auto py-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAF5EE] border border-[#C39967]/30 shadow-xs flex items-center justify-center text-[#C39967] shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#5E646D] uppercase tracking-wider block">
                        Engine Division {dept.num}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-[#18181B]">
                        {dept.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[#5E646D] text-sm md:text-base max-w-2xl leading-relaxed font-normal mb-5">
                    {dept.summary}
                  </p>

                  {/* Sub-teams Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {dept.subTeams.map((team, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#E8EBED] hover:border-[#C39967]/60 hover:bg-white transition-all flex flex-col justify-between group/sub"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1.5 mb-1.5">
                            <h4 className="text-xs font-bold text-[#18181B] group-hover/sub:text-[#C39967] transition-colors">
                              {team.name}
                            </h4>
                            <ArrowUpRight size={12} className="text-[#A5ADB6] group-hover/sub:text-[#C39967] transition-colors" />
                          </div>
                          <p className="text-[11px] text-[#5E646D] font-normal leading-relaxed mb-2 line-clamp-2">
                            {team.desc}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-[#C39967] flex items-center gap-0.5">
                          Explore &rarr;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Strip */}
                <div className="relative z-10 pt-3 border-t border-[#E8EBED]/80 flex items-center justify-between font-mono text-xs text-[#5E646D]">
                  <span className="text-[11px] text-[#A5ADB6] uppercase tracking-wider hidden sm:inline">
                    BRICKETX PK // OPERATIONAL COMPONENT
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8EBED] text-[11px] font-semibold text-[#18181B] shadow-xs ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {dept.badge}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Progress Footer Bar */}
        <div className="relative pt-4 border-t border-[#E8EBED] shrink-0">
          <div className="absolute top-0 left-0 h-[2px] bg-[#C39967] transition-all duration-100" id="dept-shift-progress-bar" style={{ width: "20%" }} />
          <div className="flex items-center justify-between text-xs font-mono text-[#A5ADB6]">
            <span className="flex items-center gap-2">
              <Activity size={13} className="text-[#C39967]" />
              SCROLL TO SHIFT ENGINE DISCIPLINES
            </span>
            <span id="dept-shift-counter" className="font-bold text-[#18181B]">01 / 05</span>
          </div>
        </div>

      </div>
    </section>
  );
}