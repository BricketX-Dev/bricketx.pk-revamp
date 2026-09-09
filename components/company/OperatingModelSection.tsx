"use client";

import { useRef } from "react";
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
  { num: "04", stage: "Automate", dept: "Operations", desc: "Process tooling, compliance ledgers, and reporting hooks." },
  { num: "05", stage: "Ship", dept: "Marketing", desc: "Global distribution, investor access, and continuous scale." },
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

  return (
    <section ref={container} className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <Workflow size={13} className="text-[#C39967]" />
              The Operating Model
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
              Idea To Scale, <span className="text-[#C39967]">Every Time.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            Every project moves through the same path across the hub&apos;s five departments — ensuring high precision, auditability, and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="op-step p-6 rounded-2xl bg-white border border-[#E8EBED] shadow-xs hover:border-[#C39967] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#5E646D] mb-4">
                  <span className="font-bold text-[#C39967]">STEP {st.num}</span>
                  {idx < 4 && <ArrowRight size={14} className="text-[#A5ADB6] hidden md:block" />}
                </div>

                <h3 className="text-2xl font-black text-[#18181B] mb-1">
                  {st.stage}
                </h3>
                <span className="text-[11px] font-mono text-[#C39967] uppercase font-bold block mb-3">
                  {st.dept} Dept
                </span>

                <p className="text-xs text-[#5E646D] font-normal leading-relaxed">
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