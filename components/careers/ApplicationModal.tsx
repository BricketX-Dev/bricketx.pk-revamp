"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Briefcase, X, UploadCloud, ChevronDown, ArrowUpRight, Check } from "lucide-react";

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
  
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync state if opened with a different department
  useEffect(() => {
    if (isOpen) {
      setSelectedDept(initialDeptId);
      setIsDropdownOpen(false); // Reset dropdown state on open
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

  // If not open and exit animation finished, render nothing
  if (!isOpen && !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Deep Frosted Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#0D0E12] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-zinc-800/80 flex flex-col overflow-hidden opacity-0"
      >
        {/* Subtle top gradient accent */}
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
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-800/50 hover:text-white transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:px-7 md:py-6 overflow-y-auto custom-scrollbar max-h-[85vh]">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            
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
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#C39967]' : 'text-zinc-500'}`} 
                  />
                </button>

                {/* Animated Dropdown Menu */}
                <div 
                  className={`absolute left-0 w-full mt-2 bg-[#0D0E12] border border-zinc-800 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 origin-top z-50
                    ${isDropdownOpen ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
                  `}
                >
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
                  type="text" 
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 text-sm focus:bg-zinc-900/80 focus:outline-none focus:ring-[3px] focus:ring-[#C39967]/15 focus:border-[#C39967] transition-[border-color,box-shadow,background-color] duration-300 ease-out"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-zinc-300">Email Address <span className="text-[#C39967]">*</span></label>
                <input 
                  type="email" 
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 text-sm focus:bg-zinc-900/80 focus:outline-none focus:ring-[3px] focus:ring-[#C39967]/15 focus:border-[#C39967] transition-[border-color,box-shadow,background-color] duration-300 ease-out"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5 z-10 relative">
              <label className="text-[13px] font-bold text-zinc-300">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 text-sm focus:bg-zinc-900/80 focus:outline-none focus:ring-[3px] focus:ring-[#C39967]/15 focus:border-[#C39967] transition-[border-color,box-shadow,background-color] duration-300 ease-out"
              />
            </div>

            {/* Resume Upload Dropzone */}
            <div className="flex flex-col gap-1.5 z-10 relative">
              <label className="text-[13px] font-bold text-zinc-300">Resume / CV <span className="text-[#C39967]">*</span></label>
              <label 
                className={`relative w-full border-2 rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer transition-[border-color,background-color] duration-300 group
                  ${fileName ? 'border-solid border-[#C39967]/40 bg-[#C39967]/5' : 'border-dashed border-zinc-800 hover:border-[#C39967]/60 bg-zinc-900/30 hover:bg-zinc-900/60'}
                `}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                
                {/* Dynamic Icon */}
                <div 
                  className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm
                    ${fileName ? 'bg-[#C39967] border-[#C39967] text-[#0D0E12] scale-100' : 'bg-[#0D0E12] border-zinc-800 text-[#C39967] group-hover:scale-110 group-hover:border-[#C39967]/50'}
                  `}
                >
                  {fileName ? <Check size={20} strokeWidth={3} /> : <UploadCloud size={20} />}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold mb-0.5 transition-colors duration-300 truncate
                    ${fileName ? 'text-[#C39967]' : 'text-white group-hover:text-[#C39967]'}
                  `}>
                    {fileName ? fileName : "Click to upload your resume"}
                  </p>
                  <p className="text-[11px] text-zinc-500">PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                {/* Styled Browse Button */}
                <div 
                  className={`hidden sm:flex items-center justify-center text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all duration-300
                    ${fileName ? 'bg-[#C39967]/10 border-[#C39967]/30 text-[#C39967] hover:bg-[#C39967]/20' : 'bg-[#0D0E12] border-zinc-800 text-zinc-400 group-hover:bg-[#C39967]/10 group-hover:border-[#C39967]/40 group-hover:text-[#C39967]'}
                  `}
                >
                  {fileName ? 'Change' : 'Browse'}
                </div>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4 mt-1 border-t border-zinc-800/80 z-10 relative">
              <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C39967] to-[#b88c5a] hover:from-white hover:to-zinc-200 text-[#0D0E12] font-extrabold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(195,153,103,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <span>Submit Application</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
              <p className="text-center text-[10px] text-zinc-500 mt-3 font-medium uppercase tracking-wider">
                End-to-End Encrypted & Confidential
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}