"use client";

import { useState } from "react";
import Link from "next/link";
import { usePremium } from "../../contexts/PremiumContext";
import { useAuth, useGroups, useMembership, useMessages, useCreateGroup } from "../../hooks";

// ─── Individual group card with live join/leave ───────────────────────────────
function GroupCard({ group, onEnter }: { group: any; onEnter: (g: any) => void }) {
  const { user } = useAuth();
  const { joined, memberCount, joining, join, leave } = useMembership(group.id, user?.id ?? null, group.member_count);

  const colorMap: Record<string, string> = {
    DESIGN: "#d4930a", DEVELOPMENT: "#4e6b52", LANGUAGE: "#8b3a1c",
    DATA: "#8b3a1c", MATH: "#4e6b52", WRITING: "#0f1a2e",
  };
  const color = colorMap[group.tag] ?? "#d4930a";

  return (
    <div
      className="break-inside-avoid bg-white border-[1.5px] border-outline border-l-[6px] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-shadow relative"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest bg-surface-container px-2 py-0.5 border border-outline/20">{group.code ?? group.tag}</span>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${group.status === "ACTIVE" ? "bg-[#d4930a] active-dot" : "bg-outline"}`}></span>
          <span className={`font-mono text-[10px] uppercase font-bold ${group.status === "ACTIVE" ? "text-[#d4930a]" : "text-outline"}`}>{group.status}</span>
        </div>
      </div>
      <h4 className="font-serif text-2xl font-bold mb-2">{group.title}</h4>
      <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{group.description}</p>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between pt-4 border-t border-outline-variant border-dashed gap-4">
        <span className="font-mono text-xs font-bold text-primary whitespace-nowrap">/// {memberCount} / {group.capacity} MEMBERS</span>
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto xl:justify-end">
          {joined && (
            <button
              onClick={leave}
              disabled={joining}
              className="font-mono text-[10px] uppercase tracking-widest text-[#d4930a] hover:text-error transition-colors whitespace-nowrap"
            >
              Disconnect
            </button>
          )}
          <button
            onClick={() => {
              if (!joined) join();
              onEnter(group);
            }}
            disabled={joining}
            className={`font-mono text-xs font-bold uppercase tracking-widest border-[1.5px] border-black px-4 py-2 transition-all whitespace-nowrap min-w-[130px] flex justify-center items-center ${
              joined
                ? "bg-black text-white hover:bg-surface-tint hover:border-surface-tint shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none"
                : "hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none bg-surface"
            }`}
          >
            {joining ? "..." : joined ? "Enter Portal" : "Join Network"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Chat panel ───────────────────────────────────────────────────────────────
function ChatPanel({ group, onClose }: { group: any; onClose: () => void }) {
  const { user } = useAuth();
  const { messages, loading, send, sending } = useMessages(group.id);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement;
    await send(input.value);
    input.value = "";
  };

  return (
    <div className="fixed inset-0 bg-surface/95 backdrop-blur-md z-[110] flex flex-col animate-in fade-in duration-300">
      <header className="border-b-[1.5px] border-outline-variant bg-surface flex justify-between items-center px-8 py-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="w-2 h-2 bg-secondary animate-pulse rounded-full"></span>
            <span className="font-mono text-[10px] uppercase font-bold text-[#d4930a] tracking-widest">{group.code ?? group.tag} MULTIPLEX</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary italic">{group.title}</h2>
        </div>
        <button onClick={onClose} className="material-symbols-outlined text-3xl p-2 text-outline hover:bg-surface-container hover:text-error transition-all border-[1.5px] border-transparent">close</button>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col bg-surface-container">
        <div className="flex-1" />
        {loading && <p className="font-mono text-xs text-outline text-center uppercase">Loading messages...</p>}
        {messages.map((msg: any) => {
          const isMe = msg.user_id === user?.id;
          return (
            <div
              key={msg.id}
              className={`border-[1.5px] p-5 max-w-2xl w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-2 ${
                isMe ? "border-primary bg-primary text-[#fffae4] self-end ml-auto" : "border-outline bg-white self-start"
              }`}
            >
              <div className={`flex justify-between items-end mb-3 border-b border-dashed pb-2 ${isMe ? "border-white/20" : "border-outline-variant"}`}>
                <div className="flex gap-2 items-center">
                  <span className={`material-symbols-outlined text-sm ${isMe ? "text-[#d4930a]" : "text-[#0f1a2e]"}`}>terminal</span>
                  <span className={`font-mono text-[10px] uppercase font-bold ${isMe ? "text-[#d4930a]" : "text-[#0f1a2e]"}`}>
                    {msg.profiles?.full_name ?? "Anonymous"}
                  </span>
                </div>
                <span className={`font-mono text-[9px] uppercase ${isMe ? "text-[#fffae4] opacity-50" : "text-outline"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className={`font-body text-sm leading-relaxed ${isMe ? "text-[#fffae4]" : "text-on-surface"}`}>{msg.content}</p>
            </div>
          );
        })}
      </div>

      <div className="p-8 border-t-[1.5px] border-outline-variant bg-surface">
        <form onSubmit={handleSend} className="flex gap-4 max-w-5xl mx-auto items-center">
          <div className="flex-1 relative border-[1.5px] border-outline shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-within:!shadow-none focus-within:!translate-x-[4px] focus-within:!translate-y-[4px]">
            <span className="absolute left-4 top-1/2 -translate-y-[12px] font-mono text-outline font-bold">{">"}</span>
            <input
              type="text"
              name="message"
              required
              autoFocus
              placeholder="Transmit message to portal..."
              className="w-full pl-8 pr-4 py-4 bg-white font-mono text-sm focus:outline-none placeholder:text-outline/70"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="bg-[#d4930a] text-[#0f1a2e] border-[1.5px] border-black px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2 active:bg-[#ffb01f]"
          >
            {sending ? "..." : "Transmit"} <span className="material-symbols-outlined text-base">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function StudyGroupsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("All Portals");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifSettings, setNotifSettings] = useState({ tags: true, portals: false, digest: true });
  const [activeChatGroup, setActiveChatGroup] = useState<any>(null);
  const { isPremium } = usePremium();

  const filter = activeTab === "My Groups" ? "MY_GROUPS" : activeTab === "Trending" ? "TRENDING" : "ALL";
  const { groups, loading, refetch } = useGroups(user?.id ?? null);
  const { create, creating, error: createError } = useCreateGroup((newGroup) => {
    setShowCreateModal(false);
    refetch();
  });

  const filteredGroups = groups.filter(g =>
    searchQuery
      ? g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await create({
      code: (formData.get("tag") as string).toUpperCase(),
      tag: (formData.get("tag") as string).toUpperCase().split("_")[0],
      title: formData.get("title") as string,
      description: formData.get("desc") as string,
      capacity: 20,
    });
  };

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
            <button onClick={() => setShowSearch(!showSearch)} className={`material-symbols-outlined p-2 border-[1.5px] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none ${showSearch ? "bg-primary text-white border-primary" : "border-outline hover:bg-surface-container"}`}>search</button>
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
                    {[["portals", "Portal Activity"], ["tags", "Direct Mentions"], ["digest", "Daily Terminal Digest"]].map(([key, label]) => (
                      <label key={key} className="flex items-center justify-between cursor-pointer group">
                        <span className="font-mono text-[10px] uppercase text-[#0f1a2e] group-hover:text-primary transition-colors font-bold tracking-widest">{label}</span>
                        <input type="checkbox" checked={notifSettings[key as keyof typeof notifSettings]} onChange={() => setNotifSettings(p => ({ ...p, [key]: !p[key as keyof typeof notifSettings] }))} className="accent-[#d4930a] w-4 h-4 cursor-pointer border-[1.5px] border-outline shadow-sm" />
                      </label>
                    ))}
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
            {["All Portals", "My Groups", "Trending"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono text-sm uppercase tracking-tighter transition-colors pb-4 ${activeTab === tab ? "font-bold text-surface-tint border-b-2 border-surface-tint -mb-[18px]" : "text-outline hover:text-primary"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="break-inside-avoid bg-white border-[1.5px] border-outline p-6 h-48 animate-pulse" />
            ))}
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="py-20 text-center font-mono text-sm text-outline uppercase tracking-widest">
            NO PORTALS FOUND. CREATE ONE ABOVE.
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredGroups.map(group => (
              <GroupCard key={group.id} group={group} onEnter={setActiveChatGroup} />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#0f1a2e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border-[1.5px] border-primary max-w-lg w-full p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-outline hover:text-error transition-colors material-symbols-outlined">close</button>
            <h3 className="font-serif italic text-3xl text-primary mb-2">Initialize Portal</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Create a new local environment for peer collaboration.</p>
            <form className="space-y-6" onSubmit={handleCreateGroup}>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Group Title</label>
                <input required name="title" type="text" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none" placeholder="e.g. Advanced Rust Concepts" />
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">System Tag (Short)</label>
                <input required name="tag" type="text" className="border-[1.5px] border-outline bg-surface-container-low font-mono text-sm py-2 px-3 focus:border-primary outline-none uppercase" placeholder="RUST_ADV_01" maxLength={20} />
              </div>
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-outline mb-1">Protocol Description</label>
                <textarea required name="desc" rows={3} className="border-[1.5px] border-outline bg-surface-container-low font-body text-sm py-2 px-3 focus:border-primary outline-none resize-none" placeholder="A dedicated group for exploring..."></textarea>
              </div>
              {createError && <p className="font-mono text-xs text-error">{createError}</p>}
              <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0f1a2e] hover:text-error transition-colors">Abort</button>
                <button type="submit" disabled={creating} className="bg-[#d4930a] text-white border-[1.5px] border-[#d4930a] px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2">
                  {creating ? "Deploying..." : "Deploy Portal"} <span className="material-symbols-outlined text-sm">public</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {activeChatGroup && (
        <ChatPanel group={activeChatGroup} onClose={() => setActiveChatGroup(null)} />
      )}

      {/* Profile Drawer */}
      {showProfileDrawer && (
        <>
          <div className="fixed inset-0 bg-[#0f1a2e]/40 backdrop-blur-md z-[90] animate-in fade-in" onClick={() => setShowProfileDrawer(false)}></div>
          <div className="fixed right-0 top-0 h-full w-[350px] bg-surface border-l-[1.5px] border-primary shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.4)] z-[100] p-8 flex flex-col pt-12 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center pb-6 border-b-[1.5px] border-outline-variant mb-8">
              <h3 className="font-serif italic text-3xl text-primary">Identity</h3>
              <button onClick={() => setShowProfileDrawer(false)} className="material-symbols-outlined text-outline hover:text-error transition-colors">close</button>
            </div>
            <div className="flex flex-col items-center mb-10">
              <div className="w-32 h-32 bg-surface-container border-[1.5px] border-primary mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-outline">account_circle</span>
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                {user?.email?.split("@")[0] ?? "Guest"}
                {isPremium && (
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-[#d4930a] text-[#0f1a2e] px-1.5 py-0.5 border border-[#d4930a]">PRO</span>
                )}
              </h4>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4930a] mt-2 bg-[#d4930a]/10 px-3 py-1 border border-[#d4930a] font-bold">
                {user ? "Active Member" : "Guest"}
              </span>
            </div>
            <div className="border-t-[1.5px] border-outline-variant pt-6 flex flex-col gap-3 mt-auto">
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
