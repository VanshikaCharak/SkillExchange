"use client";

import { useState } from "react";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "INITIALIZING ARCHIVE INTELLIGENCE... SYSTEM READY.", sender: "ai", type: "system" },
    { id: 2, text: "I am the SkillEx Analyst. I can query our entire database of student-led solutions, reference engineering docs, or help you draft project schemas. What are you building today?", sender: "ai", type: "chat" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), text: input, sender: "user", type: "chat" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I've logged your request into the processing ledger. Since this is a prototype environment, I merely echo your intent. Keep building your ideas into reality.",
        sender: "ai",
        type: "chat"
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <header className="sticky top-0 right-0 w-full bg-surface/90 backdrop-blur-sm z-40 border-b-[1.5px] border-outline flex flex-col justify-end items-start pt-6 pb-4 px-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-outline">Terminal / AI Node</span>
          <span className="text-outline-variant">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold underline decoration-1 underline-offset-4">Integrated AI</span>
        </div>
        <div className="flex justify-between items-end w-full">
          <h2 className="font-serif text-5xl italic text-primary leading-tight">Analyst Core</h2>
          <div className="flex items-center gap-2 border-[1.5px] border-outline px-3 py-1 bg-surface-container-high hard-shadow-sm">
            <span className="w-2 h-2 bg-secondary active-dot rounded-full"></span>
            <span className="font-mono text-[10px] uppercase font-bold text-secondary">Operational</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'system' ? (
                <div className="w-full text-center border-y border-dashed border-outline-variant py-4 my-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">{msg.text}</span>
                </div>
              ) : (
                <div className={`flex max-w-2xl gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 shrink-0 border-[1.5px] flex items-center justify-center ${
                    msg.sender === 'user' 
                      ? 'border-primary bg-primary text-surface shadow-[4px_4px_0px_0px_#d4930a]' 
                      : 'border-primary bg-surface-container shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}>
                    <span className="material-symbols-outlined text-lg">
                      {msg.sender === 'user' ? 'person' : 'psychology'}
                    </span>
                  </div>
                  <div className={`p-5 border-[1.5px] border-primary ${
                    msg.sender === 'user' 
                      ? 'bg-primary-container text-white' 
                      : 'bg-white hard-shadow-sm'
                  }`}>
                    {msg.sender === 'ai' && <div className="font-mono text-[9px] uppercase tracking-widest text-outline mb-2">PF-ANALYSIS-BOT // V.4</div>}
                    <p className={`font-body text-sm leading-relaxed ${msg.sender === 'user' ? 'text-white' : 'text-on-surface'}`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 border-t-[1.5px] border-outline bg-surface-container-low">
        <div className="max-w-4xl mx-auto flex gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query the archive or draft a request..."
              className="w-full bg-white border-[1.5px] border-primary font-mono text-sm px-6 py-4 focus:ring-0 outline-none hard-shadow-sm focus:border-surface-tint focus:shadow-[4px_4px_0px_0px_#d4930a] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-outline uppercase tracking-widest">Return to send</span>
          </div>
          <button 
            onClick={handleSend}
            className="bg-[#d4930a] text-white border-[1.5px] border-primary px-8 py-4 font-mono font-bold uppercase tracking-widest hard-shadow hover:bg-[#b88008] transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            TRANSMIT
          </button>
        </div>
      </div>
    </div>
  );
}
