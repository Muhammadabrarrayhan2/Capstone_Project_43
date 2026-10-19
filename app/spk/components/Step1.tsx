"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { SpecializationCode } from "@/lib/data";
export function Step1({ spec, setSpec, onNext }: { spec: SpecializationCode; setSpec: (s: SpecializationCode)=>void; onNext: ()=>void; }){
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles size={18}/> 1. Pemilihan Peminatan</CardTitle>
        <CardDescription>Pilih peminatan untuk memfilter kategori kompetensi & lowongan.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        {[
          { code:"SAGE" as const, title:"SAGE", desc:"Software and IT Governance Engineering", details:"PBO • APSI • Algoritma • Web Dev • AE • TGTI" },
          { code:"DELTA" as const, title:"DELTA", desc:"Data Exploration, Learning & Translational Analytics", details:"Data Mining • ProbStat • SBD • Stat Industri • DWBI • MatDis" },
        ].map(opt=>(
          <button key={opt.code} onClick={()=> setSpec(opt.code)} className={`text-left rounded-xl border p-5 transition ${spec===opt.code?"border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-black":"bg-white border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800"}`}>
            <div className="text-lg font-bold">{opt.title}</div>
            <div className={`text-sm ${spec===opt.code?"text-zinc-200 dark:text-zinc-600":"text-zinc-500"}`}>{opt.desc}</div>
            <div className={`mt-2 text-xs ${spec===opt.code?"text-zinc-300 dark:text-zinc-500":"text-zinc-400"}`}>{opt.details}</div>
            <div className="mt-3 text-xs font-semibold">{spec===opt.code?"✓ Terpilih":"Pilih →"}</div>
          </button>
        ))}
        <div className="md:col-span-2 flex justify-end"><Button onClick={onNext}>Ke tahap berikutnya →</Button></div>
      </CardContent>
    </Card>
  );
}
