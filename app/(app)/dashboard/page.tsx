"use client";

import Link from "next/link";
import { useState } from "react";
import { usePremium } from "../../contexts/PremiumContext";

export default function DashboardPage() {
  const { isPremium } = usePremium();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  return (
    <>
      {/* TOP APP BAR */}
      <header className="sticky top-0 right-0 w-full bg-[#fffae4] border-b-[1.5px] border-[#75777d] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] z-40 flex flex-col justify-end items-start pt-6 pb-2 px-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-xl font-bold text-[#0f1a2e]">SKILLEX</span>
            <nav className="flex gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold">DASHBOARD</span>
              <a className="font-mono text-xs uppercase tracking-widest text-[#75777d] hover:text-[#d4930a] underline decoration-1 underline-offset-4" href="#">LOGBOOK</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[#0f1a2e] hover:text-[#d4930a] transition-colors translate-y-[1px]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button onClick={() => setShowProfileDrawer(true)} className="flex items-center gap-2 border-l border-[#75777d] pl-6 hover:bg-surface-container px-2 py-1 transition-colors group cursor-pointer outline-none">
              <span className="font-mono text-[10px] uppercase text-[#75777d] group-hover:text-primary transition-colors">ID: PF-8802</span>
              <span className="material-symbols-outlined text-[#0f1a2e] group-hover:text-surface-tint transition-colors">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CANVAS */}
      <div className="pt-12 pb-12 px-8">
        {/* Welcome Section */}
        <section className="mb-12 border-b-[1.5px] border-outline-variant pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline text-5xl italic text-on-surface">Good evening, Elias. Keep going!</h2>
              <p className="font-body text-on-surface-variant mt-2 max-w-xl">Your technical journey is currently 64% documented. Continue where you left off in your current modules.</p>
            </div>
            <div className="text-right">
              <p className="font-label text-sm uppercase tracking-tighter text-on-surface-variant">Session Timestamp</p>
              <p className="font-label text-xl font-bold text-surface-tint">2023.10.27 // 18:42:01</p>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Ledger Style Panel */}
            <div className="bg-surface p-6 border-[1.5px] border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6 border-b-[1.5px] border-outline-variant pb-2">
                <h3 className="font-label uppercase tracking-widest text-xs font-bold text-on-surface">Skill Acquisition Ledger</h3>
                <span className="font-label text-[10px] text-outline">v2.4 Finalized</span>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-label text-xs uppercase text-on-surface-variant col-span-1">Skills Learning</span>
                  <div className="col-span-2 bg-[#f2edd8] h-[3px] w-full relative">
                    <div className="absolute top-0 left-0 h-full bg-[#d4930a]" style={{ width: '85%' }}></div>
                  </div>
                  <span className="font-label text-xs text-right text-surface-tint">85%</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-label text-xs uppercase text-on-surface-variant col-span-1">Skills Teaching</span>
                  <div className="col-span-2 bg-[#f2edd8] h-[3px] w-full relative">
                    <div className="absolute top-0 left-0 h-full bg-[#d4930a]" style={{ width: '42%' }}></div>
                  </div>
                  <span className="font-label text-xs text-right text-surface-tint">42%</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-label text-xs uppercase text-on-surface-variant col-span-1">Connections Made</span>
                  <div className="col-span-2 bg-[#f2edd8] h-[3px] w-full relative">
                    <div className="absolute top-0 left-0 h-full bg-[#d4930a]" style={{ width: '71%' }}></div>
                  </div>
                  <span className="font-label text-xs text-right text-surface-tint">71%</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-label text-xs uppercase text-on-surface-variant col-span-1">Resources Saved</span>
                  <div className="col-span-2 bg-[#f2edd8] h-[3px] w-full relative">
                    <div className="absolute top-0 left-0 h-full bg-[#d4930a]" style={{ width: '94%' }}></div>
                  </div>
                  <span className="font-label text-xs text-right text-surface-tint">94%</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={() => setShowExportModal(true)} className="bg-[#d4930a] text-white border-[1.5px] border-primary px-6 py-2 font-label uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                  Export Log
                </button>
              </div>
            </div>

            {/* My Schedule Section */}
            <div className="bg-surface p-6 border-[1.5px] border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6 border-b-[1.5px] border-outline-variant pb-2">
                <h3 className="font-label uppercase tracking-widest text-xs font-bold text-on-surface">My Schedule</h3>
                <span className="font-label text-[10px] text-outline">Active Deployments</span>
              </div>

              <div className="space-y-1">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 border-b border-outline-variant pb-2 mb-4">
                  <div className="col-span-3 font-label text-[10px] uppercase text-outline">Date // Time</div>
                  <div className="col-span-3 font-label text-[10px] uppercase text-outline">Peer Analyst</div>
                  <div className="col-span-4 font-label text-[10px] uppercase text-outline">Topic/Module</div>
                  <div className="col-span-2 text-right font-label text-[10px] uppercase text-outline">Status</div>
                </div>

                {/* Session 1 */}
                <div className="grid grid-cols-12 gap-2 items-center py-3 border-b border-dotted border-outline-variant group hover:bg-surface-container-low transition-colors">
                  <div className="col-span-3">
                    <p className="font-label text-xs font-bold text-surface-tint">2023.10.29</p>
                    <p className="font-label text-[10px] text-on-surface-variant">14:00 - 15:30</p>
                  </div>
                  <div className="col-span-3">
                    <p className="font-headline italic text-sm">Sarah Chen</p>
                  </div>
                  <div className="col-span-4">
                    <p className="font-body text-sm font-medium">Python Basics: Control Flow</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-label text-[9px] px-1.5 py-0.5 border border-primary text-primary uppercase">Scheduled</span>
                  </div>
                </div>

                {/* Session 2 */}
                <div className="grid grid-cols-12 gap-2 items-center py-3 border-b border-dotted border-outline-variant group hover:bg-surface-container-low transition-colors">
                  <div className="col-span-3">
                    <p className="font-label text-xs font-bold text-surface-tint">2023.10.31</p>
                    <p className="font-label text-[10px] text-on-surface-variant">10:00 - 11:00</p>
                  </div>
                  <div className="col-span-3">
                    <p className="font-headline italic text-sm">Marcus Vogt</p>
                  </div>
                  <div className="col-span-4">
                    <p className="font-body text-sm font-medium">Rust Memory Management</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-label text-[9px] px-1.5 py-0.5 border border-primary text-primary uppercase">Confirmed</span>
                  </div>
                </div>

                {/* Session 3 */}
                <div className="grid grid-cols-12 gap-2 items-center py-3 border-b border-dotted border-outline-variant group hover:bg-surface-container-low transition-colors">
                  <div className="col-span-3">
                    <p className="font-label text-xs font-bold text-surface-tint">2023.11.02</p>
                    <p className="font-label text-[10px] text-on-surface-variant">16:45 - 18:15</p>
                  </div>
                  <div className="col-span-3">
                    <p className="font-headline italic text-sm">Elena Rossi</p>
                  </div>
                  <div className="col-span-4">
                    <p className="font-body text-sm font-medium">System Design Patterns</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-label text-[9px] px-1.5 py-0.5 border border-outline text-outline uppercase">Pending</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <p className="font-label text-[10px] text-outline italic">* All times are in local system timezone.</p>
                <button onClick={() => setShowBookingModal(true)} className="bg-[#0f1a2e] text-[#fffae4] border-[1.5px] border-primary px-6 py-2 font-label uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_#d4930a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                  Book New Session
                </button>
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/roadmap" className="group bg-surface border-[1.5px] border-outline p-6 hover:border-primary hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between h-40">
                <span className="font-label text-4xl text-outline-variant group-hover:text-surface-tint transition-colors">01</span>
                <div>
                  <p className="font-label uppercase text-[10px] tracking-widest text-outline">Phase Mapping</p>
                  <h4 className="font-headline italic text-xl">Roadmap</h4>
                </div>
              </Link>
              <Link href="/resource-hub" className="group bg-surface border-[1.5px] border-outline p-6 hover:border-primary hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between h-40">
                <span className="font-label text-4xl text-outline-variant group-hover:text-surface-tint transition-colors">02</span>
                <div>
                  <p className="font-label uppercase text-[10px] tracking-widest text-outline">Static Files</p>
                  <h4 className="font-headline italic text-xl">Resource Hub</h4>
                </div>
              </Link>
              <Link href="/peer-matching" className="group bg-surface border-[1.5px] border-outline p-6 hover:border-primary hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between h-40">
                <span className="font-label text-4xl text-outline-variant group-hover:text-surface-tint transition-colors">03</span>
                <div>
                  <p className="font-label uppercase text-[10px] tracking-widest text-outline">Network Links</p>
                  <h4 className="font-headline italic text-xl">Peer Match</h4>
                </div>
              </Link>
            </div>
          </div>

          {/* Activity Feed Sidebar */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="bg-surface-container-highest border-[1.5px] border-outline h-full flex flex-col">
              <div className="bg-primary p-3 flex justify-between items-center">
                <span className="font-label text-[10px] text-[#fffae4] uppercase tracking-widest">Active_Session_Log.txt</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#fffae4]"></div>
                  <div className="w-2 h-2 bg-[#75777d]"></div>
                </div>
              </div>
              <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                <div className="flex items-start gap-3">
                  <span className="font-label text-[10px] text-surface-tint shrink-0">14:22:05</span>
                  <p className="font-headline italic text-sm border-b border-dotted border-outline-variant pb-1 w-full">Completed Module 3 of the UX Design Roadmap</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-label text-[10px] text-surface-tint shrink-0">12:05:44</span>
                  <p className="font-headline italic text-sm border-b border-dotted border-outline-variant pb-1 w-full">Connected with Priya for Python exchange</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-label text-[10px] text-surface-tint shrink-0">10:15:12</span>
                  <p className="font-headline italic text-sm border-b border-dotted border-outline-variant pb-1 w-full">Joined the Web Dev Study Group</p>
                </div>
              </div>
              <div className="p-4 border-t border-outline">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary animate-pulse"></span>
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">System Operational // Waiting for Input...</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Featured Section: Integrated AI Insight */}
        <section className="mt-12">
          <div className="bg-surface border-[1.5px] border-outline p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-full bg-surface-container opacity-20 pointer-events-none bg-hatch"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 bg-primary flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_#d4930a]">
                <span className="material-symbols-outlined text-[#fffae4] scale-[2]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div className="flex-1">
                <h5 className="font-label text-xs uppercase text-surface-tint font-bold mb-1 tracking-widest">AI ARCHIVE INSIGHT</h5>
                <h3 className="font-headline text-2xl italic mb-3">Priority: Peer Matching</h3>
                <p className="font-body text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                  You're learning <span className="text-primary font-bold">Python</span>—connect with <span className="italic text-primary font-bold">Sarah</span> who wants to learn UX for a collaborative skill exchange.
                </p>
              </div>
              <div className="shrink-0">
                <button onClick={() => setShowAnalysisModal(true)} className="inline-block border-[1.5px] border-primary px-6 py-3 font-label uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
                  View Analysis
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {showExportModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-md w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowExportModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Export Ledger</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Your data is being compiled into a portable JSON structure. This might take a moment.</p>
            <div className="bg-surface-container-low border border-outline-variant p-4 font-mono text-[10px] text-outline mb-6 flex flex-col gap-2">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary active-dot rounded-full"></span> AGGREGATING MODULES... 100%</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary active-dot rounded-full"></span> COMPILING DEPENDENCIES... 100%</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#d4930a] rounded-full"></span> PREPARING ARCHIVE... READY</span>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowExportModal(false)} className="bg-primary text-white border-[1.5px] border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">Download PF_Archive.zip</button>
            </div>
          </div>
        </div>
      )}

      {showBookingModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-lg w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Schedule Alignment</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Book a 1-on-1 peer exchange session.</p>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowBookingModal(false); }}>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Select Topic Focus</label>
                <select className="border-[1.5px] border-outline bg-surface-container-low font-mono text-xs py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary">
                  <option>System Architecture: CAP Theorem</option>
                  <option>Rust: Ownership Contexts</option>
                  <option>React: Server Components</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Proposed Data/Time</label>
                <input type="datetime-local" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-xs py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Session Protocol (Short Message)</label>
                <textarea rows={3} className="border-[1.5px] border-outline bg-white font-mono text-xs py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="I'd like to focus exclusively on distributed locking protocols..."></textarea>
              </div>
              <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setShowBookingModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-outline hover:text-error transition-colors">Cancel</button>
                <button type="submit" className="bg-[#d4930a] text-white border-[1.5px] border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">Transmit Protocol</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAnalysisModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-2xl w-full p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
            <div className="bg-primary p-8 text-white w-full md:w-1/3 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-4xl mb-4 text-[#d4930a]">psychology</span>
                <h3 className="font-serif italic text-2xl mb-2">Analysis</h3>
                <p className="font-mono text-[10px] text-[#fffae4]/70 uppercase tracking-widest">Confidence: 94%</p>
              </div>
            </div>
            <div className="p-8 w-full md:w-2/3 relative">
              <button onClick={() => setShowAnalysisModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
              <h4 className="font-headline text-2xl font-bold mb-4 text-[#d4930a]">Peer Match: Sarah</h4>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                The node "Sarah" exhibits a high topological overlap with your current learning path. Sarah has mastered Python Fundamentals, which you requested, and is actively seeking assistance with User Experience Design principles—a skillset you are deeply proficient in.
              </p>
              <div className="bg-surface-container border-[1.5px] border-outline-variant p-4 space-y-3 mb-8">
                <div className="flex justify-between items-center border-b border-outline-variant pb-2"><span className="font-mono text-[10px] text-outline uppercase tracking-widest">Skill Swap</span><span className="font-mono text-[10px] text-primary bg-[#d4930a]/20 border border-[#d4930a] px-2 py-0.5">SYNERGY DETECTED</span></div>
                <div className="flex justify-between items-center"><span className="font-mono text-[10px] text-outline uppercase tracking-widest">Schedule Check</span><span className="font-mono text-[10px] text-primary font-bold">OVERLAP: WEEKENDS</span></div>
              </div>
              <div className="flex justify-end gap-6 items-center">
                <button onClick={() => setShowAnalysisModal(false)} className="font-mono text-xs uppercase tracking-widest text-outline hover:text-error transition-colors">Dismiss</button>
                <Link href="/peer-matching" className="bg-[#0f1a2e] text-[#fffae4] border-[1.5px] border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#d4930a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">Proceed to Match</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Sidebar Drawer */}
      {showProfileDrawer && (
        <>
          <div className="fixed inset-0 bg-[#0f1a2e]/40 backdrop-blur-md z-[90] animate-in fade-in" onClick={() => setShowProfileDrawer(false)}></div>
          <div className="fixed right-0 top-0 h-full w-[350px] bg-surface border-l-[1.5px] border-primary shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.4)] z-[100] p-8 flex flex-col pt-12 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center pb-6 border-b-[1.5px] border-outline-variant mb-8">
              <h3 className="font-serif italic text-3xl text-primary">Identity</h3>
              <button onClick={() => setShowProfileDrawer(false)} className="material-symbols-outlined text-outline hover:text-error transition-colors">close</button>
            </div>

            <div className="flex flex-col items-center mb-10">
              <div className="w-32 h-32 bg-surface-tint border-[1.5px] border-primary mb-4 p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxII8VxKpQ5kiMIcXzJLXYGIqVEf1NGlNR93uBo_uyHcUXdJJD0EwuivI6mKXpICu7N7Phby3nfagfRBDjmpSYtZGT8j99R8hV_9S17gkauREulJGgAr-I6UwTWyCtthixby4ZCL5qBgBBI24nsZ8IYtpcG70ylxpwQAJU9NXdN-KxZzoeYhzIOSH8pjt1_iyeYAuuVhWEk6jdZzIFQUE2TRHHY3SHn6e722ogbtq1g6QeuYPV0nn7GGFIpP08FleA_KIY-0fMOv2l" alt="Profile" className="w-full h-full object-cover grayscale" />
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                Elias Vance
                {isPremium && (
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-[#d4930a] text-[#0f1a2e] px-1.5 py-0.5 border border-[#d4930a] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] relative -top-0.5">PRO</span>
                )}
              </h4>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4930a] mt-2 bg-[#d4930a]/10 px-3 py-1 border border-[#d4930a] font-bold">Level 4 Architect</span>
            </div>

            <div className="space-y-6 flex-1 bg-surface-container-low border-[1.5px] border-outline-variant p-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4930a] font-bold block mb-1">Network ID</span>
                <p className="font-mono text-sm text-on-surface">PF-8802-AC</p>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4930a] font-bold block mb-1">Primary Focus</span>
                <p className="font-mono text-sm text-on-surface">Distributed Systems Engineering</p>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4930a] font-bold block mb-1">Current Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-secondary animate-pulse rounded-full"></span>
                  <p className="font-mono text-[10px] text-[#4e6b52] font-bold uppercase tracking-widest">Available for Peer Exchange</p>
                </div>
              </div>
            </div>

            <div className="border-t-[1.5px] border-outline-variant pt-6 flex flex-col gap-3 mt-8">
              <Link href="/settings" className="w-full py-3 border-[1.5px] border-primary flex justify-center items-center gap-2 font-mono text-xs uppercase tracking-widest hover:bg-surface-container font-bold text-primary active:scale-95 transition-all">
                <span className="material-symbols-outlined text-sm">settings</span> Preferences
              </Link>
              <button className="w-full py-3 border-[1.5px] border-transparent text-outline hover:border-error flex justify-center items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-error transition-all active:scale-95">
                <span className="material-symbols-outlined text-sm">logout</span> Terminate Session
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
