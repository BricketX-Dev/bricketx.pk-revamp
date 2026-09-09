"use client";

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function CompanyCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C39967]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C39967] font-bold block mb-3">
          Get Closer
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-6">
          See How The Network Runs
        </h2>
        <p className="text-sm md:text-base text-[#5E646D] font-normal max-w-xl mx-auto mb-10 leading-relaxed">
          Explore the departments and systems behind BricketX — or get in touch with the hub.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#18181B] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-md hover:bg-[#C39967] hover:text-black transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/departments"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#E8EBED] hover:border-[#C39967] bg-white text-[#18181B] text-xs font-mono font-bold uppercase tracking-wider rounded-md shadow-xs transition-colors"
          >
            <Layers size={14} className="text-[#C39967]" />
            <span>See the Departments</span>
          </Link>
        </div>
      </div>
    </section>
  );
}