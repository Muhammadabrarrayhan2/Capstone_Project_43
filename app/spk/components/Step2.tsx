"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label, Select } from "@/components/ui/input";
import { GraduationCap } from "lucide-react";
import { gradeOptions, gradeToScale, type GradeLetter } from "@/lib/data";
export function Step2({ categories, coursesForSpec, grades, setGrades, academicScores, onPrev, onNext, canNext }:{
  categories:{id:string; name:string; shortName:string}[];
  coursesForSpec:{id:string; competency_category_id:string; code:string; name:string}[];
  grades:Record<string,GradeLetter>;
  setGrades:(fn:(p:Record<string,GradeLetter>)=>Record<string,GradeLetter>)=>void;
  academicScores:Record<string,number>;
  onPrev:()=>void; onNext:()=>void; canNext:boolean;
}){
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><GraduationCap size={18}/> 2. Input Nilai Akademik</CardTitle>
        <CardDescription>Masukkan nilai huruf (A, AB, B, BC, C, D, E) sesuai nilai mutu (A=4,00, AB=3,50, B=3,00, BC=2,50, C=2,00, D=1,00, E=0,00). Rata-rata per kategori dihitung dalam skala 4,00.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {categories.map(cat=>{
            const cs = coursesForSpec.filter(c=>c.competency_category_id===cat.id);
            return (
              <div key={cat.id} className="rounded-lg border p-4 bg-white dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div><div className="font-semibold text-sm">{cat.name} <span className="text-zinc-500 font-normal">({cat.shortName})</span></div><div className="text-xs text-zinc-500">Skor: <b>{academicScores[cat.id] !== undefined ? academicScores[cat.id].toFixed(2).replace(".", ",") : "-"}</b> / 4,00</div></div>
                  <Badge className="bg-zinc-100 border-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{cs.length} MK</Badge>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {cs.map(co=>(
                    <div key={co.id} className="space-y-1">
                      <Label>{co.code} — {co.name}</Label>
                      <Select value={grades[co.id]||""} onChange={e=> setGrades((prev: Record<string, GradeLetter>)=>({...prev, [co.id]: e.target.value as GradeLetter}))}>
                        <option value="">Pilih nilai</option>
                        {gradeOptions.map(g=> <option key={g} value={g}>{g} - {gradeToScale[g].toFixed(2).replace(".", ",")}</option>)}
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between"><Button variant="outline" onClick={onPrev}>Peminatan</Button><Button onClick={onNext} disabled={!canNext}>Ke tahap berikutnya</Button></div>
        {!canNext && <p className="text-xs text-amber-600">Lengkapi semua nilai.</p>}
      </CardContent>
    </Card>
  );
}
