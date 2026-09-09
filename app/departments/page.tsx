import type { Metadata } from "next";
import DepartmentsStackSection from "@/components/departments/DepartmentsStackSection";
import PipelineFlow from "@/components/departments/PipelineFlow";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import DepartmentCTA from "@/components/departments/DepartmentCTA";
import DepartmentsHero from "@/components/departments/DepartmentHero";

export const metadata: Metadata = {
  title: "Departments // BricketX Pakistan",
  description: "Five teams, one engine room. The five operating departments powering the BricketX network from Karachi.",
};

const departmentsNav = [
  { num: "01", name: "Technology" },
  { num: "02", name: "Marketing" },
  { num: "03", name: "Operations" },
  { num: "04", name: "Creative" },
  { num: "05", name: "Production" },
];

export default function DepartmentsPage() {
  return (
    <main className="w-full bg-[#0a0a0b] min-h-screen">
      {/* 1. DARK: Vector Radar Hero Header */}
      <DepartmentsHero departments={departmentsNav} />

      {/* 2. LIGHT: Pinned Stacking Card Shift Section */}
      <DepartmentsStackSection />

      {/* 3. DARK: How They Connect (5-Step Pipeline) */}
      <PipelineFlow />

      {/* 4. LIGHT: Common Questions Accordion */}
      <DepartmentFAQ />

      {/* 5. DARK: Work With The Hub CTA */}
      <DepartmentCTA />
    </main>
  );
}