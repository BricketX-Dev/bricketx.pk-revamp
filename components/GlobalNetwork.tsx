"use client";

import { useState, useRef } from "react";
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
  const detailPaneRef = useRef<HTMLDivElement>(null);

  // We use the Pakistan content to anchor the container height perfectly
  const ghostRegion = regions[0];

  useGSAP(() => {
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

  return (
    <section 
      ref={containerRef} 
      id="global-network"
      className="relative py-16 md:py-20 bg-[#FAFBFD] text-[#18181B] border-y border-[#E8EBED] overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
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
            
            {/* Left: The Engineering Topology Canvas */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#E8EBED] relative flex items-center justify-center bg-white overflow-hidden min-h-[400px] lg:min-h-[500px] group/canvas cursor-pointer">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C39967]/15 blur-[120px] pointer-events-none rounded-full" />
              
              <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
                <img 
                  src="/images/home/Map.webp" 
                  alt="Global Operational Network Map"
                  className="w-full h-full object-cover object-[80%_center] pointer-events-none opacity-80" 
                  decoding="async"
                  fetchPriority="high"
                />
                
                <svg 
                  className="absolute inset-0 w-full h-full z-20 pointer-events-none" 
                  viewBox="0 0 1000 500" 
                  preserveAspectRatio="xMidYMid slice"
                  style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))" }}
                >
                  <defs>
                    <radialGradient id="particle-glow">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="40%" stopColor="#C39967" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#C39967" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="770" cy="230" r="15" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8">
                    <animate attributeName="r" values="5; 45" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8; 0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="770" cy="230" r="5" fill="#FFFFFF" stroke="#C39967" strokeWidth="2" />

                  <circle r="5" fill="url(#particle-glow)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 510 100 Q 580 45 770 230" />
                  </circle>

                  <circle r="5.5" fill="url(#particle-glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 230 220 Q 400 140 770 230" />
                  </circle>

                  <circle r="4.5" fill="url(#particle-glow)">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 660 380 Q 855 350 770 230" />
                  </circle>
                </svg>
              </div>

              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                <div className="absolute top-0 bottom-0 -left-[150%] w-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[25deg] transition-all duration-[1.5s] ease-in-out group-hover/canvas:left-[150%]" />
              </div>
            </div>

            {/* Right: Selected Node Briefing Pane */}
            <div className="lg:col-span-5 bg-white relative z-20 overflow-hidden">
              
              {/* --- GHOST ELEMENT --- */}
              <div className="p-7 md:p-10 flex flex-col justify-between invisible pointer-events-none" aria-hidden="true">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                    <span className="font-bold">CORE PLATFORM // KHI-01</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded border">{ghostRegion.tag}</span>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0">
                      <ghostRegion.icon size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase font-bold block mb-0.5">{ghostRegion.mandate}</span>
                      <h3 className="text-3xl font-black">{ghostRegion.region}</h3>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-2">{ghostRegion.summary}</p>
                  <p className="text-sm font-normal leading-relaxed mb-6">{ghostRegion.roleDescription}</p>
                  <div className="pt-5 border-t border-[#E8EBED]">
                    <span className="text-[10px] font-mono uppercase font-bold block mb-3">Pillars</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ghostRegion.corePillars.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs"><span>{item}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-6 mt-8 border-t border-[#E8EBED] flex items-center justify-between text-xs">
                  <span>INFRASTRUCTURE</span><span>ACTIVE</span>
                </div>
              </div>

              {/* --- ACTUAL VISIBLE CONTENT --- 
                  Changed overflow-y-auto to overflow-hidden here
              */}
              <div ref={detailPaneRef} className="absolute inset-0 p-7 md:p-10 flex flex-col justify-between overflow-hidden">
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