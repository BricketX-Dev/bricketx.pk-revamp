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
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={container}
      className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED]"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C39967]" />
              Core Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
              Four Pillars. <span className="text-[#C39967]">One Mandate.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            The fundamental pillars that define how BricketX organizes capital, develops systems, and accelerates execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.num}
                onMouseMove={handleMouseMove}
                className="pillar-card group relative p-8 md:p-10 rounded-3xl bg-white border border-[#E8EBED] shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-[#C39967] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.08), transparent 70%), #FFFFFF`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-[#E8EBED]">
                    <span className="font-bold text-[#C39967]">PILLAR // {pillar.num}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D] px-2.5 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED]">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAFBFD] border border-[#E8EBED] flex items-center justify-center text-[#C39967] group-hover:scale-105 group-hover:bg-[#FAF5EE] group-hover:border-[#C39967]/40 transition-all duration-300 shadow-xs">
                      <Icon size={26} />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#E8EBED] flex items-center justify-center text-[#A5ADB6] group-hover:text-[#C39967] group-hover:border-[#C39967] transition-all">
                      <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B] mb-3 group-hover:text-[#C39967] transition-colors">
                    {pillar.name}
                  </h3>

                  <p className="text-base text-[#5E646D] leading-relaxed font-normal mb-8">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EBED] flex items-center justify-between font-mono text-xs">
                  <span className="text-[11px] text-[#A5ADB6] font-medium">BRICKETX STRUCTURAL SPEC</span>
                  <a
                    href="#structure"
                    className="font-bold text-[#18181B] group-hover:text-[#C39967] flex items-center gap-1 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight size={13} className="text-[#C39967]" />
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