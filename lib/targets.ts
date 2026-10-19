// ============================================================
// Target Skor Internship — SAGE & DELTA
// Menentukan target kompetensi per lowongan (Core/Secondary)
// ============================================================

import type { InternshipTarget } from "./types";

// ---- SAGE Targets (5 lowongan × 6 kategori = 30 target) ----

const sageTargets: InternshipTarget[] = [
  // Frontend Developer Intern — Telkom Digital Solution
  { id: "t1",  internship_id: "int_sage_1", competency_category_id: "sage_1", target_score: 3, factor_type: "CORE" },
  { id: "t2",  internship_id: "int_sage_1", competency_category_id: "sage_2", target_score: 2, factor_type: "SECONDARY" },
  { id: "t3",  internship_id: "int_sage_1", competency_category_id: "sage_3", target_score: 3, factor_type: "CORE" },
  { id: "t4",  internship_id: "int_sage_1", competency_category_id: "sage_4", target_score: 4, factor_type: "CORE" },
  { id: "t5",  internship_id: "int_sage_1", competency_category_id: "sage_5", target_score: 2, factor_type: "SECONDARY" },
  { id: "t6",  internship_id: "int_sage_1", competency_category_id: "sage_6", target_score: 1, factor_type: "SECONDARY" },

  // Backend Developer Intern — BUMN Startup Hub
  { id: "t7",  internship_id: "int_sage_2", competency_category_id: "sage_1", target_score: 4, factor_type: "CORE" },
  { id: "t8",  internship_id: "int_sage_2", competency_category_id: "sage_2", target_score: 2, factor_type: "SECONDARY" },
  { id: "t9",  internship_id: "int_sage_2", competency_category_id: "sage_3", target_score: 4, factor_type: "CORE" },
  { id: "t10", internship_id: "int_sage_2", competency_category_id: "sage_4", target_score: 3, factor_type: "CORE" },
  { id: "t11", internship_id: "int_sage_2", competency_category_id: "sage_5", target_score: 3, factor_type: "SECONDARY" },
  { id: "t12", internship_id: "int_sage_2", competency_category_id: "sage_6", target_score: 1, factor_type: "SECONDARY" },

  // System Analyst Intern — PT Sigma Cipta Caraka
  { id: "t13", internship_id: "int_sage_3", competency_category_id: "sage_1", target_score: 2, factor_type: "SECONDARY" },
  { id: "t14", internship_id: "int_sage_3", competency_category_id: "sage_2", target_score: 4, factor_type: "CORE" },
  { id: "t15", internship_id: "int_sage_3", competency_category_id: "sage_3", target_score: 2, factor_type: "SECONDARY" },
  { id: "t16", internship_id: "int_sage_3", competency_category_id: "sage_4", target_score: 2, factor_type: "SECONDARY" },
  { id: "t17", internship_id: "int_sage_3", competency_category_id: "sage_5", target_score: 4, factor_type: "CORE" },
  { id: "t18", internship_id: "int_sage_3", competency_category_id: "sage_6", target_score: 3, factor_type: "CORE" },

  // IT Governance Intern — Kementerian BUMN
  { id: "t19", internship_id: "int_sage_4", competency_category_id: "sage_1", target_score: 1, factor_type: "SECONDARY" },
  { id: "t20", internship_id: "int_sage_4", competency_category_id: "sage_2", target_score: 3, factor_type: "CORE" },
  { id: "t21", internship_id: "int_sage_4", competency_category_id: "sage_3", target_score: 1, factor_type: "SECONDARY" },
  { id: "t22", internship_id: "int_sage_4", competency_category_id: "sage_4", target_score: 1, factor_type: "SECONDARY" },
  { id: "t23", internship_id: "int_sage_4", competency_category_id: "sage_5", target_score: 3, factor_type: "CORE" },
  { id: "t24", internship_id: "int_sage_4", competency_category_id: "sage_6", target_score: 4, factor_type: "CORE" },

  // Fullstack Developer Intern — UMKM Digital Nusantara
  { id: "t25", internship_id: "int_sage_5", competency_category_id: "sage_1", target_score: 3, factor_type: "CORE" },
  { id: "t26", internship_id: "int_sage_5", competency_category_id: "sage_2", target_score: 3, factor_type: "SECONDARY" },
  { id: "t27", internship_id: "int_sage_5", competency_category_id: "sage_3", target_score: 3, factor_type: "CORE" },
  { id: "t28", internship_id: "int_sage_5", competency_category_id: "sage_4", target_score: 4, factor_type: "CORE" },
  { id: "t29", internship_id: "int_sage_5", competency_category_id: "sage_5", target_score: 2, factor_type: "SECONDARY" },
  { id: "t30", internship_id: "int_sage_5", competency_category_id: "sage_6", target_score: 2, factor_type: "SECONDARY" },
];

