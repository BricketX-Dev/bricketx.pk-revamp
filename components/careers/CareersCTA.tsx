"use client";

import Link from "next/link";
import { ArrowRight, UserPlus, Mail } from "lucide-react";

export default function CareersCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C39967]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C39967] font-bold block mb-3">
          Build With Us
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-6">
          Ready To Join The Engine Room?
        </h2>
        <p className="text-sm md:text-base text-[#5E646D] font-normal max-w-xl mx-auto mb-10 leading-relaxed">
          Pick a department, or send us your work — we&apos;re always looking for people who build.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#open-roles"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#18181B] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-md hover:bg-[#C39967] hover:text-black transition-colors"
          >
            <UserPlus size={14} />
            <span>View Open Roles</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#E8EBED] hover:border-[#C39967] bg-white text-[#18181B] text-xs font-mono font-bold uppercase tracking-wider rounded-md shadow-xs transition-colors"
          >
            <Mail size={14} className="text-[#C39967]" />
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}