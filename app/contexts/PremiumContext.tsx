"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  openUpgradeModal: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: ReactNode }) {
  // TODO: Replace with Supabase user profile check
  // supabase.from('profiles').select('is_premium').eq('id', user.id)
  const [isPremium, setIsPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openUpgradeModal = () => setShowModal(true);

  return (
    <PremiumContext.Provider value={{ isPremium, openUpgradeModal }}>
      {children}
      
      {showModal && !isPremium && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 z-[200] flex items-center justify-center p-4">
          <div className="bg-[#f2edd8] border-[2px] border-[#0f1a2e] p-10 max-w-xl w-full shadow-[12px_12px_0px_0px_rgba(15,26,46,1)] relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#0f1a2e] hover:text-[#d4930a] transition-colors material-symbols-outlined font-bold text-2xl">close</button>
            <h3 className="font-serif italic text-4xl text-[#0f1a2e] mb-2 leading-tight">Unlock SkillEx Premium</h3>
            <p className="font-body text-base text-[#0f1a2e]/80 mb-8 border-b-2 border-[#0f1a2e]/20 pb-6">Elevate your technical journey with unlimited mentor access, full mock interviews, and unrestricted PDF resume exports.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-5 font-mono text-sm text-[#0f1a2e]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#d4930a]">check</span>
                  <span className="leading-snug">Export unlimited resumes as PDF</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#d4930a]">check</span>
                  <span className="leading-snug">Access all premium resources and guides</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#d4930a]">check</span>
                  <span className="leading-snug">Priority peer matching</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#d4930a]">check</span>
                  <span className="leading-snug">Unlimited AI assistant queries</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full relative bg-transparent border-[1.5px] border-[#0f1a2e] hover:bg-surface-tint hover:border-surface-tint p-5 text-left transition-colors group">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0f1a2e] font-bold block mb-1">Monthly</span>
                  <span className="font-mono text-2xl font-bold text-[#0f1a2e]">₹299 <span className="text-sm font-normal text-[#0f1a2e]/70">/month</span></span>
                </button>
                <button className="w-full relative bg-[#d4930a]/10 border-[1.5px] border-[#d4930a] p-5 text-left transition-colors overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#d4930a] text-[#0f1a2e] font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 border-b-[1.5px] border-l-[1.5px] border-[#d4930a]">Save 30%</div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold block mb-1">Yearly</span>
                  <span className="font-mono text-2xl font-bold text-[#0f1a2e]">₹2499 <span className="text-sm font-normal text-[#0f1a2e]/70">/year</span></span>
                </button>
              </div>
            </div>

            <div className="pt-6 flex flex-col items-center gap-3">
              <button 
                onClick={() => { setIsPremium(true); setShowModal(false); }} 
                className="w-full bg-[#d4930a] text-[#0f1a2e] border-[1.5px] border-[#0f1a2e] px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#b07804]"
              >
                Continue to Payment
              </button>
              <span className="font-mono text-[10px] uppercase text-[#0f1a2e]/50 tracking-widest mt-2">Cancel anytime. No hidden charges.</span>
            </div>
          </div>
        </div>
      )}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
}
