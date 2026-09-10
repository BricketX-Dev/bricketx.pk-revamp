"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // 1. Disable browser's automatic memory-based scroll restoration immediately
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // 2. Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
    });

    window.lenisInstance = lenis;

    let animationFrame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      delete window.lenisInstance;
    };
  }, []);

  // 3. Force top instantly on every route change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0, { immediate: true });
    }

    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0, { immediate: true });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}