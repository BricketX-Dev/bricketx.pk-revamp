"use client";

import { useRef, useState, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, ArrowUpRight } from "lucide-react";
import ApplicationModal from "./ApplicationModal"; // Adjust path based on your folder structure

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const disciplines = [
  { id: "dev", name: "Developers", focus: "Full-Stack Next.js 15, TypeScript, API Gateways, Edge Infrastructure", tag: "ENGINEERING" },
  { id: "uiux", name: "UI/UX", focus: "Design Systems, Micro-Interactions, Spatial Layouts, Precision Wireframes", tag: "PRODUCT" },
  { id: "design", name: "Designers", focus: "Brand Guidelines, Investor Presentation Decks, High-Fidelity Vector Graphics", tag: "CREATIVE" },
  { id: "mkt", name: "Marketing", focus: "SEO, Performance Paid Acquisition, Analytics Attribution, Growth Funnels", tag: "GROWTH" },
  { id: "ai", name: "Artificial Intelligence", focus: "Deterministic Agent Workflows, Prompt Architectures, Python Data Pipelines", tag: "INTELLIGENCE" },
  { id: "ops", name: "Operations", focus: "Investor Relations, CRM Administration, Structured AAOIFI Compliance", tag: "GOVERNANCE" },
  { id: "prod", name: "Production", focus: "Sprint Delivery, Cross-Region Coordination, Technical Scoping Documents", tag: "DELIVERY" },
  { id: "mgmt", name: "Management", focus: "Engineering Pod Leads, Quality Assurance, Strategic Node Alignment", tag: "LEADERSHIP" },
];

export default function DepartmentRequisitions() {
  const container = useRef<HTMLDivElement>(null);
  
  // High-level state to manage modal visibility and target
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState(disciplines[0].id);

  useGSAP(() => {
    gsap.fromTo(
      ".job-row",
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

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; 
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      z: 20,
      scale: 1.02,
      y: -6,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      y: 0,
      ease: "power3.out",
      duration: 0.7,
    });
  };

  const openModal = (deptId: string) => {
    setSelectedDeptId(deptId);
    setIsModalOpen(true);
  };

  return (
    <section
      id="open-roles"
      ref={container}
      className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] relative"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
              <Briefcase size={13} className="text-[#C39967]" />
              Careers Directory
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-5">
              Join The Team Building The Future <br className="hidden sm:block" />
              <span className="text-[#C39967]">Of Alternative Investments.</span>
            </h2>
            <p className="text-sm md:text-base text-[#5E646D] max-w-xl font-normal leading-relaxed">
              We hire across every department in the hub. Find the discipline that fits your capability and craft.
            </p>
          </div>
        </div>

        {/* 8 Disciplines Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8" style={{ perspective: "1200px" }}>
          {disciplines.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => openModal(item.id)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="job-row text-left w-full group relative p-6 md:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#C39967]/40 shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex items-center justify-between overflow-hidden transition-[border-color,box-shadow] duration-500 ease-out hover:shadow-[0_30px_60px_-15px_rgba(195,153,103,0.35)] hover:border-[#C39967] cursor-pointer will-change-transform"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 group-hover:h-2 bg-gradient-to-r from-[#C39967] via-[#C39967]/60 to-[#C39967]/10 opacity-70 group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out pointer-events-none z-20" />

              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 100px), rgba(195, 153, 103, 0.12), transparent 70%)`,
                }}
              />

              <div className="relative z-10 pr-6">
                <div className="flex items-center gap-2 font-mono text-xs mb-3">
                  <span className="font-bold text-[#C39967]">0{idx + 1} //</span>
                  <span className="text-[10px] uppercase font-semibold text-[#5E646D] px-2.5 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED] group-hover:border-[#C39967]/40 transition-colors">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B] group-hover:text-[#C39967] transition-colors duration-300 mb-2">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-base text-[#5E646D] font-normal leading-relaxed">
                  {item.focus}
                </p>
              </div>

              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#E8EBED] flex items-center justify-center text-[#A5ADB6] bg-[#FAFBFD] group-hover:text-white group-hover:bg-[#C39967] group-hover:border-[#C39967] group-hover:shadow-[0_10px_20px_-5px_rgba(195,153,103,0.5)] shrink-0 transition-all duration-500 ease-out shadow-xs">
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialDeptId={selectedDeptId} 
        disciplines={disciplines} 
      />
    </section>
  );
} 