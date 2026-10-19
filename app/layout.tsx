import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPK Rekomendasi Tempat Magang — Capstone Project 43",
  description:
    "Sistem Pendukung Keputusan berbasis Profile Matching (Kusrini) dan Smart Rubric Evaluator (Gemini AI) untuk rekomendasi tempat magang mahasiswa — Kelompok 43, S1 Sistem Informasi, Telkom University Jakarta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
