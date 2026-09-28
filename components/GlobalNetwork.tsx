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
  const mapCanvasRef = useRef<HTMLDivElement>(null);
  const detailPaneRef = useRef<HTMLDivElement>(null);

  const xToMap = useRef<gsap.QuickToFunc | null>(null);
  const yToMap = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (mapCanvasRef.current) {
      gsap.set(mapCanvasRef.current, { scale: 1.05 });
      xToMap.current = gsap.quickTo(mapCanvasRef.current, "x", { duration: 0.9, ease: "power2.out" });
      yToMap.current = gsap.quickTo(mapCanvasRef.current, "y", { duration: 0.9, ease: "power2.out" });
    }

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
          start: "top 80%",
          once: true,
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
    xToMap.current?.((e.clientX - rect.left - rect.width / 2) * 0.02);
    yToMap.current?.((e.clientY - rect.top - rect.height / 2) * 0.02);
  };

  return (
    <section 
      ref={containerRef} 
      id="global-network"
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-20 bg-[#FAFBFD] text-[#18181B] border-y border-[#E8EBED] overflow-hidden select-none z-20"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 pointer-events-none" />
      
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(195,153,103,0.12) 0%, rgba(195,153,103,0) 65%)' 
        }} 
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col mb-16">
          <div className="max-w-3xl">
            <div className="global-reveal opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
              <Globe2 size={13} />
              Cross-Border Topology
            </div>
            <h2 className="global-reveal opacity-0 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] leading-tight mb-5">
              One Network <br />
              <span className="text-[#C39967]">Four Regions</span>
            </h2>
            <p className="global-reveal opacity-0 text-sm md:text-base text-[#5E646D] max-w-xl font-normal leading-relaxed">
              Every region owns a distinct role across governance, production, and leadership — synchronized through the central Karachi engine room.
            </p>
          </div>
        </div>

        <div className="global-reveal opacity-0 rounded-3xl border border-[#E8EBED] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden mb-8">
          
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
            
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#E8EBED] relative bg-transparent overflow-hidden min-h-[400px]">
              
              <div ref={mapCanvasRef} className="absolute inset-0 w-full h-full z-10 will-change-transform">
                <img 
                  src="/images/home/Map.webp" 
                  alt="Global Operational Network Map"
                  className="w-full h-full object-cover object-center pointer-events-none" 
                  decoding="async"
                  fetchPriority="high"
                />

                {regions.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => handleSelectRegion(node)}
                    title={`View ${node.region} Diagnostics`}
                    className="absolute cursor-pointer w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 z-20 hover:bg-white/5 rounded-full transition-colors"
                    style={{ 
                      left: `${(node.x / 600) * 100}%`, 
                      top: `${(node.y / 600) * 100}%` 
                    }}
                  />
                ))}
              </div>
            </div>

            <div ref={detailPaneRef} className="lg:col-span-5 p-7 md:p-10 flex flex-col justify-between bg-white relative z-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((node) => {
            const isSelected = selectedRegion.id === node.id;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => handleSelectRegion(node)}
                className={`global-reveal opacity-0 group cursor-pointer relative overflow-hidden p-6 rounded-2xl border transition-all duration-500 ease-out flex flex-col justify-between ${
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