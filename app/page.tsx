import Link from "next/link";
import { UserNav } from "@/components/UserNav";
import { History, Sparkles, Database, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur dark:bg-black/80 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs">
              43
            </div>
            <div>
              <div className="text-sm font-bold leading-none">Capstone 43</div>
              <div className="text-[11px] text-zinc-500">Telkom University Jakarta</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/history"
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5"
            >
              <History size={14} /> Riwayat
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Hero */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl border bg-white p-8 dark:bg-zinc-900 dark:border-zinc-800 shadow-xs">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium bg-zinc-50 dark:bg-zinc-800">
            Kelompok 43 — S1 Sistem Informasi Telkom University Jakarta
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            SPK Rekomendasi Tempat Magang
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
            Sistem Pendukung Keputusan menggunakan metode <b>Profile Matching (Kusrini, 2007)</b> dan evaluasi portofolio cerdas berbasis <b>Gemini 2.5 Flash</b>, kini terintegrasi dengan <b>Supabase Cloud Database & Authentication</b> untuk penyimpanan riwayat penilaian mahasiswa secara permanen.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/spk"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black transition-colors gap-2"
            >
              <Sparkles size={16} /> Mulai SPK — 6 Langkah →
            </Link>
            <Link
              href="/history"
              className="inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors gap-2"
            >
              <History size={16} /> Riwayat Rekomendasi
            </Link>
          </div>

          <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
            <li className="rounded-xl border p-4 bg-zinc-50 dark:bg-black">
              <b>SAGE & DELTA</b>
              <br />
              <span className="text-zinc-500 text-xs">
                12 Kategori kompetensi & 10 lowongan magang riil
              </span>
            </li>
            <li className="rounded-xl border p-4 bg-zinc-50 dark:bg-black">
              <b>Profile Matching</b>
              <br />
              <span className="text-zinc-500 text-xs">
                Hitung GAP, bobot nilai, NCF, NSF, Radar & Bar Chart
              </span>
            </li>
            <li className="rounded-xl border p-4 bg-zinc-50 dark:bg-black">
              <span className="flex items-center gap-1.5 font-bold">
                <Database size={14} className="text-emerald-600" /> Supabase Storage
              </span>
              <span className="text-zinc-500 text-xs">
                Auth login & simpan histori rekomendasi ke cloud DB
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
