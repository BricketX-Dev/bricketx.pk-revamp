"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, HelpCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const buildFaqs = [
  {
    q: "What does BricketX Pakistan build?",
    a: "Systems, not one-off services: the investor portal, web platforms, AI, CRM, dashboards, automations, marketing funnels, reporting and operational tooling that run the BricketX network.",
  },
  {
    q: "What is the BricketX investor portal?",
    a: "It is the institutional gateway where high-net-worth individuals, institutional LPs, and sovereign stakeholders authenticate to review real-time allocation distributions, yield telemetry, transaction ledgers, and compliance documents.",
  },
  {
    q: "Are these products or services?",
    a: "They are proprietary, continuously maintained products and systems. Rather than delivering a project and walking away, the Karachi engine room owns, iterates, hosts, and monitors these systems 24/7.",
  },
  {
    q: "Which department builds these systems?",
    a: "Systems are built cross-functionally across all five Karachi departments. Production scopes the process, Creative designs the interfaces, Technology writes and scales the codebase, Operations audits compliance, and Marketing ensures global reach.",
  },
];

export default function WhatWeBuildFAQ() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    gsap.fromTo(
      ".faq-row",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
            <HelpCircle size={13} className="text-[#C39967]" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
            About What We Build
          </h2>
        </div>

        <div className="flex flex-col border-t border-[#E8EBED]">
          {buildFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-row border-b border-[#E8EBED] transition-colors">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-base sm:text-lg font-bold text-[#18181B] hover:text-[#C39967] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#A5ADB6] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#C39967]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-sm text-[#5E646D] font-normal leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}