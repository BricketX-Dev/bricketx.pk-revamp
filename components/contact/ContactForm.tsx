"use client";

import { useState, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactForm() {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS">("IDLE");

  useGSAP(() => {
    gsap.fromTo(
      ".form-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: container });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("SUBMITTING");
    
    // Simulate payload transmission
    setTimeout(() => {
      setStatus("SUCCESS");
    }, 1500);
  };

  return (
    <section ref={container} className="py-24 md:py-32 bg-[#FAFBFD] text-[#18181B] border-b border-[#E8EBED]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-16">
          <h2 className="form-reveal text-3xl md:text-5xl font-extrabold tracking-tight text-[#18181B] mb-4">
            Send a <span className="text-[#C39967]">Secure Inquiry.</span>
          </h2>
          <p className="form-reveal text-sm md:text-base text-[#5E646D] font-normal max-w-lg mx-auto">
            All transmissions are routed directly to the Karachi engineering and operations desk for review.
          </p>
        </div>

        <div className="form-reveal relative bg-white rounded-3xl border border-[#E8EBED] p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
          {status === "SUCCESS" ? (
            <div className="flex flex-col items-center justify-center text-center py-16 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#18181B] mb-3">Payload Received</h3>
              <p className="text-[#5E646D] mb-8 max-w-sm">
                Your inquiry has been successfully routed to the hub. A specialist will parse your data and respond shortly.
              </p>
              <button 
                onClick={() => setStatus("IDLE")}
                className="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#18181B] border border-[#E8EBED] rounded-lg hover:bg-[#FAFBFD] transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`flex flex-col gap-8 transition-opacity duration-300 ${status === 'SUBMITTING' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A5ADB6]">
                    Full Name / Designation
                  </label>
                  <input 
                    required
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-[#E8EBED] focus:border-[#C39967] py-2.5 text-sm text-[#18181B] outline-none transition-colors placeholder:text-[#A5ADB6]/50"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A5ADB6]">
                    Email / Return Route
                  </label>
                  <input 
                    required
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-[#E8EBED] focus:border-[#C39967] py-2.5 text-sm text-[#18181B] outline-none transition-colors placeholder:text-[#A5ADB6]/50"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="subject" className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A5ADB6]">
                  Inquiry Category
                </label>
                <select 
                  id="subject"
                  className="w-full bg-transparent border-b border-[#E8EBED] focus:border-[#C39967] py-2.5 text-sm text-[#18181B] outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="partnership">System Partnership / Integration</option>
                  <option value="careers">Careers & Requisitions</option>
                  <option value="operations">Operational Audit</option>
                  <option value="other">General Comms</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="message" className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A5ADB6]">
                  Transmission Payload (Message)
                </label>
                <textarea 
                  required
                  id="message"
                  rows={5}
                  className="w-full bg-[#FAFBFD] border border-[#E8EBED] focus:border-[#C39967] p-4 text-sm text-[#18181B] outline-none transition-colors resize-none rounded-xl mt-2 placeholder:text-[#A5ADB6]/60"
                  placeholder="Input request details..."
                />
              </div>

              <div className="mt-4">
                <button 
                  type="submit"
                  disabled={status === "SUBMITTING"}
                  className="w-full group flex items-center justify-center gap-2 py-4 bg-[#18181B] hover:bg-[#C39967] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors duration-300 disabled:opacity-50"
                >
                  {status === "SUBMITTING" ? (
                    "Transmitting..."
                  ) : (
                    <>
                      Execute Transmission
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}