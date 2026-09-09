"use client";

import { useRef } from "react";
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

  return (
    <section
      id="structure"
      ref={container}
      className="py-24 md:py-32 bg-[#0D0E12] text-white border-y border-zinc-800/80"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#C39967]/30 bg-[#C39967]/10 text-xs font-mono font-bold text-[#C39967] uppercase tracking-widest">
              <Globe2 size={13} />
              The Structure
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              One Network — <span className="text-[#C39967]">Four Regions.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Each region owns a distinct role — and every one connects back to the Karachi hub, where the network is built and run.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((reg, idx) => {
            const Icon = reg.icon;

            return (
              <div
                key={idx}
                className={`region-card relative p-7 rounded-2xl border backdrop-blur-md flex flex-col justify-between hover:border-[#C39967]/70 transition-all ${reg.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs pb-3 mb-5 border-b border-zinc-800/60">
                    <span className="font-bold text-[#C39967] uppercase">{reg.tier}</span>
                    <span className="text-zinc-500">NODE 0{idx + 1}</span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#C39967] mb-6">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-1">
                    {reg.location}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block mb-3 font-semibold">
                    {reg.role}
                  </span>

                  <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                    {reg.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>STATUS</span>
                  <span className="text-emerald-400 font-bold">SYNCHRONIZED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}