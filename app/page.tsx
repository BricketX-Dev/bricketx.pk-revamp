import Hero from "@/components/Hero";
import OperationsHub from "@/components/OperationsHub";
import Departments from "@/components/Departments";
import WhatWeBuild from "@/components/WhatWeBuild";
import GlobalNetwork from "@/components/GlobalNetwork";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <OperationsHub />
      <Departments />
      <WhatWeBuild />
      <GlobalNetwork/>
    </main>
  );
}