"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks";
import { supabase } from "../../lib/supabase";

export default function PeerMatchingPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState("All Archives");
  const [searchQuery, setSearchQuery] = useState("");
  const [newHave, setNewHave] = useState("");
  const [newNeed, setNewNeed] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSkillPanel, setShowSkillPanel] = useState(false);

  // Fetch profile
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).single()
      .then(({ data }) => setProfile(data));
  }, [user]);

  // Fetch matches
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from("skill_swap_matches")
      .select("*")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .order("match_score", { ascending: false })
      .then(({ data }) => {
        setMatches(data ?? []);
        setLoading(false);
      });
  }, [user, profile]);

  const addSkillHave = async () => {
    if (!newHave.trim() || !profile) return;
    setSaving(true);
    const updated = [...new Set([...(profile.skills_have ?? []), newHave.trim()])];
    const { data } = await supabase.from("profiles").update({ skills_have: updated }).eq("id", user.id).select().single();
    setProfile(data);
    setNewHave("");
    setSaving(false);
  };

  const addSkillNeed = async () => {
    if (!newNeed.trim() || !profile) return;
    setSaving(true);
    const updated = [...new Set([...(profile.skills_needed ?? []), newNeed.trim()])];
    const { data } = await supabase.from("profiles").update({ skills_needed: updated }).eq("id", user.id).select().single();
    setProfile(data);
    setNewNeed("");
    setSaving(false);
  };

  const removeSkillHave = async (skill: string) => {
    const updated = profile.skills_have.filter((s: string) => s !== skill);
    const { data } = await supabase.from("profiles").update({ skills_have: updated }).eq("id", user.id).select().single();
    setProfile(data);
  };

  const removeSkillNeed = async (skill: string) => {
    const updated = profile.skills_needed.filter((s: string) => s !== skill);
    const { data } = await supabase.from("profiles").update({ skills_needed: updated }).eq("id", user.id).select().single();
    setProfile(data);
  };

  // Normalise matches so current user is always "you"
  const normalisedMatches = matches.map(m => {
    const isUser1 = m.user1_id === user?.id;
    return {
      id:         isUser1 ? m.user2_id    : m.user1_id,
      name:       isUser1 ? m.user2_name  : m.user1_name,
      avatar:     isUser1 ? m.user2_avatar: m.user1_avatar,
      youTeach:   isUser1 ? m.user1_teaches_user2 : m.user2_teaches_user1,
      theyTeach:  isUser1 ? m.user2_teaches_user1 : m.user1_teaches_user2,
      matchScore: m.match_score,
    };
  });

  const filtered = normalisedMatches.filter((p: any) =>
    searchQuery
      ? p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.theyTeach?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fffae4] border-b-[1.5px] border-[#75777d] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex flex-col justify-end items-start w-full pt-8 pb-4 px-10">
        <div className="flex justify-between items-end w-full">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#75777d] mb-1 block">The Human Archive / Peer matching</span>
            <h2 className="font-serif text-5xl italic text-[#0f1a2e]">Dossier Index</h2>
          </div>
          <div className="flex items-center gap-3 pb-1">
            {user && (
              <button
                onClick={() => setShowSkillPanel(!showSkillPanel)}
                className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border-[1.5px] transition-all ${
                  showSkillPanel
                    ? "bg-[#0f1a2e] text-[#fffae4] border-[#0f1a2e]"
                    : "border-[#0f1a2e] text-[#0f1a2e] hover:bg-[#0f1a2e] hover:text-[#fffae4]"
                }`}
              >
                {showSkillPanel ? "✕ Close Skills" : "+ My Skills"}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── SKILL PANEL ── */}
      {showSkillPanel && profile && (
        <div className="mx-10 mt-6 border-[1.5px] border-[#0f1a2e] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
          <div className="border-b border-[#75777d]/30 px-6 py-3 bg-[#0f1a2e]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#fffae4]">My Skill Profile — updates matches in real time</span>
          </div>
          <div className="grid grid-cols-2 gap-0">
            {/* Can Teach */}
            <div className="p-6 border-r border-[#75777d]/30">
              <p className="font-mono text-[10px] uppercase tracking-widest text-green-700 mb-3">✦ Skills I Can Teach</p>
              <div className="flex flex-wrap gap-2 mb-4 min-h-8">
                {(profile.skills_have ?? []).map((skill: string) => (
                  <span key={skill} className="flex items-center gap-1 bg-green-50 border border-green-300 text-green-800 font-mono text-[10px] px-2 py-1 uppercase">
                    {skill}
                    <button onClick={() => removeSkillHave(skill)} className="text-green-400 hover:text-red-500 ml-1">×</button>
                  </span>
                ))}
                {(profile.skills_have ?? []).length === 0 && (
                  <span className="font-mono text-[10px] text-[#75777d]/50">No skills added yet</span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  value={newHave}
                  onChange={e => setNewHave(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addSkillHave()}
                  placeholder="e.g. React, Figma..."
                  className="flex-1 border-[1.5px] border-[#75777d] bg-[#fffae4] font-mono text-xs px-3 py-2 outline-none focus:border-[#0f1a2e]"
                />
                <button onClick={addSkillHave} disabled={saving || !newHave.trim()}
                  className="bg-green-700 text-white font-mono text-[10px] uppercase tracking-widest px-4 py-2 disabled:opacity-50">
                  Add
                </button>
              </div>
            </div>

            {/* Want to Learn */}
            <div className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-3">✦ Skills I Want to Learn</p>
              <div className="flex flex-wrap gap-2 mb-4 min-h-8">
                {(profile.skills_needed ?? []).map((skill: string) => (
                  <span key={skill} className="flex items-center gap-1 bg-blue-50 border border-blue-300 text-blue-800 font-mono text-[10px] px-2 py-1 uppercase">
                    {skill}
                    <button onClick={() => removeSkillNeed(skill)} className="text-blue-400 hover:text-red-500 ml-1">×</button>
                  </span>
                ))}
                {(profile.skills_needed ?? []).length === 0 && (
                  <span className="font-mono text-[10px] text-[#75777d]/50">No skills added yet</span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  value={newNeed}
                  onChange={e => setNewNeed(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addSkillNeed()}
                  placeholder="e.g. Python, ML..."
                  className="flex-1 border-[1.5px] border-[#75777d] bg-[#fffae4] font-mono text-xs px-3 py-2 outline-none focus:border-[#0f1a2e]"
                />
                <button onClick={addSkillNeed} disabled={saving || !newNeed.trim()}
                  className="bg-blue-700 text-white font-mono text-[10px] uppercase tracking-widest px-4 py-2 disabled:opacity-50">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="px-10 pt-10 pb-2">
        <div className="flex flex-wrap items-center justify-between border-b border-outline-variant pb-4">
          <div className="flex gap-0">
            {["All Archives", "Engineering", "Design", "Data Science"].map(tab => (
              <button key={tab} onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary transition-colors ${
                  activeFilter === tab ? "bg-primary text-surface" : "bg-surface text-primary border-l-0 hover:bg-surface-container"
                } ${tab !== "All Archives" ? "border-l-0" : ""}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">search</span>
            <input className="w-full pl-10 pr-4 py-2 border-[1.5px] border-outline bg-surface-container-low font-mono text-xs focus:ring-0 outline-none placeholder:text-outline/50"
              placeholder="SEARCH BY KEYWORD..." type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="px-10 py-8 pb-20">
        {!user && (
          <div className="py-20 text-center border-[1.5px] border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-4 block">lock</span>
            <p className="font-mono text-xs uppercase tracking-widest text-outline">Sign in to see your peer matches</p>
          </div>
        )}

        {user && loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="bg-surface border-[1.5px] border-outline p-6 animate-pulse h-72" />)}
          </div>
        )}

        {user && !loading && filtered.length === 0 && (
          <div className="py-20 text-center border-[1.5px] border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-4 block">person_search</span>
            <p className="font-mono text-xs uppercase tracking-widest text-outline mb-2">No matches found yet</p>
            <p className="font-mono text-[10px] text-outline/60">Click <strong>"+ My Skills"</strong> above → add what you know and what you want to learn</p>
          </div>
        )}

        {user && !loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filtered.map((peer: any) => (
              <div key={peer.id} className="bg-surface border-[1.5px] border-outline p-6 flex flex-col group hover:shadow-[4px_4px_0px_0px_rgba(212,147,10,1)] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 border-[1.5px] border-primary p-1 bg-surface-container flex items-center justify-center">
                    <span className="font-serif text-2xl text-[#0f1a2e] font-bold">{peer.name?.[0] ?? "?"}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#d4930a] px-2 border border-[#d4930a]/30 bg-[#d4930a]/10">
                    MATCH SCORE: {peer.matchScore}
                  </span>
                </div>

                <h3 className="font-serif text-3xl font-bold italic text-primary leading-tight mb-4">{peer.name ?? "Anonymous"}</h3>

                <div className="space-y-3 mb-6">
                  {peer.theyTeach?.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-green-700 mb-1">They teach you:</p>
                      <div className="flex flex-wrap gap-1">
                        {peer.theyTeach.map((s: string, i: number) => (
                          <span key={i} className="font-mono text-[10px] bg-green-50 border border-green-200 text-green-800 px-2 py-0.5">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {peer.youTeach?.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-blue-700 mb-1">You teach them:</p>
                      <div className="flex flex-wrap gap-1">
                        {peer.youTeach.map((s: string, i: number) => (
                          <span key={i} className="font-mono text-[10px] bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant">
                  {!connections[peer.id] ? (
                    <button onClick={() => setConnections(prev => ({ ...prev, [peer.id]: true }))}
                      className="w-full py-2 font-mono text-xs font-bold border-[1.5px] border-primary hover:bg-[#d4930a] hover:text-white transition-all uppercase tracking-widest">
                      Connect →
                    </button>
                  ) : (
                    <button disabled className="w-full py-2 font-mono text-xs font-bold border-[1.5px] border-outline text-outline uppercase tracking-widest">
                      Request Sent ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="px-10 pb-12 flex justify-between items-center border-t border-outline-variant pt-8">
        <span className="font-mono text-[10px] text-outline uppercase tracking-widest">
          Displaying {filtered.length} match{filtered.length !== 1 ? "es" : ""}
        </span>
      </footer>
    </>
  );
}
