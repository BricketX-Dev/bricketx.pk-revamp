"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, ArrowUpRight, Activity } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Monitor scroll height for header compression
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic Theme Detection: Inverts navbar colors when scrolling over Light sections
  useEffect(() => {
    // List of known light-themed sections across all your pages
    const lightSections = document.querySelectorAll(
      "#global-network, #contact, #systems-catalog, #departments-stack, #open-roles, .light-section"
    );

    if (lightSections.length === 0) {
      setIsOverLightSection(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // If the top 90px (navbar height) intersects with a light section, trigger inversion
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsOverLightSection(anyVisible);
      },
      {
        rootMargin: "-20px 0px -90% 0px",
        threshold: 0,
      }
    );

    lightSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]); // Re-run when the route changes

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Initial load entrance animation
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
    { name: "Departments", href: "/departments" },
    { name: "What We Build", href: "/what-we-build" },
    { name: "The Company", href: "/company" },
    { name: "Culture & Careers", href: "/careers" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? isOverLightSection
            ? "bg-white/90 backdrop-blur-xl border-b border-[#E8EBED] shadow-[0_10px_30px_rgba(0,0,0,0.03)] py-0"
            : "bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-0"
          : "bg-transparent border-b border-transparent py-1.5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}>
          
          {/* Logo & Node Badge */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className={`relative w-9 h-9 flex items-center justify-center rounded-lg border p-1 transition-colors ${
              isOverLightSection 
                ? "border-[#E8EBED] bg-[#FAFBFD] group-hover:border-[#C39967]"
                : "border-zinc-800 bg-zinc-900/60 group-hover:border-[#C39967]/50"
            }`}>
              <Image 
                src="/images/logo/logo.png" 
                alt="BricketX Logo" 
                width={36} 
                height={36} 
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-extrabold tracking-wider leading-tight font-sans transition-colors ${
                isOverLightSection ? "text-[#18181B]" : "text-white"
              }`}>
                BRICKETX
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#C39967] uppercase leading-none mt-0.5">
                Pakistan Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`relative text-xs uppercase tracking-widest font-mono transition-colors duration-200 py-1 group ${
                    isOverLightSection
                      ? isActive ? "text-[#18181B] font-bold" : "text-[#5E646D] hover:text-[#18181B]"
                      : isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C39967] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Telemetry Status & Contact CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live Terminal Ping */}
            <div className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${
              isOverLightSection
                ? "border-[#E8EBED] bg-[#FAFBFD] text-[#5E646D]"
                : "border-zinc-800/80 bg-zinc-900/50 text-zinc-400"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={isOverLightSection ? "text-[#18181B]" : "text-zinc-300"}>KHI_DC</span>
              <span className={isOverLightSection ? "text-[#A5ADB6]" : "text-zinc-600"}>//</span>
              <span className="text-[#C39967]">ONLINE</span>
            </div>

            {/* Primary Action Button */}
            <Link 
              href="/contact"
              className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm ${
                isOverLightSection
                  ? "border-[#18181B] bg-[#18181B] text-white hover:bg-[#C39967] hover:border-[#C39967] hover:text-black"
                  : "border-[#C39967]/40 bg-[#C39967]/10 hover:bg-[#C39967] text-white hover:text-black"
              }`}
            >
              <span>Contact Hub</span>
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-lg border transition-colors ${
              isOverLightSection
                ? "border-[#E8EBED] bg-[#FAFBFD] text-[#18181B]"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOverLightSection
            ? "bg-white/95 backdrop-blur-2xl border-b border-[#E8EBED]"
            : "bg-[#0a0a0c]/95 backdrop-blur-2xl border-b border-zinc-800"
        } ${
          isMobileMenuOpen ? "max-h-[460px] py-6 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col gap-4">
          <div className={`flex items-center justify-between pb-3 border-b font-mono text-xs ${
            isOverLightSection ? "border-[#E8EBED] text-[#5E646D]" : "border-zinc-800 text-zinc-400"
          }`}>
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
              className={`text-sm font-mono uppercase tracking-wider py-2 transition-colors flex items-center justify-between ${
                isOverLightSection
                  ? "text-[#18181B] hover:text-[#C39967]"
                  : "text-zinc-300 hover:text-[#C39967]"
              }`}
            >
              <span>{link.name}</span>
              <ArrowUpRight size={14} className={isOverLightSection ? "text-[#A5ADB6]" : "text-zinc-600"} />
            </Link>
          ))}

          <Link 
            href="/contact"
            className="flex items-center justify-center gap-2 mt-4 px-5 py-3 bg-[#C39967] hover:bg-[#b08756] text-black text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors"
          >
            Contact the Karachi Hub
          </Link>
        </div>
      </div>
    </header>
  );
}