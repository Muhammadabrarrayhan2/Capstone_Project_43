"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Textarea, Label } from "@/components/ui/input";
import { FileText, Sparkles, RefreshCw } from "lucide-react";
export function Step3({ categories, essays, setEssays, evidences, setEvidences, onPrev, onEvaluate, canEvaluate, evaluating }:{
  categories:{id:string; name:string; shortName:string}[];
  essays:Record<string,string>; setEssays:(fn:(p:Record<string,string>)=>Record<string,string>)=>void;
  evidences:Record<string,string>; setEvidences:(fn:(p:Record<string,string>)=>Record<string,string>)=>void;
  onPrev:()=>void; onEvaluate:()=>void; canEvaluate:boolean; evaluating:boolean;
}){
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText size={18}/> 3. Input Essay Portofolio & Bukti</CardTitle>
        <CardDescription>Tulis deskripsi pengalaman proyek/studi kasus/sertifikasi per kategori + tautan bukti (GitHub/Drive/Sertifikat). Kategori yang tidak memiliki portofolio dapat dikosongkan (otomatis mendapatkan Skor 1).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map(cat=>(
          <div key={cat.id} className="rounded-lg border p-4 bg-white dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
            <div className="font-semibold text-sm">{cat.name} <span className="text-zinc-500">({cat.shortName})</span></div>
            <div className="space-y-1">
              <Label>Essay Portofolio (opsional)</Label>
              <Textarea value={essays[cat.id]||""} onChange={e=> setEssays((prev: Record<string,string>)=>({...prev, [cat.id]: e.target.value}))} rows={4} placeholder="Contoh: Membangun sistem inventory UMKM dengan Laravel + React, deploy di production dan dipakai 30 user... (kosongkan jika belum ada)" />
              <div className="text-xs text-zinc-500">{(essays[cat.id]||"").length} karakter (opsional, kosongkan jika tidak ada portofolio)</div>
            </div>
            <div className="space-y-1">
              <Label>Tautan Bukti (opsional)</Label>
              <Input placeholder="https://github.com/... atau https://drive.google.com/..." value={evidences[cat.id]||""} onChange={e=> setEvidences((prev: Record<string,string>)=>({...prev, [cat.id]: e.target.value}))} />
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>Nilai Akademik</Button>
          <Button onClick={onEvaluate} disabled={evaluating} className="gap-2">
            {evaluating ? <><RefreshCw size={16} className="animate-spin"/> Mengevaluasi...</> : <> Submit</>}
          </Button>
        </div>
        <p className="text-xs text-zinc-500">* Form portofolio bersifat opsional. Kategori yang belum memiliki pengalaman dapat dikosongkan (otomatis bernilai Skor 1 — Tidak ada portofolio).</p>
      </CardContent>
    </Card>
  );
}
