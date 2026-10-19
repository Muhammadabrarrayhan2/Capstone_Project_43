"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import type { PMResult } from "@/lib/profile-matching";
export function Step5({ ranked, categories, onPrev, onNext }:{
  ranked: PMResult[];
  categories:{id:string; shortName:string}[];
  onPrev:()=>void; onNext:()=>void;
}){
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BarChart3 size={18}/> 5. Perhitungan Profile Matching</CardTitle>
        <CardDescription>GAP = Profil - Target | Bobot GAP (0→5.0, 1→4.5, -1→4.0, 2→3.5, -2→3.0, 3→2.5, -3→2.0, 4→1.5, -4→1.0) | Na/Np = 60% CF + 40% SF | Final = 0.4·Na + 0.6·Np | Kecocokan = Final/5×100%</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {ranked.map((r, idx)=>(
          <div key={r.internshipId} className="rounded-lg border p-4 bg-white dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-sm">#{idx+1} {r.internshipId}</div>
                <div className="mt-1 text-xs">NCF<sub>A</sub>={r.ncfA} - NSF<sub>A</sub>={r.nsfA} → Na={r.na} | NCF<sub>P</sub>={r.ncfP} - NSF<sub>P</sub>={r.nsfP} → Np={r.np} | Final={r.finalScore} → <b>{r.matchPercentage}%</b></div>
              </div>
              <Badge className={idx===0?"bg-emerald-600 text-white border-emerald-600":"bg-zinc-100 border-zinc-200"}>{r.matchPercentage.toFixed(2)}%</Badge>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr><th className="border px-2 py-1 text-left">Kategori</th><th className="border px-2 py-1">Factor</th><th className="border px-2 py-1">Target</th><th className="border px-2 py-1">GAP<sub>A</sub></th><th className="border px-2 py-1">Bobot A</th><th className="border px-2 py-1">GAP<sub>P</sub></th><th className="border px-2 py-1">Bobot P</th></tr>
                </thead>
                <tbody>
                  {r.breakdown.map(b=>{
                    const cat = categories.find(c=>c.id===b.categoryId)!;
                    return <tr key={b.categoryId}><td className="border px-2 py-1">{cat.shortName}</td><td className="border px-2 py-1 text-center">{b.factorType}</td><td className="border px-2 py-1 text-center">{b.target}</td><td className="border px-2 py-1 text-center">{b.academicGap>0?`+${b.academicGap}`:b.academicGap}</td><td className="border px-2 py-1 text-center">{b.academicWeight.toFixed(2)}</td><td className="border px-2 py-1 text-center">{b.portfolioGap>0?`+${b.portfolioGap}`:b.portfolioGap}</td><td className="border px-2 py-1 text-center">{b.portfolioWeight.toFixed(2)}</td></tr>;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="flex justify-between"><Button variant="outline" onClick={onPrev}>Preview</Button><Button onClick={onNext}>Lihat Ranking & Rekomendasi</Button></div>
      </CardContent>
    </Card>
  );
}
