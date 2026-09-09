import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import PrinciplesScrub from "@/components/careers/PrinciplesScrub";
import StudioCulture from "@/components/careers/StudioCulture";
import DepartmentRequisitions from "@/components/careers/DepartmentRequisitions";
import CareersFAQ from "@/components/careers/CareersFAQ";
import CareersCTA from "@/components/careers/CareersCTA";

export const metadata: Metadata = {
  title: "Culture & Careers // BricketX Pakistan",
  description: "The people behind the engine room. How we think, our operating values, and open positions across eight core disciplines.",
};

export default function CareersPage() {
  return (
    <main className="w-full bg-[#0a0a0b] min-h-screen">
      {/* 1. DARK: People Behind The Engine Room Hero */}
      <CareersHero />

      {/* 2. LIGHT: 7 Principles Lateral Horizontal Scrub Track */}
      <PrinciplesScrub />

      {/* 3. DARK: Real People Real Work Studio Culture */}
      <StudioCulture />

      {/* 4. LIGHT: 8 Disciplines Requisition Directory */}
      <DepartmentRequisitions />

      {/* 5. DARK: Working Here Candidate FAQ */}
      <CareersFAQ />

      {/* 6. LIGHT: Ready To Join Conversion Gateway */}
      <CareersCTA />
    </main>
  );
}