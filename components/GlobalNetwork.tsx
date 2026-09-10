"use client";

import { useState, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Globe2, 
  ShieldCheck, 
  ArrowUpRight,
  Landmark,
  Pickaxe,
  Cpu,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RegionNode {
  id: string;
  region: string;
  mandate: string;
  summary: string;
  roleDescription: string;
  focusAreas: string[];
  operationalRole: string;
  icon: typeof Cpu;
  // Canvas placement points
  x: number;
  y: number;
}

const regionsData: RegionNode[] = [
  {
    id: "01",
    region: "Pakistan",
    mandate: "Operations & Execution",
    summary: "The Karachi hub — where it's built.",
    roleDescription: "Serves as the central operational engine room powering the entire global network. Responsible for full-stack engineering, proprietary software architecture, AI pipelines, and continuous product delivery.",
    focusAreas: [
      "Software & Platform Architecture",
      "AI Automations & Research Agents",
      "Design Systems & Brand Tooling",
      "Cross-Regional Sprint Execution"
    ],
    operationalRole: "CENTRAL ENGINE ROOM",
    icon: Cpu,
    x: 630,
    y: 275,
  },
  {
    id: "02",
    region: "Dubai",
    mandate: "Management",
    summary: "Regional leadership & investor relations.",
    roleDescription: "Coordinates executive syndication, institutional investor relations, and capital deployment across the GCC and international private wealth channels.",
    focusAreas: [
      "Executive Network Leadership",
      "Investor Relations & Onboarding",
      "Regional Liquidity Coordination",
      "GCC Strategic Partnerships"
    ],
    operationalRole: "MANAGEMENT & ALLOCATION",
    icon: ShieldAlert,
    x: 540,
    y: 245,
  },
  {
    id: "03",
    region: "Kenya",
    mandate: "Mining",
    summary: "On-the-ground production & sourcing.",
    roleDescription: "Directs physical asset operations, raw resource procurement, and supply chain logistics directly on site to anchor real-world asset flow.",
    focusAreas: [
      "Physical Site Management",
      "Resource Sourcing & Extraction",
      "On-the-Ground Logistics",
      "Local Compliance & Partnerships"
    ],
    operationalRole: "PHYSICAL ASSET PRODUCTION",
    icon: Pickaxe,
    x: 480,
    y: 375,
  },
  {
    id: "04",
    region: "UK / BVI",
    mandate: "Corporate Structure",
    summary: "Holdings & governance.",
    roleDescription: "Maintains international corporate structures, audit verification, legal frameworks, and regulatory oversight across all operating entities.",
    focusAreas: [
      "Group Entity Holdings",
      "Cross-Border Compliance",
      "Governance & Legal Frameworks",
      "Institutional Audit Readiness"
    ],
    operationalRole: "HOLDINGS & GOVERNANCE",
    icon: Landmark,
    x: 340,
    y: 155,
  },
];

export default function GlobalNetwork() {
  const [selectedRegion, setSelectedRegion] = useState<RegionNode>(regionsData[0]);
  const container = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<SVGSVGElement>(null);

  const xToMap = useRef<gsap.QuickToFunc | null>(null);
  const yToMap = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (mapCanvasRef.current) {
      xToMap.current = gsap.quickTo(mapCanvasRef.current, "x", { duration: 0.8, ease: "power2.out" });
      yToMap.current = gsap.quickTo(mapCanvasRef.current, "y", { duration: 0.8, ease: "power2.out" });
    }

    // Smooth dash animation along routes
    gsap.to(".network-route-line", {
      strokeDashoffset: -60,
      repeat: -1,
      ease: "none",
      duration: 3,
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
        clearProps: "all",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToMap.current?.(x * 0.02);
    yToMap.current?.(y * 0.02);
  };

  return (
    <section 
      ref={container} 
      id="global-network"
      onMouseMove={handleMouseMove}
      className="relative py-28 md:py-36 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-[#C39967]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Header Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="global-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
              <Globe2 size={13} />
              Global Operations
            </div>
            <h2 className="global-reveal text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] leading-tight">
              One Network. <br />
              <span className="text-[#C39967]">Four Regions.</span>
            </h2>
          </div>
          <p className="global-reveal text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            Each region maintains a dedicated mandate — tied together in real time through the Karachi operational hub.
          </p>
        </div>

        {/* Master Console Container */}
        <div className="global-reveal rounded-3xl border border-[#E8EBED] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden mb-12">
          
          {/* Top Status Header */}
          <div className="px-6 py-4 border-b border-[#E8EBED] bg-[#FAFBFD] flex items-center justify-between font-mono text-xs text-[#5E646D]">
            <div className="flex items-center gap-2 font-bold text-[#18181B]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYNCHRONIZED NETWORK TOPOLOGY
            </div>
            <span className="text-[#A5ADB6] uppercase tracking-wider text-[11px] hidden sm:inline">
              CENTRAL HUB: KARACHI, PAKISTAN
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Vector Map Canvas */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#E8EBED] p-6 md:p-8 relative flex items-center justify-center bg-[#FAFBFD]/60 overflow-hidden">
              <svg
                ref={mapCanvasRef}
                viewBox="200 80 600 360"
                className="w-full h-auto max-h-[420px] will-change-transform select-none"
              >
                <defs>
                  <pattern id="subtleNetGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#E8EBED" strokeWidth="0.8" />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="1000" height="500" fill="url(#subtleNetGrid)" />

                {/* Continental Contours */}
                <path d="M 280,120 Q 340,100 400,140 T 430,220 Q 380,260 320,240 Z" fill="#F4F5F7" stroke="#E8EBED" strokeWidth="1" opacity="0.75" />
                <path d="M 460,200 Q 560,180 620,230 T 660,320 Q 580,360 500,320 Z" fill="#F4F5F7" stroke="#E8EBED" strokeWidth="1" opacity="0.75" />
                <path d="M 420,260 Q 480,260 520,340 T 480,440 Q 430,420 400,340 Z" fill="#F4F5F7" stroke="#E8EBED" strokeWidth="1" opacity="0.75" />

                {/* Conduits from Karachi to other regions */}
                <path d="M 630,275 Q 460,180 340,155" fill="none" stroke="#C39967" strokeWidth="1.8" strokeDasharray="5 5" className="network-route-line" strokeOpacity="0.8" />
                <path d="M 630,275 Q 580,255 540,245" fill="none" stroke="#C39967" strokeWidth="1.8" strokeDasharray="5 5" className="network-route-line" strokeOpacity="0.8" />
                <path d="M 630,275 Q 560,335 480,375" fill="none" stroke="#C39967" strokeWidth="1.8" strokeDasharray="5 5" className="network-route-line" strokeOpacity="0.8" />

                {/* Concentric rings around Karachi Primary Node */}
                <circle cx="630" cy="275" r="28" fill="none" stroke="#C39967" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="630" cy="275" r="48" fill="none" stroke="#C39967" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.2" />

                {/* Regional Pins */}
                {regionsData.map((node) => {
                  const isSelected = selectedRegion.id === node.id;
                  const isPrimary = node.id === "01";

                  return (
                    <g 
                      key={node.id} 
                      onClick={() => setSelectedRegion(node)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle cx={node.x} cy={node.y} r="18" fill="#C39967" fillOpacity="0.18" className="animate-ping" />
                      )}

                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isPrimary ? "8.5" : "6.5"}
                        fill={isPrimary ? "#C39967" : isSelected ? "#18181B" : "#FFFFFF"}
                        stroke={isPrimary ? "#C39967" : isSelected ? "#C39967" : "#A5ADB6"}
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
                        y={node.y + 20}
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
            </div>

            {/* Node Inspection Detail Column */}
            <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                  <span className="text-[#C39967] font-bold">REGION // {selectedRegion.id}</span>
                  <span className="text-[10px] font-bold text-[#5E646D] px-2.5 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED]">
                    {selectedRegion.operationalRole}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#C39967]/30 flex items-center justify-center text-[#C39967] shrink-0">
                    <selectedRegion.icon size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#C39967] font-bold block mb-1">
                      {selectedRegion.mandate}
                    </span>
                    <h3 className="text-3xl font-extrabold text-[#18181B] tracking-tight">
                      {selectedRegion.region}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#18181B] mb-3">
                  {selectedRegion.summary}
                </p>

                <p className="text-sm text-[#5E646D] font-normal leading-relaxed mb-6">
                  {selectedRegion.roleDescription}
                </p>

                {/* Key Focus Areas */}
                <div className="pt-5 border-t border-[#E8EBED]">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#A5ADB6] block mb-3">
                    Core Regional Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedRegion.focusAreas.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#18181B] font-medium">
                        <CheckCircle2 size={14} className="text-[#C39967] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-[#E8EBED] flex items-center justify-between text-xs font-mono text-[#5E646D]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#C39967]" />
                  INSTITUTIONAL INTEGRATION
                </span>
                <span className="text-[#A5ADB6]">CROSS-BORDER</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Regional Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regionsData.map((node) => {
            const isSelected = selectedRegion.id === node.id;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedRegion(node)}
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
                    {isSelected ? "ACTIVE SELECTION" : "INSPECT NODE"}
                  </span>
                  <ArrowUpRight size={14} className={isSelected ? "text-[#C39967]" : "text-[#A5ADB6]"} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}