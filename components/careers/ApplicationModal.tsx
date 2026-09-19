"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { Briefcase, X, UploadCloud, ChevronDown, ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import { submitApplicationAction } from "@/app/actions/application"; // Adjust path if needed

interface Discipline {
  id: string;
  name: string;
  tag: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDeptId: string;
  disciplines: Discipline[];
}

export default function ApplicationModal({ isOpen, onClose, initialDeptId, disciplines }: ApplicationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [selectedDept, setSelectedDept] = useState(initialDeptId);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errors, setErrors] = useState<{ email?: string; phone?: string; file?: string }>({});

  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync state if opened with a different department
  useEffect(() => {
    if (isOpen) {
      setSelectedDept(initialDeptId);
      setIsDropdownOpen(false);
      setStatus("IDLE");
      setFileName(null);
      setErrors({});
    }
  }, [isOpen, initialDeptId]);

  // Handle Entrance & Exit Animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      
      requestAnimationFrame(() => {
        if (backdropRef.current && modalRef.current) {
          gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
          gsap.fromTo(
            modalRef.current,
            { y: 20, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" } 
          );
        }
      });
    } else if (isVisible) {
      document.body.style.overflow = "auto";
      
      if (backdropRef.current && modalRef.current) {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: "power3.in" });
        gsap.to(modalRef.current, {
          y: 15, opacity: 0, scale: 0.97, duration: 0.2, ease: "power3.in",
          onComplete: () => {
            setIsVisible(false);
            setFileName(null);
            setIsDropdownOpen(false);
            setStatus("IDLE");
            setErrors({});
          }
        });
      }
    }
  }, [isOpen, isVisible]);

  // Handle Click Outside for Custom Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("resume") as File;
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/;
    
    let currentErrors: { email?: string; phone?: string; file?: string } = {};

    if (!emailRegex.test(email)) currentErrors.email = "Invalid email format.";
    if (phone && !phoneRegex.test(phone)) currentErrors.phone = "Invalid phone format.";
    
    if (!file || file.size === 0) {
      currentErrors.file = "Please upload a resume.";
    } else if (file.size > 5 * 1024 * 1024) {
      currentErrors.file = "File exceeds the 5MB maximum limit.";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setStatus("SUBMITTING");

    const selectedDiscipline = disciplines.find(d => d.id === selectedDept);
    const departmentName = selectedDiscipline ? selectedDiscipline.name : selectedDept;

    formData.append("department_id", selectedDept);
    formData.append("department_name", departmentName);

    try {
      const result = await submitApplicationAction(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      setStatus("SUCCESS");
    } catch (error) {
      console.error("Application Error:", error);
      setStatus("ERROR");
      alert("Transmission failed. Please try again.");
    }
  };

  // Determine if submit should be locked out (submitting or valid file error)
  const isSubmitLocked = status === "SUBMITTING" || (fileName !== null && errors.file !== undefined);

  if (!isOpen && !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div ref={backdropRef} className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0" onClick={onClose} />

      <div ref={modalRef} className="relative w-full max-w-2xl bg-[#0D0E12] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-zinc-800/80 flex flex-col overflow-hidden opacity-0 min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C39967]/50 to-transparent opacity-50" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 md:px-7 md:py-5 border-b border-zinc-800/80 bg-[#0D0E12] z-20 relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C39967]/10 border border-[#C39967]/20 flex items-center justify-center text-[#C39967] shadow-[0_0_15px_rgba(195,153,103,0.15)]">
              <Briefcase size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-[#C39967]">
                Apply To BricketX
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5 tracking-wider uppercase">Confidential Requisition</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-800/50 hover:text-white transition-all duration-200">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:px-7 md:py-6 overflow-y-auto custom-scrollbar flex-1 flex flex-col justify-center">
          
          {status === "SUCCESS" ? (
             // Premium Golden Success State
             <div className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
               <div className="w-24 h-24 bg-zinc-950/50 rounded-full border border-[#C39967]/30 flex items-center justify-center mb-8 relative shadow-[0_0_40px_-10px_rgba(195,153,103,0.3)]">
                 <div className="absolute inset-0 rounded-full border border-[#C39967]/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
                 <div className="absolute inset-2 rounded-full border border-[#C39967]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-20" />
                 <div className="w-16 h-16 bg-[#C39967]/10 rounded-full flex items-center justify-center border border-[#C39967]/50 backdrop-blur-sm">
                   <CheckCircle2 size={32} className="text-[#C39967] drop-shadow-[0_0_10px_rgba(195,153,103,0.8)]" />
                 </div>
               </div>
               
               <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Application Secured</h3>
               <p className="text-zinc-400 font-normal text-sm md:text-base mb-10 max-w-md leading-relaxed">
                 Your resume and details have been encrypted and submitted to our hiring operations desk.
               </p>
               
               <button 
                 onClick={onClose}
                 className="group relative px-8 py-3.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#C39967] border border-[#C39967]/30 bg-[#C39967]/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#C39967] hover:bg-[#C39967]/10 hover:shadow-[0_0_20px_rgba(195,153,103,0.2)]"
               >
                 <span className="relative z-10">Close Terminal</span>
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className={`flex flex-col gap-5 transition-all duration-300 ${status === 'SUBMITTING' ? 'opacity-40 pointer-events-none scale-[0.98]' : 'opacity-100'}`}>
              
              {/* Custom Department Dropdown */}
              <div className="flex flex-col gap-1.5 z-30">
                <label className="text-[13px] font-bold text-zinc-300">Target Department <span className="text-[#C39967]">*</span></label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-zinc-900/40 font-medium text-sm transition-[border-color,box-shadow,background-color] duration-300 ease-out
                      ${isDropdownOpen ? 'border-[#C39967] ring-[3px] ring-[#C39967]/15 bg-zinc-900/80 text-white' : 'border-zinc-800 text-white hover:border-zinc-700 hover:bg-zinc-900/60'}
                    `}
                  >
                    <span>{disciplines.find(d => d.id === selectedDept)?.name}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#C39967]' : 'text-zinc-500'}`} />
                  </button>

                  <div className={`absolute left-0 w-full mt-2 bg-[#0D0E12] border border-zinc-800 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 origin-top z-50
                    ${isDropdownOpen ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
                  `}>
                    <div className="p-1.5 flex flex-col gap-0.5">
                      {disciplines.map(d => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setSelectedDept(d.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-sm rounded-lg transition-colors duration-200 flex items-center justify-between group
                            ${selectedDept === d.id ? 'bg-[#C39967]/15 text-[#C39967] font-bold' : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'}
                          `}
                        >
                          <span>{d.name}</span>
                          {selectedDept === d.id && <Check size={16} strokeWidth={2.5} className="text-[#C39967]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 z-10 relative">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-zinc-300">Full Name <span className="text-[#C39967]">*</span></label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 text-sm focus:bg-zinc-900/80 focus:outline-none focus:ring-[3px] focus:ring-[#C39967]/15 focus:border-[#C39967] transition-[border-color,box-shadow,background-color] duration-300 ease-out"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-zinc-300">Email Address <span className="text-[#C39967]">*</span></label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    placeholder="jane@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-zinc-900/40 text-white placeholder-zinc-600 text-sm focus:bg-zinc-900/80 focus:outline-none focus:ring-[3px] transition-[border-color,box-shadow,background-color] duration-300 ease-out
                      ${errors.email ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' : 'border-zinc-800 focus:ring-[#C39967]/15 focus:border-[#C39967]'}
                    `}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 z-10 relative">
                <label className="text-[13px] font-bold text-zinc-300">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 rounded-xl border bg-zinc-900/40 text-white placeholder-zinc-600 text-sm focus:bg-zinc-900/80 focus:outline-none focus:ring-[3px] transition-[border-color,box-shadow,background-color] duration-300 ease-out
                    ${errors.phone ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' : 'border-zinc-800 focus:ring-[#C39967]/15 focus:border-[#C39967]'}
                  `}
                />
              </div>

              {/* Resume Upload Dropzone */}
              <div className="flex flex-col gap-1.5 z-10 relative">
                <label className="text-[13px] font-bold text-zinc-300">Resume / CV <span className="text-[#C39967]">*</span></label>
                <label 
                  className={`relative w-full border-2 rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer transition-[border-color,background-color] duration-300 group
                    ${errors.file ? 'border-solid border-red-500/50 bg-red-500/5' : fileName ? 'border-solid border-[#C39967]/40 bg-[#C39967]/5' : 'border-dashed border-zinc-800 hover:border-[#C39967]/60 bg-zinc-900/30 hover:bg-zinc-900/60'}
                  `}
                >
                  <input 
                    type="file" 
                    name="resume"
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setFileName(file.name);
                        
                        // Instant Client-Side Size Validation
                        if (file.size > 5 * 1024 * 1024) {
                          setErrors(prev => ({...prev, file: "File exceeds the 5MB maximum limit."}));
                        } else {
                          setErrors(prev => ({...prev, file: undefined}));
                        }
                      }
                    }}
                  />
                  
                  <div className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm
                      ${errors.file ? 'bg-red-500/10 border-red-500/30 text-red-400' : fileName ? 'bg-[#C39967] border-[#C39967] text-[#0D0E12] scale-100' : 'bg-[#0D0E12] border-zinc-800 text-[#C39967] group-hover:scale-110 group-hover:border-[#C39967]/50'}
                    `}>
                    {errors.file ? <X size={20} strokeWidth={3} /> : fileName ? <Check size={20} strokeWidth={3} /> : <UploadCloud size={20} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold mb-0.5 transition-colors duration-300 truncate
                      ${errors.file ? 'text-red-400' : fileName ? 'text-[#C39967]' : 'text-white group-hover:text-[#C39967]'}
                    `}>
                      {fileName ? fileName : "Click to upload your resume"}
                    </p>
                    <p className={`text-[11px] transition-colors ${errors.file ? 'text-red-400/80 font-medium' : 'text-zinc-500'}`}>
                      {errors.file && fileName ? "Size Limit Exceeded" : "PDF, DOC, DOCX (Max 5MB)"}
                    </p>
                  </div>

                  <div className={`hidden sm:flex items-center justify-center text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all duration-300
                      ${errors.file ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : fileName ? 'bg-[#C39967]/10 border-[#C39967]/30 text-[#C39967] hover:bg-[#C39967]/20' : 'bg-[#0D0E12] border-zinc-800 text-zinc-400 group-hover:bg-[#C39967]/10 group-hover:border-[#C39967]/40 group-hover:text-[#C39967]'}
                    `}>
                    {fileName ? 'Change' : 'Browse'}
                  </div>
                </label>
                
                {/* Dynamic Error Message beneath Dropzone */}
                {errors.file && (
                  <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                    <X size={12} className="shrink-0" />
                    {errors.file}
                  </span>
                )}
              </div>

              {/* Submit Action */}
              <div className="pt-4 mt-1 border-t border-zinc-800/80 z-10 relative">
                <button 
                  disabled={isSubmitLocked}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group
                    ${isSubmitLocked 
                      ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#C39967] to-[#b88c5a] hover:from-white hover:to-zinc-200 text-[#0D0E12] shadow-[0_0_20px_rgba(195,153,103,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                    }
                  `}
                >
                  <span>{status === "SUBMITTING" ? "Transmitting..." : "Submit Application"}</span>
                  {!isSubmitLocked && (
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  )}
                </button>
                <p className="text-center text-[10px] text-zinc-500 mt-3 font-medium uppercase tracking-wider">
                  End-to-End Encrypted & Confidential
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}