// ---- DELTA Targets (5 lowongan × 6 kategori = 30 target) ----

const deltaTargets: InternshipTarget[] = [
  // Data Analyst Intern — Telkom Data Analytics Center
  { id: "t31", internship_id: "int_delta_1", competency_category_id: "delta_1", target_score: 2, factor_type: "SECONDARY" },
  { id: "t32", internship_id: "int_delta_1", competency_category_id: "delta_2", target_score: 4, factor_type: "CORE" },
  { id: "t33", internship_id: "int_delta_1", competency_category_id: "delta_3", target_score: 3, factor_type: "CORE" },
  { id: "t34", internship_id: "int_delta_1", competency_category_id: "delta_4", target_score: 3, factor_type: "CORE" },
  { id: "t35", internship_id: "int_delta_1", competency_category_id: "delta_5", target_score: 2, factor_type: "SECONDARY" },
  { id: "t36", internship_id: "int_delta_1", competency_category_id: "delta_6", target_score: 2, factor_type: "SECONDARY" },

  // Data Scientist Intern — BigBox AI - Telkom
  { id: "t37", internship_id: "int_delta_2", competency_category_id: "delta_1", target_score: 4, factor_type: "CORE" },
  { id: "t38", internship_id: "int_delta_2", competency_category_id: "delta_2", target_score: 4, factor_type: "CORE" },
  { id: "t39", internship_id: "int_delta_2", competency_category_id: "delta_3", target_score: 3, factor_type: "SECONDARY" },
  { id: "t40", internship_id: "int_delta_2", competency_category_id: "delta_4", target_score: 2, factor_type: "SECONDARY" },
  { id: "t41", internship_id: "int_delta_2", competency_category_id: "delta_5", target_score: 3, factor_type: "CORE" },
  { id: "t42", internship_id: "int_delta_2", competency_category_id: "delta_6", target_score: 3, factor_type: "SECONDARY" },

  // Business Intelligence Intern — PT Telekomunikasi Indonesia
  { id: "t43", internship_id: "int_delta_3", competency_category_id: "delta_1", target_score: 3, factor_type: "CORE" },
  { id: "t44", internship_id: "int_delta_3", competency_category_id: "delta_2", target_score: 2, factor_type: "SECONDARY" },
  { id: "t45", internship_id: "int_delta_3", competency_category_id: "delta_3", target_score: 4, factor_type: "CORE" },
  { id: "t46", internship_id: "int_delta_3", competency_category_id: "delta_4", target_score: 2, factor_type: "SECONDARY" },
  { id: "t47", internship_id: "int_delta_3", competency_category_id: "delta_5", target_score: 4, factor_type: "CORE" },
  { id: "t48", internship_id: "int_delta_3", competency_category_id: "delta_6", target_score: 2, factor_type: "SECONDARY" },

  // Database Administrator Intern — Finnet Indonesia
  { id: "t49", internship_id: "int_delta_4", competency_category_id: "delta_1", target_score: 2, factor_type: "SECONDARY" },
  { id: "t50", internship_id: "int_delta_4", competency_category_id: "delta_2", target_score: 2, factor_type: "SECONDARY" },
  { id: "t51", internship_id: "int_delta_4", competency_category_id: "delta_3", target_score: 4, factor_type: "CORE" },
  { id: "t52", internship_id: "int_delta_4", competency_category_id: "delta_4", target_score: 2, factor_type: "SECONDARY" },
  { id: "t53", internship_id: "int_delta_4", competency_category_id: "delta_5", target_score: 3, factor_type: "CORE" },
  { id: "t54", internship_id: "int_delta_4", competency_category_id: "delta_6", target_score: 3, factor_type: "CORE" },

  // Machine Learning Engineer Intern — Amartha Data Lab
  { id: "t55", internship_id: "int_delta_5", competency_category_id: "delta_1", target_score: 4, factor_type: "CORE" },
  { id: "t56", internship_id: "int_delta_5", competency_category_id: "delta_2", target_score: 3, factor_type: "SECONDARY" },
  { id: "t57", internship_id: "int_delta_5", competency_category_id: "delta_3", target_score: 3, factor_type: "SECONDARY" },
  { id: "t58", internship_id: "int_delta_5", competency_category_id: "delta_4", target_score: 2, factor_type: "SECONDARY" },
  { id: "t59", internship_id: "int_delta_5", competency_category_id: "delta_5", target_score: 4, factor_type: "CORE" },
  { id: "t60", internship_id: "int_delta_5", competency_category_id: "delta_6", target_score: 3, factor_type: "CORE" },
];

// ---- Exported: All Targets Combined ----

export { sageTargets, deltaTargets };

/** Semua target digabung menjadi satu array */
export const allInternshipTargets: InternshipTarget[] = [
  ...sageTargets,
  ...deltaTargets,
];
