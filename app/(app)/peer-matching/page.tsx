"use client";

import { useState } from "react";
import { useAuth, usePeerMatches, useUserSkills, useAllSkills } from "../../hooks";

export default function PeerMatchingPage() {
  const { user } = useAuth();
  const { matches, bySkill, loading } = usePeerMatches(user?.id);
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState("All Archives");
  const [searchQuery, setSearchQuery] = useState("");

  const handleConnect = (id: string) => {
    setConnections(prev => ({ ...prev, [id]: true }));
  };

  // Get unique teachers from matches, deduplicated by teacher_id
  const uniqueTeachers = Object.values(
    matches.reduce((acc: Record<string, any>, match: any) => {
      if (!acc[match.teacher_id]) {
        acc[match.teacher_id] = {
          id: match.teacher_id,
          name: match.teacher_name || "Anonymous",
          avatar: match.teacher_avatar,
          teach: [],
          learn: [],
        };
      }
      acc[match.teacher_id].teach.push(match.skill_name);
      return acc;
    }, {})
  );

  // Filter by search
  const filtered = uniqueTeachers.filter((p: any) =>
    searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.teach.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
  );

  // Show a placeholder card if not logged in or no matches
  const showEmpty = !loading && filtered.length === 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fffae4] border-b-[1.5px] border-[#75777d] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex flex-col justify-end items-start w-full pt-8 pb-4 px-10">
        <div className="flex justify-between items-end w-full">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#75777d] mb-1 block">The Human Archive / Peer matching</span>
            <h2 className="font-serif text-5xl italic text-[#0f1a2e]">Dossier Index</h2>
          </div>
          <div className="flex items-center gap-4 pb-1">
            <button className="material-symbols-outlined p-2 border border-outline hover:bg-surface-container transition-colors">notifications</button>
            <button className="material-symbols-outlined p-2 border border-outline hover:bg-surface-container transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      <section className="px-10 pt-10 pb-2">
        <div className="flex flex-wrap items-center justify-between border-b border-outline-variant pb-4">
          <div className="flex gap-0">
            {["All Archives", "Engineering", "Design", "Data Science"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary transition-colors ${
                  activeFilter === tab
                    ? "bg-primary text-surface"
                    : "bg-surface text-primary border-l-0 hover:bg-surface-container"
                } ${tab !== "All Archives" ? "border-l-0" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 border-[1.5px] border-outline bg-surface-container-low font-mono text-xs focus:ring-0 focus:border-primary-container outline-none placeholder:text-outline/50"
              placeholder="SEARCH BY KEYWORD..."
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">Sort By:</span>
              <div className="flex gap-3">
                <button className="font-mono text-[11px] uppercase tracking-tighter underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Archive Entry Date</button>
                <button className="font-mono text-[11px] uppercase tracking-tighter underline underline-offset-4 decoration-primary hover:decoration-primary font-bold">Skill Match</button>
                <button className="font-mono text-[11px] uppercase tracking-tighter underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Rating</button>
                <button className="font-mono text-[11px] uppercase tracking-tighter underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Availability</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 py-8 pb-20">
        {!user && (
          <div className="py-20 text-center border-[1.5px] border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-4 block">lock</span>
            <p className="font-mono text-xs uppercase tracking-widest text-outline mb-2">Sign in to see your peer matches</p>
            <p className="font-mono text-[10px] text-outline/60">Matches are based on your learn/teach skills</p>
          </div>
        )}

        {user && loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-surface border-[1.5px] border-outline p-6 animate-pulse h-72" />
            ))}
          </div>
        )}

        {user && showEmpty && !loading && (
          <div className="py-20 text-center border-[1.5px] border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-4 block">person_search</span>
            <p className="font-mono text-xs uppercase tracking-widest text-outline mb-2">No matches found yet</p>
            <p className="font-mono text-[10px] text-outline/60">Add skills you want to learn in your profile to find peers</p>
          </div>
        )}

        {user && !loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(filtered as any[]).map((peer: any) => (
              <div key={peer.id} className="bg-surface border-[1.5px] border-outline p-6 flex flex-col hard-shadow-sm transition-all hard-shadow-hover group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 border-[1.5px] border-primary p-1 bg-surface-container flex items-center justify-center overflow-hidden">
                    {peer.avatar ? (
                      <img className="w-full h-full object-cover grayscale" src={peer.avatar} alt={peer.name} />
                    ) : (
                      <span className="material-symbols-outlined text-3xl text-outline">account_circle</span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-outline px-2 border border-outline">
                    ID: {peer.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>

                <div className="mb-2">
                  <h3 className="font-serif text-3xl font-bold italic text-primary leading-tight">{peer.name}</h3>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="material-symbols-outlined text-[14px] star-filled">star</span>
                    ))}
                    <span className="material-symbols-outlined text-[14px] text-outline/30">star</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6 mt-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-outline mb-1">Can teach:</p>
                    <div className="flex flex-wrap gap-2">
                      {peer.teach.map((s: string, i: number) => (
                        <span key={i} className="font-mono text-[10px] bg-surface-container-highest px-2 py-0.5 border border-outline-variant">{s}</span>
                      ))}
                    </div>
                  </div>
                  {bySkill && Object.keys(bySkill).length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-outline mb-1">Matches your goal:</p>
                      <div className="flex flex-wrap gap-2">
                        {peer.teach.filter((s: string) => bySkill[s]).map((s: string, i: number) => (
                          <span key={i} className="font-mono text-[10px] bg-[#d4930a]/10 text-[#d4930a] px-2 py-0.5 border border-[#d4930a]/30">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-outline-variant flex gap-3">
                  {!connections[peer.id] ? (
                    <button
                      onClick={() => handleConnect(peer.id)}
                      className="flex-1 py-2 font-mono text-xs font-bold border-[1.5px] border-primary hover:bg-[#d4930a] hover:text-white transition-all uppercase tracking-widest"
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 font-mono text-xs font-bold border-[1.5px] border-outline text-outline transition-all uppercase tracking-widest"
                    >
                      Pending
                    </button>
                  )}
                  <button className="px-3 py-2 border-[1.5px] border-primary hover:bg-primary hover:text-white transition-all material-symbols-outlined">mail</button>
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
