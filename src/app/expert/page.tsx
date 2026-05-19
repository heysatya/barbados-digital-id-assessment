'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, Users, Cpu, Gavel, Building2, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SurveyShell from '@/components/survey/SurveyShell';

const pillars = [
  { id: 'P1', title: 'Service Delivery & User Value', icon: Users },
  { id: 'P2', title: 'Safeguards, Trust & Accountability', icon: ShieldCheck },
  { id: 'P3', title: 'Ecosystem & Innovation', icon: Cpu },
  { id: 'P4', title: 'Technology & DPI Integration', icon: LayoutDashboard },
  { id: 'P5', title: 'Legal & Regulatory Foundations', icon: Gavel },
  { id: 'P6', title: 'Institutional Capacity & Governance', icon: Building2 }
];

export default function ExpertPage() {
  const [isStarted, setIsStarted] = useState(false);

  // Seamless handoff to the Assessment Engine
  if (isStarted) {
    return (
      <SurveyShell
        survey_type="expert"
        surveyLabel="Expert Diagnostic Assessment"
      />
    );
  }

  // Standalone Centered Landing Page
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] selection:bg-[#003DA5]/30 flex flex-col overflow-x-hidden">

      {/* Background Ambient Orbs (Matches Homepage) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#003DA5]/5 blur-[120px]" />
      </div>

      {/* Standalone Brand Navigation */}
      <nav className="w-full px-6 py-4 border-b border-[#DDE1E9] bg-transparent relative z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#003DA5] rounded-lg flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight text-[#0D1117] font-display">
              Barbados Trident <span className="text-[#003DA5]">Digital ID</span>
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10">
        {/* Hero Section (Centered Editorial Layout) */}
        <section className="pt-12 pb-10 px-6 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0D1117] font-display leading-[1.15] mb-6">
              Expert Diagnostic <br />
              <span className="text-[#003DA5]">Digital ID Governance Assessment</span>
            </h1>
            <p className="text-base md:text-lg text-[#4A5568] leading-relaxed mb-10 max-w-2xl mx-auto">
              A comprehensive evaluation of the legal, policy, institutional, and technical landscape governing the Trident Digital Identity system.
            </p>

            {/* Quick Briefing Cards (Replaces the vertical list) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto text-left">
              <div className="bg-white p-4 rounded-xl border border-[#DDE1E9] shadow-sm">
                <div className="font-bold text-sm text-[#0D1117] mb-1">30 Sub-pillars</div>
                <div className="text-xs text-[#4A5568]">Evaluate across 6 governance domains.</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#DDE1E9] shadow-sm">
                <div className="font-bold text-sm text-[#0D1117] mb-1">Auto-Saving</div>
                <div className="text-xs text-[#4A5568]">Progress is saved to your browser locally.</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#DDE1E9] shadow-sm">
                <div className="font-bold text-sm text-[#0D1117] mb-1">No PII Required</div>
                <div className="text-xs text-[#4A5568]">Responses are for institutional research.</div>
              </div>
            </div>

            <Button
              onClick={() => setIsStarted(true)}
              size="lg"
              className="h-14 px-12 text-base font-semibold bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              Begin Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>

          </motion.div>
        </section>

        {/* Framed Methodology Image 2 */}
        <section className="px-6 pb-16 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative w-full bg-white rounded-[2rem] overflow-hidden shadow-xl border border-[#DDE1E9] p-2 md:p-4">
              <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-gray-50 rounded-2xl overflow-hidden">
                <Image
                  src="/hero-image-2.svg"
                  alt="Trident Assessment Framework Methodology"
                  fill
                  className="object-contain p-2 md:p-6"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* The 6 Pillars Context */}
        <section className="px-6 pb-20 max-w-6xl mx-auto border-t border-[#DDE1E9] pt-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0D1117] font-display">Evaluation Domains</h2>
            <p className="text-sm text-[#4A5568] mt-2">The assessment spans the following pillars:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="flex items-center space-x-4 p-5 rounded-xl bg-white border border-[#DDE1E9] shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#E8EEFA] flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-6 h-6 text-[#003DA5]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#003DA5] tracking-widest uppercase mb-0.5">{pillar.id}</span>
                  <h3 className="text-sm font-bold text-[#0D1117] leading-tight font-display">{pillar.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#DDE1E9] bg-white text-center relative z-10">
        <div className="text-[#8A95A3] text-xs font-medium max-w-6xl mx-auto flex items-center justify-center space-x-2">
          <Lock className="w-3.5 h-3.5 text-[#003DA5]/50" />
          <span>© 2026 Barbados Digital ID Governance Assessment. Rights-Respecting Design.</span>
        </div>
      </footer>

    </div>
  );
}