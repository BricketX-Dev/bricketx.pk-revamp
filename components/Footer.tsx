"use client";

import { useRef, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ShieldCheck, Terminal, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = [
  { name: "Homepage Core", href: "/" },
  { name: "Departments", href: "/departments" },
  { name: "What We Build", href: "/what-we-build" },
  { name: "The Company", href: "/company" },
  { name: "Culture & Careers", href: "/careers" },
  { name: "Contact Hub", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGGElement>(null);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // Interactive Mouse Parallax Setup for the background SVG
    if (svgRef.current) {
      xTo.current = gsap.quickTo(svgRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yTo.current = gsap.quickTo(svgRef.current, "y", { duration: 1.2, ease: "power2.out" });
    }

    // Scroll reveal for footer elements
    gsap.fromTo(
      ".footer-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, { scope: footerRef });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xTo.current?.(x * 0.04);
    yTo.current?.(y * 0.04);
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0a0a0b] text-white pt-24 pb-8 border-t border-zinc-800/80 overflow-hidden"
    >
      {/* Interactive Vector Infrastructure Mesh */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-25">
        <svg
          viewBox="0 0 1000 500"
          className="w-[120%] h-[120%] max-w-none will-change-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g ref={svgRef}>
            {/* Concentric Telemetry Rings */}
            <circle cx="500" cy="250" r="350" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
            <circle cx="500" cy="250" r="250" stroke="#C39967" strokeWidth="0.5" strokeDasharray="4 8" strokeOpacity="0.5" />
            <circle cx="500" cy="250" r="150" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
            
            {/* Navigational Crosshairs */}
            <line x1="100" y1="250" x2="900" y2="250" stroke="#C39967" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="500" y1="50" x2="500" y2="450" stroke="#C39967" strokeWidth="0.5" strokeOpacity="0.2" />
            
            {/* Nodes */}
            <circle cx="100" cy="250" r="3" fill="#C39967" opacity="0.4" />
            <circle cx="900" cy="250" r="3" fill="#C39967" opacity="0.4" />
            <circle cx="500" cy="50" r="3" fill="#C39967" opacity="0.4" />
            <circle cx="500" cy="450" r="3" fill="#C39967" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* Dark Circuit Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-80" />
      
      {/* Subtle Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C39967]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Identity (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="footer-reveal flex items-center gap-3.5 group mb-6 w-fit">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 p-1 group-hover:border-[#C39967]/50 transition-colors">
                <Image 
                  src="/images/logo/logo.png" 
                  alt="BricketX Logo" 
                  width={36} 
                  height={36} 
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-wider text-white leading-tight font-sans">
                  BRICKETX
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#C39967] uppercase leading-none mt-0.5">
                  Operations Engine
                </span>
              </div>
            </Link>
            
            <p className="footer-reveal text-sm text-zinc-400 font-light leading-relaxed mb-8 max-w-sm">
              The operational and engineering core powering the global BricketX network. High-throughput architecture, institutional workflows, and Shariah-compliant capital routing.
            </p>

            <div className="footer-reveal flex flex-col gap-3 font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-2.5 mt-2">
                <Terminal size={14} className="text-[#C39967] shrink-0" />
                <span>sysadmin@bricketx.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Index / Navigation */}
          <div className="lg:col-span-3 lg:col-start-6 flex flex-col">
            <h4 className="footer-reveal text-xs font-mono font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C39967]" />
              Index
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="footer-reveal group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[#C39967]" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="footer-reveal text-xs font-mono font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-600" />
              Governance
            </h4>
            <nav className="flex flex-col gap-3 mb-8">
              {['Privacy Protocol', 'Terms of Execution', 'Security & Infrastructure', 'AAOIFI Compliance Specs'].map((item) => (
                <Link 
                  key={item} 
                  href="#"
                  className="footer-reveal group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
                >
                  <span>{item}</span>
                </Link>
              ))}
            </nav>

            {/* Live System Status Widget */}
            <div className="footer-reveal p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="text-zinc-500 uppercase tracking-widest">Network Status</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-light">
                <Activity size={12} className="text-[#C39967]" />
                Central cluster operational. Zero variance.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="footer-reveal pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-500 flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span>&copy; {new Date().getFullYear()} BricketX. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>PROPRIETARY INFRASTRUCTURE</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 text-[10px] font-mono text-zinc-400">
            <ShieldCheck size={13} className="text-[#C39967]" />
            100% SHARIAH COMPLIANT
          </div>
        </div>

      </div>
    </footer>
  );
}