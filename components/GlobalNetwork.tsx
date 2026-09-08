"use client";

import { useState, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Globe2, 
  Radio, 
  Activity, 
  ShieldCheck, 
  Server, 
  ArrowUpRight,
  Clock,
  Wifi
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HubNode {
  id: string;
  city: string;
  country: string;
  region: string;
  role: string;
  coords: string;
  timezone: string;
  utcOffset: string;
  latency: string;
  status: string;
  bandwidth: string;
  spec: string[];
  // SVG coordinates on 1000x500 map canvas
  x: number;
  y: number;
}

const hubs: HubNode[] = [
  {
    id: "KHI-01",
    city: "Karachi",
    country: "Pakistan",
    region: "South Asia Central Hub",
    role: "Core Operations & Engineering Engine Room",
    coords: "24.8607° N, 67.0011° E",
    timezone: "PKT (UTC+5)",
    utcOffset: "+05:00",
    latency: "Core Node",
    status: "PRIMARY_ACTIVE",
    bandwidth: "40 Gbps Direct",
    spec: ["Full-Stack Architecture", "AI Automation Pipelines", "Operations & Compliance", "Design Systems"],
    x: 630,
    y: 280,
  },
  {
    id: "LON-02",
    city: "London",
    country: "United Kingdom",
    region: "European Institutional Gateway",
    role: "Institutional Capital & Sovereign Structuring",
    coords: "51.5074° N, 0.1278° W",
    timezone: "GMT (UTC+0)",
    utcOffset: "+00:00",
    latency: "42ms",
    status: "SYNCHRONIZED",
    bandwidth: "10 Gbps Edge",
    spec: ["LP/GP Relations", "UK Regulatory Perimeters", "Cross-Border Tax Routing", "Sovereign Facilities"],
    x: 340,
    y: 150,
  },
  {
    id: "DXB-03",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East Liquidity Center",
    role: "Regional Liquidity & Shariah Governance",
    coords: "25.2048° N, 55.2708° E",
    timezone: "GST (UTC+4)",
    utcOffset: "+04:00",
    latency: "18ms",
    status: "SYNCHRONIZED",
    bandwidth: "20 Gbps Edge",
    spec: ["DIFC Compliant Vehicles", "Shariah Supervisory Board", "Institutional Syndication", "GCC Allocation"],
    x: 540,
    y: 255,
  },
  {
    id: "NBO-04",
    city: "Nairobi",
    country: "Kenya",
    region: "East Africa Frontier Hub",
    role: "Strategic African Expansion Gateway",
    coords: "1.2921° S, 36.8219° E",
    timezone: "EAT (UTC+3)",
    utcOffset: "+03:00",
    latency: "31ms",
    status: "SYNCHRONIZED",
    bandwidth: "10 Gbps Edge",
    spec: ["Frontier Deal Origination", "Local LP Onboarding", "Sub-Saharan Compliance", "Logistics Mesh"],
    x: 480,
    y: 380,
  },
];

export default function GlobalNetwork() {
  const [activeHub, setActiveHub] = useState<HubNode>(hubs[0]);
  const container = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<SVGSVGElement>(null);

  const xToMap = useRef<gsap.QuickToFunc | null>(null);
  const yToMap = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (mapCanvasRef.current) {
      xToMap.current = gsap.quickTo(mapCanvasRef.current, "x", { duration: 0.8, ease: "power2.out" });
      yToMap.current = gsap.quickTo(mapCanvasRef.current, "y", { duration: 0.8, ease: "power2.out" });
    }

    // Line pulse dash flow animation
    gsap.to(".network-line", {
      strokeDashoffset: -100,
      repeat: -1,
      ease: "none",
      duration: 3,
    });

    // Reveal on scroll
    gsap.fromTo(
      ".network-reveal",
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

      {/* Atmospheric Warm Ambient Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C39967]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="network-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs">
              <Globe2 size={13} />
              Cross-Border Telemetry Mesh
            </div>
            <h2 className="network-reveal text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] leading-tight">
              One Karachi Engine. <br />
              <span className="text-[#C39967]">Four Global Nodes.</span>
            </h2>
          </div>
          <p className="network-reveal text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            Direct high-throughput pipelines connecting Karachi engineering with institutional desks across London, Dubai, and Nairobi in real time.
          </p>
        </div>

        {/* Central Master Network Console */}
        <div className="network-reveal rounded-3xl border border-[#E8EBED] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="px-6 py-4 border-b border-[#E8EBED] bg-[#FAFBFD] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#5E646D]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B]">
                <Radio size={13} className="text-[#C39967] animate-pulse" />
                MESH PROTOCOL // ACTIVE
              </span>
              <span className="text-[#A5ADB6] hidden sm:inline">SHA-256 SYNCHRONIZED</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ALL NODES LIVE
              </span>
              <span className="hidden md:inline text-[#A5ADB6]">KARACHI DC: ZERO VARIANCE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Col: Interactive Vector Network Canvas */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#E8EBED] p-6 md:p-8 relative flex items-center justify-center bg-[#FAFBFD]/60 overflow-hidden">
              
              <svg
                ref={mapCanvasRef}
                viewBox="200 80 600 360"
                className="w-full h-auto max-h-[460px] will-change-transform select-none"
              >
                <defs>
                  {/* Subtle Grid Pattern inside SVG */}
                  <pattern id="meshGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8EBED" strokeWidth="0.8" />
                  </pattern>

                  {/* Gold Gradient for Conduits */}
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C39967" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C39967" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="1000" height="500" fill="url(#meshGrid)" />

                {/* Regional Topology Continents Hint (Vector Geometric Contours) */}
                <path
                  d="M 280,120 Q 340,100 400,140 T 430,220 Q 380,260 320,240 Z"
                  fill="#F4F5F7"
                  stroke="#E8EBED"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path
                  d="M 460,200 Q 560,180 620,230 T 660,320 Q 580,360 500,320 Z"
                  fill="#F4F5F7"
                  stroke="#E8EBED"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path
                  d="M 420,260 Q 480,260 520,340 T 480,440 Q 430,420 400,340 Z"
                  fill="#F4F5F7"
                  stroke="#E8EBED"
                  strokeWidth="1"
                  opacity="0.7"
                />

                {/* Animated Data Conduits from Karachi (x: 630, y: 280) */}
                {/* 1. Karachi -> London */}
                <path
                  d="M 630,280 Q 460,180 340,150"
                  fill="none"
                  stroke="#C39967"
                  strokeWidth="1.8"
                  strokeDasharray="6 6"
                  className="network-line"
                  strokeOpacity="0.8"
                />
                {/* 2. Karachi -> Dubai */}
                <path
                  d="M 630,280 Q 580,260 540,255"
                  fill="none"
                  stroke="#C39967"
                  strokeWidth="1.8"
                  strokeDasharray="6 6"
                  className="network-line"
                  strokeOpacity="0.8"
                />
                {/* 3. Karachi -> Nairobi */}
                <path
                  d="M 630,280 Q 560,340 480,380"
                  fill="none"
                  stroke="#C39967"
                  strokeWidth="1.8"
                  strokeDasharray="6 6"
                  className="network-line"
                  strokeOpacity="0.8"
                />

                {/* Circular Signal Pulse rings around Karachi Central Hub */}
                <circle cx="630" cy="280" r="32" fill="none" stroke="#C39967" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="630" cy="280" r="50" fill="none" stroke="#C39967" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.2" />

                {/* Hub Nodes */}
                {hubs.map((hub) => {
                  const isSelected = activeHub.id === hub.id;
                  const isPrimary = hub.id === "KHI-01";

                  return (
                    <g 
                      key={hub.id} 
                      onClick={() => setActiveHub(hub)}
                      className="cursor-pointer transition-transform duration-300"
                    >
                      {/* Pulse beacon */}
                      {isSelected && (
                        <circle
                          cx={hub.x}
                          cy={hub.y}
                          r="18"
                          fill="#C39967"
                          fillOpacity="0.15"
                          className="animate-ping"
                        />
                      )}

                      {/* Node Base Pin */}
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r={isPrimary ? "9" : "7"}
                        fill={isPrimary ? "#C39967" : isSelected ? "#18181B" : "#FFFFFF"}
                        stroke={isPrimary ? "#C39967" : isSelected ? "#C39967" : "#A5ADB6"}
                        strokeWidth="2.5"
                        className="transition-colors duration-300"
                      />

                      {/* City Text Tag */}
                      <text
                        x={hub.x}
                        y={hub.y - 14}
                        textAnchor="middle"
                        fill={isSelected ? "#18181B" : "#5E646D"}
                        fontSize="11"
                        fontWeight={isSelected ? "bold" : "600"}
                        fontFamily="monospace"
                      >
                        {hub.city.toUpperCase()}
                      </text>

                      <text
                        x={hub.x}
                        y={hub.y + 22}
                        textAnchor="middle"
                        fill={isSelected ? "#C39967" : "#A5ADB6"}
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {hub.latency}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom Quick-Switch Pills */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-auto">
                <span className="text-[10px] font-mono text-[#A5ADB6] uppercase tracking-wider">
                  SELECT NODE TO INSPECT
                </span>
                <div className="flex gap-1.5">
                  {hubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setActiveHub(hub)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        activeHub.id === hub.id
                          ? "bg-[#18181B] text-white font-bold"
                          : "bg-white border border-[#E8EBED] text-[#5E646D] hover:text-[#18181B]"
                      }`}
                    >
                      {hub.city}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Active Telemetry & Node Inspection Card */}
            <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-white">
              
              <div>
                {/* Node Metadata Strip */}
                <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                  <span className="text-[#C39967] font-bold">
                    NODE SPEC // {activeHub.id}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {activeHub.status}
                  </span>
                </div>

                {/* City & Role Headline */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A5ADB6] block mb-1">
                    {activeHub.region}
                  </span>
                  <h3 className="text-3xl font-extrabold text-[#18181B] tracking-tight">
                    {activeHub.city}, {activeHub.country}
                  </h3>
                  <p className="text-sm text-[#5E646D] font-medium mt-2 leading-relaxed">
                    {activeHub.role}
                  </p>
                </div>

                {/* Telemetry Numbers Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-[#FAFBFD] p-3 rounded-xl border border-[#E8EBED] font-mono text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-[#E8EBED]">
                    <span className="text-[10px] uppercase text-[#A5ADB6] block mb-0.5">LATENCY (TO KHI)</span>
                    <span className="font-bold text-[#18181B] text-sm">{activeHub.latency}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#E8EBED]">
                    <span className="text-[10px] uppercase text-[#A5ADB6] block mb-0.5">BANDWIDTH</span>
                    <span className="font-bold text-[#18181B] text-sm">{activeHub.bandwidth}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#E8EBED]">
                    <span className="text-[10px] uppercase text-[#A5ADB6] block mb-0.5">TIMEZONE</span>
                    <span className="font-bold text-[#18181B] text-sm">{activeHub.timezone}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#E8EBED]">
                    <span className="text-[10px] uppercase text-[#A5ADB6] block mb-0.5">COORDINATES</span>
                    <span className="font-bold text-[#18181B] text-[11px] truncate block">{activeHub.coords}</span>
                  </div>
                </div>

                {/* Deployed Disciplines */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5ADB6] block mb-2 font-bold">
                    ACTIVE LOCAL CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeHub.spec.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#FAFBFD] border border-[#E8EBED] text-xs text-[#18181B] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Verification Strip */}
              <div className="pt-6 mt-8 border-t border-[#E8EBED] flex items-center justify-between text-xs font-mono text-[#5E646D]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#C39967]" />
                  ENCRYPTED TLS 1.3 TUNNEL
                </span>
                <span className="text-[#A5ADB6]">SYNC 100%</span>
              </div>

            </div>

          </div>

        </div>

        {/* Global Network Bottom Footnote */}
        <div className="mt-14 pt-6 border-t border-[#E8EBED] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5ADB6]">
          <span>FOUR STRATEGIC REGIONS // ONE CENTRALIZED CODEBASE</span>
          <span>CROSS-BORDER SHARIAH CAPITAL ROUTING</span>
        </div>

      </div>
    </section>
  );
}