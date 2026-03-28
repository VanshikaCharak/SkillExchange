"use client";

import { useState } from "react";

export default function RoadmapPage() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  return (
    <>
      <header className="sticky top-0 right-0 w-full bg-surface/80 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-2 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">Archive / Nav</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Interactive Roadmap</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Skill Roadmaps</h2>
        </div>
      </header>

      <div className="p-8 max-w-5xl mx-auto space-y-12">
        <div className="bg-white border-[1.5px] border-outline p-12 hard-shadow-sm flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-surface-container px-2 py-0.5 border border-outline/20 mb-4 inline-block">SYSTEM_PATH_01</span>
            <h3 className="font-serif text-4xl font-bold mb-4">Systems Architecture Focus</h3>
            <p className="font-body text-on-surface-variant leading-relaxed">Follow structured paths to learn complex system design, detailing every step from fundamentals of load balancing to advanced distributed database mastery.</p>
            
            <div className="mt-8 flex gap-4">
              <button onClick={() => setShowResumeModal(true)} className="bg-[#0f1a2e] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hard-shadow border border-[#0f1a2e] hover:bg-surface-tint hover:border-surface-tint transition-colors">Resume Path</button>
              <button onClick={() => setShowSyllabusModal(true)} className="bg-transparent text-[#0f1a2e] px-6 py-3 font-mono text-xs uppercase tracking-widest border border-[#0f1a2e] hover:bg-surface-container transition-colors">View Syllabus</button>
            </div>
          </div>
          
          <div className="w-64 h-64 border-2 border-dashed border-outline-variant rounded-full flex items-center justify-center shrink-0 relative bg-surface-bright">
            <span className="font-serif text-5xl italic text-surface-tint">64%</span>
            <div className="absolute font-mono text-[10px] bottom-8 uppercase text-outline">Path Completed</div>
          </div>
        </div>

        <div className="relative border-l-2 border-outline-variant ml-8 space-y-12 pb-12">
          {/* Phase 1 */}
          <div className="relative pl-12 group">
            <div className="absolute left-[-11px] top-1 w-5 h-5 bg-[#d4930a] border-2 border-white rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4930a] font-bold">Phase 01 — Completed</span>
            <h4 className="font-headline text-2xl font-bold mt-2">Network Fundamentals</h4>
            <div className="bg-surface border-[1.5px] border-outline p-6 mt-4 max-w-2xl text-sm text-on-surface-variant leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              Understanding TCP/IP, OSI model layers, basic routing protocols, and DNS resolution. Mastered via 5 interactive peer sessions.
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative pl-12 group">
            <div className="absolute left-[-11px] top-1 w-5 h-5 bg-[#4e6b52] border-2 border-white rounded-full shadow-[0_0_0_4px_rgba(78,107,82,0.2)]"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#4e6b52] font-bold animate-pulse">Phase 02 — In Progress</span>
            <h4 className="font-headline text-2xl font-bold mt-2">Distributed Computing Concepts</h4>
            <div className="bg-white border-[1.5px] border-outline border-l-4 border-l-[#4e6b52] p-6 mt-4 max-w-2xl text-sm text-on-surface-variant leading-relaxed hard-shadow-sm">
              <p className="mb-4">CAP theorem, event-driven architecture, and message queues (Kafka/RabbitMQ).</p>
              <div className="w-full bg-surface-container h-2 mt-4">
                <div className="bg-[#4e6b52] h-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative pl-12 group opacity-60">
            <div className="absolute left-[-9px] top-1 w-4 h-4 bg-outline-variant border-2 border-white rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-outline">Phase 03 — Locked</span>
            <h4 className="font-headline text-2xl font-bold mt-2">Data Replication & Sharding</h4>
            <div className="bg-surface border border-dashed border-outline-variant p-6 mt-4 max-w-2xl text-sm text-outline leading-relaxed bg-hatch">
              Requires completion of Phase 02 Distributed Computing module and one scheduled peer review session.
            </div>
          </div>
        </div>
      </div>
      {/* Modals for Roadmap Buttons */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-md w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowResumeModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Initialize Environment</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Booting up the interactive learning context for Distributed Computing Concepts...</p>
            <div className="bg-[#0f1a2e] text-[#fffae4] border-[1.5px] border-outline-variant p-4 font-mono text-[10px] mb-6 flex flex-col gap-2">
              <span className="flex items-center gap-2"><span className="text-[#4e6b52]">[OK]</span> LOADING KAFKA MODULE</span>
              <span className="flex items-center gap-2"><span className="text-[#4e6b52]">[OK]</span> SPINNING UP DOCKER CONTAINERS</span>
              <span className="flex items-center gap-2"><span className="text-secondary animate-pulse">Wait</span> ALLOCATING WORKSPACE</span>
            </div>
            <div className="flex justify-end gap-3 items-center mt-2">
              <button onClick={() => setShowResumeModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0f1a2e] hover:text-error transition-colors">Abort</button>
              <button onClick={() => setShowResumeModal(false)} className="bg-primary text-white border-[1.5px] border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2">
                 Enter Matrix <span className="material-symbols-outlined text-sm">login</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showSyllabusModal && (
        <>
          <div className="fixed inset-0 bg-[#0f1a2e]/40 backdrop-blur-md z-[90] animate-in fade-in" onClick={() => setShowSyllabusModal(false)}></div>
          <div className="fixed right-0 top-0 h-full w-[450px] max-w-full bg-surface border-l-[1.5px] border-primary shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.4)] z-[100] flex flex-col pt-12 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center pb-6 border-b-[1.5px] border-outline-variant px-8 mb-4">
              <h3 className="font-serif italic text-3xl text-primary">Syllabus Index</h3>
              <button onClick={() => setShowSyllabusModal(false)} className="material-symbols-outlined text-outline hover:text-error transition-colors">close</button>
            </div>
            
            <div className="overflow-y-auto p-8 pt-2 flex-1 space-y-6 custom-scrollbar">
               <div className="p-4 bg-surface border-[1.5px] border-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-70">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4930a] font-bold block mb-1">Module 1.1</span>
                  <h4 className="font-headline text-lg italic text-primary">OSI Model Refresher</h4>
                  <p className="font-mono text-[10px] uppercase text-outline mt-2">Status: Validated</p>
               </div>
               <div className="p-4 bg-surface border-[1.5px] border-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-70">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4930a] font-bold block mb-1">Module 1.2</span>
                  <h4 className="font-headline text-lg italic text-primary">TCP/IP Subnetting</h4>
                  <p className="font-mono text-[10px] uppercase text-outline mt-2">Status: Validated</p>
               </div>
               <div className="p-4 bg-surface border-[1.5px] border-primary border-l-[6px] border-l-[#4e6b52] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:bg-surface-container transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-full bg-[#4e6b52] opacity-5 bg-hatch pointer-events-none"></div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#4e6b52] font-bold block mb-1">Module 2.1 — Current</span>
                  <h4 className="font-headline text-lg italic text-primary group-hover:text-surface-tint transition-colors">Event-Driven Architecture</h4>
                  <p className="font-body text-xs text-on-surface-variant mt-2 leading-relaxed">Deconstructing monoliths through pub/sub design patterns.</p>
               </div>
               <div className="p-4 border-[1.5px] border-dashed border-outline-variant bg-surface-container-low opacity-60">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-outline block mb-1">Module 2.2</span>
                  <h4 className="font-headline text-lg italic text-outline">CAP Theorem & Isolation</h4>
                  <p className="font-mono text-[10px] uppercase text-outline mt-2">Status: Locked</p>
               </div>
            </div>

            <div className="p-8 border-t-[1.5px] border-outline-variant bg-surface-container-low mt-auto border-b">
              <button onClick={() => setShowSyllabusModal(false)} className="w-full py-3 border-[1.5px] border-primary flex justify-center items-center gap-2 font-mono text-xs uppercase tracking-widest hover:bg-surface-container font-bold text-primary active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 Close Syllabus
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
