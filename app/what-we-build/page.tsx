import type { Metadata } from "next";
import WhatWeBuildHero from "@/components/what-we-build/WhatWeBuildHero";
import SystemsCatalogSection from "@/components/what-we-build/SystemsCatalogSection";
import HowWeBuildTimeline from "@/components/what-we-build/HowWeBuildTimeline";
import WhatWeBuildFAQ from "@/components/what-we-build/WhatWeBuildFAQ";
import WhatWeBuildCTA from "@/components/what-we-build/WhatWeBuildCTA";

export const metadata: Metadata = {
  title: "What We Build // BricketX Pakistan",
  description: "Not Services. Systems. 10 core systems built in-house and maintained 24/7 by the Karachi engine room.",
};

export default function WhatWeBuildPage() {
  return (
    <main className="w-full bg-[#0a0a0b] min-h-screen">
      {/* 1. DARK: Systems Portfolio Hero */}
      <WhatWeBuildHero />

      {/* 2. LIGHT: 10 Systems Deployed Matrix */}
      <SystemsCatalogSection />

      {/* 3. DARK: From Idea To Shipped System Timeline */}
      <HowWeBuildTimeline />

      {/* 4. LIGHT: What We Build FAQ */}
      <WhatWeBuildFAQ />

      {/* 5. DARK: Build With The Hub CTA */}
      <WhatWeBuildCTA />
    </main>
  );
}