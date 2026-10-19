"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ExternalLink } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
export function Step4({ categories, academicScores, portfolioScores, reasonings, evidences, evalMode, onPrev, onNext }:{
  categories:{id:string; name:string; shortName:string}[];
  academicScores:Record<string,number>;
  portfolioScores:Record<string,number>;
  reasonings:Record<string,string>;
  evidences:Record<string,string>;
  evalMode:string;
  onPrev:()=>void; onNext:()=>void;
}){
  const radarData = categories.map(c=>({ subject: c.shortName, Akademik: academicScores[c.id]??0, Portofolio: portfolioScores[c.id]??0 }));
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye size={18}/> 4. Transparent Preview</CardTitle>
          <CardDescription>Hasil Evaluasi {evalMode && <Badge className="ml-1">{evalMode}</Badge>} — periksa skor sebelum hitung.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            {categories.map(cat=>(
              <div key={cat.id} className="rounded-lg border p-4 bg-white dark:bg-zinc-900 dark:border-zinc-800">
                <div className="font-semibold text-sm">{cat.shortName} - {cat.name}</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded bg-zinc-50 p-2 dark:bg-zinc-800">Akademik: <b>{academicScores[cat.id] !== undefined ? academicScores[cat.id].toFixed(2).replace(".", ",") : "-"}</b>/4,00</div>
                  <div className="rounded bg-blue-50 p-2 dark:bg-blue-950">Portofolio AI: <b>{portfolioScores[cat.id] ?? "-"}</b>/4</div>
                </div>
                {reasonings[cat.id] && <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{reasonings[cat.id]}</p>}
                {evidences[cat.id] && <a href={evidences[cat.id]} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"><ExternalLink size={12}/> bukti</a>}
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={onPrev}>Edit Portofolio</Button>
            <Button onClick={onNext}>Ke Tahap Perhitungan Profile Matching</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Preview Radar — Akademik vs Portofolio</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0,4]} tickCount={5} angle={30} />
                <Radar name="Akademik" dataKey="Akademik" stroke="#64748b" fill="#64748b" fillOpacity={0.25} />
                <Radar name="Portofolio" dataKey="Portofolio" stroke="#2563eb" fill="#2563eb" fillOpacity={0.35} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
