"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Network, Workflow, Globe2, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    num: "01",
    name: "Our Ecosystem",
    desc: "How BricketX's entities, regions and verticals connect into one network - from corporate structure to on-the-ground production.",
    icon: Network,
    tag: "CONNECTIVITY",
  },
  {
    num: "02",
    name: "How We Operate",
    desc: "The disciplined idea-to-scale process the hub runs on every project - research, design, build, automate, ship.",
    icon: Workflow,
    tag: "METHODOLOGY",
  },
  {
    num: "03",
    name: "Global Operations",
    desc: "Who does what across the network's four regions - the UK/BVI, Dubai, Kenya and Pakistan - and how they stay coordinated.",
    icon: Globe2,
    tag: "COORDINATION",
  },
  {
    num: "04",
    name: "Innovation Lab",
    desc: "Where new products, AI experiments and process improvements begin - and get tested before they reach the network.",
    icon: Sparkles,
    tag: "EXPLORATION",
  },
];

export default function CompanyPillarsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".pillar-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
    
    // Dynamic glow tracking
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D physics calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      z: 20,
      scale: 1.02,
      y: -8,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Smooth reset
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      y: 0,
      ease: "power3.out",
      duration: 0.7,
    });
  };

  return (
    <section
      ref={container}
      className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">
        
        {/* Top border line style on top of section */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FAFBFD] via-[#E8EBED] to-[#FAFBFD]" />

        {/* Header Section */}
        <div className="flex flex-col mb-12 md:mb-16 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C39967]" />
              Core Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-5">
              Four Pillars. <span className="text-[#C39967]">One Mandate.</span>
            </h2>
            <p className="text-sm md:text-base text-[#5E646D] max-w-xl font-normal leading-relaxed">
              The fundamental pillars that define how BricketX organizes capital, develops systems, and accelerates execution.
            </p>
          </div>
        </div>

        {/* Pillars Grid (Horizontal swipe on mobile, Grid on desktop) */}
        <div 
          className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-[calc(100%+3rem)] -ml-6 px-[8vw] sm:px-[6vw] md:w-full md:ml-0 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
          style={{ perspective: "1200px" }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.num}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="pillar-card group w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-center relative p-8 md:p-10 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#C39967]/40 shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-500 ease-out hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.35)] hover:border-[#C39967] cursor-pointer will-change-transform"
              >
                {/* Sleek Animated Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 group-hover:h-2 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-70 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none z-20" />

                {/* Mouse hover radial glow */}
                <div
                  className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 70%)`,
                  }}
                />

                {/* Content wrapped in z-10 to stay above mouse highlight */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED] group-hover:border-[#C39967]/30 transition-colors duration-500">
                    <span className="font-bold text-[#C39967]">PILLAR // {pillar.num}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D] px-2.5 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED] group-hover:border-[#C39967]/40 transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAFBFD] border border-[#E8EBED] flex items-center justify-center text-[#C39967] group-hover:scale-110 group-hover:bg-[#C39967] group-hover:text-white group-hover:shadow-[0_10px_20px_-5px_rgba(195,153,103,0.5)] transition-all duration-500 ease-out shadow-xs">
                      <Icon size={26} className="transition-transform duration-500 ease-out" />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#E8EBED] flex items-center justify-center text-[#A5ADB6] group-hover:text-white group-hover:bg-[#C39967] group-hover:border-[#C39967] transition-all duration-500">
                      <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B] mb-3 group-hover:text-[#C39967] transition-colors duration-300">
                    {pillar.name}
                  </h3>

                  <p className="text-base text-[#5E646D] leading-relaxed font-normal mb-8 pointer-events-none">
                    {pillar.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#E8EBED] group-hover:border-[#C39967]/30 flex items-center justify-between font-mono text-xs transition-colors duration-500">
                  <span className="text-[11px] text-[#A5ADB6] font-medium group-hover:text-[#C39967]/80 transition-colors">BRICKETX STRUCTURAL SPEC</span>
                  <a
                    href="#structure"
                    className="font-bold text-[#18181B] group-hover:text-[#C39967] flex items-center gap-1 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight size={13} className="text-[#C39967] group-hover:translate-x-1 transition-transform duration-300" />
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