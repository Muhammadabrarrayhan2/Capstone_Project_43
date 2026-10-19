"use client";
import { useState, useMemo } from "react";
import { competencyCategories, courses, gradeToScale, internships } from "@/lib/data";
import type { SpecializationCode, GradeLetter } from "@/lib/data";
import { allTargets } from "@/lib/allTargets";
import { rankInternships } from "@/lib/profile-matching";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Sparkles, FileText, BarChart3, Trophy, Eye } from "lucide-react";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Step4 } from "./components/Step4";
import { Step5 } from "./components/Step5";
import { Step6 } from "./components/Step6";
import { UserNav } from "@/components/UserNav";
import Link from "next/link";
type Step = 1|2|3|4|5|6;
export default function SPKPage(){
  const [spec, setSpec] = useState<SpecializationCode>("SAGE");
  const [step, setStep] = useState<Step>(1);
  const [grades, setGrades] = useState<Record<string, GradeLetter>>({});
  const [essays, setEssays] = useState<Record<string, string>>({});
  const [evidences, setEvidences] = useState<Record<string, string>>({});
  const [portfolioScores, setPortfolioScores] = useState<Record<string, number>>({});
  const [reasonings, setReasonings] = useState<Record<string, string>>({});
  const [evaluating, setEvaluating] = useState(false);
  const [evalMode, setEvalMode] = useState<string>("");
  const categories = useMemo(()=> competencyCategories.filter(c=> c.specialization_id === (spec==="SAGE" ? "spec_sage":"spec_delta")), [spec]);
  const coursesForSpec = useMemo(()=> courses.filter(c=> categories.some(cat=>cat.id===c.competency_category_id)), [categories]);
  const internshipsForSpec = useMemo(()=> internships.filter(i=> i.specialization_id === (spec==="SAGE" ? "spec_sage":"spec_delta")), [spec]);
  const academicScores = useMemo(()=>{
    const m: Record<string, number> = {};
    for(const cat of categories){
      const cs = coursesForSpec.filter(c=>c.competency_category_id===cat.id);
      const vals = cs.map(c=> grades[c.id] ? gradeToScale[grades[c.id]] : 0);
      const avg = vals.length > 0 ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
      m[cat.id] = Number(avg.toFixed(2));
    }
    return m;
  }, [categories, coursesForSpec, grades]);
  const canGoStep3 = categories.every(cat=> coursesForSpec.filter(c=>c.competency_category_id===cat.id).every(c=> grades[c.id]));
  const canEvaluate = true;
  async function handleEvaluate(){
    setEvaluating(true);
    try{
      const res = await fetch("/api/evaluate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: categories.map(cat=>({ categoryId: cat.id, name: cat.name, essay: essays[cat.id]||"", evidenceUrl: evidences[cat.id]||"" })) }) });
      const data = await res.json();
      const ps: Record<string, number> = {}; const rs: Record<string, string> = {};
      for(const r of (data.results||[])){ ps[r.categoryId]=r.score; rs[r.categoryId]=r.reasoning; }
      setPortfolioScores(ps); setReasonings(rs); setEvalMode(data.mode || ""); setStep(4);
    } finally { setEvaluating(false); }
  }
  const ranked = useMemo(()=>{
    if(step < 5) return [];
    const inputs = categories.map(cat=>({ categoryId: cat.id, academicScore: academicScores[cat.id] ?? 0, portfolioScore: portfolioScores[cat.id] ?? 1 }));
    return rankInternships(inputs, internshipsForSpec.map(i=>i.id), allTargets);
  }, [step, categories, academicScores, portfolioScores, internshipsForSpec]);
  const steps = [{n:1,label:"Peminatan",icon:Sparkles},{n:2,label:"Nilai",icon:GraduationCap},{n:3,label:"Portofolio",icon:FileText},{n:4,label:"Preview",icon:Eye},{n:5,label:"Hitung",icon:BarChart3},{n:6,label:"Rekomendasi",icon:Trophy}];
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-black/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg bg-zinc-900 text-white grid place-items-center dark:bg-white dark:text-black"><GraduationCap size={18} /></div><div><div className="text-sm font-bold leading-none">SPK Rekomendasi Magang</div><div className="text-xs text-zinc-500">Profile Matching + Gemini - Kelompok 43</div></div></div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">Home</Link>
            <Link href="/history" className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">Riwayat</Link>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{spec}</Badge>
            <UserNav />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map(s=>{
            const active=step===s.n; const done=step>s.n;
            return <button key={s.n} onClick={()=> setStep(s.n as Step)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border whitespace-nowrap ${active?"bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black": done?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800"}`}><s.icon size={14}/>{s.n}. {s.label}</button>;
          })}
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {step===1 && <Step1 spec={spec} setSpec={setSpec} onNext={()=> setStep(2)} />}
        {step===2 && <Step2 categories={categories} coursesForSpec={coursesForSpec} grades={grades} setGrades={setGrades as never} academicScores={academicScores} onPrev={()=> setStep(1)} onNext={()=> setStep(3)} canNext={canGoStep3} />}
        {step===3 && <Step3 categories={categories} essays={essays} setEssays={setEssays as never} evidences={evidences} setEvidences={setEvidences as never} onPrev={()=> setStep(2)} onEvaluate={handleEvaluate} canEvaluate={canEvaluate} evaluating={evaluating} />}
        {step===4 && <Step4 categories={categories} academicScores={academicScores} portfolioScores={portfolioScores} reasonings={reasonings} evidences={evidences} evalMode={evalMode} onPrev={()=> setStep(3)} onNext={()=> setStep(5)} />}
        {step===5 && <Step5 ranked={ranked} categories={categories} onPrev={()=> setStep(4)} onNext={()=> setStep(6)} />}
        {step===6 && (
          <Step6
            ranked={ranked}
            categories={categories}
            academicScores={academicScores}
            portfolioScores={portfolioScores}
            spec={spec}
            essays={essays}
            evidences={evidences}
            reasonings={reasonings}
            onPrev={()=> setStep(5)}
            onRestart={()=> {
              setStep(1);
              setGrades({});
              setEssays({});
              setEvidences({});
              setPortfolioScores({});
              setReasonings({});
            }}
          />
        )}
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-zinc-400">SPK Profile Matching (Kusrini) + Gemini 2.5 Flash - Kelompok 43 - Telkom University Jakarta</footer>
    </div>
  );
}
