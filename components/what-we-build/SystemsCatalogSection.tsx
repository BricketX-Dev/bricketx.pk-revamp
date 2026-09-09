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
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.07,
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
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      ref={container} 
      id="systems-catalog"
      className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED]"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <Activity size={13} className="text-[#C39967]" />
              Enterprise Architecture // 10 Active Systems
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
              The Deployed <span className="text-[#C39967]">Systems Matrix</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            Every module below is deployed and maintained 24/7 by dedicated teams in Karachi.
          </p>
        </div>

        {/* Responsive Grid of All 10 Systems */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemsList.map((sys) => {
            const Icon = iconRegistry[sys.iconKey] || MonitorSmartphone;

            return (
              <div
                key={sys.id}
                onMouseMove={handleMouseMove}
                className="sys-catalog-card group relative p-8 rounded-3xl bg-white border border-[#E8EBED] shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-[#C39967] hover:shadow-[0_20px_50px_rgba(195,153,103,0.09)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.08), transparent 70%), #FFFFFF`,
                }}
              >
                <div>
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                    <span className="font-bold text-[#C39967]">NODE // {sys.num}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D] px-2 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED]">
                      {sys.category}
                    </span>
                  </div>

                  {/* Icon & External Indicator */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAFBFD] border border-[#E8EBED] flex items-center justify-center text-[#C39967] group-hover:scale-105 group-hover:bg-[#FAF5EE] group-hover:border-[#C39967]/40 transition-all duration-300 shadow-xs">
                      <Icon size={24} />
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#E8EBED] flex items-center justify-center text-[#A5ADB6] group-hover:text-[#C39967] group-hover:border-[#C39967] transition-all">
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-[#18181B] mb-3 group-hover:text-[#C39967] transition-colors">
                    {sys.name}
                  </h3>

                  <p className="text-sm text-[#5E646D] leading-relaxed font-normal mb-8">
                    {sys.desc}
                  </p>
                </div>

                {/* Card Footer: Tech Badge & Explore CTA */}
                <div className="pt-4 border-t border-[#E8EBED] flex items-center justify-between font-mono text-xs">
                  <span className="text-[11px] text-[#A5ADB6] font-medium">
                    {sys.techBadge}
                  </span>
                  <a
                    href="#contact"
                    className="font-bold text-[#18181B] group-hover:text-[#C39967] flex items-center gap-1 transition-colors"
                  >
                    <span>Explore</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}