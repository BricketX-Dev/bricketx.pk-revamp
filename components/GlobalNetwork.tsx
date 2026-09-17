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
    x: 300, 
    y: 300,
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
    x: 120, 
    y: 160,
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
    x: 160, 
    y: 450,
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
    x: 480, 
    y: 180,
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
      strokeDashoffset: -60,
      repeat: -1,
      ease: "none",
      duration: 2,
    });

    gsap.to(".orbit-spin", {
      rotation: 360,
      transformOrigin: "300px 300px",
      duration: 90,
      repeat: -1,
      ease: "none",
    });
    
    gsap.to(".orbit-spin-reverse", {
      rotation: -360,
      transformOrigin: "300px 300px",
      duration: 120,
      repeat: -1,
      ease: "none",
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

    xToMap.current?.(x * 0.02);
    yToMap.current?.(y * 0.02);
  };

  return (
    <section 
      ref={containerRef} 
      id="global-network"
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-20 bg-[#FAFBFD] text-[#18181B] border-y border-[#E8EBED] overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Updated Section Header */}
        <div className="flex flex-col mb-16">
          <div className="max-w-3xl">
            <div className="global-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
              <Globe2 size={13} />
              Cross-Border Topology
            </div>
            <h2 className="global-reveal text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] leading-tight mb-5">
              One Network <br />
              <span className="text-[#C39967]">Four Regions</span>
            </h2>
            <p className="global-reveal text-sm md:text-base text-[#5E646D] max-w-xl font-normal leading-relaxed">
              Every region owns a distinct role across governance, production, and leadership — synchronized through the central Karachi engine room.
            </p>
          </div>
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
            
            {/* Left: The Dark Engineering Topology Canvas */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#E8EBED] p-6 md:p-8 relative flex items-center justify-center bg-[#0a0a0b] overflow-hidden">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C39967]/15 blur-[120px] pointer-events-none rounded-full" />
              
              <svg
                ref={mapCanvasRef}
                viewBox="0 0 600 600"
                className="w-full h-auto max-h-[500px] will-change-transform relative z-10"
              >
                <defs>
                  <pattern id="darkTechGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.05" />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="600" height="600" fill="url(#darkTechGrid)" />

                {/* Abstract Data Orbits */}
                <circle cx="300" cy="300" r="240" fill="none" stroke="#52525b" strokeWidth="1" strokeDasharray="4 16" opacity="0.4" className="orbit-spin-reverse" />
                <circle cx="300" cy="300" r="160" fill="none" stroke="#C39967" strokeWidth="1" strokeDasharray="6 8" opacity="0.6" className="orbit-spin" />
                <circle cx="300" cy="300" r="80" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />

                {/* Crosshairs targeting the center */}
                <line x1="300" y1="20" x2="300" y2="580" stroke="#27272a" strokeWidth="1.5" />
                <line x1="20" y1="300" x2="580" y2="300" stroke="#27272a" strokeWidth="1.5" />

                {/* Active Conduits linking satellites to Karachi (300, 300) */}
                {regions.map((node) => {
                  if (node.id === "01") return null; 
                  const isSelected = selectedRegion.id === node.id || selectedRegion.id === "01";
                  
                  return (
                    <g key={`conduit-${node.id}`}>
                      {/* Base Line */}
                      <line 
                        x1="300" y1="300" x2={node.x} y2={node.y} 
                        stroke="#C39967" strokeWidth="1" strokeOpacity={isSelected ? 0.6 : 0.2} 
                      />
                      {/* Animated Data Packets */}
                      <line 
                        x1="300" y1="300" x2={node.x} y2={node.y} 
                        stroke="#C39967" strokeWidth="2.5" 
                        strokeDasharray="4 40" 
                        className="network-conduit" 
                        strokeOpacity={isSelected ? 1 : 0.3} 
                      />
                    </g>
                  );
                })}

                {/* Hub/Node Markers */}
                {regions.map((node) => {
                  const isSelected = selectedRegion.id === node.id;
                  const isCentral = node.id === "01";

                  return (
                    <g 
                      key={node.id} 
                      onClick={() => handleSelectRegion(node)}
                      className="cursor-pointer group"
                    >
                      {/* Outer Ring Ping */}
                      {(isSelected || isCentral) && (
                        <circle cx={node.x} cy={node.y} r={isCentral ? "28" : "20"} fill="#C39967" fillOpacity="0.25" className="animate-ping" />
                      )}

                      {/* Dark backing rect for clean text */}
                      <rect 
                        x={node.x - 35} 
                        y={node.y + 12} 
                        width="70" 
                        height="30" 
                        fill="#0a0a0b" 
                        rx="4" 
                        opacity={0.8}
                        className="pointer-events-none"
                      />

                      {/* Main Node Point */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCentral ? "10" : "7"}
                        fill={isCentral ? "#C39967" : isSelected ? "#ffffff" : "#18181b"}
                        stroke={isCentral ? "#C39967" : isSelected ? "#C39967" : "#52525b"}
                        strokeWidth="3"
                        className="transition-all duration-300"
                      />

                      {/* Node Texts */}
                      <text
                        x={node.x}
                        y={node.y + 26}
                        textAnchor="middle"
                        fill={isSelected || isCentral ? "#ffffff" : "#a1a1aa"}
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="transition-colors duration-300"
                      >
                        {node.region.toUpperCase()}
                      </text>
                      
                      <text
                        x={node.x}
                        y={node.y + 36}
                        textAnchor="middle"
                        fill={isSelected || isCentral ? "#C39967" : "#71717a"}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="transition-colors duration-300"
                      >
                        {isCentral ? "CORE" : `NODE ${node.id}`}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-4 left-6 flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase bg-zinc-900/80 px-2.5 py-1 rounded backdrop-blur-sm border border-zinc-800 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C39967]" />
                Select any terminal to view diagnostics
              </div>
            </div>

            {/* Right: Selected Node Briefing Pane (Remains White) */}
            <div ref={detailPaneRef} className="lg:col-span-5 p-7 md:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                  <span className="text-[#C39967] font-bold">
                    {selectedRegion.id === "01" ? "CORE PLATFORM // KHI-01" : `NODE ${selectedRegion.id} // REGION`}
                  </span>
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
                className={`global-reveal group cursor-pointer relative overflow-hidden p-6 rounded-2xl border transition-all duration-500 ease-out flex flex-col justify-between will-change-transform ${
                  isSelected
                    ? "bg-white border-[#C39967]/60 shadow-[0_20px_60px_-15px_rgba(195,153,103,0.3)] -translate-y-1"
                    : "bg-white border-[#E8EBED] hover:border-[#C39967]/50 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(195,153,103,0.2)] hover:-translate-y-1"
                }`}
              >
                <div 
                  className={`absolute top-0 left-0 h-1.5 bg-gradient-to-r from-[#C39967] via-[#C39967]/70 to-[#C39967]/10 transition-all duration-500 ease-out pointer-events-none ${
                    isSelected ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`} 
                />

                <div className="relative z-10">
                  <div className={`flex items-center justify-between font-mono text-xs pb-3 mb-4 border-b transition-colors duration-500 ${
                    isSelected ? "border-[#C39967]/30" : "border-[#E8EBED] group-hover:border-[#C39967]/30"
                  }`}>
                    <span className={`font-bold tracking-wider transition-colors ${isSelected ? "text-[#C39967]" : "text-[#18181B] group-hover:text-[#C39967]"}`}>
                      NODE {node.id}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D]">
                      {node.mandate}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 transition-all duration-500 ease-out shrink-0 ${
                    isSelected 
                      ? "bg-[#C39967] border-[#C39967] shadow-[0_8px_20px_-4px_rgba(195,153,103,0.5)] text-white scale-105" 
                      : "bg-[#FAFBFD] border-[#E8EBED] group-hover:bg-[#C39967] group-hover:border-[#C39967] group-hover:shadow-[0_8px_20px_-4px_rgba(195,153,103,0.5)] text-[#5E646D] group-hover:text-white group-hover:scale-105"
                  }`}>
                    <Icon size={20} className="transition-transform duration-500 ease-out" />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#18181B] mb-1.5 tracking-tight">
                    {node.region}
                  </h3>

                  <p className="text-xs text-[#5E646D] leading-relaxed font-normal">
                    {node.summary}
                  </p>
                </div>

                <div className={`relative z-10 pt-4 mt-6 border-t flex items-center justify-between text-xs font-mono transition-colors duration-500 ${
                  isSelected ? "border-[#C39967]/30" : "border-[#E8EBED] group-hover:border-[#C39967]/30"
                }`}>
                  <span className={`transition-colors duration-300 ${isSelected ? "text-[#C39967] font-bold" : "text-[#A5ADB6] group-hover:text-[#C39967]"}`}>
                    {isSelected ? "VIEWING DETAILS" : "INSPECT REGION"}
                  </span>
                  <ArrowRight size={13} className={isSelected ? "text-[#C39967]" : "text-[#A5ADB6] group-hover:text-[#C39967] transition-colors"} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}