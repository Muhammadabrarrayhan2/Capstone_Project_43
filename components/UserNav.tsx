"use client";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import { User as UserIcon, LogOut, History, LogIn, ChevronDown } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [configured]);

  async function handleLogout() {
    setMenuOpen(false);
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <>
      <div className="relative">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                {user.email?.charAt(0).toUpperCase() || "M"}
              </div>
              <span className="max-w-[120px] truncate text-zinc-800 dark:text-zinc-200">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-lg z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1.5 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                    <p className="text-[11px] text-zinc-400">Masuk sebagai</p>
                    <p className="text-xs font-semibold truncate text-zinc-900 dark:text-zinc-100">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/history"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <History size={14} /> Riwayat Rekomendasi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <LogOut size={14} /> Keluar (Logout)
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-1.5 text-xs rounded-full h-8 px-3"
          >
            <LogIn size={14} />
            <span>Masuk / Akun</span>
          </Button>
        )}
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
    </>
  );
}
