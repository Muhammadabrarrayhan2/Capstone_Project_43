// ============================================================
// Static Data — Capstone Project 43
// Peminatan, Kategori Kompetensi, Mata Kuliah, Lowongan Magang
// ============================================================

import type {
  Specialization,
  SpecializationCode,
  CompetencyCategory,
  Course,
  GradeLetter,
  Internship,
} from "./types";

// Re-export types for backward compatibility
export type { SpecializationCode, GradeLetter, FactorType } from "./types";
export type {
  Specialization,
  CompetencyCategory,
  Course,
  Internship,
  InternshipTarget,
} from "./types";

// ---- Peminatan ----

export const specializations: Specialization[] = [
  {
    id: "spec_sage",
    code: "SAGE",
    name: "SAGE",
    description: "Software and IT Governance Engineering",
  },
  {
    id: "spec_delta",
    code: "DELTA",
    name: "DELTA",
    description: "Data Exploration, Learning & Translational Analytics",
  },
];

// ---- Konversi Nilai ----

/** Konversi nilai huruf → bobot nilai mutu Telkom University (A=4.00, AB=3.50, B=3.00, BC=2.50, C=2.00, D=1.00, E=0.00) */
export const gradeToScale: Record<GradeLetter, number> = {
  A: 4.0,
  AB: 3.5,
  B: 3.0,
  BC: 2.5,
  C: 2.0,
  D: 1.0,
  E: 0.0,
};

export const gradeOptions: GradeLetter[] = ["A", "AB", "B", "BC", "C", "D", "E"];

// ---- Kategori Kompetensi (SAGE & DELTA) ----

export const competencyCategories: CompetencyCategory[] = [
  // SAGE — 6 kategori
  { id: "sage_1", specialization_id: "spec_sage", name: "Pemrograman Berorientasi Objek", shortName: "PBO", description: "OOP" },
  { id: "sage_2", specialization_id: "spec_sage", name: "Analisis dan Perancangan SI", shortName: "APSI", description: "Analisis" },
  { id: "sage_3", specialization_id: "spec_sage", name: "Algoritma dan Pemrograman", shortName: "Algoritma", description: "Algoritma" },
  { id: "sage_4", specialization_id: "spec_sage", name: "Pengembangan Aplikasi Website", shortName: "Web Dev", description: "Web" },
  { id: "sage_5", specialization_id: "spec_sage", name: "Arsitektur Enterprise", shortName: "AE", description: "AE" },
  { id: "sage_6", specialization_id: "spec_sage", name: "Tata Kelola dan Manajemen TI", shortName: "TGTI", description: "TGTI" },
  // DELTA — 6 kategori
  { id: "delta_1", specialization_id: "spec_delta", name: "Penambangan Data", shortName: "Data Mining", description: "Mining" },
  { id: "delta_2", specialization_id: "spec_delta", name: "Probabilitas dan Statistik", shortName: "ProbStat", description: "ProbStat" },
  { id: "delta_3", specialization_id: "spec_delta", name: "Sistem Basis Data", shortName: "SBD", description: "SBD" },
  { id: "delta_4", specialization_id: "spec_delta", name: "Statistika Industri", shortName: "Stat Industri", description: "Stat" },
  { id: "delta_5", specialization_id: "spec_delta", name: "Data Warehouse dan BI", shortName: "DWBI", description: "DWBI" },
  { id: "delta_6", specialization_id: "spec_delta", name: "Matematika Diskrit", shortName: "MatDis", description: "MatDis" },
];

// ---- Mata Kuliah ----

