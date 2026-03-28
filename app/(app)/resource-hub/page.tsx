"use client";

import { useState } from "react";
import { usePremium } from "../../contexts/PremiumContext";

const initialResources = [
  { id: 1, title: "The Human-Centric AI Curriculum", type: "Guide", focus: "Engineering", level: "Advanced", saved: true, premium: true },
  { id: 2, title: "Whiteboard Challenges: Behavioral Logic", type: "Doc", focus: "Engineering", level: "Advanced", saved: false, premium: true },
  { id: 3, title: "Introduction to Generative Typography", type: "Repo", focus: "Design", level: "Beginner", saved: true },
  { id: 4, title: "Python Data Pipelines under Load", type: "Guide", focus: "Data Science", level: "Intermediate", saved: false },
  { id: 5, title: "Rust Memory Safety Principles", type: "Repo", focus: "Engineering", level: "Advanced", saved: true },
];

export default function ResourceHubPage() {
  const { isPremium, openUpgradeModal } = usePremium();
  const [resourcesList, setResourcesList] = useState(initialResources);
  const [activeTab, setActiveTab] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = ["All", "Engineering", "Design", "Data Science"];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const filteredResources = resourcesList.filter(res => {
    const tabMatch = activeTab === "All" || res.focus === activeTab;
    const levelMatch = activeLevel === "All Levels" || res.level === activeLevel;
    const savedMatch = showOnlySaved ? res.saved : true;
    return tabMatch && levelMatch && savedMatch;
  });

  const toggleBookmark = (id: number) => {
    setResourcesList(prev => 
      prev.map(item => item.id === id ? { ...item, saved: !item.saved } : item)
    );
  };

  const handleAddResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const focus = formData.get("focus") as string;
    const level = formData.get("level") as string;
    
    if (title.trim()) {
      const newResource = {
        id: Date.now(),
        title: title.trim(),
        type,
        focus,
        level,
        saved: false
      };
      setResourcesList([newResource, ...resourcesList]);
      setShowAddModal(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 right-0 w-full bg-surface/80 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-2 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">Archive / Knowledge</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Resource Hub</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Terminal Hub</h2>
          <div className="flex gap-4 pb-2">
            <button 
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              className={`material-symbols-outlined p-2 border-[1.5px] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none ${
                showOnlySaved 
                ? 'border-[#d4930a] bg-[#d4930a]/20 text-[#d4930a]' 
                : 'border-outline hover:bg-surface-container'
              }`}
              style={showOnlySaved ? { fontVariationSettings: "'FILL' 1" } : {}}
              title={showOnlySaved ? "Show All" : "Show Saved Only"}
            >
              bookmark
            </button>
            <button onClick={() => setShowAddModal(true)} className="material-symbols-outlined p-2 border-[1.5px] border-outline bg-primary-container text-[#fffae4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none hover:bg-surface-tint transition-colors">add</button>
          </div>
        </div>
      </header>

      <section className="px-10 pt-10 pb-4">
        {/* State Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-outline-variant pb-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-primary text-surface' 
                    : 'bg-surface text-primary border-l-0 hover:bg-surface-container'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-xs uppercase text-outline">
            <span>Filter Level:</span>
            {levels.map(level => (
              <button 
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-3 py-1 border-[1.5px] ${
                  activeLevel === level 
                  ? "border-[#d4930a] text-[#d4930a] font-bold bg-[#d4930a]/10" 
                  : "border-transparent text-outline hover:border-outline-variant"
                } transition-all`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res) => (
            <div key={res.id} className="bg-white border-[1.5px] border-outline p-6 flex flex-col hard-shadow-sm transition-all hard-shadow-hover group h-64 justify-between relative">
              {res.premium && (
                <div className="absolute -top-3 left-4 bg-[#d4930a] text-[#0f1a2e] px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-widest border border-[#0f1a2e] shadow-[2px_2px_0px_0px_rgba(15,26,46,1)] z-10">
                  PREMIUM
                </div>
              )}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest bg-surface-container px-2 py-0.5 border border-outline/20">
                    {res.type} // {res.focus}
                  </span>
                  <span 
                    onClick={() => toggleBookmark(res.id)} 
                    className={`material-symbols-outlined cursor-pointer hover:text-[#d4930a] transition-colors ${res.saved ? 'text-[#d4930a]' : 'text-outline'}`}
                    style={res.saved ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {res.saved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold italic text-primary leading-tight group-hover:text-surface-tint transition-colors">
                  {res.title}
                </h3>
              </div>
              
              <div className="pt-4 flex items-center justify-between border-t border-dashed border-outline-variant">
                <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${
                  res.level === 'Beginner' ? 'text-secondary' : 
                  res.level === 'Intermediate' ? 'text-[#d4930a]' : 'text-error'
                }`}>
                  {res.level}
                </span>

                {res.premium && !isPremium ? (
                  <span onClick={openUpgradeModal} className="font-mono text-[10px] uppercase tracking-widest text-[#d4930a] flex items-center gap-1 group-hover:text-[#ffb01f] transition-colors cursor-pointer font-bold">
                    <span className="material-symbols-outlined text-[12px]">lock</span> Unlock — Premium
                  </span>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-outline flex items-center gap-1 group-hover:text-primary transition-colors cursor-pointer">
                    ACCESS COMPILE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                )}
              </div>
            </div>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full py-20 text-center font-mono text-sm text-outline uppercase tracking-widest">
              NO ARCHIVES FOUND FOR CRITERIA. <br/> <button onClick={() => {setActiveTab("All"); setActiveLevel("All Levels");}} className="mt-4 underline decoration-outline-variant hover:text-primary">RESET FILTERS</button>
            </div>
          )}
        </div>
      </section>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-lg w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Publish Resource</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Archive a new learning node into the SkillEx global system.</p>
            
            <form className="space-y-6" onSubmit={handleAddResource}>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Resource Title</label>
                <input required name="title" type="text" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-[14px] py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Node.js Streams Deep Dive" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-mono text-[10px] uppercase text-outline mb-1">Format</label>
                  <select name="type" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-[14px] py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary">
                    <option value="Guide">Guide</option>
                    <option value="Video">Video</option>
                    <option value="Repo">Repository</option>
                    <option value="Doc">Documentation</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-mono text-[10px] uppercase text-outline mb-1">Focus Area</label>
                  <select name="focus" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-[14px] py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary">
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Complexity Level</label>
                <select name="level" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-[14px] py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0f1a2e] hover:text-error transition-colors">Abort</button>
                <button type="submit" className="bg-[#4e6b52] text-[#fffae4] border-[1.5px] border-[#4e6b52] px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2">
                   Commit Node <span className="material-symbols-outlined text-sm">archive</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
