"use client";
// File: src/components/dashboard/views/ExportsView.tsx

import React from 'react';
import ExportButtons from '@/components/dashboard/ExportButtons';
import { Download, AlertTriangle } from 'lucide-react';

interface Props {
  activeMode: 'live' | 'test';
  hasResult: boolean;
}

// FIXED: Removed 'activeMode' from the destructured props to clear the '@typescript-eslint/no-unused-vars' warning.
// It remains in the interface above so parent components won't break if they pass it.
export default function ExportsView({ hasResult }: Props) {
  return (
    <div className="bg-white border border-[#DDE1E9] rounded-3xl p-8 md:p-10 shadow-sm max-w-4xl mx-auto font-sans">

      <div className="flex items-start gap-6 mb-8">
        <div className="w-14 h-14 bg-[#E8EEFA] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#003DA5]/10 shadow-sm">
          <Download className="w-6 h-6 text-[#003DA5]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#0D1117] mb-2 font-display">
            Survey Data Export
          </h2>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            Generate a comprehensive, multi-sheet <code className="bg-[#F8F9FB] px-1.5 py-0.5 border border-[#DDE1E9] rounded text-[#0D1117] font-mono text-[11px] font-bold">.XLSX</code> workbook containing the full analytical breakdown of the Digital ID framework assessment.
          </p>
        </div>
      </div>

      {/* The 5-Sheet Accuracy Ledger */}
      <div className="bg-[#F8F9FB] border border-[#DDE1E9] rounded-2xl p-6 mb-8">
        <h3 className="text-[10px] font-bold text-[#8A95A3] uppercase tracking-[0.2em] mb-4">Included Assessment Datasets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3"><span className="text-[#003DA5] font-black text-sm font-display">1.</span> <p className="text-sm text-[#0D1117]"><strong className="font-bold">Survey Sessions:</strong> Participant and organization metadata</p></div>
          <div className="flex items-center gap-3"><span className="text-[#003DA5] font-black text-sm font-display">2.</span> <p className="text-sm text-[#0D1117]"><strong className="font-bold">Framework Responses:</strong> Complete survey answers by code</p></div>
          <div className="flex items-center gap-3"><span className="text-[#003DA5] font-black text-sm font-display">3.</span> <p className="text-sm text-[#0D1117]"><strong className="font-bold">Sub-pillar Aggregations:</strong> Question-level score distributions</p></div>
          <div className="flex items-center gap-3"><span className="text-[#003DA5] font-black text-sm font-display">4.</span> <p className="text-sm text-[#0D1117]"><strong className="font-bold">Maturity Results:</strong> Computed maturity scores by Pillar</p></div>
          <div className="flex items-center gap-3"><span className="text-[#003DA5] font-black text-sm font-display">5.</span> <p className="text-sm text-[#0D1117]"><strong className="font-bold">Engine Indicators:</strong> Core analytical framework metrics</p></div>
        </div>
      </div>

      {!hasResult && (
        <div className="mb-8 px-5 py-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-800 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-orange-600 mt-0.5" />
          <p className="leading-relaxed"><strong className="font-bold uppercase tracking-widest text-[10px]">Analysis required:</strong> Please execute the scoring engine on the dashboard before exporting to ensure accurate maturity results data.</p>
        </div>
      )}

      {/* Export Buttons Component */}
      <div className="border-t border-[#DDE1E9] pt-8 flex justify-center">
        <ExportButtons />
      </div>

    </div>
  );
}