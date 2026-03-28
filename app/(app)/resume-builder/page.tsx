"use client";

import { useState } from "react";
import { usePremium } from "../../contexts/PremiumContext";

export default function ResumeBuilderPage() {
  const { isPremium, openUpgradeModal } = usePremium();
  const [formData, setFormData] = useState({
    name: "ALEXANDER VANCE",
    title: "GRADUATE RESEARCHER / INTERN",
    email: "a.vance@university.edu",
    location: "SAN FRANCISCO, CA",
    experience: "Assisted in conducting user study sessions for accessibility protocols. Developed wireframes for experimental data dashboards using Figma and Python-based data scripts.",
    skills: ["FIGMA", "PYTHON BASICS", "PUBLIC SPEAKING"]
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.toUpperCase())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.toUpperCase()] }));
      setNewSkill("");
    }
  };

  return (
    <>
      <header className="w-full bg-[#fffae4] pt-6 pb-2 px-8 flex flex-col justify-end items-start border-b-[1.5px] border-[#75777d] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="material-symbols-outlined text-[#0f1a2e]">menu</span>
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-outline mb-8 border-b-[1.5px] border-outline-variant pb-2">
          <span>Target Field: <span className="text-[#d4930a] font-bold">Systems Architect</span></span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">SKILLEX</span>
        </div>
        </div>
        <div className="w-full flex justify-between items-baseline">
          <h2 className="font-serif text-4xl italic text-[#0f1a2e]">The Human Archive</h2>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#0f1a2e]">notifications</span>
            <span className="material-symbols-outlined text-[#0f1a2e]">account_circle</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 p-8 gap-8 overflow-hidden h-full">
        {/* 70% Form Column */}
        <section className="w-[70%] overflow-y-auto pr-4 space-y-12 pb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="font-mono text-sm font-bold tracking-widest">PERSONAL IDENTITY</h3>
              <div className="flex-1 border-b-[1.5px] border-outline-variant"></div>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Full Nomenclature</label>
                <input name="name" value={formData.name} onChange={handleChange} className="form-underline font-mono text-lg py-2 focus:ring-0" placeholder="ALEXANDER VANCE" type="text"/>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Professional Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="form-underline font-mono text-lg py-2 focus:ring-0" placeholder="GRADUATE RESEARCHER" type="text"/>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Electronic Mail</label>
                <input name="email" value={formData.email} onChange={handleChange} className="form-underline font-mono text-lg py-2 focus:ring-0" placeholder="a.vance@university.edu" type="email"/>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Digital Location</label>
                <input name="location" value={formData.location} onChange={handleChange} className="form-underline font-mono text-lg py-2 focus:ring-0" placeholder="SAN FRANCISCO, CA" type="text"/>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="font-mono text-sm font-bold tracking-widest">PROJECTS & EXPERIENCE</h3>
              <div className="flex-1 border-b-[1.5px] border-outline-variant"></div>
            </div>
            <div className="p-6 border-[1.5px] border-outline bg-surface-container-low relative">
              <div className="absolute -top-3 left-4 bg-[#fffae4] px-2 font-mono text-[10px] text-outline">ENTRY #01</div>
              <div className="grid grid-cols-2 gap-10 mb-8">
                <div className="flex flex-col">
                  <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Organization</label>
                  <input className="form-underline font-mono text-base py-1 focus:ring-0 bg-transparent" type="text" defaultValue="HUMAN-COMPUTER INTERACTION LAB"/>
                </div>
                <div className="flex flex-col">
                  <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Role</label>
                  <input className="form-underline font-mono text-base py-1 focus:ring-0 bg-transparent" type="text" defaultValue="UI RESEARCH INTERN"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-tighter text-outline mb-1">Key Contributions</label>
                <textarea name="experience" value={formData.experience} onChange={handleChange} className="form-underline font-mono text-sm py-2 resize-none focus:ring-0 bg-transparent" rows={4}></textarea>
              </div>
              <button className="mt-6 flex items-center gap-2 text-error font-mono text-[10px] uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-sm">delete</span> Purge Entry
              </button>
            </div>
            <button className="w-full border-[1.5px] border-dashed border-outline py-4 flex items-center justify-center gap-2 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">add</span>
              <span className="font-mono text-xs uppercase tracking-widest">Add Professional Milestone</span>
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="font-mono text-sm font-bold tracking-widest">SKILLS (TEACHING + LEARNING)</h3>
              <div className="flex-1 border-b-[1.5px] border-outline-variant"></div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              {formData.skills.map(skill => (
                <div key={skill} className="border-[1.5px] border-outline px-4 py-2 bg-white flex items-center gap-3">
                  <span className="font-mono text-xs">{skill}</span>
                  <span className="material-symbols-outlined text-sm text-outline cursor-pointer" onClick={() => removeSkill(skill)}>close</span>
                </div>
              ))}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newSkill} 
                  onChange={e => setNewSkill(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                  placeholder="New Skill" 
                  className="font-mono text-xs px-2 py-1 outline-none border-[1.5px] border-outline bg-transparent focus:border-surface-tint"
                />
                <button onClick={addSkill} className="px-4 py-2 border-[1.5px] border-outline-variant text-outline-variant font-mono text-xs uppercase tracking-widest hover:border-outline hover:text-outline">
                  + Add
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 bg-surface p-6 border-[1.5px] border-primary relative overflow-hidden group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
             {isPremium && <div className="absolute top-0 right-0 bg-[#d4930a] text-[#0f1a2e] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest border-b-[1.5px] border-l-[1.5px] border-[#0f1a2e]">Active</div>}
             <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl">psychology</span>
             </div>
             <h3 className="font-mono text-sm font-bold tracking-widest text-[#0f1a2e] flex items-center gap-2"><span className="material-symbols-outlined text-base">psychology</span> A.I. AUTO-TAILOR</h3>
             <p className="font-body text-sm text-outline max-w-md">Provide a target job description below. Our integration will analyze the required vectors and re-weight your experience modules for a 94% alignment probability.</p>
             
             {isPremium ? (
                <div className="flex flex-col gap-4 mt-6">
                  <textarea className="form-underline font-mono text-sm py-3 px-4 resize-none focus:ring-1 focus:ring-primary bg-surface-container-low border-[1.5px] border-outline placeholder:text-outline/70" rows={4} placeholder="Paste target description here..."></textarea>
                  <button className="bg-primary text-[#fffae4] border-[1.5px] border-primary py-3 font-mono text-xs uppercase tracking-widest font-bold shadow-[2px_2px_0px_0px_rgba(15,26,46,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all self-start px-6">Compile AI Tailoring</button>
                </div>
             ) : (
                <div className="flex flex-col gap-4 border-t border-dashed border-outline-variant pt-6 mt-6">
                   <button onClick={openUpgradeModal} className="bg-transparent text-[#d4930a] border-[1.5px] border-[#d4930a] py-3 px-6 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#d4930a]/10 transition-all flex items-center justify-center gap-2 self-start shadow-[2px_2px_0px_0px_#d4930a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                     <span className="material-symbols-outlined text-sm">lock</span> Unlock AI Protocol
                   </button>
                </div>
             )}
          </div>
        </section>

        {/* 30% Preview Column */}
        <aside className="w-[30%] h-full sticky top-0 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-outline">LIVE REPRODUCTION</span>
            <span className="font-mono text-[10px] text-outline">v1.0.42</span>
          </div>
          
          <div className="flex-1 bg-[#fffcf0] border-[1.5px] border-outline-variant paper-shadow p-8 overflow-y-auto font-headline text-[#1a1a1a]">
            <div className="border-b-[3px] border-black pb-4 mb-8">
              <h1 className="text-3xl font-bold uppercase tracking-tight">{formData.name || 'Your Name'}</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest mt-1 text-gray-600">{formData.title} | {formData.email}</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] font-bold">PROJECTS & EXPERIENCE</span>
                <div className="flex-1 border-b border-black"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-sm italic">Human-Computer Interaction Lab</h4>
                    <span className="font-mono text-[9px]">SUMMER 2023</span>
                  </div>
                  <p className="text-[12px] leading-relaxed italic text-gray-800">UI Research Intern</p>
                  <p className="text-[10px] leading-snug mt-2 font-body text-gray-700">{formData.experience}</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-sm italic">Data Stream Collective</h4>
                    <span className="font-mono text-[9px]">2018 — 2021</span>
                  </div>
                  <p className="text-[12px] leading-relaxed italic text-gray-800">UI Technologist</p>
                  <p className="text-[10px] leading-snug mt-2 font-body text-gray-700">Archived legacy interface protocols and established modern editorial design standards for encrypted communications.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] font-bold">EDUCATION</span>
                <div className="flex-1 border-b border-black"></div>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-sm">Institute of Digital Arts</h4>
                <span className="font-mono text-[9px]">2014 — 2018</span>
              </div>
              <p className="text-[10px] italic">B.S. in Computational Aesthetics</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] font-bold">EXPERTISE</span>
                <div className="flex-1 border-b border-black"></div>
              </div>
              <p className="font-mono text-[9px] leading-relaxed tracking-wider uppercase">
                {formData.skills.join(" • ")}
              </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-dashed border-outline-variant flex justify-between items-center text-outline">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="font-mono text-[8px]">SKILLEX GENERATED</span>
            </div>
            <span className="font-mono text-[8px]">ID: PF-8802</span>
          </div>
          </div>
          
          <div className="flex gap-2 justify-center pb-8">
            <button className="bg-white border border-outline p-2 hover:bg-surface-container shadow-[2px_2px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
              <span className="material-symbols-outlined text-sm">zoom_in</span>
            </button>
            {isPremium ? (
              <button 
                onClick={() => alert("Downloading PDF... // TODO: Impl")}
                className="bg-[#d4930a] text-[#0f1a2e] border-[1.5px] border-[#0f1a2e] p-2 font-mono text-xs uppercase px-4 shadow-[2px_2px_0px_0px_rgba(15,26,46,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold transition-all flex items-center gap-2"
              >
                Download PDF <span className="material-symbols-outlined text-[14px]">download</span>
              </button>
            ) : (
              <button 
                onClick={openUpgradeModal}
                className="bg-transparent text-[#0f1a2e] hover:bg-[#d4930a]/10 border-[1.5px] border-[#0f1a2e] p-2 font-mono text-xs uppercase px-4 shadow-[2px_2px_0px_0px_rgba(15,26,46,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[14px] text-[#d4930a]">lock</span>
                Export Resume (PDF) — Premium
              </button>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
