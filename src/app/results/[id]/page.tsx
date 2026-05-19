import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import AssessmentResultsView from '@/components/results/AssessmentResultsView';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicResultPage({ params }: PageProps) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('assessment_group_id', id)
    .single();

  if (error || !data) {
    console.error('[PublicResultPage] Error fetching result:', error);
    return notFound();
  }

  const result = data.output_json as DigitalIDAssessmentOutput;

  return (
    <div className="min-h-screen bg-[#030711]">
      <AssessmentResultsView result={result} />
    </div>
  );
}
