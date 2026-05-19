'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Cpu,
  Gavel,
  Building2,
  LayoutDashboard,
  ArrowRight,
  ChevronRight,
  Lock,
  CheckCircle2
} from 'lucide-react';

const pillars = [
  {
    id: 'P1',
    title: 'Service Delivery & User Value',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    subpillars: ['Coverage & Inclusion', 'User Experience', 'Service Integration', 'Value Creation', 'Continuous Improvement']
  },
  {
    id: 'P2',
    title: 'Safeguards, Trust & Accountability',
    icon: ShieldCheck,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    subpillars: ['Consent & Minimization', 'Transparency', 'Accountability & Redress', 'Non-Discrimination', 'Independent Oversight']
  },
  {
    id: 'P3',
    title: 'Ecosystem & Innovation',
    icon: Cpu,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    subpillars: ['Private Sector Participation', 'Digital ID Use Cases', 'Standards & Certification', 'Developer Ecosystem', 'Cross-Border Interop']
  },
  {
    id: 'P4',
    title: 'Technology & DPI Integration',
    icon: LayoutDashboard,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    subpillars: ['System Architecture', 'Data Exchange', 'DPI Integration', 'Cyber Resilience', 'Digital Public Goods']
  },
  {
    id: 'P5',
    title: 'Legal & Regulatory Foundations',
    icon: Gavel,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    subpillars: ['Legal Identity', 'Data Protection', 'Trust Services', 'Emerging Tech Safeguards', 'Legal Interoperability']
  },
  {
    id: 'P6',
    title: 'Institutional Capacity & Governance',
    icon: Building2,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    subpillars: ['Leadership & Coordination', 'Skills & Capacity', 'Vendor Management', 'Institutional Accountability', 'Financing & Sustainability']
  }
];

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] selection:bg-[#003DA5]/30 overflow-x-hidden font-sans">

      {/* Background Ambient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#003DA5]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#C8952A]/5 blur-[100px]" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto border-b border-[#DDE1E9] bg-transparent">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#003DA5] rounded-xl flex items-center justify-center shadow-lg shadow-[#003DA5]/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight text-[#0D1117] font-display">
            Barbados Trident <span className="text-[#003DA5]">Digital ID</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-[#4A5568] hover:text-[#003DA5] transition-colors flex items-center space-x-2 group">
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Dashboard</span>
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* IMAGE 1: Sleek, borderless presentation */}
          <div className="relative w-full max-w-4xl mx-auto mb-10 group">
            <div className="relative w-full aspect-[21/9] flex items-center justify-center">
              <Image
                src="/hero-image-1.svg"
                alt="Digital Identity Overview"
                fill
                priority
                className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.1] text-[#0D1117] font-display mt-8">
            National Digital ID <br />
            <span className="text-[#003DA5]">Governance Assessment</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#4A5568] font-medium mb-10 leading-relaxed">
            A comprehensive, rights-based diagnostic tool to evaluate the maturity, trust, and effectiveness of Barbados&apos; Trident Digital ID system across 30 critical governance dimensions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/expert" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-8 text-xs font-black uppercase tracking-[0.15em] bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl shadow-xl shadow-[#003DA5]/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                Expert Survey <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/stakeholders" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-8 text-xs font-black uppercase tracking-[0.15em] bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl shadow-xl shadow-[#003DA5]/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                Stakeholder Survey <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Trust Strip */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-[10px] font-bold text-[#8A95A3] uppercase tracking-widest">
            <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> No PII Collected</span>
            <span className="hidden sm:inline text-[#DDE1E9]">|</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Rights-Respecting</span>
          </div>

        </motion.div>
      </section>

      {/* Methodology Section */}
      <section className="relative z-10 px-6 pt-12 pb-24 max-w-7xl mx-auto border-t border-[#DDE1E9]">

        {/* IMAGE 2: Sleek, borderless presentation */}
        <div className="relative w-full max-w-5xl mx-auto mb-16 group">
          <div className="relative w-full aspect-[21/9] flex items-center justify-center">
            <Image
              src="/hero-image-2.svg"
              alt="Framework Methodology"
              fill
              className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1117] font-display mb-4">Methodology & Framework</h2>
          <p className="text-base text-[#4A5568] max-w-2xl mx-auto font-medium leading-relaxed">
            Integrating the UNDP Model Governance Framework for Legal Identity and DPI Safeguards into a strict multi-dimensional diagnostic matrix.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="group p-8 rounded-[2rem] bg-white border border-[#DDE1E9] shadow-sm hover:border-[#003DA5]/30 hover:shadow-xl hover:shadow-[#003DA5]/5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />

              <div className="flex items-start space-x-4 mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${pillar.bg} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <div className="pt-1">
                  <span className="block text-[10px] font-black text-[#8A95A3] tracking-[0.2em] uppercase mb-1">Pillar {pillar.id}</span>
                  <h3 className="text-lg font-black text-[#0D1117] leading-snug font-display pr-4">{pillar.title}</h3>
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {pillar.subpillars.map((sub, i) => (
                  <li key={i} className="flex items-start text-sm font-medium text-[#4A5568] leading-tight">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DDE1E9] mr-3 mt-1.5 flex-shrink-0 group-hover:bg-[#003DA5] transition-colors" />
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 border-t border-[#DDE1E9] bg-white text-center flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="text-[#8A95A3] text-xs font-bold uppercase tracking-widest">
          © 2026 Barbados Digital ID Governance Assessment.
        </div>
        <div className="flex justify-center gap-8 text-[10px] font-black text-[#4A5568] uppercase tracking-[0.2em]">
          <Link href="/expert" className="hover:text-[#003DA5] transition-colors">Expert Survey</Link>
          <Link href="/stakeholders" className="hover:text-[#003DA5] transition-colors">Stakeholder Survey</Link>
          <Link href="/dashboard" className="hover:text-[#003DA5] transition-colors">Admin Portal</Link>
        </div>
      </footer>
    </div>
  );
}