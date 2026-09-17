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
  Activity
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconRegistry = {
  portal: MonitorSmartphone,
  web: Network,
  ai: Cpu,
  crm: Database,
  dashboards: LineChart,
  automations: Workflow,
  funnels: Filter,
  reporting: FileSearch,
  brand: Paintbrush,
  operational: TerminalSquare,
};

export interface SystemRecord {
  id: string;
  num: string;
  name: string;
  desc: string;
  iconKey: keyof typeof iconRegistry;
  category: string;
  techBadge: string;
}

const systemsList: SystemRecord[] = [
  {
    id: "investor-portal",
    num: "01",
    name: "Investor Portal",
    desc: "The secure dashboard investors log into to track holdings, returns and documents in real time.",
    iconKey: "portal",
    category: "Capital Interface",
    techBadge: "Next.js · WebSockets",
  },
  {
    id: "web-platforms",
    num: "02",
    name: "Web Platforms",
    desc: "The public sites and applications that run across every entity in the ecosystem.",
    iconKey: "web",
    category: "Edge Delivery",
    techBadge: "React · TypeScript",
  },
  {
    id: "ai-systems",
    num: "03",
    name: "AI Systems",
    desc: "Models and assistants that automate research, investor support and internal reporting.",
    iconKey: "ai",
    category: "Intelligence Layer",
    techBadge: "Python · LangChain",
  },
  {
    id: "crm-solutions",
    num: "04",
    name: "CRM Solutions",
    desc: "The systems that manage every investor, partner and lead relationship in one place.",
    iconKey: "crm",
    category: "Operations Mesh",
    techBadge: "PostgreSQL · APIs",
  },
  {
    id: "dashboards",
    num: "05",
    name: "Dashboards",
    desc: "Live reporting views that give teams and stakeholders a single source of truth.",
    iconKey: "dashboards",
    category: "Telemetry HUD",
    techBadge: "Tailwind · Charts",
  },
  {
    id: "automations",
    num: "06",
    name: "Automations",
    desc: "Workflows that remove manual, repetitive work across operations and marketing.",
    iconKey: "automations",
    category: "Execution Engine",
    techBadge: "Webhooks · Microservices",
  },
  {
    id: "marketing-funnels",
    num: "07",
    name: "Marketing Funnels",
    desc: "The end-to-end paths that turn interest into qualified, onboarded investors.",
    iconKey: "funnels",
    category: "Conversion Pipeline",
    techBadge: "Analytics · Attribution",
  },
  {
    id: "reporting-systems",
    num: "08",
    name: "Reporting Systems",
    desc: "Structured, auditable reporting for performance, compliance and governance.",
    iconKey: "reporting",
    category: "Audit Ledger",
    techBadge: "AAOIFI Compliant",
  },
  {
    id: "brand-guidelines",
    num: "09",
    name: "Brand Guidelines",
    desc: "The rules and assets that keep every touchpoint across the network consistent.",
    iconKey: "brand",
    category: "Design Architecture",
    techBadge: "Figma · Design Tokens",
  },
  {
    id: "operational-systems",
    num: "10",
    name: "Operational Systems",
    desc: "The internal tooling that runs day-to-day execution across the hub.",
    iconKey: "operational",
    category: "Internal Infrastructure",
    techBadge: "Node.js · CLI Tools",
  },
];

export default function SystemsCatalogSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".sys-catalog-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update ambient glow position
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Calculate 3D tilt values based on mouse position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Limits max tilt to 8 degrees
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      z: 20,
      scale: 1.02,
      y: -8,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Smoothly return card to flat resting state
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      y: 0,
      ease: "power3.out",
      duration: 0.7,
    });
  };

  return (
    <section 
      ref={container} 
      id="systems-catalog"
      className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <Activity size={13} className="text-[#C39967]" />
              Enterprise Architecture // 10 Active Systems
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-5">
              The Deployed <span className="text-[#C39967]">Systems Matrix</span>
            </h2>
            <p className="text-sm md:text-base text-[#5E646D] max-w-xl font-normal leading-relaxed">
              Every module below is deployed and maintained 24/7 by dedicated teams in Karachi.
            </p>
          </div>
        </div>

        {/* Responsive Grid (Horizontal swipe on mobile, Grid on desktop) */}
        <div 
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-[calc(100%+3rem)] -ml-6 px-[8vw] sm:px-[6vw] md:w-full md:ml-0 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
          style={{ perspective: "1200px" }}
        >
          {systemsList.map((sys) => {
            const Icon = iconRegistry[sys.iconKey] || MonitorSmartphone;

            return (
              <div
                key={sys.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="sys-catalog-card group w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-center relative p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#C39967]/40 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-[#C39967] hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.35)] transition-[border-color,box-shadow] duration-500 ease-out flex flex-col justify-between overflow-hidden cursor-pointer will-change-transform"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 70%), #FFFFFF`,
                }}
              >
                {/* Sleek Animated Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 group-hover:h-2 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-70 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none" />

                <div>
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED] group-hover:border-[#C39967]/30 transition-colors duration-500">
                    <span className="font-bold text-[#C39967]">NODE // {sys.num}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D] px-2 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED] group-hover:border-[#C39967]/40 transition-colors">
                      {sys.category}
                    </span>
                  </div>

                  {/* Icon & External Indicator */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAFBFD] border border-[#C39967]/30 flex items-center justify-center text-[#C39967] group-hover:bg-[#C39967] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_10px_20px_-5px_rgba(195,153,103,0.5)] transition-all duration-500 ease-out">
                      <Icon size={24} className="transition-transform duration-500 ease-out" />
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#E8EBED] flex items-center justify-center text-[#A5ADB6] group-hover:text-white group-hover:bg-[#C39967] group-hover:border-[#C39967] transition-all duration-500">
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-[#18181B] mb-3 group-hover:text-[#C39967] transition-colors duration-300">
                    {sys.name}
                  </h3>

                  <p className="text-sm text-[#5E646D] leading-relaxed font-normal mb-8 pointer-events-none">
                    {sys.desc}
                  </p>
                </div>

                {/* Card Footer: Tech Badge & Explore CTA */}
                <div className="pt-4 border-t border-[#E8EBED] group-hover:border-[#C39967]/30 flex items-center justify-between font-mono text-xs transition-colors duration-500">
                  <span className="text-[11px] text-[#A5ADB6] font-medium group-hover:text-[#C39967]/80 transition-colors">
                    {sys.techBadge}
                  </span>
                  <div className="font-bold text-[#18181B] group-hover:text-[#C39967] flex items-center gap-1 transition-colors">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}