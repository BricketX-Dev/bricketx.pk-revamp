"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast quickTo for pinpoint dot (instant 1:1 feel)
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    // Smooth quickTo for the trailing glass ring
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      // Show cursor elements once user moves inside the window
      if (dot.style.opacity === "0" || !dot.style.opacity) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: isHovering ? 1.6 : 1, duration: 0.2 });
    };

    const onMouseEnterInteractive = () => {
      isHovering = true;
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "#C39967",
        backgroundColor: "rgba(195, 153, 103, 0.08)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 0.5, backgroundColor: "#C39967", duration: 0.2 });
    };

    const onMouseLeaveInteractive = () => {
      isHovering = false;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.35)",
        backgroundColor: "transparent",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 1, backgroundColor: "#FFFFFF", duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Attach listeners to buttons, links, and cards
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, .system-card, .matrix-card, .bento-card"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* 1. Pinpoint Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white z-[9999] opacity-0 will-change-transform"
      />

      {/* 2. Trailing Glass / Reticle Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/30 z-[9998] opacity-0 will-change-transform backdrop-blur-[0.5px]"
      />
    </>
  );
}