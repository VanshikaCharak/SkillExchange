import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-background font-body selection:bg-surface-tint selection:text-white pb-12">
      {/* TopNavBar */}
      <header className="border-b-[1.5px] border-outline-variant bg-[#fffae4] dark:bg-[#1a1b1e] fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-serif italic text-2xl text-[#0f1a2e] dark:text-[#fffae4] tracking-tight">SkillEx — Student Skill Exchange</Link>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-surface-tint border-b-2 border-surface-tint font-mono uppercase text-xs tracking-widest py-1">Archive</Link>
              <Link href="#" className="text-[#0f1a2e] dark:text-[#fffae4] font-mono uppercase text-xs tracking-widest py-1 hover:bg-[#f3eed9] dark:hover:bg-[#1a2b4a] transition-colors duration-75">Signals</Link>
              <Link href="#" className="text-[#0f1a2e] dark:text-[#fffae4] font-mono uppercase text-xs tracking-widest py-1 hover:bg-[#f3eed9] dark:hover:bg-[#1a2b4a] transition-colors duration-75">The Registry</Link>
              <Link href="#" className="text-[#0f1a2e] dark:text-[#fffae4] font-mono uppercase text-xs tracking-widest py-1 hover:bg-[#f3eed9] dark:hover:bg-[#1a2b4a] transition-colors duration-75">About</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[819px] flex flex-col items-center justify-center py-24 px-6 border-b-1.5 border-outline bg-surface-bright">
          <div className="max-w-5xl w-full flex flex-col items-start gap-8">
            <div className="w-full">
              <p className="font-label text-xs tracking-[0.4em] uppercase mb-4 text-on-surface-variant flex items-center gap-2">
                <span className="w-8 h-px bg-outline-variant"></span>
                COORDINATING THE NEXT GENERATION OF SYSTEMS ARCHITECTS.
              </p>
              <h1 className="font-headline text-6xl md:text-8xl font-light leading-tight tracking-tight text-on-background border-b-1.5 border-outline-variant pb-8 mb-8">
                Learn anything. <br/><span className="italic font-normal">Teach what you know.</span>
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-12 w-full items-end justify-between">
              <div className="max-w-md">
                <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                  A community of students and early learners swapping skills and growing together. We index the world's most practical skills through a lens of peer-to-peer mentorship.
                </p>
              </div>
              <div>
                <Link href="/dashboard" className="inline-block bg-[#d4930a] text-white font-label font-bold uppercase tracking-widest px-10 py-5 border-1.5 border-black hard-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-sm">
                  BEGIN EXPEDITION
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-outline flex flex-col items-end opacity-50">
            <span>EST: 2024.AR_01</span>
            <span>LAT: 51.5074 N</span>
            <span>LNG: 0.1278 W</span>
          </div>
        </section>

        {/* Bento Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b-1.5 border-outline">
          {/* Feature 1 */}
          <div className="md:col-span-4 border-r-1.5 border-outline p-12 bg-surface hover:bg-surface-container transition-colors group">
            <div className="mb-12">
              <span className="material-symbols-outlined text-4xl text-surface-tint">map</span>
            </div>
            <h3 className="font-headline text-3xl mb-4 text-on-surface group-hover:italic transition-all">Skill Roadmaps</h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-8">Follow structured paths to learn new skills, detailing every step from fundamentals to advanced mastery.</p>
            <div className="pt-6 border-t border-outline-variant flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest">Protocol: 01_NAV</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="md:col-span-4 border-r-1.5 border-outline p-12 bg-surface-container-low hover:bg-surface-container-high transition-colors group">
            <div className="mb-12">
              <span className="material-symbols-outlined text-4xl text-secondary">fingerprint</span>
            </div>
            <h3 className="font-headline text-3xl mb-4 text-on-surface group-hover:italic transition-all">Peer Matching</h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-8">Find students who want to swap skills with you in our peer-matching index. A network built on shared curiosity.</p>
            <div className="pt-6 border-t border-outline-variant flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest">Protocol: 02_PEER</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="md:col-span-4 p-12 bg-surface hover:bg-surface-container transition-colors group">
            <div className="mb-12">
              <span className="material-symbols-outlined text-4xl text-on-primary-container">groups</span>
            </div>
            <h3 className="font-headline text-3xl mb-4 text-on-surface group-hover:italic transition-all">Study Groups</h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-8">Join or create groups around topics you're learning. A terminal-style hub to coordinate complex learning sessions.</p>
            <div className="pt-6 border-t border-outline-variant flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest">Protocol: 03_LLM</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
        </section>

        {/* Editorial Content Section */}
        <section className="flex flex-col md:flex-row border-b-1.5 border-outline">
          <div className="md:w-7/12 p-12 md:p-24 bg-white border-r-1.5 border-outline">
            <h2 className="font-headline text-5xl mb-12 leading-tight">Exchanging the <span className="text-surface-tint">Art of Practical Skills</span> in a world of theory.</h2>
            <div className="aspect-video bg-surface-container border-1.5 border-outline mb-12 overflow-hidden relative group">
              <img alt="technical documentation" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsPJxp3j13J4fP3B2uxeZP-nymJIyS8J1GVG3VcmxiDVJzfUAnPuLJYxNUhTOETNkQ8Gn43cdYb2Wk2aQOJpJiaUq7hpPXKYzeA5P9eM_H04qLzBQpGisR-UCWb0w2MR6mHacQFmrRUotzAiQ9HvB-EA8eCRhtHj3KcxathezFlPPr8vH7edkex2wNFhS708Hf-lrkMs_9p3jHbIZCd9ZhT6VkGmka5keVy9fQC_TUBZnxg2NpuHE2PPbMDZsb-Teukr68uU0Ibnj-"/>
              <div className="mb-10 text-center md:text-left">
            <h2 className="font-serif italic text-4xl mb-6 text-primary tracking-tight">Built by students, for students.</h2>
            <p className="font-body text-xl text-on-surface leading-relaxed max-w-2xl">We believe the most resilient skills are those learned with others. SkillEx is not just a platform; it is a community of technical heritage designed to grow with you.</p>
          </div>
            </div>
          </div>
          <div className="md:w-5/12 p-12 bg-surface-container-low flex flex-col justify-between">
            <div>
              <h4 className="font-label font-bold text-xs tracking-widest uppercase mb-8 border-b border-outline pb-2">Technical Logs</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="font-mono text-surface-tint">01</span>
                  <div>
                    <h5 className="font-label text-sm font-bold uppercase">System Update v4.2</h5>
                    <p className="text-xs text-on-surface-variant mt-1">Archive integrity check: 100% verified. New modules deployed to the Signal network.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-surface-tint">02</span>
                  <div>
                    <h5 className="font-label text-sm font-bold uppercase">Archivist Onboarding</h5>
                    <p className="text-xs text-on-surface-variant mt-1">Accepting applications for the Level 3 Security Protocol peer review board.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-surface-tint">03</span>
                  <div>
                    <h5 className="font-label text-sm font-bold uppercase">Legacy Translation</h5>
                    <p className="text-xs text-on-surface-variant mt-1">Manual digitization of 1970s mainframe operational manuals completed.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-12 p-6 border-1.5 border-outline bg-surface hard-shadow-sm">
              <h5 className="font-headline italic text-lg mb-2">"The Map is not the Territory."</h5>
              <p className="font-body text-sm text-on-surface-variant italic">Alfred Korzybski, 1933. <br/>Our mission is to bridge the gap.</p>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA Terminal */}
        <section className="p-12 md:p-24 bg-[#0f1a2e] text-[#fffae4]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-4xl mb-6">Initialize Connection</h2>
            <p className="font-body text-on-surface-variant mb-12 opacity-80">Join 12,000+ architects receiving weekly signals from the archive ledger.</p>
            <div className="flex flex-col md:flex-row gap-0 max-w-xl mx-auto border-1.5 border-[#75777d]">
              <input className="flex-grow bg-transparent border-none text-[#fffae4] font-mono text-sm px-6 py-4 focus:ring-0 placeholder:text-[#75777d]" placeholder="ARCHIVIST_EMAIL@PROTOCOL.COM" type="email"/>
              <button className="bg-[#d4930a] text-white px-8 py-4 font-label font-bold uppercase tracking-widest border-l-1.5 border-[#75777d] hover:bg-[#b07900] transition-colors">
                SUBSCRIBE
              </button>
            </div>
            <p className="font-mono text-[9px] mt-6 tracking-[0.2em] opacity-40">ENCRYPTED END-TO-END. NO TRACKING. NO NOISE.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f1a2e] border-t-1.5 border-[#75777d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="font-serif text-lg text-[#d4930a]">SKILLEX EXCHANGE</span>
          </div>
          <div className="text-center md:text-right font-mono text-[10px] text-[#fffae4]/50 leading-relaxed uppercase tracking-widest">
            © 2024 SKILLEX. ALL RIGHTS RESERVED. <br/>
            Engineered with <span className="material-symbols-outlined text-[10px] text-[#d4930a] align-middle">deployed_code</span> Next.js & Tailwind
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3eed9]/60 hover:text-[#d4930a] underline underline-offset-4 transition-all">The Ledger</Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3eed9]/60 hover:text-[#d4930a] underline underline-offset-4 transition-all">Privacy Protocol</Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3eed9]/60 hover:text-[#d4930a] underline underline-offset-4 transition-all">Terminal Help</Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3eed9]/60 hover:text-[#d4930a] underline underline-offset-4 transition-all">API Access</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
