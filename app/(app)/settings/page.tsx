"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [status, setStatus] = useState<"idle" | "compiling" | "done">("idle");

  const handleCompile = () => {
    setStatus("compiling");
    setTimeout(() => {
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 right-0 w-full bg-surface/80 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-2 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">Archive / System</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Preferences</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Terminal Settings</h2>
        </div>
      </header>

      <div className="p-10 max-w-4xl mx-auto space-y-12 pb-24">
        {/* Profile Settings */}
        <section className="bg-white border-[1.5px] border-outline p-8 hard-shadow-sm">
          <div className="border-b-[1.5px] border-outline-variant pb-4 mb-8">
            <h3 className="font-headline text-2xl font-bold">Public Archive Profile</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-outline mt-2">Adjust your visible ledger identity.</p>
          </div>
          
          <div className="flex gap-8 mb-8">
            <div className="w-24 h-24 border-[1.5px] border-primary p-1 shrink-0 bg-surface-container flex items-center justify-center relative group cursor-pointer hover:bg-surface-tint/10 transition-colors">
              <span className="material-symbols-outlined text-outline group-hover:text-primary">add_a_photo</span>
              <div className="absolute inset-0 border-2 border-dashed border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Display Alias</label>
                <input className="form-underline font-mono text-base py-1 focus:ring-0 bg-transparent" type="text" defaultValue="Alex Vance"/>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Bio Transmission</label>
                <textarea className="form-underline font-mono text-sm py-2 resize-none focus:ring-0 bg-transparent" rows={3} defaultValue={"Graduate Researcher exploring the intersection of distributed systems and accessible interfaces."}></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-surface-container-low border-[1.5px] border-outline p-8 hard-shadow-sm">
          <div className="border-b-[1.5px] border-outline-variant pb-4 mb-8">
            <h3 className="font-headline text-2xl font-bold">Signal Preferences</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-outline mt-2">Manage incoming transmissions and alerts.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2 border-b border-dashed border-outline-variant">
              <div>
                <h4 className="font-body font-bold text-sm">Study Group Messages</h4>
                <p className="font-mono text-[10px] text-outline mt-1 uppercase">Direct pings from group collabs</p>
              </div>
              <input type="checkbox" className="w-5 h-5 border-[1.5px] border-primary text-[#d4930a] focus:ring-[#d4930a] cursor-pointer" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-dashed border-outline-variant">
              <div>
                <h4 className="font-body font-bold text-sm">Peer Match Requests</h4>
                <p className="font-mono text-[10px] text-outline mt-1 uppercase">When someone signals an interest to swap skills</p>
              </div>
              <input type="checkbox" className="w-5 h-5 border-[1.5px] border-primary text-[#d4930a] focus:ring-[#d4930a] cursor-pointer" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-body font-bold text-sm">Weekly Digest</h4>
                <p className="font-mono text-[10px] text-outline mt-1 uppercase">Aggregated trending topics and guides</p>
              </div>
              <input type="checkbox" className="w-5 h-5 border-[1.5px] border-primary text-[#d4930a] focus:ring-[#d4930a] cursor-pointer" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-6">
          <button 
            onClick={handleCompile}
            disabled={status !== "idle"}
            className={`text-[#fffae4] border-[1.5px] border-primary px-10 py-4 font-mono font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2 min-w-[250px] ${
              status === "idle" ? "bg-[#d4930a] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#b88008] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" :
              status === "compiling" ? "bg-surface-tint cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" :
              "bg-[#4e6b52] cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {status === "idle" && "Compile Settings"}
            {status === "compiling" && (
              <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Compiling...</>
            )}
            {status === "done" && (
              <><span className="material-symbols-outlined text-sm">check</span> Parameters Saved</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
