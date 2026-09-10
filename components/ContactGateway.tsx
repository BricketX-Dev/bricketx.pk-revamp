"use client";

import { useRef, MouseEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Terminal, Mail, MapPin, Radio, ShieldCheck, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactGateway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGGElement>(null);

  const xToSvg = useRef<gsap.QuickToFunc | null>(null);
  const yToSvg = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Mouse Tracking for Vector Background
    if (svgRef.current) {
      xToSvg.current = gsap.quickTo(svgRef.current, "x", { duration: 1.2, ease: "power2.out" });
      yToSvg.current = gsap.quickTo(svgRef.current, "y", { duration: 1.2, ease: "power2.out" });
    }

    // 2. Ambient Continuous Rotation on Rings
    gsap.to(".contact-svg-spin", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".contact-svg-counter", {
      rotation: -360,
      transformOrigin: "center center",
      duration: 45,
      repeat: -1,
      ease: "none",
    });

    // 3. Staggered Scroll Entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 78%",
      },
    });

    tl.fromTo(
      ".gateway-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    ).fromTo(
      cardRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: containerRef });

  const handleSectionMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xToSvg.current?.(x * 0.035);
    yToSvg.current?.(y * 0.035);
  };

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      onMouseMove={handleSectionMouseMove}
      className="relative w-full py-28 md:py-36 bg-[#FAFBFD] text-[#18181B] border-t border-[#E8EBED] overflow-hidden select-none"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-60 pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[420px] bg-[#C39967]/10 blur-[170px] pointer-events-none rounded-full" />

      {/* Interactive Vector Radar Grid (Parallax Background) */}
      <div className="absolute inset-0 flex items-center justify-end pr-[5%] lg:pr-[10%] pointer-events-none overflow-hidden opacity-35">
        <svg
          viewBox="0 0 700 700"
          className="w-[520px] h-[520px] lg:w-[680px] lg:h-[680px] will-change-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g ref={svgRef}>
            <circle
              cx="350"
              cy="350"
              r="300"
              stroke="#A5ADB6"
              strokeWidth="1"
              strokeDasharray="10 14"
              className="contact-svg-spin"
            />
            <circle
              cx="350"
              cy="350"
              r="210"
              stroke="#C39967"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              className="contact-svg-counter"
            />
            <circle
              cx="350"
              cy="350"
              r="130"
              stroke="#A5ADB6"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
            <line x1="80" y1="350" x2="620" y2="350" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <line x1="350" y1="80" x2="350" y2="620" stroke="#C39967" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="350" cy="350" r="4" fill="#C39967" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Headline */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="gateway-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-md border border-[#C39967]/40 bg-[#FAF5EE] text-xs font-mono font-semibold text-[#C39967] uppercase tracking-widest shadow-xs w-fit">
              <Terminal size={13} />
              Connection Gateway // Karachi Hub
            </div>

            <h2 className="gateway-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] mb-6 leading-[0.98]">
              Let&apos;s build the <br />
              <span className="text-[#C39967]">next system.</span>
            </h2>

            <p className="gateway-reveal text-base sm:text-lg text-[#5E646D] font-normal leading-relaxed max-w-lg mb-10">
              Whether you&apos;re looking to partner with the operational hub, integrate our infrastructure, or join the team — the engine room is open.
            </p>

            {/* Hub Coordinates Strip */}
            <div className="gateway-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg font-mono text-xs text-[#5E646D]">
              <div className="p-4 rounded-2xl bg-white border border-[#E8EBED] shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#C39967]/30 flex items-center justify-center text-[#C39967] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#A5ADB6] block">The Hub</span>
                  <span className="font-bold text-[#18181B]">Karachi, Pakistan</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8EBED] shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#C39967]/30 flex items-center justify-center text-[#C39967] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#A5ADB6] block">Direct Contact</span>
                  <span className="font-bold text-[#18181B]">Info@bricketx.pk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Gateway Card */}
          <div className="lg:col-span-6">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              className="group relative rounded-3xl bg-white border border-[#E8EBED] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-[#C39967] transition-all duration-300 overflow-hidden"
              style={{
                background: `radial-gradient(420px circle at var(--mouse-x, 200px) var(--mouse-y, 150px), rgba(195, 153, 103, 0.08), transparent 70%), #FFFFFF`,
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between font-mono text-xs pb-5 mb-8 border-b border-[#E8EBED]">
                <div className="flex items-center gap-2">
                  <Radio size={13} className="text-[#C39967] animate-pulse" />
                  <span className="font-bold text-[#18181B]">GATEWAY // INQUIRY ROUTING</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  DESK ONLINE
                </span>
              </div>

              <div className="mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#A5ADB6] block mb-2 font-bold">
                  TRANSMISSION CHANNELS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B] mb-3">
                  Direct Pipeline to Engineering &amp; Operations.
                </h3>
                <p className="text-sm text-[#5E646D] leading-relaxed font-normal">
                  Skip standard client queues. All transmissions route directly to our Karachi desk for rapid operational evaluation.
                </p>
              </div>

              {/* Inquiry Type Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["System Partnerships", "Open Roles & Talent", "Operational Audits", "Infrastructure Access"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#FAFBFD] border border-[#E8EBED] text-xs font-mono font-medium text-[#18181B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E8EBED]">
                <Link
                  href="/contact"
                  className="group/btn flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#18181B] hover:bg-[#C39967] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm"
                >
                  <span>Open Contact Terminal</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>

                <a
                  href="mailto:Info@bricketx.pk"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 border border-[#E8EBED] hover:border-[#C39967] hover:bg-[#FAFBFD] text-[#18181B] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors"
                >
                  <span>Email Directly</span>
                  <ArrowUpRight size={14} className="text-[#C39967]" />
                </a>
              </div>

              {/* Security Footnote */}
              <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-[#A5ADB6]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#C39967]" />
                  256-BIT ENCRYPTED ROUTING
                </span>
                <span>UTC+5 DESK</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}