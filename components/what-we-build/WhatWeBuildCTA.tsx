"use client";

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function WhatWeBuildCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0b] text-white border-t border-zinc-800/80 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#C39967]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C39967] font-bold block mb-3">
          Build With The Hub
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Systems That Run The Network
        </h2>
        <p className="text-sm md:text-base text-zinc-400 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          See how the BricketX hub can build and run the infrastructure behind your ecosystem.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black text-xs font-mono font-bold uppercase tracking-wider rounded-md hover:bg-zinc-200 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/departments"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-zinc-700 hover:border-[#C39967] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-md bg-zinc-900/50 backdrop-blur-md transition-colors"
          >
            <Layers size={14} className="text-[#C39967]" />
            <span>See the Departments</span>
          </Link>
        </div>
      </div>
    </section>
  );
}