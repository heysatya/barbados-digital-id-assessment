// File: src/app/layout.tsx
import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import "./globals.css";

// ── DM Serif Display — institutional display headlines ────────────────────
const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// ── DM Sans — modern, legible body & UI font ──────────────────────────────
const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Barbados | Digital ID Governance Assessment",
  description: "Comprehensive maturity assessment framework for the diagnostic evaluation of digital ID systems based on UNDP and DPI Safeguards principles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-bg-secondary font-sans antialiased text-text-primary">
        {children}
      </body>
    </html>
  );
}