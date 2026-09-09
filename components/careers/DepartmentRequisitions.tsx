"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const disciplines = [
  { id: "dev", name: "Developers", focus: "Full-Stack Next.js 15, TypeScript, API Gateways, Edge Infrastructure", tag: "ENGINEERING" },
  { id: "uiux", name: "UI/UX", focus: "Design Systems, Micro-Interactions, Spatial Layouts, Precision Wireframes", tag: "PRODUCT" },
  { id: "design", name: "Designers", focus: "Brand Guidelines, Investor Presentation Decks, High-Fidelity Vector Graphics", tag: "CREATIVE" },
  { id: "mkt", name: "Marketing", focus: "SEO, Performance Paid Acquisition, Analytics Attribution, Growth Funnels", tag: "GROWTH" },
  { id: "ai", name: "AI", focus: "Deterministic Agent Workflows, Prompt Architectures, Python Data Pipelines", tag: "INTELLIGENCE" },
  { id: "ops", name: "Operations", focus: "Investor Relations, CRM Administration, Structured AAOIFI Compliance", tag: "GOVERNANCE" },
  { id: "prod", name: "Production", focus: "Sprint Delivery, Cross-Region Coordination, Technical Scoping Documents", tag: "DELIVERY" },
  { id: "mgmt", name: "Management", focus: "Engineering Pod Leads, Quality Assurance, Strategic Node Alignment", tag: "LEADERSHIP" },
];

export default function DepartmentRequisitions() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".job-row",
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
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
      id="open-roles"
      ref={container}
      className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED]"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <Briefcase size={13} className="text-[#C39967]" />
              Careers Directory
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
              Join The Team Building The Future <br className="hidden sm:block" />
              <span className="text-[#C39967]">Of Alternative Investments.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#5E646D] max-w-md font-normal leading-relaxed">
            We hire across every department in the hub. Find the discipline that fits your capability and craft.
          </p>
        </div>

        {/* 8 Disciplines Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {disciplines.map((item, idx) => (
            <Link
              key={item.id}
              href="/contact"
              className="job-row group p-6 rounded-2xl bg-white border border-[#E8EBED] shadow-xs hover:border-[#C39967] hover:shadow-[0_15px_35px_rgba(195,153,103,0.08)] transition-all flex items-center justify-between"
            >
              <div className="pr-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#C39967] mb-1 font-bold">
                  <span>0{idx + 1} //</span>
                  <span className="text-zinc-400">{item.tag}</span>
                </div>
                <h3 className="text-2xl font-black text-[#18181B] group-hover:text-[#C39967] transition-colors mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#5E646D] font-normal leading-relaxed line-clamp-1">
                  {item.focus}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full border border-[#E8EBED] group-hover:border-[#C39967] group-hover:bg-[#FAF5EE] flex items-center justify-center text-[#A5ADB6] group-hover:text-[#C39967] shrink-0 transition-all">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}