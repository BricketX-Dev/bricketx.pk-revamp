"use client";

import { useState, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, Mail, MapPin, Activity, X } from "lucide-react";
import { submitLeadAction } from "@/app/actions/contact"; // Adjust path to where you saved the server action

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactForm() {
  const container = useRef<HTMLDivElement>(null);
  
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  
  // Strictly control the dropdown value
  const [selectedService, setSelectedService] = useState("partnership");

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
          start: "top 85%",
        },
      }
    );
  }, { scope: container });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const site_origin = window.location.origin || "bricketx.pk";

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Permissive global regex: accepts +, spaces, dashes, parentheses, and 7 to 20 digits
    const phoneRegex = /^\+?[0-9\s\-().]{7,20}$/;
    
    let currentErrors: { email?: string; phone?: string } = {};

    if (!emailRegex.test(email)) {
      currentErrors.email = "Please enter a valid email address.";
    }
    
    if (phone && !phoneRegex.test(phone)) {
      currentErrors.phone = "Invalid format.";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setStatus("SUBMITTING");

    try {
      // Execute the server action using the strict React state for service
      const result = await submitLeadAction({
        name,
        email,
        phone,
        service: selectedService, 
        message,
        site_origin
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setStatus("SUCCESS");
    } catch (error) {
      console.error("Transmission Error:", error);
      setStatus("ERROR");
      alert("Something went wrong while sending your message. Please try again.");
    }
  };

  return (
    <section ref={container} className="relative pb-24 md:pb-36 bg-[#050505] text-[#f4f4f5] overflow-hidden">
      
      {/* Background Continuation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Official Coordinates & Directory */}
          <div className="lg:col-span-4 flex flex-col gap-6 form-reveal">
            
            {/* Location Pane */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 transition-colors group-hover:bg-[#C39967]" />
              
              <div className="flex items-center justify-between mb-10">
                <div className="w-10 h-10 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[#C39967]">
                  <MapPin size={18} />
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  HQ ONLINE
                </span>
              </div>
              
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                  Primary Node // Location
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  Karachi, Pakistan
                </h3>
                <p className="text-sm text-zinc-400 font-light">
                  Central Operations &amp; Engineering Hub
                </p>
              </div>
            </div>

            {/* Comms Pane */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 transition-colors group-hover:bg-[#C39967]" />
              
              <div className="flex items-center justify-between mb-10">
                <div className="w-10 h-10 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[#C39967]">
                  <Mail size={18} />
                </div>
              </div>
              
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#C39967] transition-colors">
                  Info@bricketx.pk
                </h3>
                <p className="text-sm text-zinc-400 font-light">
                  Monitored 24/7 by the internal desk.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Institutional Input Form */}
          <div className="lg:col-span-8 form-reveal">
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              
              {/* Subtle top inner gradient line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C39967]/30 to-transparent" />

              {status === "SUCCESS" ? (
                // Premium Golden Success State
                <div className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
                  <div className="w-24 h-24 bg-zinc-950/50 rounded-full border border-[#C39967]/30 flex items-center justify-center mb-8 relative shadow-[0_0_40px_-10px_rgba(195,153,103,0.3)]">
                    {/* Layered expanding radar pulses */}
                    <div className="absolute inset-0 rounded-full border border-[#C39967]/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
                    <div className="absolute inset-2 rounded-full border border-[#C39967]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-20" />
                    {/* Core Icon container */}
                    <div className="w-16 h-16 bg-[#C39967]/10 rounded-full flex items-center justify-center border border-[#C39967]/50 backdrop-blur-sm">
                      <CheckCircle2 size={32} className="text-[#C39967] drop-shadow-[0_0_10px_rgba(195,153,103,0.8)]" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Message Sent Successfully</h3>
                  <p className="text-zinc-400 font-normal text-sm md:text-base mb-10 max-w-md leading-relaxed">
                    Thank you for reaching out. We have received your details and our team will get back to you shortly.
                  </p>
                  
                  <button 
                    onClick={() => {
                      setStatus("IDLE");
                      setSelectedService("partnership");
                    }}
                    className="group relative px-8 py-3.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#C39967] border border-[#C39967]/30 bg-[#C39967]/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#C39967] hover:bg-[#C39967]/10 hover:shadow-[0_0_20px_rgba(195,153,103,0.2)]"
                  >
                    <span className="relative z-10">Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={`flex flex-col gap-8 transition-all duration-300 ${status === 'SUBMITTING' ? 'opacity-40 pointer-events-none scale-[0.98]' : 'opacity-100'}`}>
                  
                  {/* Form Header */}
                  <div className="flex items-center gap-2 pb-4 mb-2 border-b border-zinc-800/50">
                    <Activity size={14} className="text-[#C39967]" />
                    <span className="text-[11px] font-mono font-bold uppercase text-zinc-300 tracking-widest">
                      Send a Message
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 relative group focus-within:text-[#C39967]">
                      <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 transition-colors group-focus-within:text-[#C39967]">
                        Full Name <span className="text-[#C39967]">*</span>
                      </label>
                      <input 
                        required
                        type="text" 
                        id="name"
                        name="name" 
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#C39967] focus:ring-1 focus:ring-[#C39967]/20 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="flex flex-col gap-2 relative group focus-within:text-[#C39967]">
                      <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 transition-colors group-focus-within:text-[#C39967]">
                        Email Address <span className="text-[#C39967]">*</span>
                      </label>
                      <input 
                        required
                        type="email" 
                        id="email"
                        name="email"
                        className={`w-full bg-zinc-900 border focus:ring-1 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 ${errors.email ? 'border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:border-[#C39967] focus:ring-[#C39967]/20'}`}
                        placeholder="jane@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-start gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 px-1">
                          <span className="mt-0.5 text-red-400 shrink-0"><X size={12} strokeWidth={2.5} /></span>
                          <span className="text-[11.5px] text-red-400/90 font-medium leading-tight">
                            {errors.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 relative group focus-within:text-[#C39967]">
                      <label htmlFor="phone" className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 transition-colors group-focus-within:text-[#C39967]">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        className={`w-full bg-zinc-900 border focus:ring-1 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 ${errors.phone ? 'border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:border-[#C39967] focus:ring-[#C39967]/20'}`}
                        placeholder="0300 1234567"
                      />
                      {errors.phone && (
                        <div className="flex items-start gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 px-1">
                          <span className="mt-0.5 text-red-400 shrink-0"><X size={12} strokeWidth={2.5} /></span>
                          <span className="text-[11.5px] text-red-400/90 font-medium leading-tight">
                            Invalid format. E.g., <span className="font-mono text-red-300 tracking-wide bg-red-500/10 px-1 py-0.5 rounded">03XX XXXXXXX</span> or <span className="font-mono text-red-300 tracking-wide bg-red-500/10 px-1 py-0.5 rounded">+92 3XX XXXXXXX</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 relative group focus-within:text-[#C39967]">
                      <label htmlFor="subject" className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 transition-colors group-focus-within:text-[#C39967]">
                        Inquiry Type
                      </label>
                      {/* React Controlled Component applied here */}
                      <select 
                        id="subject"
                        name="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#C39967] focus:ring-1 focus:ring-[#C39967]/20 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option className="bg-zinc-900" value="partnership">System Integration / Partnership</option>
                        <option className="bg-zinc-900" value="careers">Careers & Engineering Requisitions</option>
                        <option className="bg-zinc-900" value="operations">Institutional Audit / Compliance</option>
                        <option className="bg-zinc-900" value="other">General Operational Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative group focus-within:text-[#C39967]">
                    <label htmlFor="message" className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 transition-colors group-focus-within:text-[#C39967]">
                      Message Details <span className="text-[#C39967]">*</span>
                    </label>
                    <textarea 
                      required
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#C39967] focus:ring-1 focus:ring-[#C39967]/20 rounded-lg p-4 text-sm text-white outline-none transition-all resize-none placeholder:text-zinc-600"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="mt-4">
                    <button 
                      type="submit"
                      disabled={status === "SUBMITTING"}
                      className="w-full group flex items-center justify-center gap-3 py-4 bg-[#C39967] hover:bg-white text-black text-xs font-mono font-extrabold uppercase tracking-widest rounded-lg transition-colors duration-300 disabled:opacity-50"
                    >
                      {status === "SUBMITTING" ? (
                        "Sending..."
                      ) : (
                        <>
                          Submit Message
                          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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