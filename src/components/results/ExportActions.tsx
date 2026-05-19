'use client';

import React from 'react';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';

interface ExportActionsProps {
  result: DigitalIDAssessmentOutput;
}

export default function ExportActions({ result }: ExportActionsProps) {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-id-result-${result.assessment_id}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    // Flatten subpillars for CSV
    const rows = result.subpillars.map(sp => ({
      pillar: sp.pillar_code,
      subpillar_code: sp.code,
      subpillar_name: sp.name,
      score: sp.score,
      maturity: sp.maturity,
      expert_mean: sp.expert_mean,
      survey_mean: sp.survey_mean,
      indicator_mean: sp.indicator_mean,
      data_quality: sp.data_quality_flag,
      discrepancy: sp.discrepancy_flag,
    }));

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-id-result-${result.assessment_id}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3 no-print">
      <Button 
        variant="outline" 
        onClick={exportJSON}
        className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl backdrop-blur-xl transition-all"
      >
        <FileJson className="w-4 h-4 mr-2 text-yellow-400" />
        Export JSON
      </Button>
      
      <Button 
        variant="outline" 
        onClick={exportCSV}
        className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl backdrop-blur-xl transition-all"
      >
        <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-400" />
        Export CSV
      </Button>

      <Button 
        variant="outline" 
        onClick={() => window.print()}
        className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl backdrop-blur-xl transition-all"
      >
        <Download className="w-4 h-4 mr-2 text-blue-400" />
        Download PDF
      </Button>
    </div>
  );
}
