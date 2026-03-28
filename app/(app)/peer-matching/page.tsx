"use client";

import { useState } from "react";

const peers = [
  {
    id: "STU-4492", name: "Julian Thorne", major: "CS SENIOR / SYSTEMS FOCUS", 
    teach: ["RUST", "C++"], learn: ["UI DESIGN"], availability: "MON / WED / FRI (POST-18:00)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMMqOGcH7xHOwkakrXLqPHWTAp4E8QBfbbS6p60GolW_qB2kJ3P1AT8YVDY3DBaSacyEIxCh22bz8WARUSz7X6e-6HY8twuF3ulyn2ZOQ1BNzgq7JGpAa0cXZhxQJmDKwxRQn8f4jsAvDUysF7H2l-ileLzy2u1XUjzzkpNvx98eDZPHuXS9ISj34AohzIsFrIGqG225fKL9J69zYrM2jhZFjJCDG2jXjOFkIcetO0TFqx9JfKH0aPmgssXU9YAwjPKaW68rmm2GkT"
  },
  {
    id: "STU-8810", name: "Elena Vancamp", major: "GRAPHIC DESIGN JUNIOR", 
    teach: ["TYPOGRAPHY", "FIGMA"], learn: ["CSS GRID"], availability: "WEEKENDS ONLY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQNW1QcCV-oOhiHYj7tmnlD3cFDaaiHB27tbftAZrjAnzOp5nX7S4hsFdQdY6TMDbbpMrgEEMw95nrsBXXS43kL8nvXtD3T-B2_lQPA1aQ6EuVcETiWxHpwxxenIOnS8z8vbrKzGTnLUqXihysUne9b1zAMq61OlzSdP55apIm_ediuY-vlrh1dugAP3olRO7ODOGl8iPxWwx8CYOiWgl2FTOqPl9ZQpXB0XXjpEL1H6lTQ0UthKBZiBUJn2IHEWZWWPfFLwatGwNM"
  },
  {
    id: "STU-2319", name: "Marcus Solis", major: "DATA SCIENCE MAJOR", 
    teach: ["PYTHON", "STATISTICS"], learn: ["ETHICS IN AI"], availability: "TUE / THU (ALL DAY)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARWbYADUZMs7crhym44FoAjZ8BOwhlmoGSXAvaRkov-q7sfBwrqZVl0WUGANc_cNPwFuKnqzcVKgGuTMOA6UHhmjNqk-IQQQRfHsrlKFPZSLUhbcQ7Jv6cSiMyOpCqSDfTxF0T2JVN4i7g1SxK5KH2UGgU895S-FDHKk7_tyYy7I-JGRkYBDvq-eXVmVi9sL2HI0Lr_lezpU1VZpN4qc4-1nDSMlQ8Bl3adIoxKdnp16X2OvjaAhATMBXucAv1_u4066uuXdsEwWF3"
  },
  {
    id: "STU-7761", name: "Sloane Beckett", major: "WEB DEV JUNIOR", 
    teach: ["TYPESCRIPT", "HTML/CSS"], learn: ["THREE.JS"], availability: "MON-FRI (AFTERNOONS)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2zBeS3RsRWOeno7XVv824kpzdWhMcExDt9_HwjYF_OQQFMoJ9Mp5Hy8aEBpVXrVF-PHALyROxebz_ELZQx5IssKO_4Y1pJECO03FlRj9_3iwygmEwA215eyixu5LiEmo569L1K_0W4fDXEAGjWet_epElLXNy9dLwrA9k_CwyZAt_dL2RjkKQuBN5nf7BAG-HbtmzW6vwm9zkCBUwJSGF4djzY9g6ZnoTX1CLa-cCh3QYrIioB0PU7GOxf5VkmQeE1grg0-IMpnvk"
  },
  {
    id: "STU-1120", name: "Akira Kurosawa", major: "CLOUD ENG STUDENT", 
    teach: ["AWS BASICS", "LINUX"], learn: ["TERRAFORM"], availability: "VARIABLE (CONTACT ME)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXekcslZHrDQNAG2xcUMtuUyfBoxVyHIb9II4offZwQKVNa6DONtT1-UZ1kfedek4NKdlswhe4fhb8jwiJWkppdqVks_KjOw9btk-DioMoCMNRiESjd3Qltv1oRHNRUt34xgdhX2T1Vm0w86agM-QEvAenftqf-w001OahUyYQdDG5sEELbl4zpWH0gkzRph-uCpok8uCj29UheXHtIRWFcZMokcjmfHcbX9qsyY2RCNXD7LKqFxa0T9Nrpwh2lf1zvoM-b-RCBLsm"
  },
  {
    id: "STU-5504", name: "Lila Haze", major: "CYBERSECURITY ENTHUSIAST", 
    teach: ["NETWORK SEC", "OSINT"], learn: ["KALI LINUX"], availability: "DAILY (NIGHTS)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4E0fqyaPeCVbh-iFyg0mt3Dw1oMrRi-xMShQjHClHYJjOXzTQetdNbKfIioJq4MefR44iFmKgWdHVeNLMtf06RQQwrwj00Ecaw7lFPOny2x8u2OvuweZeyfQxRe2MXrk3wQPnqQ3oxMCh1SGXER1p_nXeX_b4nWV_itYJsgj3GSFVeppS18aSc67GpOb0QlFDFHwW64eZD1dkFzH2jRacz0ucrwKiLkaA2EOa3f3iU1-zicykaobuqaqbMyJVSXJgUq8cGgFOLxtD"
  }
];

