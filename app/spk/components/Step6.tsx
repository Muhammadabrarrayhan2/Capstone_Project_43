"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarRanking } from "@/components/BarRanking";
import { RadarProfile } from "@/components/RadarProfile";
import { Trophy, ExternalLink, BookmarkCheck, CloudUpload, Loader2, CheckCircle2 } from "lucide-react";
import { internships } from "@/lib/data";
import { allTargets } from "@/lib/allTargets";
import type { PMResult } from "@/lib/profile-matching";
import type { SpecializationCode } from "@/lib/types";
import { supabase, saveAssessmentToSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { AuthModal } from "@/components/AuthModal";
import Link from "next/link";

interface Step6Props {
  ranked: PMResult[];
  categories: { id: string; name: string; shortName: string }[];
  academicScores: Record<string, number>;
  portfolioScores: Record<string, number>;
  spec?: SpecializationCode;
  essays?: Record<string, string>;
  evidences?: Record<string, string>;
  reasonings?: Record<string, string>;
  onPrev: () => void;
  onRestart: () => void;
}

export function Step6({
  ranked,
  categories,
  academicScores,
  portfolioScores,
  spec = "SAGE",
  essays = {},
  evidences = {},
  reasonings = {},
  onPrev,
  onRestart,
}: Step6Props) {
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  const top = ranked[0];
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) return;
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [configured]);

  if (!top) return null;

  const topIntern = internships.find((i) => i.id === top.internshipId)!;
  const barData = ranked.map((r) => {
    const intern = internships.find((i) => i.id === r.internshipId)!;
    return { name: intern.position_name, percentage: r.matchPercentage };
  });

  const targets = allTargets.filter((t) => t.internshipId === top.internshipId);
  const targetMap: Record<string, number> = {};
  for (const t of targets) targetMap[t.competency_category_id] = t.target_score;

  const studentMap: Record<string, number> = {};
  for (const cat of categories) {
    const a = academicScores[cat.id] ?? 0;
    const p = portfolioScores[cat.id] ?? 0;
    studentMap[cat.id] = Number((0.4 * a + 0.6 * p).toFixed(2));
  }

  async function handleSave() {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setSaving(true);
    setSaveError(null);

    const details = categories.map((cat) => ({
      categoryId: cat.id,
      academicScore: academicScores[cat.id] ?? 0,
      portfolioEssay: essays[cat.id],
      evidenceUrl: evidences[cat.id],
      portfolioScoreAi: portfolioScores[cat.id],
      aiReasoning: reasonings[cat.id],
    }));

    const result = await saveAssessmentToSupabase({
      specializationId: spec === "SAGE" ? "spec_sage" : "spec_delta",
      academicWeight: 0.4,
      portfolioWeight: 0.6,
      details,
      recommendations: ranked,
    });

    setSaving(false);

    if (result.success && result.assessmentId) {
      setSavedId(result.assessmentId);
    } else {
      setSaveError(result.error || "Gagal menyimpan ke database Supabase.");
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
            <Trophy size={18} /> Rekomendasi Utama
          </CardTitle>
          <CardDescription className="text-emerald-700 dark:text-emerald-300">
            Peringkat 1 berdasarkan persentase kecocokan tertinggi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
            {topIntern.position_name}
          </div>
          <div className="text-sm text-emerald-800 dark:text-emerald-200">
            {topIntern.company_name} - {topIntern.description}
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 my-2">
            {top.matchPercentage.toFixed(2)}%{" "}
            <span className="text-sm font-normal">
              kecocokan (Final {top.finalScore}/5)
            </span>
          </div>
          <a
            href={topIntern.vacancy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-emerald-700 underline hover:text-emerald-900"
          >
            <ExternalLink size={14} /> Buka Lowongan
          </a>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Bar Chart — Ranking Kecocokan</CardTitle>
          </CardHeader>
          <CardContent>
            <BarRanking data={barData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Radar Chart — Profil vs Target (Rekomendasi Utama)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadarProfile
              categories={categories}
              studentScores={studentMap}
              targetScores={targetMap}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Semua Ranking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {ranked.map((r, idx) => {
            const intern = internships.find((i) => i.id === r.internshipId)!;
            return (
              <div
                key={r.internshipId}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  idx === 0
                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950"
                    : "bg-white dark:bg-zinc-900 dark:border-zinc-800"
                }`}
              >
                <div>
                  <div className="font-semibold text-sm">
                    #{idx + 1} {intern.position_name}{" "}
                    <span className="text-zinc-500 font-normal">
                      @ {intern.company_name}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    Na {r.na} - Np {r.np} - Final {r.finalScore}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={idx === 0 ? "bg-emerald-600 text-white" : ""}>
                    {r.matchPercentage.toFixed(2)}%
                  </Badge>
                  <a
                    href={intern.vacancy_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-900"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            );
          })}

          {saveError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 text-xs text-red-700 dark:text-red-300">
              {saveError}
            </div>
          )}

          {savedId && (
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-3 text-xs text-emerald-800 dark:text-emerald-200">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={16} className="text-emerald-600" /> Hasil berhasil disimpan ke Supabase!
              </span>
              <Link href="/history" className="underline font-semibold hover:text-emerald-900">
                Lihat Riwayat →
              </Link>
            </div>
          )}

          <div className="flex gap-2 pt-4 flex-wrap items-center">
            <Button variant="outline" onClick={onPrev}>
              Detail Perhitungan
            </Button>
            <Button variant="outline" onClick={onRestart}>
              Ulangi dari Awal
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Cetak Hasil
            </Button>

            {!savedId ? (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <CloudUpload size={16} /> Simpan ke Supabase
                  </>
                )}
              </Button>
            ) : (
              <Link
                href="/history"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 gap-1.5"
              >
                <BookmarkCheck size={16} /> Buka Riwayat Rekomendasi
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          // auto trigger save after login
          setTimeout(() => {
            handleSave();
          }, 300);
        }}
      />
    </div>
  );
}
