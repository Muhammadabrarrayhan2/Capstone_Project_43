"use client";
import { useState, useEffect } from "react";
import { getStudentAssessmentHistory, SavedAssessmentHistory, supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { AuthModal } from "@/components/AuthModal";
import { internships, competencyCategories } from "@/lib/data";
import {
  GraduationCap,
  History,
  Trophy,
  ArrowLeft,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  LogIn,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function HistoryPage() {
  const [history, setHistory] = useState<SavedAssessmentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        loadHistory();
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          loadHistory();
        } else {
          setHistory([]);
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [configured]);

  async function loadHistory() {
    setLoading(true);
    setError(null);
    const res = await getStudentAssessmentHistory();
    if (res.error) {
      setError(res.error);
    } else {
      setHistory(res.data);
      if (res.data.length > 0) {
        setExpandedId(res.data[0].id);
      }
    }
    setLoading(false);
  }

  function getInternship(id: string) {
    return internships.find((i) => i.id === id);
  }

  function getCategory(id: string) {
    return competencyCategories.find((c) => c.id === id);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-black/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white grid place-items-center dark:bg-white dark:text-black">
              <History size={18} />
            </div>
            <div>
              <div className="text-sm font-bold leading-none">Riwayat Rekomendasi Magang</div>
              <div className="text-xs text-zinc-500">Tersimpan di Cloud Database Supabase</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/spk"
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
            >
              <ArrowLeft size={14} /> SPK Baru
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Riwayat Rekomendasi Anda</h1>
            <p className="text-xs text-zinc-500 mt-1">
              Daftar hasil perhitungan Profile Matching yang pernah Anda simpan ke akun.
            </p>
          </div>
          <Link
            href="/spk"
            className="inline-flex h-8 items-center justify-center rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black gap-1.5"
          >
            <Sparkles size={14} /> Hitung Baru
          </Link>
        </div>

        {!configured ? (
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800">
            <CardContent className="pt-6 text-sm text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-1">Supabase Belum Dikonfigurasi</p>
              <p className="text-xs">
                Silakan pastikan <code>NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
                <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> telah diisi dengan benar di{" "}
                <code>.env.local</code>.
              </p>
            </CardContent>
          </Card>
        ) : !user ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                <LogIn size={24} />
              </div>
              <h3 className="font-semibold text-base">Silakan Masuk Terlebih Dahulu</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Riwayat rekomendasi tersimpan secara aman di database mahasiswa. Masuk dengan akun Anda untuk melihat hasil sebelumnya.
              </p>
              <Button
                onClick={() => setIsAuthOpen(true)}
                className="mt-2 bg-zinc-900 text-white dark:bg-white dark:text-black"
              >
                Masuk / Buat Akun
              </Button>
            </CardContent>
          </Card>
        ) : loading ? (
          <div className="py-16 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
            <Loader2 size={24} className="animate-spin text-zinc-700 dark:text-zinc-300" />
            <p className="text-xs">Memuat riwayat rekomendasi dari Supabase...</p>
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/40">
            <CardContent className="pt-6 text-xs text-red-700 dark:text-red-300">
              Gagal memuat data: {error}
            </CardContent>
          </Card>
        ) : history.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                <History size={24} />
              </div>
              <h3 className="font-semibold text-base">Belum Ada Riwayat Tersimpan</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Anda belum pernah menyimpan hasil penilaian magang ke akun ini. Jalankan SPK sekarang dan klik tombol Simpan ke Supabase di tahap akhir.
              </p>
              <Link
                href="/spk"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black mt-2"
              >
                Mulai SPK Sekarang
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              const dateStr = new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              const specCode = item.specialization_id === "spec_sage" ? "SAGE" : "DELTA";
              const sortedRecs = [...(item.recommendation_results || [])].sort(
                (a, b) => a.rank_position - b.rank_position
              );
              const topRec = sortedRecs[0];
              const topIntern = topRec ? getInternship(topRec.internship_id) : null;

              return (
                <Card
                  key={item.id}
                  className="border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {topIntern ? topIntern.position_name : "Penilaian Magang"}
                          </span>
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                            {specCode}
                          </Badge>
                          {topRec && (
                            <Badge className="bg-emerald-600 text-white text-[10px]">
                              {Number(topRec.match_percentage).toFixed(1)}% Cocok
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {dateStr}
                          </span>
                          <span>•</span>
                          <span>
                            {topIntern ? `@ ${topIntern.company_name}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400">
                        {isExpanded ? "Tutup Detail" : "Lihat Detail"}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-zinc-500" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-500" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4">
                      {/* Top Recommendation Highlight */}
                      {topIntern && topRec && (
                        <div className="rounded-xl border border-emerald-200 bg-white dark:bg-zinc-900 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                              Rekomendasi Utama #1
                            </span>
                            <a
                              href={topIntern.vacancy_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-700 underline flex items-center gap-1"
                            >
                              <ExternalLink size={12} /> Buka Lowongan
                            </a>
                          </div>
                          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                            {topIntern.position_name} — {topIntern.company_name}
                          </h4>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                            {topIntern.description}
                          </p>
                          <div className="mt-3 flex gap-4 text-xs">
                            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 p-2 border border-emerald-100 dark:border-emerald-900">
                              <span className="text-zinc-500 block text-[10px]">Persentase</span>
                              <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                                {Number(topRec.match_percentage).toFixed(2)}%
                              </span>
                            </div>
                            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2">
                              <span className="text-zinc-500 block text-[10px]">Nilai Na (Akademik)</span>
                              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                {Number(topRec.na_score).toFixed(2)}
                              </span>
                            </div>
                            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2">
                              <span className="text-zinc-500 block text-[10px]">Nilai Np (Portofolio)</span>
                              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                {Number(topRec.np_score).toFixed(2)}
                              </span>
                            </div>
                            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2">
                              <span className="text-zinc-500 block text-[10px]">Nilai Akhir</span>
                              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                {Number(topRec.final_score).toFixed(2)} / 5
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Semua Peringkat */}
                      <div>
                        <h5 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                          Peringkat Semua Lowongan
                        </h5>
                        <div className="space-y-1.5">
                          {sortedRecs.map((rec) => {
                            const intern = getInternship(rec.internship_id);
                            if (!intern) return null;
                            return (
                              <div
                                key={rec.id}
                                className="flex items-center justify-between rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-xs"
                              >
                                <span className="font-medium">
                                  #{rec.rank_position} {intern.position_name}{" "}
                                  <span className="text-zinc-400 font-normal">
                                    @{intern.company_name}
                                  </span>
                                </span>
                                <div className="flex items-center gap-3">
                                  <span className="text-zinc-500">
                                    Na: {Number(rec.na_score).toFixed(2)} | Np:{" "}
                                    {Number(rec.np_score).toFixed(2)} | Final:{" "}
                                    {Number(rec.final_score).toFixed(2)}
                                  </span>
                                  <Badge className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-300">
                                    {Number(rec.match_percentage).toFixed(1)}%
                                  </Badge>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nilai Kompetensi & Alasan AI */}
                      {item.assessment_details && item.assessment_details.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                            Skor Kompetensi & Evaluasi AI
                          </h5>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {item.assessment_details.map((det) => {
                              const cat = getCategory(det.competency_category_id);
                              return (
                                <div
                                  key={det.id}
                                  className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 text-xs"
                                >
                                  <div className="flex justify-between font-medium">
                                    <span>{cat ? cat.name : det.competency_category_id}</span>
                                    <span className="text-zinc-500">
                                      Akademik: <b>{det.academic_score}</b> | AI:{" "}
                                      <b>{det.portfolio_score_ai ?? "-"}</b>
                                    </span>
                                  </div>
                                  {det.ai_reasoning && (
                                    <p className="mt-1 text-[11px] text-zinc-500 italic">
                                      &ldquo;{det.ai_reasoning}&rdquo;
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => loadHistory()}
      />
    </div>
  );
}
