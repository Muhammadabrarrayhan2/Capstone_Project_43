"use client";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogIn, UserPlus, LogOut, X, User as UserIcon, Loader2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const configured = isSupabaseConfigured();

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      setMessage({
        type: "error",
        text: "Supabase belum terkonfigurasi. Pastikan NEXT_PUBLIC_SUPABASE_URL dan KEY sudah diisi di .env.local",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
          return;
        }

        if (data.user) {
          const loggedInUser = data.user;
          setMessage({ type: "success", text: "Berhasil masuk!" });
          setTimeout(() => {
            onSuccess?.(loggedInUser);
            onClose();
          }, 800);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
          return;
        }

        if (data.user) {
          const newUser = data.user;
          setMessage({
            type: "success",
            text: "Akun berhasil dibuat! Silakan cek email jika verifikasi diaktifkan atau langsung login.",
          });
          setTimeout(() => {
            onSuccess?.(newUser);
            onClose();
          }, 1200);
        }
      }
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setMessage({ type: "error", text: errText });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            aria-label="Tutup modal"
          >
            <X size={20} />
          </button>

          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-8 w-8 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                <UserIcon size={16} />
              </div>
              <CardTitle className="text-lg">
                {isLogin ? "Masuk ke Akun Mahasiswa" : "Daftar Akun Mahasiswa"}
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {isLogin
                ? "Masuk untuk menyimpan dan melihat riwayat rekomendasi magang."
                : "Buat akun untuk melacak hasil perhitungan SPK dan riwayat magang."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!configured && (
              <div className="mb-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-800 dark:text-amber-300">
                ⚠️ Supabase environment variables belum lengkap di .env.local.
              </div>
            )}

            {message && (
              <div
                className={`mb-4 rounded-lg p-3 text-xs border ${
                  message.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300"
                    : "bg-red-50 dark:bg-red-950/40 border-red-200 text-red-800 dark:text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-3">
              {!isLogin && (
                <div>
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Nama Lengkap
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="Contoh: Rico Mahasiswa"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="mahasiswa@telkomuniversity.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Memproses...
                  </span>
                ) : isLogin ? (
                  <span className="flex items-center gap-2">
                    <LogIn size={16} /> Masuk
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus size={16} /> Daftar Akun
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage(null);
                }}
                className="text-xs text-zinc-600 dark:text-zinc-400 hover:underline"
              >
                {isLogin
                  ? "Belum punya akun? Daftar di sini"
                  : "Sudah punya akun? Masuk sekarang"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
