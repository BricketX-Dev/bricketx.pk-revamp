import type { Metadata } from "next";
import CompanyHero from "@/components/company/CompanyHero";
import CompanyPillarsSection from "@/components/company/CompanyPillarsSection";
import GlobalStructureSection from "@/components/company/GlobalStructureSection";
import OperatingModelSection from "@/components/company/OperatingModelSection";
import CompanyFAQ from "@/components/company/CompanyFAQ";
import CompanyCTA from "@/components/company/CompanyCTA";

export const metadata: Metadata = {
  title: "The Company // BricketX Pakistan",
  description: "The engine behind the network. The structure, operating model, and global presence of BricketX.",
};

export default function CompanyPage() {
  return (
    <main className="w-full bg-[#0a0a0b] min-h-screen">
      {/* 1. DARK: Company Vision & Narrative Hero */}
      <CompanyHero />

      {/* 2. LIGHT: Four Pillars Matrix */}
      <CompanyPillarsSection />

      {/* 3. DARK: Four Regions Global Structure */}
      <GlobalStructureSection />

      {/* 4. LIGHT: Idea To Scale Operating Model */}
      <OperatingModelSection />

      {/* 5. DARK: Institutional FAQ Ledger */}
      <CompanyFAQ />

      {/* 6. LIGHT: Get Closer CTA Gateway */}
      <CompanyCTA />
    </main>
  );
}  