"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../api";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "login") {
        await login(email, password);
        router.push("/dashboard");
      } else {
        await register(email, password, fullName);
        setSuccess("Account created! Check your email to confirm, then sign in.");
        setMode("login");
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffae4] flex flex-col">
      {/* Top bar */}
      <header className="border-b-[1.5px] border-[#75777d] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#75777d]">The Human Archive</span>
          <span className="text-[#75777d]">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4930a] font-bold">
            {mode === "login" ? "Authentication" : "Registration"}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#75777d] uppercase tracking-widest">
          SYS-AUTH-v2.4
        </span>
      </header>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Title */}
          <div className="mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#75777d] block mb-2">
              {mode === "login" ? "Returning Archivist" : "New Recruit"}
            </span>
            <h1 className="font-serif text-6xl italic text-[#0f1a2e] leading-none mb-3">
              {mode === "login" ? "Sign In" : "Register"}
            </h1>
            <div className="h-[1.5px] w-16 bg-[#d4930a]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#75777d] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="border-[1.5px] border-[#75777d] bg-white font-mono text-sm py-3 px-4 focus:border-[#0f1a2e] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all placeholder:text-[#75777d]/40"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#75777d] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="archivist@example.com"
                className="border-[1.5px] border-[#75777d] bg-white font-mono text-sm py-3 px-4 focus:border-[#0f1a2e] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all placeholder:text-[#75777d]/40"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#75777d] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-[1.5px] border-[#75777d] bg-white font-mono text-sm py-3 px-4 focus:border-[#0f1a2e] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all placeholder:text-[#75777d]/40"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border-[1.5px] border-red-400 bg-red-50 px-4 py-3">
                <p className="font-mono text-[11px] text-red-600 uppercase tracking-wide">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="border-[1.5px] border-[#4e6b52] bg-[#4e6b52]/10 px-4 py-3">
                <p className="font-mono text-[11px] text-[#4e6b52] uppercase tracking-wide">{success}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f1a2e] text-[#fffae4] border-[1.5px] border-[#0f1a2e] py-4 font-mono text-xs uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(212,147,10,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(212,147,10,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? "Processing..."
                : mode === "login"
                ? "Access Archive →"
                : "Create Identity →"}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-8 pt-6 border-t-[1.5px] border-[#75777d]/30 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#75777d] uppercase tracking-widest">
              {mode === "login" ? "No account yet?" : "Already registered?"}
            </span>
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); setSuccess(null); }}
              className="font-mono text-[11px] uppercase tracking-widest text-[#d4930a] font-bold underline underline-offset-4 hover:text-[#0f1a2e] transition-colors"
            >
              {mode === "login" ? "Register →" : "← Sign In"}
            </button>
          </div>

          {/* Decorative footer */}
          <div className="mt-12 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-[#75777d]/20" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#75777d]/40">
              Secured by Supabase Auth
            </span>
            <div className="h-[1px] flex-1 bg-[#75777d]/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
