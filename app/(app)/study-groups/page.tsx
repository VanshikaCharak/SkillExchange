"use client";

import { useState } from "react";
import Link from "next/link";
import { usePremium } from "../../contexts/PremiumContext";

const initialGroups = [
  { id: 1, tag: "DESIGN_UX_01", color: "#d4930a", title: "UX Design Beginners", desc: "Focus on user research, wireframing, and Figma basics. Perfect for those starting their design journey in the digital era.", members: 156 },
  { id: 2, tag: "PY_DS_MASTER", color: "#4e6b52", title: "Python for Data Science", desc: "Deep dive into Pandas, NumPy, and Scikit-Learn. Practical application of data cleaning and predictive modeling techniques.", members: 89 },
  { id: 3, tag: "LANG_IELTS", color: "#8b3a1c", title: "IELTS Prep Group", desc: "Daily practice for Academic and General modules. Focus on writing structure and spoken fluency for higher band scores.", members: 42 },
  { id: 4, tag: "CAREER_FREE", color: "#d4930a", title: "Freelancing 101", desc: "Strategies for client acquisition and contract management. Building a sustainable independent practice from the ground up.", members: 212 },
  { id: 5, tag: "Data_Science", color: "#8b3a1c", title: "Probabilistic Graphical Models", desc: "Studying Bayesian networks, Markov random fields, and their applications in causal inference and computer vision.", members: 12 }
];

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState(initialGroups);
  const [joinedGroups, setJoinedGroups] = useState<Record<number, boolean>>({});
  
  // Tab State
  const [activeTab, setActiveTab] = useState("All Portals");
  
  // Icon Component States
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifSettings, setNotifSettings] = useState({ tags: true, portals: false, digest: true });
  const { isPremium } = usePremium();
  
  const [activeChatGroupId, setActiveChatGroupId] = useState<number | null>(null);
  const activeGroup = groups.find(g => g.id === activeChatGroupId);
  const [groupMessages, setGroupMessages] = useState<Record<number, {id: number, text: string, time: string}[]>>({});

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement;
    const text = input.value.trim();
    if (text && activeChatGroupId) {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      
      setGroupMessages(prev => ({
        ...prev,
        [activeChatGroupId]: [
          ...(prev[activeChatGroupId] || []),
          { id: Date.now(), text, time: timeStr }
        ]
      }));
      input.value = "";
    }
  };

  const toggleJoin = (id: number) => {
    setJoinedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const tag = formData.get("tag") as string;
    
    if (title && desc) {
      const newGroup = {
        id: Date.now(),
        tag: tag || "NEW_PORTAL",
        color: "#0f1a2e",
        title,
        desc,
        members: 1
      };
      setGroups([newGroup, ...groups]);
      setJoinedGroups(prev => ({ ...prev, [newGroup.id]: true })); // auto join
      setShowCreateModal(false);
      setActiveTab("My Groups");
    }
  };

  const filteredGroups = [...groups]
    .filter(g => activeTab === "My Groups" ? joinedGroups[g.id] : true)
    .filter(g => showSearch && searchQuery ? g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.desc.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    .sort((a, b) => activeTab === "Trending" ? b.members - a.members : 0);

  return (
    <>
      <header className="sticky top-0 right-0 w-full bg-surface/80 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-2 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">Archive / Collaborative</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Study Groups</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Study Groups</h2>
          <div className="flex gap-4 pb-2 items-center">
            {showSearch && (
              <input 
                type="text" 
                autoFocus
                placeholder="Search portals..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="font-mono text-xs py-2 px-3 border-[1.5px] border-primary bg-surface outline-none w-48 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            )}
            <button onClick={() => setShowSearch(!showSearch)} className={`material-symbols-outlined p-2 border-[1.5px] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none ${showSearch ? 'bg-primary text-white border-primary' : 'border-outline hover:bg-surface-container'}`}>search</button>
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

      <div className="p-8 max-w-7xl mx-auto">
        <button onClick={() => setShowCreateModal(true)} className="w-full bg-[#d4930a] border-[1.5px] border-black p-6 mb-12 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,26,46,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,26,46,1)] transition-all group">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0f1a2e] font-bold block mb-1">CALL FOR ARCHIVISTS</span>
            <h3 className="font-mono text-3xl font-bold text-[#0f1a2e] leading-none">CREATE NEW STUDY COLLECTIVE</h3>
          </div>
          <span className="material-symbols-outlined text-4xl text-[#0f1a2e] group-hover:rotate-90 transition-transform">add_circle</span>
        </button>

        <div className="flex items-center justify-between mb-8 border-b-[1.5px] border-outline-variant pb-4">
          <div className="flex gap-6">
            <button onClick={() => setActiveTab("All Portals")} className={`font-mono text-sm uppercase tracking-tighter transition-colors pb-4 ${activeTab === 'All Portals' ? 'font-bold text-surface-tint border-b-2 border-surface-tint -mb-[18px]' : 'text-outline hover:text-primary'}`}>All Portals</button>
            <button onClick={() => setActiveTab("My Groups")} className={`font-mono text-sm uppercase tracking-tighter transition-colors pb-4 ${activeTab === 'My Groups' ? 'font-bold text-surface-tint border-b-2 border-surface-tint -mb-[18px]' : 'text-outline hover:text-primary'}`}>My Groups</button>
            <button onClick={() => setActiveTab("Trending")} className={`font-mono text-sm uppercase tracking-tighter transition-colors pb-4 ${activeTab === 'Trending' ? 'font-bold text-surface-tint border-b-2 border-surface-tint -mb-[18px]' : 'text-outline hover:text-primary'}`}>Trending</button>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-outline uppercase">
            <span>Sort by:</span>
            <select className="bg-transparent border-none font-bold text-primary focus:ring-0 cursor-pointer uppercase py-0 px-1">
              <option>Activity Density</option>
              <option>Member Volume</option>
              <option>Recent Entry</option>
            </select>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredGroups.length === 0 && (
             <div className="py-20 text-center font-mono text-sm text-outline uppercase tracking-widest break-inside-avoid">
               NO PORTALS FOUND. CREATE ONE ABOVE.
             </div>
          )}
          {filteredGroups.map((group) => {
            const isJoined = joinedGroups[group.id];
            
            return (
              <div key={group.id} className={`break-inside-avoid bg-white border-[1.5px] border-outline border-l-[6px] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-shadow relative`} style={{ borderLeftColor: group.color }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest bg-surface-container px-2 py-0.5 border border-outline/20">{group.tag}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#d4930a] active-dot"></span>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#d4930a]">Active</span>
                  </div>
                </div>
                <h4 className="font-serif text-2xl font-bold mb-2">{group.title}</h4>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{group.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant border-dashed">
                  <span className="font-mono text-xs font-bold text-primary">/// {group.members + (isJoined ? 1 : 0)} MEMBERS</span>
                  <div className="flex items-center gap-3">
                    {isJoined && (
                      <button 
                        onClick={() => toggleJoin(group.id)}
                        className="font-mono text-[10px] uppercase tracking-widest text-[#d4930a] hover:text-error transition-colors"
                      >
                        Disconnect
                      </button>
                    )}
                    <button 
                      onClick={() => isJoined ? setActiveChatGroupId(group.id) : toggleJoin(group.id)}
                      className={`font-mono text-xs font-bold uppercase tracking-widest border-[1.5px] border-black px-4 py-2 transition-all ${isJoined ? 'bg-black text-white hover:bg-surface-tint hover:border-surface-tint shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none' : 'hover:bg-black hover:text-white'}`}
                    >
                      {isJoined ? 'Enter Portal' : 'Join Network'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="h-[1.5px] w-full bg-outline-variant relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-surface px-4 font-mono text-[10px] text-outline uppercase tracking-widest italic">END OF ARCHIVE PAGE 1</div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 border-[1.5px] border-black flex items-center justify-center font-mono font-bold bg-black text-white">1</button>
            <button className="w-10 h-10 border-[1.5px] border-outline flex items-center justify-center font-mono hover:bg-surface-container transition-colors">2</button>
            <button className="w-10 h-10 border-[1.5px] border-outline flex items-center justify-center font-mono hover:bg-surface-container transition-colors">3</button>
            <button className="w-10 h-10 border-[1.5px] border-outline flex items-center justify-center font-mono hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals & Overlays */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-lg w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Initialize Portal</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Create a new local environment for peer collaboration.</p>
            
            <form className="space-y-6" onSubmit={handleCreateGroup}>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Group Title</label>
                <input required name="title" type="text" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Advanced Rust Concepts" />
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">System Tag (Short)</label>
                <input required name="tag" type="text" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary uppercase" placeholder="RUST_ADV_01" maxLength={20} />
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Protocol Description</label>
                <textarea required name="desc" rows={3} className="border-[1.5px] border-outline bg-surface-container-low font-body text-sm py-2 px-3 focus:border-primary outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="A dedicated group for exploring zero-cost abstractions..."></textarea>
              </div>

              <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0f1a2e] hover:text-error transition-colors">Abort</button>
                <button type="submit" className="bg-[#d4930a] text-white border-[1.5px] border-[#d4930a] px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2">
                   Deploy Portal <span className="material-symbols-outlined text-sm">public</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeChatGroupId && activeGroup && (
        <div className="fixed inset-0 bg-surface/95 backdrop-blur-md z-[110] flex flex-col animate-in fade-in duration-300">
          <header className="border-b-[1.5px] border-outline-variant bg-surface flex justify-between items-center px-8 py-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.05)]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="w-2 h-2 bg-secondary animate-pulse rounded-full"></span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#d4930a] tracking-widest">{activeGroup.tag} MULTIPLEX</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary italic">{activeGroup.title}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right font-mono text-xs text-outline hidden md:block">
                <p>USERS SECURED: {Math.floor((activeGroup.members + 1) / 3)}</p>
                <p>PING: 24ms</p>
              </div>
              <button onClick={() => setActiveChatGroupId(null)} className="material-symbols-outlined text-3xl p-2 text-outline hover:bg-surface-container hover:text-error transition-all border-[1.5px] border-transparent shadow-none active:translate-y-[1px]">close</button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6 flex flex-col pt-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-surface-container">
              <div className="flex-1"></div>
               {/* Mock Messages */}
               <div className="border-[1.5px] border-outline bg-white p-5 max-w-2xl w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] self-start animate-in slide-in-from-bottom-2">
                 <div className="flex justify-between items-end mb-3 border-b border-dashed border-outline-variant pb-2">
                   <div className="flex gap-2 items-center">
                      <span className="material-symbols-outlined text-sm text-[#0f1a2e]">admin_panel_settings</span>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#0f1a2e]">@SYS_ADMIN</span>
                   </div>
                   <span className="font-mono text-[9px] uppercase text-outline">10:41 AM</span>
                 </div>
                 <p className="font-body text-sm text-on-surface leading-relaxed">Welcome to the {activeGroup.title} active comms channel. Please refer to the syllabus before pinging architects. Logs are recorded indefinitely.</p>
               </div>

               <div className="border-[1.5px] border-primary bg-primary text-[#fffae4] p-5 max-w-2xl w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-end relative animate-in slide-in-from-bottom-4 ml-auto">
                 <div className="flex justify-between items-end mb-3 border-b border-dashed border-white/20 pb-2">
                   <div className="flex gap-2 items-center">
                     <span className="material-symbols-outlined text-sm text-[#d4930a]">terminal</span>
                     <span className="font-mono text-[10px] uppercase font-bold text-[#d4930a]">@ELIAS_V</span>
                   </div>
                   <span className="font-mono text-[9px] uppercase text-[#fffae4] opacity-50">14:22 PM</span>
                 </div>
                 <p className="font-body text-sm text-[#fffae4] leading-relaxed">Has anyone figured out the load balancing algorithm required for Section 4? I'm hitting a 502 Bad Gateway on the node clustering step.</p>
               </div>
               
               <div className="border-[1.5px] border-outline bg-white p-5 max-w-2xl w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] self-start animate-in slide-in-from-bottom-5">
                 <div className="flex justify-between items-end mb-3 border-b border-dashed border-outline-variant pb-2">
                   <div className="flex gap-2 items-center">
                      <span className="material-symbols-outlined text-sm text-[#4e6b52]">code_blocks</span>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#4e6b52]">@NODE_RUNNER</span>
                   </div>
                   <span className="font-mono text-[9px] uppercase text-outline">14:25 PM</span>
                 </div>
                 <p className="font-body text-sm text-on-surface leading-relaxed">Yeah, Elias. Check the pinned resources, you need to implement a consistent hashing ring first inside the NGINX config. Reverse proxy is dropping packets.</p>
               </div>
               
               {/* Transmitted Local Messages */}
               {activeChatGroupId && groupMessages[activeChatGroupId] && groupMessages[activeChatGroupId].map(msg => (
                 <div key={msg.id} className="border-[1.5px] border-primary bg-primary text-[#fffae4] p-5 max-w-2xl w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-end relative animate-in slide-in-from-bottom-2 ml-auto">
                   <div className="flex justify-between items-end mb-3 border-b border-dashed border-white/20 pb-2">
                     <div className="flex gap-2 items-center">
                       <span className="material-symbols-outlined text-sm text-[#d4930a]">terminal</span>
                       <span className="font-mono text-[10px] uppercase font-bold text-[#d4930a]">@ELIAS_V (ME)</span>
                     </div>
                     <span className="font-mono text-[9px] uppercase text-[#fffae4] opacity-50">{msg.time}</span>
                   </div>
                   <p className="font-body text-sm text-[#fffae4] leading-relaxed">{msg.text}</p>
                 </div>
               ))}
          </div>

          <div className="p-8 border-t-[1.5px] border-outline-variant bg-surface shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.02)] relative z-10">
             <form 
               onSubmit={handleSendMessage}
               className="flex gap-4 max-w-5xl mx-auto items-center"
             >
               <div className="flex-1 relative border-[1.5px] border-outline shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-within:!shadow-none focus-within:!translate-x-[4px] focus-within:!translate-y-[4px]">
                 <span className="absolute left-4 top-1/2 -translate-y-[12px] font-mono text-outline font-bold">{'>'}</span>
                 <input 
                   type="text" 
                   name="message"
                   required
                   autoFocus
                   placeholder="Transmit message to portal..." 
                   className="w-full pl-8 pr-4 py-4 bg-white font-mono text-sm focus:outline-none placeholder:text-outline/70"
                 />
               </div>
               <button type="submit" className="bg-[#d4930a] text-[#0f1a2e] border-[1.5px] border-black px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2 active:bg-[#ffb01f]">
                 Transmit <span className="material-symbols-outlined text-base">send</span>
               </button>
             </form>
          </div>
        </div>
      )}

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
                    <p className="font-mono text-[10px] text-[#4e6b52] font-bold uppercase tracking-widest">Active Operations</p>
                 </div>
              </div>
            </div>

            <div className="border-t-[1.5px] border-outline-variant pt-6 flex flex-col gap-3 mt-8">
              <Link href="/settings" className="w-full py-3 border-[1.5px] border-primary flex justify-center items-center gap-2 font-mono text-xs uppercase tracking-widest hover:bg-surface-container font-bold text-primary active:scale-95 transition-all">
                <span className="material-symbols-outlined text-sm">settings</span> Navigation
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
