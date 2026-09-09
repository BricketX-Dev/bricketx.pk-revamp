"use client";

import { useState, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS">("IDLE");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      ".contact-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    )
    .fromTo(
      ".contact-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" },
      "-=0.6"
    );
  }, { scope: containerRef });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("SUBMITTING");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("SUCCESS");
    }, 1500);
  };

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      className="relative w-full py-28 md:py-36 bg-[#FAFBFD] text-[#18181B] border-t border-[#E8EBED] overflow-hidden"
    >
      {/* Subtle Background Grid for Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8EBED_1px,transparent_1px),linear-gradient(to_bottom,#E8EBED_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Minimalist Typography */}
          <div className="flex flex-col">
            <div className="contact-reveal inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-md border border-[#E8EBED] bg-white text-xs font-mono font-bold text-[#5E646D] uppercase tracking-widest shadow-sm w-fit">
              <Mail size={14} className="text-[#C39967]" />
              Connect
            </div>
            
            <h2 className="contact-reveal text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] mb-6 leading-[1.1]">
              Let's build <br />
              <span className="text-[#C39967]">something scaleable.</span>
            </h2>
            
            <p className="contact-reveal text-base text-[#5E646D] font-normal leading-relaxed max-w-md mb-12">
              Whether you need to discuss institutional infrastructure, inquire about open roles, or explore partnership opportunities—our engineering team is ready to connect.
            </p>

            <div className="contact-reveal flex flex-col gap-6 font-mono text-sm text-[#5E646D]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E8EBED] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin size={16} className="text-[#C39967]" />
                </div>
                <div className="pt-2">
                  <span className="block font-bold text-[#18181B] mb-1">Karachi Engine Room</span>
                  Sindh, Pakistan (UTC+5)
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E8EBED] flex items-center justify-center shrink-0 shadow-sm">
                  <Mail size={16} className="text-[#C39967]" />
                </div>
                <div className="pt-2">
                  <span className="block font-bold text-[#18181B] mb-1">Direct Inquiries</span>
                  contact@bricketx.com
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form */}
          <div className="contact-card relative">
            <div className="bg-white rounded-3xl border border-[#E8EBED] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
              
              {status === "SUCCESS" ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#18181B] mb-3">Message Received</h3>
                  <p className="text-[#5E646D] mb-8 max-w-xs">
                    Thank you for reaching out. A member of our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus("IDLE")}
                    className="px-6 py-2.5 text-sm font-semibold text-[#18181B] border border-[#E8EBED] rounded-lg hover:bg-[#FAFBFD] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className={`flex flex-col gap-8 transition-opacity duration-300 ${status === 'SUBMITTING' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                >
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#A5ADB6]">
                      Full Name
                    </label>
                    <input 
                      required
                      type="text" 
                      id="name"
                      className="w-full bg-transparent border-b border-[#E8EBED] focus:border-[#C39967] py-2 text-[#18181B] outline-none transition-colors placeholder:text-[#A5ADB6]/50"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#A5ADB6]">
                      Email Address
                    </label>
                    <input 
                      required
                      type="email" 
                      id="email"
                      className="w-full bg-transparent border-b border-[#E8EBED] focus:border-[#C39967] py-2 text-[#18181B] outline-none transition-colors placeholder:text-[#A5ADB6]/50"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#A5ADB6]">
                      Project Details / Message
                    </label>
                    <textarea 
                      required
                      id="message"
                      rows={4}
                      className="w-full bg-[#FAFBFD] border border-[#E8EBED] focus:border-[#C39967] p-4 text-[#18181B] outline-none transition-colors resize-none rounded-xl mt-2 placeholder:text-[#A5ADB6]/60"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="mt-2">
                    <button 
                      type="submit"
                      disabled={status === "SUBMITTING"}
                      className="w-full group flex items-center justify-center gap-2 py-4 bg-[#18181B] hover:bg-[#C39967] text-white text-sm font-semibold rounded-xl transition-colors duration-300 disabled:opacity-50"
                    >
                      {status === "SUBMITTING" ? (
                        "Sending..."
                      ) : (
                        <>
                          Submit Inquiry
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}