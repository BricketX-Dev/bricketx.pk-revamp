"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Workflow, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { num: "01", stage: "Research", dept: "Production", desc: "Market scoping, structural thesis, and risk assessment." },
  { num: "02", stage: "Design", dept: "Creative", desc: "Design systems, interfaces, and precision motion blueprints." },
  { num: "03", stage: "Build", dept: "Technology", desc: "Architecture, engineering, and hardened infrastructure coding." },
  { num: "04", stage: "Launch", dept: "Release", desc: "Bringing the project to life and getting it into the hands of real users." },
  { num: "05", stage: "Run", dept: "Support", desc: "Keeping the system fast, secure, and running smoothly every single day." },
];

export default function OperatingModelSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".op-step",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
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
    <section ref={container} className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">
        
        {/* Top border line style on top of section */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FAFBFD] via-[#E8EBED] to-[#FAFBFD]" />

        {/* Header Section */}
        <div className="flex flex-col mb-12 md:mb-16 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#EAE1D5] bg-gradient-to-br from-[#FDFCF9] to-[#F3EAE0] text-xs font-mono font-bold text-[#716453] uppercase tracking-widest shadow-xs">
              <Workflow size={13} className="text-[#C39967]" />
              The Operating Model
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-5">
              Idea To Scale, <span className="text-[#C39967]">Every Time.</span>
            </h2>
            <p className="text-sm md:text-base text-[#5E646D] max-w-xl font-normal leading-relaxed">
              Every project moves through the same path across the hub&apos;s five departments - ensuring high precision, auditability, and speed.
            </p>
          </div>
        </div>

        {/* Steps Grid (Horizontal swipe on mobile, Grid on desktop) */}
        <div 
          className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-[calc(100%+3rem)] -ml-6 px-[8vw] sm:px-[6vw] md:w-full md:ml-0 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ perspective: "1200px" }}
        >
          {steps.map((st, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="op-step group w-[75vw] sm:w-[50vw] md:w-auto shrink-0 snap-center relative p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#C39967]/40 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-[#C39967] hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.35)] flex flex-col justify-between transition-[border-color,box-shadow] duration-500 ease-out cursor-pointer will-change-transform overflow-hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 70%), #FFFFFF`,
              }}
            >
              
              {/* Sleek Animated Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 group-hover:h-2 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-70 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none" />

              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#716453] mb-4">
                  <span className="font-bold text-[#C39967]">STEP {st.num}</span>
                  {idx < 4 && <ArrowRight size={14} className="text-[#C39967]/40 hidden md:block group-hover:translate-x-1 transition-transform duration-300" />}
                </div>

                <h3 className="text-2xl font-black text-[#18181B] mb-1 group-hover:text-[#C39967] transition-colors duration-300 ease-out">
                  {st.stage}
                </h3>
                <span className="text-[11px] font-mono text-[#C39967] uppercase font-bold block mb-3">
                  {st.dept} Dept
                </span>

                <p className="text-xs text-[#716453] font-normal leading-relaxed pointer-events-none">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}