export const courses: Course[] = [
  // SAGE
  { id: "c_sage_1a", competency_category_id: "sage_1", code: "IS2113", name: "Pemrograman Berorientasi Objek" },
  { id: "c_sage_2a", competency_category_id: "sage_2", code: "IS3214", name: "Analisis dan Perancangan SI" },
  { id: "c_sage_3a", competency_category_id: "sage_3", code: "IS1212", name: "Algoritma dan Pemrograman" },
  { id: "c_sage_4a", competency_category_id: "sage_4", code: "IS3223", name: "Pengembangan Aplikasi Website" },
  { id: "c_sage_5a", competency_category_id: "sage_5", code: "IS4312", name: "Arsitektur Enterprise" },
  { id: "c_sage_6a", competency_category_id: "sage_6", code: "IS4323", name: "Tata Kelola dan Manajemen TI" },
  // DELTA
  { id: "c_delta_1a", competency_category_id: "delta_1", code: "IS3423", name: "Penambangan Data" },
  { id: "c_delta_2a", competency_category_id: "delta_2", code: "IS2212", name: "Probabilitas dan Statistik" },
  { id: "c_delta_3a", competency_category_id: "delta_3", code: "IS2223", name: "Sistem Basis Data" },
  { id: "c_delta_4a", competency_category_id: "delta_4", code: "IS3323", name: "Statistika Industri" },
  { id: "c_delta_5a", competency_category_id: "delta_5", code: "IS4223", name: "Data Warehouse dan BI" },
  { id: "c_delta_6a", competency_category_id: "delta_6", code: "IS1213", name: "Matematika Diskrit" },
];

// ---- Lowongan Magang ----

export const internships: Internship[] = [
  // SAGE — 5 lowongan
  { id: "int_sage_1", specialization_id: "spec_sage", position_name: "Frontend Developer Intern", company_name: "Telkom Digital Solution", description: "Antarmuka web responsif React/Next.js", vacancy_url: "https://karir.telkom.co.id" },
  { id: "int_sage_2", specialization_id: "spec_sage", position_name: "Backend Developer Intern", company_name: "BUMN Startup Hub", description: "REST API, microservices", vacancy_url: "https://linkedin.com/jobs" },
  { id: "int_sage_3", specialization_id: "spec_sage", position_name: "System Analyst Intern", company_name: "PT Sigma Cipta Caraka", description: "Analisis kebutuhan, UML", vacancy_url: "https://telkomindonesia.co.id/karir" },
  { id: "int_sage_4", specialization_id: "spec_sage", position_name: "IT Governance Intern", company_name: "Kementerian BUMN", description: "Audit tata kelola TI, COBIT & ITIL", vacancy_url: "https://rekrutmenbersama.fhcibumn.id" },
  { id: "int_sage_5", specialization_id: "spec_sage", position_name: "Fullstack Developer Intern", company_name: "UMKM Digital Nusantara", description: "End-to-end web app UMKM", vacancy_url: "https://glints.com/id" },
  // DELTA — 5 lowongan
  { id: "int_delta_1", specialization_id: "spec_delta", position_name: "Data Analyst Intern", company_name: "Telkom Data Analytics Center", description: "Analisis data bisnis", vacancy_url: "https://karir.telkom.co.id" },
  { id: "int_delta_2", specialization_id: "spec_delta", position_name: "Data Scientist Intern", company_name: "BigBox AI - Telkom", description: "Machine learning, data mining", vacancy_url: "https://bigbox.co.id/career" },
  { id: "int_delta_3", specialization_id: "spec_delta", position_name: "Business Intelligence Intern", company_name: "PT Telekomunikasi Indonesia", description: "ETL, data warehouse, BI", vacancy_url: "https://telkomindonesia.co.id/karir" },
  { id: "int_delta_4", specialization_id: "spec_delta", position_name: "Database Administrator Intern", company_name: "Finnet Indonesia", description: "Manajemen database, optimasi query", vacancy_url: "https://finnet.co.id/karir" },
  { id: "int_delta_5", specialization_id: "spec_delta", position_name: "Machine Learning Engineer Intern", company_name: "Amartha Data Lab", description: "Pipeline ML dan deployment", vacancy_url: "https://glints.com/id" },
];

// ---- Helper Functions ----

/** Filter kategori kompetensi berdasarkan kode peminatan */
export function getCategoriesBySpec(code: SpecializationCode): CompetencyCategory[] {
  const spec = specializations.find((s) => s.code === code)!;
  return competencyCategories.filter((c) => c.specialization_id === spec.id);
}

/** Filter lowongan magang berdasarkan kode peminatan */
export function getInternshipsBySpec(code: SpecializationCode): Internship[] {
  const spec = specializations.find((s) => s.code === code)!;
  return internships.filter((i) => i.specialization_id === spec.id);
}
