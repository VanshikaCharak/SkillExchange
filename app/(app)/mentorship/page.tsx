"use client";

import { useState } from "react";
import { usePremium } from "../../contexts/PremiumContext";
import Link from "next/link";

export default function MentorshipPage() {
  const { isPremium, openUpgradeModal } = usePremium();
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifSettings, setNotifSettings] = useState({ tags: true, portals: false, digest: true });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activeMentor, setActiveMentor] = useState<string | null>(null);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [activeSim, setActiveSim] = useState<{title: string, type: string} | null>(null);

  const mentors = [
    { id: "M1", name: "David K.", focus: "Systems Architecture", role: "Principal Engineer", available: "Next Week", fee: "Included", img: "https://lh3.googleusercontent.com/aida-public/AEdXbA5WjD0H-XoPZ-kYIu87x1XpU2nB1yOqL8zG7Nl1x4VpYt0Y8D8tRy9vR7s9lP1qA9wU1u2U9V4Y3U8B8pX7l9X0X0pP9z0K2x9J7U2I4y1G4lO5xO0H9q1N6Z2VqX", stars: 5 },
    { id: "M2", name: "Alyssa P.", focus: "Data Structures & Algos", role: "Sr. Software Eng", available: "Tomorrow", fee: "Included", img: "https://lh3.googleusercontent.com/aida-public/AEdXbA4I8X9U1rP7LqH7y9J4UdVwK2rO5sF1wL2jM4I9sZ8xP5eN2gN0kK8yY1mU4fM8iN5rY1qB4zP1yH4nC3xD8sH1rX1wR9nE4mS9wN1gG1wA0zP9qM4nI5yA8xW", stars: 4.8 },
    { id: "M3", name: "Julian R.", focus: "UI/UX & Behavioral", role: "Product Manager", available: "Friday", fee: "Included", img: "https://lh3.googleusercontent.com/aida-public/AEdXbA5L8J2N4uH9RzY4xA7C8wI2nG0uX2wX2kS3cM7nQ3mU1jM8fJ0kV6oR8qB9zN5wE3mB1uF9lT5tF6gR0nI4mA3qF7qE2zW8fI9rY2iQ9xX7gI2oO1hH4wF6tU0x", stars: 4.9 },
  ];

  if (!isPremium) {
    return (
      <div className="relative h-full flex flex-col items-center justify-center py-20 px-8 text-center bg-surface-container overflow-hidden">
         <div className="absolute inset-0 bg-transparent opacity-10 bg-hatch z-0"></div>
         
         <div className="relative z-10 flex flex-col items-center max-w-2xl bg-surface p-12 py-16 border-[1.5px] border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined text-[#d4930a] text-8xl mb-6 drop-shadow-md">lock</span>
            <h1 className="font-serif italic text-4xl text-primary mb-4 leading-tight">Mock Interviews & Elite Mentorship</h1>
            <p className="font-body text-base text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
              Expedite your career by speaking directly to the architects who build the systems you study. Tap into our exclusive network of industry veterans for 1-on-1 mock interviews, code reviews, and career guidance.
            </p>
            <button 
              onClick={openUpgradeModal}
              className="bg-[#d4930a] text-white border-[1.5px] border-primary px-8 py-4 font-mono text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none font-bold transition-all flex items-center justify-center gap-3 w-full max-w-sm mx-auto"
            >
              Unlock Premium Protocol <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
         </div>
      </div>
    );
  }

  // ---------
  // UNLOCKED STATE
  // ---------
  return (
    <>
      <header className="sticky top-0 right-0 w-full bg-surface/80 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-2 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">Network</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-[#d4930a] text-[#0f1a2e] px-1 py-0.5 border border-[#d4930a] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]">PRO</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Mentorship</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Elite Mentorship Core</h2>
          <div className="flex gap-4 pb-2">
            <button onClick={() => { setActiveMentor(null); setShowScheduleModal(true); }} className="material-symbols-outlined p-2 border-[1.5px] border-outline hover:bg-surface-container transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none">calendar_month</button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="material-symbols-outlined p-2 border-[1.5px] border-outline hover:bg-surface-container transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none relative">
                 notifications
                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-[1.5px] border-surface"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-surface border-[1.5px] border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-[110] p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-primary">Comms Settings</span>
                    <button onClick={() => setShowNotifications(false)} className="material-symbols-outlined text-[16px] text-outline hover:text-error transition-colors">close</button>
                  </div>
                  
                  <div className="flex flex-col gap-4 mt-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                       <span className="font-mono text-[10px] uppercase text-[#0f1a2e] group-hover:text-primary transition-colors font-bold tracking-widest">Portal Activity</span>
                       <input type="checkbox" checked={notifSettings.portals} onChange={() => setNotifSettings(p => ({...p, portals: !p.portals}))} className="accent-[#d4930a] w-4 h-4 cursor-pointer border-[1.5px] border-outline shadow-sm" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                       <span className="font-mono text-[10px] uppercase text-[#0f1a2e] group-hover:text-primary transition-colors font-bold tracking-widest">Direct Mentions</span>
                       <input type="checkbox" checked={notifSettings.tags} onChange={() => setNotifSettings(p => ({...p, tags: !p.tags}))} className="accent-[#d4930a] w-4 h-4 cursor-pointer border-[1.5px] border-outline shadow-sm" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                       <span className="font-mono text-[10px] uppercase text-[#0f1a2e] group-hover:text-primary transition-colors font-bold tracking-widest">Daily Terminal Digest</span>
                       <input type="checkbox" checked={notifSettings.digest} onChange={() => setNotifSettings(p => ({...p, digest: !p.digest}))} className="accent-[#d4930a] w-4 h-4 cursor-pointer border-[1.5px] border-outline shadow-sm" />
                    </label>
                  </div>

                  <button onClick={() => setShowNotifications(false)} className="w-full mt-2 bg-primary text-[#fffae4] font-mono text-[10px] uppercase tracking-widest py-2.5 border-[1.5px] border-primary hover:bg-surface-tint shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all">Enforce Configuration</button>
                </div>
              )}
            </div>
            <button onClick={() => setShowProfileDrawer(true)} className="material-symbols-outlined p-2 border-[1.5px] border-outline bg-primary-container text-[#fffae4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none hover:bg-surface-tint transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      <section className="px-10 py-12">
        <h3 className="font-mono text-sm font-bold tracking-widest uppercase text-primary border-b border-outline-variant pb-2 mb-8">Interview Simulators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           <div onClick={() => { setActiveSim({title: "System Design Mock", type: "Architecture & Scale"}); setShowSimulationModal(true); }} className="bg-[#0f1a2e] border-[1.5px] border-[#0f1a2e] text-[#fffae4] p-8 shadow-[4px_4px_0px_0px_#d4930a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(212,147,10,1)] transition-all flex flex-col justify-between h-56 cursor-pointer group active:translate-y-[4px] active:translate-x-[4px] active:shadow-none">
              <span className="material-symbols-outlined text-4xl text-[#d4930a]">schema</span>
              <div>
                 <p className="font-mono text-[10px] uppercase tracking-widest text-[#fffae4]/50 mb-1">Architecture & Scale</p>
                 <h4 className="font-serif italic text-2xl font-bold group-hover:text-[#d4930a] transition-colors">System Design Mock</h4>
              </div>
           </div>
           
           <div onClick={() => { setActiveSim({title: "Algorithm Logic", type: "Live Execution"}); setShowSimulationModal(true); }} className="bg-surface border-[1.5px] border-primary p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between h-56 cursor-pointer group active:translate-y-[4px] active:translate-x-[4px] active:shadow-none">
              <span className="material-symbols-outlined text-4xl text-primary">data_object</span>
              <div>
                 <p className="font-mono text-[10px] uppercase tracking-widest text-outline mb-1">Live Execution</p>
                 <h4 className="font-serif italic text-2xl font-bold text-primary group-hover:text-surface-tint transition-colors">Algorithm Logic</h4>
              </div>
           </div>
           
           <div onClick={() => { setActiveSim({title: "Behavioral Exam", type: "Leadership & Conflict"}); setShowSimulationModal(true); }} className="bg-surface border-[1.5px] border-primary p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between h-56 cursor-pointer group active:translate-y-[4px] active:translate-x-[4px] active:shadow-none">
              <span className="material-symbols-outlined text-4xl text-primary">psychology_alt</span>
              <div>
                 <p className="font-mono text-[10px] uppercase tracking-widest text-outline mb-1">Leadership & Conflict</p>
                 <h4 className="font-serif italic text-2xl font-bold text-primary group-hover:text-surface-tint transition-colors">Behavioral Exam</h4>
              </div>
           </div>
        </div>

        <h3 className="font-mono text-sm font-bold tracking-widest uppercase text-primary border-b border-outline-variant pb-2 mb-8">Active Mentors</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
           {mentors.map(m => (
              <div key={m.id} className="bg-surface border-[1.5px] border-primary flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                 <div className="p-6 border-b-[1.5px] border-outline-variant flex gap-6 items-center bg-surface-container-low">
                    <img src={m.img} alt={m.name} className="w-16 h-16 border border-primary grayscale hover:grayscale-0 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] object-cover bg-surface-tint" />
                    <div>
                       <h4 className="font-headline text-xl font-bold text-primary flex items-center gap-2">{m.name} <span className="material-symbols-outlined text-[14px] text-secondary">verified</span></h4>
                       <p className="font-mono text-[10px] uppercase tracking-widest text-outline">{m.role}</p>
                    </div>
                 </div>
                 
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-mono text-[10px] uppercase tracking-widest text-outline">Focus Area</span>
                       <span className="font-mono text-[10px] font-bold text-primary">{m.focus}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-mono text-[10px] uppercase tracking-widest text-outline">Rating</span>
                       <span className="font-mono text-[10px] font-bold text-[#d4930a] drop-shadow-[1px_1px_rgba(0,0,0,0.2)]">{m.stars}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                       <span className="font-mono text-[10px] uppercase tracking-widest text-outline">Availability</span>
                       <span className="font-mono text-[10px] font-bold text-secondary bg-[#4e6b52]/10 px-2 border border-[#4e6b52]">{m.available}</span>
                    </div>

                    <button onClick={() => { setActiveMentor(m.name); setShowScheduleModal(true); }} className="mt-auto w-full bg-white border-[1.5px] border-primary px-4 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-surface-tint hover:text-[#fffae4] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
                       Schedule Interface
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </section>

      {/* Modals and Render Blocks */}
      
      {showSimulationModal && activeSim && (
        <div className="fixed inset-0 bg-[#0f1a2e]/90 backdrop-blur-md z-[110] flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="max-w-2xl w-full text-center">
             <span className="material-symbols-outlined text-[#d4930a] text-6xl mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(212,147,10,0.5)]">radar</span>
             <h2 className="font-serif italic text-4xl text-[#fffae4] mb-2">{activeSim.title}</h2>
             <p className="font-mono text-sm text-[#fffae4]/50 uppercase tracking-widest mb-10 border-b border-[#fffae4]/10 pb-4 inline-block">Connecting to node: {activeSim.type}</p>
             
             <div className="w-full bg-[#fffae4]/10 h-1.5 relative overflow-hidden mb-12 max-w-sm mx-auto shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 h-full bg-[#d4930a] animate-pulse w-full"></div>
             </div>
             
             <div className="flex gap-4 justify-center">
               <button onClick={() => setShowSimulationModal(false)} className="border-[1.5px] border-error/50 text-error hover:text-[#fffae4] hover:bg-error px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all">Abort Simulation</button>
             </div>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-surface border-[1.5px] border-primary max-w-lg w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowScheduleModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Schedule Alignment</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Coordinate a 1-on-1 session with elite industry nodes.</p>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowScheduleModal(false); }}>
              <div className="flex flex-col relative">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Target Node (Mentor)</label>
                <select defaultValue={activeMentor || ""} required className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
                  <option value="" disabled>Select a mentor...</option>
                  {mentors.map(m => (
                     <option key={m.id} value={m.name}>{m.name} // {m.focus}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-[26px] pointer-events-none text-outline">expand_more</span>
              </div>
              <div className="flex flex-col relative">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Proposed Execution Time (Local System Clock)</label>
                <input type="datetime-local" required className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary uppercase tracking-widest text-primary" />
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Session Protocol Directives</label>
                <textarea required rows={3} className="border-[1.5px] border-outline bg-white font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-outline-variant" placeholder="I'd like to do a mock interview focusing on distributed caches..."></textarea>
              </div>
              <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-outline-variant">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0f1a2e] hover:text-error transition-colors font-bold">Cancel</button>
                <button type="submit" className="bg-[#4e6b52] text-[#fffae4] border-[1.5px] border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:shadow-none transition-all flex justify-center items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-sm">schedule_send</span> Transmit Request
                </button>
              </div>
            </form>
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
