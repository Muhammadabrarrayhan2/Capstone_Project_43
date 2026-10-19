"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function BarRanking({ data }: { data: { name: string; percentage: number }[] }){
  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0,100]} tickFormatter={(v)=>`${v}%`} />
          <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: unknown)=>[`${Number(v).toFixed(2)}%`, "Kecocokan"]} />
          <Bar dataKey="percentage" radius={[0,8,8,0]}>
            {data.map((entry, idx)=>(
              <Cell key={idx} fill={idx===0 ? "#16a34a" : idx===1 ? "#2563eb" : "#64748b"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
