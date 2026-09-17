"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Layers } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pipelineSteps = [
  { num: "01", name: "Production", action: "Research, scope & process architecture" },
  { num: "02", name: "Creative", action: "Identity, interfaces & asset systems" },
  { num: "03", name: "Technology", action: "Engineering, intelligence & automation" },
  { num: "04", name: "Operations", action: "Reporting, CRM & investor pipelines" },
  { num: "05", name: "Marketing", action: "Distribution, search & public trust" },
];

export default function PipelineFlow() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".pipeline-step",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
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
    <section ref={container} className="py-24 bg-[#0a0a0b] text-white border-y border-zinc-800/80 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest">
              <Layers size={13} />
              How They Connect
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              Five Departments, <span className="text-[#C39967]">One Pipeline.</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed">
              No department works alone. Every project flows through the hub in the same rigorous sequence from research to institutional distribution.
            </p>
          </div>
        </div>

        {/* Pipeline Steps (Horizontal swipe on mobile, Grid on desktop) */}
        <div 
          className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-[calc(100%+3rem)] -ml-6 px-[8vw] sm:px-[6vw] md:w-full md:ml-0 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ perspective: "1200px" }}
        >
          {pipelineSteps.map((step, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="pipeline-step group w-[75vw] sm:w-[50vw] md:w-auto shrink-0 snap-center relative p-6 rounded-2xl border border-zinc-800/80 hover:border-[#C39967]/70 hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.25)] transition-[border-color,box-shadow] duration-500 ease-out flex flex-col justify-between cursor-pointer will-change-transform overflow-hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.15), transparent 70%), rgba(24, 24, 27, 0.4)`,
              }}
            >
              {/* Animated Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 group-hover:h-1.5 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-30 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none" />

              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6 group-hover:text-zinc-400 transition-colors duration-300">
                  <span className="font-bold text-[#C39967]">STEP {step.num}</span>
                  {idx < 4 && (
                    <ArrowRight size={14} className="text-zinc-600 hidden md:block group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C39967] transition-colors duration-300">
                  {step.name}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed pointer-events-none">
                  {step.action}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}