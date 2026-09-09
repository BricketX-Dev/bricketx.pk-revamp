import Hero from "@/components/Hero";
import OperationsHub from "@/components/OperationsHub";
import Departments from "@/components/Departments";
import WhatWeBuild from "@/components/WhatWeBuild";
import GlobalNetwork from "@/components/GlobalNetwork";
import Company from "@/components/Company";
import Careers from "@/components/Careers";
import ContactTerminal from "@/components/ContactTerminal";

export default function Home() {
  return (
    <main className="w-full bg-[#0a0a0b] selection:bg-[#C39967] selection:text-black">
      {/* 1. Dark: Cinematic Opening */}
      <Hero />

      {/* 2. Dark: Operations Command & Metrics */}
      <OperationsHub />

      {/* 3. Dark: Core Departmental Stacks */}
      <Departments />

      {/* 4. Dark: Systems 3-Card Carousel */}
      <WhatWeBuild />

      {/* 5. Light (Contrast Break 1): Global Network & Cross-Border Mesh */}
      <GlobalNetwork />

      {/* 6. Dark: The Company & Institutional DNA */}
      <Company />

      {/* 7. Dark: Engineering Culture & Open Requisitions */}
      <Careers />

      {/* 8. Light (Contrast Break 2): Minimalist Inquiry Gateway */}
      <ContactTerminal/>
      {/* 9. Dark: Terminal Footer */}
    </main>
  );
}