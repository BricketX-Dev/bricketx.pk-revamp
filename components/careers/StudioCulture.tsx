"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Camera, ArrowUpRight, Flame, Video, Code2, Layers } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const studioActivities = [
  { label: "Engineering & Architecture", count: "10 Core Systems", icon: Code2 },
  { label: "Content & Visual Production", count: "4K Cinema Pipelines", icon: Video },
  { label: "UI/UX & Spatial Motion", count: "Design System 2.4", icon: Layers },
  { label: "Live Growth & Operations", count: "4 Regions Monitored", icon: Flame },
];

export default function StudioCulture() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".studio-reveal",
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
      ref={container}
      className="py-24 md:py-32 bg-[#0D0E12] text-white border-b border-zinc-800/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-70" />
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-[#C39967]/10 blur-[200px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="studio-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest w-fit">
              <Camera size={13} />
              Life At BricketX // Real People Real Work
            </div>

            <h2 className="studio-reveal text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Join The Team <br />
              <span className="text-[#C39967]">Building The Future.</span>
            </h2>

            <p className="studio-reveal text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-6">
              Inside the Karachi hub you&apos;ll find engineers, designers, marketers, and operators building side by side - coding, filming, designing, brainstorming, and shipping the systems that run the network.
            </p>

            <p className="studio-reveal text-sm text-zinc-400 font-light leading-relaxed mb-8 border-l-2 border-[#C39967] pl-4">
              This is a working studio, not a portfolio. Every initiative, line of code, and visual frame on this page is created by our in-house team in our space.
            </p>

            <div className="studio-reveal">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-[#C39967] hover:text-white transition-colors"
              >
                <span>Connect With BricketX</span>
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Grid Blocks Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ perspective: "1200px" }}>
            {studioActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div
                  key={idx}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="studio-reveal group relative p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between hover:border-[#C39967]/70 hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.25)] transition-[border-color,box-shadow] duration-500 ease-out cursor-pointer will-change-transform overflow-hidden min-h-[180px]"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.15), transparent 70%), rgba(24, 24, 27, 0.6)`,
                  }}
                >
                  {/* Animated Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 group-hover:h-1.5 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-30 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none z-20" />

                  <div className="relative z-10 w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] mb-6 group-hover:bg-[#C39967] group-hover:text-zinc-950 group-hover:border-[#C39967] group-hover:shadow-[0_10px_20px_-5px_rgba(195,153,103,0.3)] transition-all duration-500 ease-out">
                    <Icon size={22} className="transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1 group-hover:text-[#C39967]/80 transition-colors duration-300">
                      {act.count}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#C39967] transition-colors duration-300">
                      {act.label}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}