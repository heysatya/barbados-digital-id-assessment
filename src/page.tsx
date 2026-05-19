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
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    id: 'P1',
    title: 'Service Delivery & User Value',
    icon: Users,
    subpillars: ['Coverage & Inclusion', 'User Experience', 'Service Integration', 'Value Creation', 'Continuous Improvement']
  },
  {
    id: 'P2',
    title: 'Safeguards, Trust & Accountability',
    icon: ShieldCheck,
    subpillars: ['Consent & Minimization', 'Transparency', 'Accountability & Redress', 'Non-Discrimination', 'Independent Oversight']
  },
  {
    id: 'P3',
    title: 'Ecosystem & Innovation',
    icon: Cpu,
    subpillars: ['Private Sector Participation', 'Digital ID Use Cases', 'Standards & Certification', 'Developer Ecosystem', 'Cross-Border Interop']
  },
  {
    id: 'P4',
    title: 'Technology & DPI Integration',
    icon: LayoutDashboard,
    subpillars: ['System Architecture', 'Data Exchange', 'DPI Integration', 'Cyber Resilience', 'Digital Public Goods']
  },
  {
    id: 'P5',
    title: 'Legal & Regulatory Foundations',
    icon: Gavel,
    subpillars: ['Legal Identity', 'Data Protection', 'Trust Services', 'Emerging Tech Safeguards', 'Legal Interoperability']
  },
  {
    id: 'P6',
    title: 'Institutional & Governance',
    icon: Building2,
    subpillars: ['Leadership & Coordination', 'Skills & Capacity', 'Vendor Management', 'Performance Monitoring', 'Financial Sustainability']
  }
];

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] selection:bg-[#003DA5]/30 overflow-x-hidden">

      {/* Navigation Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto border-b border-[#DDE1E9] bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#003DA5] rounded-lg flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base md:text-lg tracking-tight text-[#0D1117] font-display">
            Barbados Trident <span className="text-[#003DA5]">Digital ID</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-sm font-semibold text-[#4A5568] hover:text-[#003DA5] transition-colors flex items-center space-x-2 group">
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Dashboard</span>
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-16 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* IMAGE 1: Stacked above title, properly sized */}
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-[#DDE1E9] p-2 mb-10">
            <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Ensure you have hero-image-1.png or .svg in your public folder */}
              <Image src="/hero-image-1.png" alt="Digital Identity Overview" fill priority className="object-contain p-4" />
            </div>
          </div>

          {/* Main Title & Buttons */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight text-[#0D1117] font-display">
            National Digital ID <br />
            <span className="text-[#003DA5]">Governance Assessment</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#4A5568] mb-8 leading-relaxed">
            A rights-based diagnostic tool to evaluate the maturity, trust, and effectiveness of Barbados&apos; digital public infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/expert" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-sm font-semibold bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                Expert Survey <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/stakeholders" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-sm font-semibold bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                Stakeholder Survey <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </motion.div>
      </section>

      {/* Methodology Section */}
      <section className="relative z-10 px-6 pt-8 pb-8 max-w-5xl mx-auto border-t border-[#DDE1E9]">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D1117] font-display mb-3">Methodology & Framework</h2>
          <p className="text-sm md:text-base text-[#4A5568] max-w-2xl mx-auto">
            Integrating the UNDP Model Governance Framework and DPI Safeguards into a strict 1-5 maturity scoring engine.
          </p>
        </div>

        {/* IMAGE 2: Stacked above pillars, properly sized */}
        <div className="relative w-full max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-[#DDE1E9] p-2 mb-12">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
            {/* Ensure you have hero-image-2.png or .svg in your public folder */}
            <Image src="/hero-image-2.png" alt="Framework Methodology" fill className="object-contain p-4" />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative z-10 px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="group p-5 md:p-6 rounded-xl bg-white border border-[#DDE1E9] shadow-sm hover:border-[#003DA5]/30 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#E8EEFA] flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-5 h-5 text-[#003DA5]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#003DA5] tracking-widest uppercase mb-0.5">{pillar.id}</span>
                  <h3 className="text-sm md:text-base font-bold text-[#0D1117] leading-snug font-display">{pillar.title}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {pillar.subpillars.map((sub, i) => (
                  <li key={i} className="flex items-start text-xs text-[#4A5568] leading-tight">
                    <span className="text-[#003DA5]/40 mr-2 mt-0.5">•</span>
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-[#4A5568] bg-[#E8EEFA]/50 py-3 px-4 rounded-lg max-w-max mx-auto border border-[#DDE1E9]">
          <Lock className="w-3.5 h-3.5 text-[#003DA5]" />
          <span>No PII collected. Responses are anonymized for institutional research.</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#DDE1E9] bg-white text-center flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
        <div className="text-[#8A95A3] text-xs font-medium">
          © 2026 Barbados Digital ID Governance Assessment.
        </div>
        <div className="flex justify-center gap-6 text-xs font-bold text-[#4A5568] uppercase tracking-wider">
          <Link href="/dashboard" className="hover:text-[#003DA5]">Admin Portal</Link>
          <Link href="/expert" className="hover:text-[#003DA5]">Expert Survey</Link>
          <Link href="/stakeholders" className="hover:text-[#003DA5]">Stakeholder Survey</Link>
        </div>
      </footer>
    </div>
  );
}