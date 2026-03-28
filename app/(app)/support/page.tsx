"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does the Peer Matching algorithm calculate compatibility?",
    answer: "The matching engine runs a TF-IDF vector similarity across your 'Can Teach' and 'Want to Learn' tags against other active dossiers. We prioritize inverse tag matches (e.g., they want what you have, and you want what they have) while applying a slight gravity towards users with overlapping availability blocks."
  },
  {
    question: "Are Study Groups moderated or encrypted?",
    answer: "Both. Group communications are End-to-End Encrypted via the SkillEx Signal Protocol. Moderation is handled through a peer-review consensus model; anyone flagrant violation of the technical conduct code triggers an automatic review by Level 3 Archivists."
  },
  {
    question: "Can I extract my data from the platform?",
    answer: "Yes, fully. The 'Export Log' button on your Dashboard compiles all your interactions, notes, and generated Resumes into a JSON blob and bundled Markdown files. You always own your technical artifacts."
  },
  {
    question: "My API requests to the Integrated AI are failing.",
    answer: "Check your rate limits in the settings context menu. If you are querying complex architectural patterns repeatedly, the token bucket may run dry temporarily. It refuels completely every hour. If issues persist, verify your Archive Connection Status."
  }
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketStatus, setTicketStatus] = useState<"idle" | "sending" | "sent">("idle");

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <header className="sticky top-0 right-0 w-full bg-surface/80 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-2 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">Archive / System</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Support Protocols</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Help Terminal</h2>
        </div>
      </header>

      <div className="p-10 max-w-4xl mx-auto flex flex-col gap-12 pb-24">
        {/* Support Callout */}
        <div className="bg-[#0f1a2e] text-[#fffae4] border-[1.5px] border-[#0f1a2e] p-8 flex items-center justify-between shadow-[6px_6px_0px_0px_#d4930a]">
          <div>
            <h3 className="font-headline text-3xl font-bold italic mb-2">Need direct intervention?</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-80 max-w-lg">If the automated archives have failed to resolve your queries, transmit a manual ping to our system administrators.</p>
          </div>
          <button 
            onClick={() => { setTicketStatus("idle"); setShowTicketModal(true); }}
            className="bg-[#fffae4] text-[#0f1a2e] px-8 py-3 font-mono font-bold uppercase tracking-widest text-xs hover:bg-[#e8e3ce] transition-colors border-[1.5px] border-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Open Ticket
          </button>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-mono text-sm font-bold tracking-widest text-primary uppercase">Frequently Queried Logs</h3>
            <div className="flex-1 border-b-[1.5px] border-outline-variant"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-[1.5px] border-primary bg-white hard-shadow-sm overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-6 flex items-center justify-between bg-white hover:bg-surface-container-low transition-colors"
                >
                  <span className="font-headline text-lg font-bold text-primary">{faq.question}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-surface-tint' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div 
                  className={`px-6 border-t-[1.5px] border-outline-variant bg-surface-container overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 py-6 opacity-100' : 'max-h-0 py-0 opacity-0 border-transparent'}`}
                >
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTicketModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-surface border-[1.5px] border-primary max-w-lg w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowTicketModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Transmitting Ping</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Open a direct line to the SkillEx Archivist Team.</p>
            
            {ticketStatus === "sent" ? (
               <div className="py-12 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-[#4e6b52] text-6xl mb-4">check_circle</span>
                  <h4 className="font-mono text-sm uppercase tracking-widest font-bold text-[#0f1a2e] mb-2">Transmission Successful</h4>
                  <p className="font-body text-sm text-outline max-w-xs">Your log has been securely transmitted. An Archivist will respond to your connected network link shortly.</p>
                  <button onClick={() => setShowTicketModal(false)} className="mt-8 px-8 py-3 bg-[#d4930a] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:shadow-none transition-all">Acknowledge</button>
               </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => { 
                  e.preventDefault(); 
                  setTicketStatus("sending");
                  setTimeout(() => setTicketStatus("sent"), 1500);
               }}>
                <div className="flex flex-col relative">
                  <label className="font-mono text-[10px] uppercase text-outline mb-1">Log Category</label>
                  <select required className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
                    <option value="" disabled selected>Select category...</option>
                    <option value="tech">Engine // Technical Issue</option>
                    <option value="account">Network // Identity & Billing</option>
                    <option value="conduct">Protocol // Code of Conduct Violation</option>
                    <option value="other">Archive // General Inquiry</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-[26px] pointer-events-none text-outline">expand_more</span>
                </div>
                <div className="flex flex-col">
                  <label className="font-mono text-[10px] uppercase text-outline mb-1">Subject Header</label>
                  <input type="text" required placeholder="e.g. Export JSON corrupted" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="flex flex-col">
                  <label className="font-mono text-[10px] uppercase text-outline mb-1">Event Description</label>
                  <textarea required rows={4} className="border-[1.5px] border-outline bg-white font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-outline-variant" placeholder="Describe the anomaly or request in detail..."></textarea>
                </div>
                <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-outline-variant">
                  <button type="button" onClick={() => setShowTicketModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0f1a2e] hover:text-error transition-colors font-bold disabled:opacity-50" disabled={ticketStatus === "sending"}>Abort</button>
                  <button type="submit" disabled={ticketStatus === "sending"} className="bg-[#4e6b52] text-[#fffae4] border-[1.5px] border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:shadow-none transition-all flex justify-center items-center gap-2 font-bold disabled:opacity-80 disabled:cursor-not-allowed">
                    {ticketStatus === "sending" ? (
                        <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Compiling...</>
                    ) : (
                        <><span className="material-symbols-outlined text-sm">send</span> Transmit Ticket</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
