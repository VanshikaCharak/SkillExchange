"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffae4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-[2px] border-[#0f1a2e] border-t-[#d4930a] rounded-full animate-spin" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#75777d]">
            Authenticating...
          </span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
