"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, ArrowUpRight, Activity } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Monitor scroll for header compression
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial load animation
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
        clearProps: "transform,opacity",
      }
    );
  }, { scope: navRef });

  const navLinks = [
    { name: "Departments", href: "#departments" },
    { name: "What We Build", href: "#what-we-build" },
    { name: "Global Mesh", href: "#global-network" },
    { name: "The Company", href: "#company" },
    { name: "Culture & Careers", href: "#careers" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-zinc-800/80 py-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-white/5 py-1.5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}>
          
          {/* Logo & Node Badge */}
          <Link href="/" className="flex items-center gap-3.5 group">
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
                Pakistan Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors duration-200 py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C39967] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Telemetry Status & Contact CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live Terminal Ping */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/50 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-300">KHI_DC</span>
              <span className="text-zinc-600">//</span>
              <span className="text-[#C39967]">ONLINE</span>
            </div>

            {/* Primary Action Button */}
            <Link 
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C39967]/40 bg-[#C39967]/10 hover:bg-[#C39967] text-white hover:text-black text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              <span>Contact Hub</span>
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0a0a0c]/95 backdrop-blur-2xl border-b border-zinc-800 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[460px] py-6 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <Activity size={12} className="text-[#C39967]" />
              CORE RUNTIME
            </span>
            <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
          </div>

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-[#C39967] py-2 transition-colors flex items-center justify-between"
            >
              <span>{link.name}</span>
              <ArrowUpRight size={14} className="text-zinc-600" />
            </Link>
          ))}

          <Link 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-4 px-5 py-3 bg-[#C39967] hover:bg-[#b08756] text-black text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors"
          >
            Contact the Karachi Hub
          </Link>
        </div>
      </div>
    </header>
  );
}