export default function PeerMatchingPage() {
  const [connections, setConnections] = useState<Record<string, boolean>>({});

  const handleConnect = (id: string) => {
    setConnections(prev => ({ ...prev, [id]: true }));
  };

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
            <button className="px-6 py-2 bg-primary text-surface font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary">All Archives</button>
            <button className="px-6 py-2 bg-surface text-primary font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary border-l-0 hover:bg-surface-container transition-colors">Engineering</button>
            <button className="px-6 py-2 bg-surface text-primary font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary border-l-0 hover:bg-surface-container transition-colors">Design</button>
            <button className="px-6 py-2 bg-surface text-primary font-mono text-xs uppercase tracking-widest border-[1.5px] border-primary border-l-0 hover:bg-surface-container transition-colors">Data Science</button>
          </div>
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">search</span>
            <input className="w-full pl-10 pr-4 py-2 border-[1.5px] border-outline bg-surface-container-low font-mono text-xs focus:ring-0 focus:border-primary-container outline-none placeholder:text-outline/50" placeholder="SEARCH BY KEYWORD..." type="text"/>
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
          <div className="flex gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">Status:</span>
              <select className="bg-surface border border-outline font-mono text-[10px] px-2 py-1 outline-none">
                <option>ALL STATUSES</option>
                <option>ACTIVE</option>
                <option>IDLE</option>
                <option>ARCHIVED</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">Discipline:</span>
              <select className="bg-surface border border-outline font-mono text-[10px] px-2 py-1 outline-none">
                <option>PRIMARY DISCIPLINE</option>
                <option>SYSTEMS ARCHITECTURE</option>
                <option>TYPOGRAPHY</option>
                <option>DATA ETHICS</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 py-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {peers.map(peer => (
            <div key={peer.id} className="bg-surface border-[1.5px] border-outline p-6 flex flex-col hard-shadow-sm transition-all hard-shadow-hover group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 border-[1.5px] border-primary p-1">
                  <img className="w-full h-full object-cover grayscale" src={peer.image} alt={peer.name} />
                </div>
                <span className="font-mono text-[10px] text-outline px-2 border border-outline">ID: {peer.id}</span>
              </div>
              <div className="mb-2">
                <h3 className="font-serif text-3xl font-bold italic text-primary leading-tight">{peer.name}</h3>
                <div className="flex gap-0.5 mt-1">
                  <span className="material-symbols-outlined text-[14px] star-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] star-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] star-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] star-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] text-outline/30">star</span>
                </div>
              </div>
              <p className="font-mono text-[11px] text-surface-tint font-bold mb-4 tracking-tighter">{peer.major}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-outline mb-1">I can teach:</p>
                  <div className="flex flex-wrap gap-2">
                    {peer.teach.map((s, i) => (
                      <span key={i} className="font-mono text-[10px] bg-surface-container-highest px-2 py-0.5 border border-outline-variant">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-outline mb-1">I want to learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {peer.learn.map((s, i) => (
                      <span key={i} className="font-mono text-[10px] bg-surface-container-highest px-2 py-0.5 border border-outline-variant">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-outline mb-1">Availability:</p>
                  <p className="font-mono text-[10px] font-bold">{peer.availability}</p>
                </div>
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
      </section>

      <footer className="px-10 pb-12 flex justify-between items-center border-t border-outline-variant pt-8">
        <span className="font-mono text-[10px] text-outline uppercase tracking-widest">Displaying 1-6 of 2,841 Candidates</span>
        <div className="flex gap-2">
          <button className="w-10 h-10 border border-primary flex items-center justify-center hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
          <button className="px-4 h-10 border border-primary font-mono text-xs bg-primary text-surface">01</button>
          <button className="px-4 h-10 border border-primary font-mono text-xs hover:bg-surface-container">02</button>
          <button className="px-4 h-10 border border-primary font-mono text-xs hover:bg-surface-container">03</button>
          <button className="w-10 h-10 border border-primary flex items-center justify-center hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      </footer>
    </>
  );
}
