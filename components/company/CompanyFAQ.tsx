"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, HelpCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    q: "How is BricketX structured?",
    a: "BricketX operates as a cross-border institutional network across four regions: UK/BVI for group holdings and governance, Dubai for regional leadership and investor relations, Kenya for on-the-ground production and mining, and Pakistan (Karachi) as the centralized engine room where the technology, marketing, operations, creative, and production work is executed.",
  },
  {
    q: "What is the BricketX ecosystem?",
    a: "The ecosystem brings together capital allocation, sovereign structuring, technology engineering, physical asset operations, and Shariah governance under one unified operating model.",
  },
  {
    q: "How does BricketX operate?",
    a: "Through a disciplined idea-to-scale process run by the hub's five departments — Technology, Marketing, Operations, Creative and Production. Every initiative moves from research to design, build, automation, and global distribution.",
  },
  {
    q: "What is the BricketX Innovation Lab?",
    a: "The Innovation Lab is where new products, AI experiments, and process improvements begin and undergo rigorous testing before reaching the broader network.",
  },
];

export default function CompanyFAQ() {
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
    <section ref={container} className="py-24 md:py-32 bg-[#0a0a0b] text-white border-b border-zinc-800/80">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-md border border-zinc-800 bg-zinc-900/50 text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest">
            <HelpCircle size={13} className="text-[#C39967]" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            About The Company
          </h2>
        </div>

        <div className="flex flex-col border-t border-zinc-800">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="faq-row border-b border-zinc-800 transition-colors">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-base sm:text-lg font-bold text-white hover:text-[#C39967] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-zinc-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#C39967]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-56 pb-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
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