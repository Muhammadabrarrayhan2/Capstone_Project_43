// ============================================================
// All Targets — Konversi ke format InternshipTargetInfo
// Digunakan oleh profile-matching.ts
// ============================================================

import { allInternshipTargets } from "./targets";
import type { InternshipTargetInfo } from "./types";

/**
 * Mapping dari InternshipTarget → InternshipTargetInfo
 * Transformasi field `internship_id` → `internshipId`
 */
export const allTargets: InternshipTargetInfo[] = allInternshipTargets.map((t) => ({
  internshipId: t.internship_id,
  competency_category_id: t.competency_category_id,
  target_score: t.target_score,
  factor_type: t.factor_type,
}));
