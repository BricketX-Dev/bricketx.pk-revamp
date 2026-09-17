"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Globe2, ShieldAlert, Cpu, Landmark, Pickaxe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const regions = [
  {
    tier: "HOLDINGS",
    location: "UK / BVI",
    role: "Corporate Structure",
    desc: "Holdings and governance for the group.",
    icon: Landmark,
    accent: "border-[#C39967]/30 bg-[#C39967]/5",
  },
  {
    tier: "LEADERSHIP",
    location: "Dubai",
    role: "Management",
    desc: "Regional leadership and investor relations.",
    icon: ShieldAlert,
    accent: "border-zinc-800 bg-zinc-900/40",
  },
  {
    tier: "PRODUCTION",
    location: "Kenya",
    role: "Mining",
    desc: "On-the-ground production and sourcing.",
    icon: Pickaxe,
    accent: "border-zinc-800 bg-zinc-900/40",
  },
  {
    tier: "EXECUTION",
    location: "Pakistan",
    role: "Operations",
    desc: "The Karachi hub - where it's built.",
    icon: Cpu,
    accent: "border-[#C39967] bg-[#C39967]/10",
  },
];

export default function GlobalStructureSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".region-card",
      { y: 35, opacity: 0 },
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
      id="structure"
      ref={container}
      className="py-24 md:py-32 bg-[#0D0E12] text-white border-y border-zinc-800/80 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest">
              <Globe2 size={13} />
              The Structure
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
              One Network - <span className="text-[#C39967]">Four Regions.</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed">
              Each region owns a distinct role - and every one connects back to the Karachi hub, where the network is built and run.
            </p>
          </div>
        </div>

        {/* Region Cards (Horizontal swipe on mobile, Grid on desktop) */}
        <div 
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-[calc(100%+3rem)] -ml-6 px-[8vw] sm:px-[6vw] md:w-full md:ml-0 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ perspective: "1200px" }}
        >
          {regions.map((reg, idx) => {
            const Icon = reg.icon;

            return (
              <div
                key={idx}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`region-card group w-[80vw] sm:w-[50vw] md:w-auto shrink-0 snap-center relative p-7 rounded-2xl border backdrop-blur-md flex flex-col justify-between hover:border-[#C39967]/70 hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.25)] transition-[border-color,box-shadow,background-color] duration-500 ease-out cursor-pointer will-change-transform overflow-hidden ${reg.accent}`}
                style={{
                  backgroundImage: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.15), transparent 70%)`,
                }}
              >
                {/* Animated Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 group-hover:h-1.5 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-30 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs pb-3 mb-5 border-b border-zinc-800/60 group-hover:border-[#C39967]/30 transition-colors duration-500">
                      <span className="font-bold text-[#C39967] uppercase">{reg.tier}</span>
                      <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">NODE 0{idx + 1}</span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] mb-6 group-hover:bg-[#C39967] group-hover:text-white group-hover:scale-110 group-hover:border-[#C39967]/40 group-hover:shadow-[0_10px_20px_-5px_rgba(195,153,103,0.5)] transition-all duration-500 ease-out">
                      <Icon size={22} className="transition-transform duration-500 ease-out" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-white mb-1 group-hover:text-[#C39967] transition-colors duration-300">
                      {reg.location}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 block mb-3 font-semibold pointer-events-none">
                      {reg.role}
                    </span>

                    <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed pointer-events-none">
                      {reg.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-800/60 group-hover:border-[#C39967]/30 flex items-center justify-between text-[11px] font-mono text-zinc-500 transition-colors duration-500">
                    <span>STATUS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      SYNCHRONIZED
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}