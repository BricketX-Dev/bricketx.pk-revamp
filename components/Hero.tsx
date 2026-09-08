"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const xToSpot = useRef<gsap.QuickToFunc | null>(null);
  const yToSpot = useRef<gsap.QuickToFunc | null>(null);
  const xToContent = useRef<gsap.QuickToFunc | null>(null);
  const yToContent = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (spotlightRef.current && contentRef.current) {
      xToSpot.current = gsap.quickTo(spotlightRef.current, "x", { duration: 0.35, ease: "power2.out" });
      yToSpot.current = gsap.quickTo(spotlightRef.current, "y", { duration: 0.35, ease: "power2.out" });

      xToContent.current = gsap.quickTo(contentRef.current, "x", { duration: 0.6, ease: "power2.out" });
      yToContent.current = gsap.quickTo(contentRef.current, "y", { duration: 0.6, ease: "power2.out" });
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".hero-label",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
    )
    .fromTo(
      ".title-word",
      { yPercent: 100 },
      { yPercent: 0, duration: 0.9, stagger: 0.1 },
      "-=0.4"
    )
    .fromTo(
      ".hero-copy",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.6"
    )
    .fromTo(
      ".hero-actions",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    )
    .fromTo(
      ".status-item",
      { opacity: 0, x: 15 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 },
      "-=0.6"
    );
  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    xToSpot.current?.(x - 250);
    yToSpot.current?.(y - 250);

    xToContent.current?.(normX * 10);
    yToContent.current?.(normY * 6);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative h-screen max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0a0a0b] text-[#f4f4f5] select-none"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,#c39967_0%,transparent_70%)] opacity-20 blur-3xl z-10 will-change-transform"
      />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_30%,transparent_100%)] z-0" />

      {/* 3D Render Video Loop Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
        >
          <source src="/videos/bricketx-3d-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/60" />
      </div>

      {/* Top Spacer to account for Navbar */}
      <div className="h-20 sm:h-24 shrink-0" />

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 w-full max-w-7xl my-auto">
        <div ref={contentRef} className="max-w-2xl will-change-transform">
          
          {/* Label Chip */}
          <div className="hero-label inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa] mb-4">
            <span className="w-1.5 h-1.5 bg-[#c39967] rounded-full animate-pulse" />
            <span className="text-white font-medium">BricketX PK</span>
            <span className="text-[#3f3f46]">/</span>
            <span>Operations &amp; Engineering</span>
          </div>

          {/* Compact, Powerful Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-5 leading-[0.95]">
            <div className="overflow-hidden pb-1">
              <span className="title-word block">Build.</span>
            </div>
            <div className="overflow-hidden pb-1">
              <span className="title-word block text-[#a1a1aa]">Scale.</span>
            </div>
            <div className="overflow-hidden pb-1">
              <span className="title-word block text-[#c39967]">Execute.</span>
            </div>
          </h1>

          {/* Narrative Body */}
          <p className="hero-copy text-sm sm:text-base md:text-lg text-[#a1a1aa] max-w-lg mb-8 leading-relaxed font-light">
            The operational core of the global BricketX network, based in Karachi. Institutional engineering, liquidity workflows, and round-the-clock systems delivery.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions flex flex-wrap items-center gap-3.5">
            <a
              href="#departments"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black text-xs sm:text-sm font-semibold hover:bg-[#e4e4e7] transition-colors rounded-sm"
            >
              <span>Explore Departments</span>
              <ArrowRight size={14} />
            </a>

            <a
              href="#what-we-build"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#27272a] hover:border-[#3f3f46] text-[#e4e4e7] text-xs sm:text-sm font-medium transition-colors bg-[#0a0a0b]/50 backdrop-blur-sm rounded-sm"
            >
              <Play size={11} className="fill-current text-[#c39967]" />
              <span>Systems Catalog</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="container mx-auto px-6 md:px-12 w-full max-w-7xl pb-6 relative z-20 shrink-0">
        <div className="pt-4 border-t border-[#18181b] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#71717a]">
          <div className="status-item flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Karachi Node</span>
            <span className="text-white font-medium">100% Operational</span>
          </div>
          <div className="status-item hidden sm:flex items-center gap-2">
            <span>Global Latency</span>
            <span className="text-[#c39967]">14ms</span>
          </div>
          <div className="status-item hidden md:flex items-center gap-2">
            <span>Coordinates</span>
            <span className="text-[#a1a1aa]">24.8607° N, 67.0011° E</span>
          </div>
        </div>
      </div>
    </section>
  );
}