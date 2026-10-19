"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function RadarProfile({ categories, studentScores, targetScores }: {
  categories: { id: string; shortName: string }[];
  studentScores: Record<string, number>;
  targetScores: Record<string, number>;
}){
  const data = categories.map(c=>({
    subject: c.shortName,
    Mahasiswa: studentScores[c.id] ?? 0,
    Target: targetScores[c.id] ?? 0,
  }));
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0,4]} tickCount={5} />
          <Radar name="Mahasiswa" dataKey="Mahasiswa" stroke="#2563eb" fill="#2563eb" fillOpacity={0.35} />
          <Radar name="Target" dataKey="Target" stroke="#e11d48" fill="#e11d48" fillOpacity={0.15} />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
