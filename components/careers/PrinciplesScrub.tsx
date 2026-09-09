"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const principles = [
  {
    num: "01",
    title: "Educate First",
    desc: "We teach before we sell — internally and to investors.",
    tag: "PEDAGOGY",
  },
  {
    num: "02",
    title: "Innovate Continuously",
    desc: "New tools, new processes, always shipping something better.",
    tag: "ITERATION",
  },
  {
    num: "03",
    title: "Operate With Excellence",
    desc: "Precision and accountability in everything we run.",
    tag: "PRECISION",
  },
  {
    num: "04",
    title: "Think Globally",
    desc: "We build for a network that spans four regions.",
    tag: "TOPOLOGY",
  },
  {
    num: "05",
    title: "Build For Scale",
    desc: "Every system is designed to grow, not just work.",
    tag: "ARCHITECTURE",
  },
  {
    num: "06",
    title: "Never Stop Learning",
    desc: "The hub upskills constantly, across every department.",
    tag: "COMPOUNDING",
  },
  {
    num: "07",
    title: "Always Improve",
    desc: "We iterate on process as much as on product.",
    tag: "REFINEMENT",
  },
];

export default function PrinciplesScrub() {
  const container = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollAmount = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.to(track, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${scrollAmount * 1.2}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    return () => ctx.kill();
  }, { scope: container });

  return (
    <section ref={container} className="bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED] overflow-hidden">
      <div ref={triggerRef} className="h-screen flex flex-col justify-between py-12">
        {/* Header Strip */}
        <div className="container mx-auto px-6 md:px-12 max-w-7xl shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-xs">
            <Sparkles size={13} className="text-[#C39967]" />
            How We Think // The Operating Principles
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
              The Principles <span className="text-[#C39967]">We Run On.</span>
            </h2>
            <p className="text-xs md:text-sm font-mono text-[#5E646D] flex items-center gap-2">
              <span>HORIZONTAL LATERAL SHIFT</span>
              <ArrowRight size={14} className="text-[#C39967]" />
            </p>
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full my-auto overflow-visible pl-6 md:pl-12">
          <div ref={trackRef} className="flex gap-6 w-max pr-12 will-change-transform">
            {principles.map((item) => (
              <div
                key={item.num}
                className="w-[320px] md:w-[380px] h-[340px] p-8 rounded-3xl bg-white border border-[#E8EBED] shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-[#C39967] hover:shadow-[0_20px_50px_rgba(195,153,103,0.1)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs pb-3 mb-6 border-b border-[#E8EBED]">
                    <span className="font-bold text-[#C39967]">{item.num} // VALUE</span>
                    <span className="text-[10px] uppercase font-semibold text-[#5E646D] px-2 py-0.5 rounded bg-[#FAFBFD] border border-[#E8EBED]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-[#18181B] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-base text-[#5E646D] font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EBED] flex items-center justify-between font-mono text-[11px] text-[#A5ADB6]">
                  <span>BRICKETX CORE RULE</span>
                  <span className="text-[#C39967] font-bold">IMMUTABLE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Progress Ticker */}
        <div className="container mx-auto px-6 md:px-12 max-w-7xl shrink-0">
          <div className="pt-4 border-t border-[#E8EBED] flex items-center justify-between text-xs font-mono text-[#A5ADB6]">
            <span>SEVEN VALUES SHAPING EVERY DECISION</span>
            <span className="font-bold text-[#18181B]">01 &mdash; 07</span>
          </div>
        </div>
      </div>
    </section>
  );
}