"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePremium } from "../contexts/PremiumContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { isPremium, openUpgradeModal } = usePremium();

  const isMatched = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const navLinks: { name: string, href: string, icon: string, premium?: boolean }[] = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Roadmap", href: "/roadmap", icon: "route" },
    { name: "Resource Hub", href: "/resource-hub", icon: "library_books" },
    { name: "Peer Matching", href: "/peer-matching", icon: "group_add" },
    { name: "Mentorship", href: "/mentorship", icon: "school", premium: true },
    { name: "Study Groups", href: "/study-groups", icon: "groups" },
    { name: "Resume Builder", href: "/resume-builder", icon: "description" },
    { name: "Integrated AI", href: "/ai-assistant", icon: "psychology" },
  ];

  const bottomLinks = [
    { name: "Settings", href: "/settings", icon: "settings" },
    { name: "Support", href: "/support", icon: "help_outline" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] border-r-[1.5px] border-outline bg-primary-container flex flex-col py-8 z-50 shadow-[4px_0px_0px_0px_rgba(0,0,0,0.4)]">
      <div className="p-6 border-b-[3px] border-primary-container bg-primary-container shrink-0">
        <h1 className="font-serif italic text-2xl text-on-tertiary tracking-tighter">SKILLEX</h1>
        <p className="font-mono text-[10px] text-[#fffae4]/50 mt-1 uppercase tracking-widest">Skill Platform</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3">
        {navLinks.map((link) => {
          const active = isMatched(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                group flex items-center gap-3 px-4 py-3 font-mono uppercase tracking-widest text-[#fffae4]/70 hover:text-white transition-colors
                ${active
                  ? "bg-surface-tint text-primary-container font-bold shadow-[2px_2px_0px_0px_black] transform active:scale-95"
                  : "border-l-[3px] border-transparent hover:bg-[#fffae4]/10 transform active:scale-95"}
              `}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontSize: "18px" }}>
                {link.icon}
              </span>
              <span className="text-[10px] md:text-xs tracking-tighter sm:tracking-widest flex items-center justify-between flex-1">
                {link.name}
                {link.premium && (
                  isPremium ?
                    <span className="font-mono text-[8px] uppercase tracking-widest bg-[#d4930a] text-[#0f1a2e] px-1 py-0.5 border border-[#d4930a] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]">PRO</span> :
                    <span className="material-symbols-outlined text-[12px] text-[#fffae4]/30 group-hover:text-[#d4930a] transition-colors">lock</span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 flex flex-col gap-1 border-t border-[#fffae4]/10 pt-4">
        {bottomLinks.map((link) => {
          const active = isMatched(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                flex items-center gap-3 px-4 py-3 font-mono uppercase tracking-widest text-xs text-[#fffae4]/70 hover:text-white transition-colors
                ${active
                  ? "bg-[#1a2b45] text-white border-l-[3px] border-surface-tint font-bold"
                  : "border-l-[3px] border-transparent hover:bg-[#fffae4]/10 transform active:scale-95"}
              `}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontSize: "18px" }}>
                {link.icon}
              </span>
              <span className="text-[10px] md:text-xs tracking-tighter sm:tracking-widest">{link.name}</span>
            </Link>
          );
        })}

        <div className="mt-8 flex flex-col p-3 bg-white/5 border border-white/10 shadow-[2px_2px_0px_0px_black]">
          <div className="flex items-center gap-3">
            <img alt="Student Portrait" className="w-8 h-8 bg-surface-tint" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxII8VxKpQ5kiMIcXzJLXYGIqVEf1NGlNR93uBo_uyHcUXdJJD0EwuivI6mKXpICu7N7Phby3nfagfRBDjmpSYtZGT8j99R8hV_9S17gkauREulJGgAr-I6UwTWyCtthixby4ZCL5qBgBBI24nsZ8IYtpcG70ylxpwQAJU9NXdN-KxZzoeYhzIOSH8pjt1_iyeYAuuVhWEk6jdZzIFQUE2TRHHY3SHn6e722ogbtq1g6QeuYPV0nn7GGFIpP08FleA_KIY-0fMOv2l" />
            <div>
              <p className="text-[10px] font-mono text-[#fffae4]/50">LOGGED AS</p>
              <p className="text-xs font-bold text-[#fffae4] flex items-center gap-2">
                ALEX_VANCE
                {isPremium && (
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-[#d4930a] text-[#0f1a2e] px-1.5 py-0.5 border border-[#d4930a] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]">PRO</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#fffae4]/10 flex justify-between items-center">
            <span className="font-mono text-[10px] uppercase text-[#fffae4]/70">
              {isPremium ? "Premium Plan" : "Free Plan"}
            </span>
            {!isPremium && (
              <button
                onClick={openUpgradeModal}
                className="font-mono text-[10px] uppercase text-[#d4930a] hover:text-[#ffb01f] transition-colors flex items-center gap-1"
              >
                Upgrade <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
