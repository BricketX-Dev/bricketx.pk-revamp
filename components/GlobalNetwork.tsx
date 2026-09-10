"use client";

import { useState, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Globe2, 
  Cpu, 
  ShieldAlert, 
  Pickaxe, 
  Landmark, 
  CheckCircle2, 
  ArrowRight,
  Radio,
  Layers
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OperationalRegion {
  id: string;
  region: string;
  tag: string;
  mandate: string;
  summary: string;
  roleDescription: string;
  corePillars: string[];
  icon: typeof Cpu;
  x: number;
  y: number;
}

const regions: OperationalRegion[] = [
  {
    id: "01",
    region: "Pakistan",
    tag: "CENTRAL OPERATIONS HUB",
    mandate: "Operations & Execution",
    summary: "The Karachi hub — where it's built.",
    roleDescription: "The engineering engine room of the entire network. Karachi drives full-stack software architecture, AI workflow pipelines, financial ledger engineering, and daily technical operations across every entity.",
    corePillars: [
      "Proprietary Platform Engineering",
      "AI Automations & Research Agents",
      "Investor Interface Systems",
      "Cross-Hub Operational Delivery"
    ],
    icon: Cpu,
    x: 620,
    y: 260,
  },
  {
    id: "02",
    region: "Dubai",
    tag: "EXECUTIVE DESK",
    mandate: "Management",
    summary: "Regional leadership & investor relations.",
    roleDescription: "Directs regional leadership, high-level institutional syndication, and sovereign capital coordination across the GCC and international private wealth markets.",
    corePillars: [
      "Strategic Executive Direction",
      "Institutional Investor Relations",
      "GCC Allocation Strategy",
      "Sovereign Partnership Alignment"
    ],
    icon: ShieldAlert,
    x: 540,
    y: 235,
  },
  {
    id: "03",
    region: "Kenya",
    tag: "ON-SITE PRODUCTION",
    mandate: "Mining",
    summary: "On-the-ground production & sourcing.",
    roleDescription: "Oversees physical field operations, primary asset procurement, and supply chain fulfillment on the ground to provide tangible collateral backing.",
    corePillars: [
      "Physical Site Management",
      "Raw Resource Sourcing",
      "Supply Chain & Field Logistics",
      "Local Operating Infrastructure"
    ],
    icon: Pickaxe,
    x: 480,
    y: 360,
  },
  {
    id: "04",
    region: "UK / BVI",
    tag: "GROUP GOVERNANCE",
    mandate: "Corporate Structure",
    summary: "Holdings & governance.",
    roleDescription: "Maintains international corporate structures, audit verification, legal frameworks, and regulatory oversight across all operating jurisdictions.",
    corePillars: [
      "Group Entity Holdings",
      "Corporate Regulatory Oversight",
      "Cross-Border Compliance",
      "Institutional Audit Integrity"
    ],
    icon: Landmark,
    x: 350,
    y: 150,
  },
];

export default function GlobalNetwork() {
  const [selectedRegion, setSelectedRegion] = useState<OperationalRegion>(regions[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<SVGSVGElement>(null);
  const detailPaneRef = useRef<HTMLDivElement>(null);

  const xToMap = useRef<gsap.QuickToFunc | null>(null);
  const yToMap = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (mapCanvasRef.current) {
      xToMap.current = gsap.quickTo(mapCanvasRef.current, "x", { duration: 0.9, ease: "power2.out" });
      yToMap.current = gsap.quickTo(mapCanvasRef.current, "y", { duration: 0.9, ease: "power2.out" });
    }

    gsap.to(".network-conduit", {
      strokeDashoffset: -40,
      repeat: -1,
      ease: "none",
      duration: 2.2,
    });

    gsap.fromTo(
      ".global-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  const handleSelectRegion = (region: OperationalRegion) => {
    if (selectedRegion.id === region.id) return;
    
    if (detailPaneRef.current) {
      gsap.fromTo(
        detailPaneRef.current,
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
    setSelectedRegion(region);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToMap.current?.(x * 0.025);
    yToMap.current?.(y * 0.025);
  };

  return (
    <section 
      ref={containerRef} 
      id="global-network"
      onMouseMove={handleMouseMove}
      className="relative py-28 md:py-36 bg-[#FAFBFD] text-[#18181B] border-y border-[#E8EBED] overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="global-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
              <Globe2 size={13} />
              Cross-Border Topology
            </div>
            <h2 className="global-reveal text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] leading-tight">
              One Network <br />
              <span className="text-[#C39967]">Four Regions</span>
            </h2>
          </div>
          <p className="global-reveal text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            Every region owns a distinct role across governance, production, and leadership — synchronized through the central Karachi engine room.
          </p>
        </div>

        {/* Master Operational Stage */}
        <div className="global-reveal rounded-3xl border border-[#E8EBED] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden mb-8">
          
          <div className="px-6 py-4 border-b border-[#E8EBED] bg-[#FAFBFD] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#5E646D]">
            <div className="flex items-center gap-2 text-[#18181B] font-bold">
              <Radio size={13} className="text-[#C39967] animate-pulse" />
              GLOBAL OPERATIONS DIRECTORY
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#A5ADB6]">
              <span className="hidden sm:inline">CENTRAL ENGINE: KARACHI (KHI-01)</span>
              <span className="text-[#C39967] font-bold">4 REGIONS SYNCHRONIZED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Left: Interactive Vector Network Canvas */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#E8EBED] p-6 md:p-8 relative flex items-center justify-center bg-[#FAFBFD]/60 overflow-hidden">
              <svg
                ref={mapCanvasRef}
                viewBox="200 80 600 360"
                className="w-full h-auto max-h-[440px] will-change-transform"
              >
                <defs>
                  <pattern id="lightMeshGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#18181B" strokeWidth="0.5" strokeOpacity="0.04" />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="1000" height="500" fill="url(#lightMeshGrid)" />

                <path d="M 280,120 Q 340,100 400,140 T 430,220 Q 380,260 320,240 Z" fill="#F4F5F7" stroke="#E8EBED" strokeWidth="1" />
                <path d="M 460,200 Q 560,180 620,230 T 660,320 Q 580,360 500,320 Z" fill="#F4F5F7" stroke="#E8EBED" strokeWidth="1" />
                <path d="M 420,260 Q 480,260 520,340 T 480,440 Q 430,420 400,340 Z" fill="#F4F5F7" stroke="#E8EBED" strokeWidth="1" />

                <path d="M 620,260 Q 460,180 350,150" fill="none" stroke="#C39967" strokeWidth="1.8" strokeDasharray="4 4" className="network-conduit" strokeOpacity="0.8" />
                <path d="M 620,260 Q 580,245 540,235" fill="none" stroke="#C39967" strokeWidth="1.8" strokeDasharray="4 4" className="network-conduit" strokeOpacity="0.8" />
                <path d="M 620,260 Q 560,320 480,360" fill="none" stroke="#C39967" strokeWidth="1.8" strokeDasharray="4 4" className="network-conduit" strokeOpacity="0.8" />

                <circle cx="620" cy="260" r="26" fill="none" stroke="#C39967" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="620" cy="260" r="46" fill="none" stroke="#C39967" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.2" />

                {regions.map((node) => {
                  const isSelected = selectedRegion.id === node.id;
                  const isCentral = node.id === "01";

                  return (
                    <g 
                      key={node.id} 
                      onClick={() => handleSelectRegion(node)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle cx={node.x} cy={node.y} r="18" fill="#C39967" fillOpacity="0.2" className="animate-ping" />
                      )}

                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCentral ? "8.5" : "6.5"}
                        fill={isCentral ? "#C39967" : isSelected ? "#18181B" : "#FFFFFF"}
                        stroke={isCentral ? "#C39967" : isSelected ? "#C39967" : "#A5ADB6"}
                        strokeWidth="2.5"
                      />

                      <text
                        x={node.x}
                        y={node.y - 14}
                        textAnchor="middle"
                        fill={isSelected ? "#18181B" : "#5E646D"}
                        fontSize="11"
                        fontWeight={isSelected ? "bold" : "600"}
                        fontFamily="monospace"
                      >
                        {node.region.toUpperCase()}
                      </text>

                      <text
                        x={node.x}
                        y={node.y + 18}
                        textAnchor="middle"
                        fill={isSelected ? "#C39967" : "#A5ADB6"}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.mandate.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-4 left-6 flex items-center gap-2 font-mono text-[10px] text-[#5E646D] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C39967]" />
                Select any node on the map or cards below to inspect
              </div>
            </div>

            {/* Right: Selected Node Briefing Pane */}
            <div ref={detailPaneRef} className="lg:col-span-5 p-7 md:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                  <span className="text-[#C39967] font-bold">NODE {selectedRegion.id} // REGION</span>
                  <span className="text-[10px] font-bold text-[#18181B] px-2.5 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED] uppercase">
                    {selectedRegion.tag}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#C39967]/30 flex items-center justify-center text-[#C39967] shrink-0 shadow-xs">
                    <selectedRegion.icon size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C39967] font-bold block mb-0.5">
                      {selectedRegion.mandate}
                    </span>
                    <h3 className="text-3xl font-black text-[#18181B] tracking-tight">
                      {selectedRegion.region}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#18181B] mb-2">
                  {selectedRegion.summary}
                </p>

                <p className="text-sm text-[#5E646D] font-normal leading-relaxed mb-6">
                  {selectedRegion.roleDescription}
                </p>

                <div className="pt-5 border-t border-[#E8EBED]">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#A5ADB6] block mb-3">
                    Key Operational Responsibilities
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedRegion.corePillars.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#18181B]">
                        <CheckCircle2 size={13} className="text-[#C39967] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-[#E8EBED] flex items-center justify-between text-xs font-mono text-[#5E646D]">
                <span className="flex items-center gap-1.5">
                  <Layers size={13} className="text-[#C39967]" />
                  SYNCHRONIZED INFRASTRUCTURE
                </span>
                <span className="text-[#A5ADB6]">STATUS: ACTIVE</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Regional Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((node) => {
            const isSelected = selectedRegion.id === node.id;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => handleSelectRegion(node)}
                className={`global-reveal group cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-[#C39967] shadow-[0_12px_32px_rgba(195,153,103,0.12)] -translate-y-1"
                    : "bg-white/80 border-[#E8EBED] hover:border-zinc-300 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs pb-3 mb-4 border-b border-[#E8EBED]">
                    <span className="text-[#C39967] font-bold">NODE {node.id}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D]">
                      {node.mandate}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#FAFBFD] border border-[#E8EBED] flex items-center justify-center text-[#C39967] mb-4 group-hover:border-[#C39967]/50 transition-colors">
                    <Icon size={18} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#18181B] mb-1.5">
                    {node.region}
                  </h3>

                  <p className="text-xs text-[#5E646D] leading-relaxed font-normal">
                    {node.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E8EBED] flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? "text-[#C39967] font-bold" : "text-[#A5ADB6]"}>
                    {isSelected ? "VIEWING DETAILS" : "INSPECT REGION"}
                  </span>
                  <ArrowRight size={13} className={isSelected ? "text-[#C39967]" : "text-[#A5ADB6] group-hover:text-[#18181B] transition-colors"} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}