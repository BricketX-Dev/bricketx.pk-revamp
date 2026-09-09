"use client";

import { useRef } from "react";
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
              No Stock Photos. <br />
              <span className="text-[#C39967]">A Working Studio.</span>
            </h2>

            <p className="studio-reveal text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-6">
              Inside the Karachi hub you&apos;ll find engineers, designers, marketers, and operators building side by side — coding, filming, designing, brainstorming, and shipping the systems that run the network.
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
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {studioActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div
                  key={idx}
                  className="studio-reveal p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between hover:border-[#C39967]/60 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] mb-6">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                      {act.count}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
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