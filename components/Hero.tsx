"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const xToSpot = useRef<gsap.QuickToFunc | null>(null);
  const yToSpot = useRef<gsap.QuickToFunc | null>(null);
  const xToContent = useRef<gsap.QuickToFunc | null>(null);
  const yToContent = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // 1. Mouse Tracking setup
    if (spotlightRef.current && contentRef.current) {
      xToSpot.current = gsap.quickTo(spotlightRef.current, "x", { duration: 0.35, ease: "power2.out" });
      yToSpot.current = gsap.quickTo(spotlightRef.current, "y", { duration: 0.35, ease: "power2.out" });

      xToContent.current = gsap.quickTo(contentRef.current, "x", { duration: 0.6, ease: "power2.out" });
      yToContent.current = gsap.quickTo(contentRef.current, "y", { duration: 0.6, ease: "power2.out" });
    }

    // 2. Slow breathing zoom on the full-screen video
    gsap.to(videoRef.current, {
      scale: 1.08,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 3. Initial Content Entrance (Silky text reveal)
    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    introTl.fromTo(
      ".hero-label",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
    )
    .fromTo(
      ".title-word",
      { yPercent: 100 },
      { yPercent: 0, duration: 0.9, stagger: 0.12 },
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

    // 4. Cinematic Parallax Exit (Optimized blur and translation)
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    exitTl
      // Front Content: Controlled upward travel and clean fade
      .to(contentRef.current, {
        y: -100,
        opacity: 0,
        filter: "blur(2px)",
        ease: "none",
      }, 0)
      
      // Footer Telemetry: Drops downward off-screen
      .to(".hero-footer-telemetry", {
        y: 40,
        opacity: 0,
        ease: "none",
      }, 0)
      
      // Video Background: Parallax push down & fade
      .to(videoRef.current, {
        yPercent: 20, 
        opacity: 0.1,
        ease: "none",
      }, 0);

  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    xToSpot.current?.(x - 300);
    yToSpot.current?.(y - 300);

    xToContent.current?.(normX * 12);
    yToContent.current?.(normY * 8);
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative h-screen max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0b] text-[#f4f4f5] select-none"
    >
      {/* Dynamic Mouse Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,#c39967_0%,transparent_70%)] opacity-20 blur-3xl z-20 will-change-transform"
      />

      {/* Technical Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_30%,transparent_100%)] z-10" />

      {/* Full-Bleed 3D Render Video Loop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 filter grayscale contrast-125 will-change-transform"
        >
          <source src="/videos/bricketx-3d-loop.mp4" type="video/mp4" />
        </video>
        
        {/* Soft edge gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/60 z-10" />
      </div>

      {/* Top Navbar Spacer */}
      <div className="h-24 sm:h-28 shrink-0 relative z-30" />

      {/* Typography & UI Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-30 w-full max-w-7xl my-auto">
        <div ref={contentRef} className="max-w-2xl will-change-transform">
          
          <div className="hero-label inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa] mb-5">
            <span className="w-1.5 h-1.5 bg-[#c39967] rounded-full animate-pulse" />
            <span className="text-white font-medium">BricketX PK</span>
            <span className="text-[#3f3f46]">/</span>
            <span>Operations & Engineering</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-white mb-6 leading-[0.95]">
            <div className="overflow-hidden pb-1.5">
              <span className="title-word block">Build.</span>
            </div>
            <div className="overflow-hidden pb-1.5">
              <span className="title-word block text-[#a1a1aa]">Scale.</span>
            </div>
            <div className="overflow-hidden pb-1.5">
              <span className="title-word block text-[#c39967]">Execute.</span>
            </div>
          </h1>

          <p className="hero-copy text-base md:text-lg text-[#a1a1aa] max-w-lg mb-10 leading-relaxed font-light">
            The operational core of the global BricketX network, based in Karachi. Institutional engineering, liquidity workflows, and round-the-clock systems delivery.
          </p>

          <div className="hero-actions flex flex-wrap items-center gap-4">
            <a
              href="#departments"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black text-sm font-semibold hover:bg-[#e4e4e7] transition-colors rounded-sm"
            >
              <span>Explore Departments</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#what-we-build"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-[#27272a] hover:border-[#3f3f46] text-[#e4e4e7] text-sm font-medium transition-colors bg-[#0a0a0b]/60 backdrop-blur-md rounded-sm"
            >
              <Play size={12} className="fill-current text-[#c39967]" />
              <span>Systems Catalog</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Telemetry Status Bar */}
      <div className="hero-footer-telemetry container mx-auto px-6 md:px-12 w-full max-w-7xl pb-8 relative z-30 shrink-0">
        <div className="pt-5 border-t border-[#18181b] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#71717a]">
          <div className="status-item flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Karachi Node</span>
            <span className="text-white font-medium">100% Operational</span>
          </div>
          <div className="status-item hidden sm:flex items-center gap-2.5">
            <span>Global Latency</span>
            <span className="text-[#c39967]">14ms</span>
          </div>
          <div className="status-item hidden md:flex items-center gap-2.5">
            <span>Coordinates</span>
            <span className="text-[#a1a1aa]">24.8607° N, 67.0011° E</span>
          </div>
        </div>
      </div>
    </section>
  );
}