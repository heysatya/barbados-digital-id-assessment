"use client";
// File: src/app/admin/rubric/page.tsx

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BookOpen, ShieldAlert, Loader2, Info } from 'lucide-react';
import rubricConfigJson from '@/config/rubric_config.json';

export default function RubricViewerPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Session retrieval failed:', error.message);
                await supabase.auth.signOut();
                setIsAdmin(false);
                setLoading(false);
                return;
            }
            if (!session) { setIsAdmin(false); setLoading(false); return; }

            const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
            if (!profile || profile.role !== 'admin') { setIsAdmin(false); setLoading(false); return; }

            setIsAdmin(true);
            setLoading(false);
        }
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center font-sans">
                <Loader2 className="w-8 h-8 animate-spin text-[#003DA5]" />
            </div>
        );
    }

    if (isAdmin === false) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6 font-sans">
                <div className="bg-white border border-[#DDE1E9] rounded-[3rem] p-12 text-center max-w-md shadow-sm">
                    <ShieldAlert className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-[#0D1117] font-display">Access Denied</h3>
                </div>
            </div>
        );
    }

    // Cast the imported JSON to a usable type
    interface RubricRule { formula: string; raw_range: string | number[] }
    interface RubricSubpillar { name: string; component_budgets: { expert: number; survey: number; indicator: number } }
    interface RubricConfig { version: string; description: string; normalization_rules: Record<string, RubricRule>; subpillars: Record<string, RubricSubpillar>; }

    const rubric = rubricConfigJson as unknown as RubricConfig;

    return (
        <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] p-6 lg:p-12 font-sans selection:bg-[#003DA5]/30">
            <div className="max-w-[1400px] mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-6 bg-white border border-[#DDE1E9] rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-[#E8EEFA] rounded-2xl flex items-center justify-center text-[#003DA5] shadow-sm border border-[#003DA5]/10 flex-shrink-0">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl md:text-3xl font-black text-[#0D1117] font-display tracking-tight">Rubric Configuration</h1>
                                <span className="px-3 py-1 bg-[#E8EEFA] text-[#003DA5] text-[9px] font-bold rounded-full uppercase tracking-widest border border-[#003DA5]/20">v{rubric.version}</span>
                            </div>
                            <p className="text-sm text-[#4A5568] font-medium max-w-2xl leading-relaxed">
                                {rubric.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Normalization Rules */}
                <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] p-8 shadow-sm">
                    <h2 className="text-lg font-black text-[#0D1117] font-display mb-6">Indicator Normalization Rules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(rubric.normalization_rules).map(([key, rule]) => (
                            <div key={key} className="p-5 bg-[#F8F9FB] border border-[#DDE1E9] rounded-2xl">
                                <p className="text-[10px] font-bold text-[#003DA5] uppercase tracking-widest mb-2">{key}</p>
                                <code className="block text-xs font-mono text-[#0D1117] mb-2">{rule.formula}</code>
                                <p className="text-[9px] text-[#4A5568] uppercase tracking-wider">Raw Range: {Array.isArray(rule.raw_range) ? rule.raw_range.join(' to ') : rule.raw_range}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subpillar Weights Table */}
                <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-[#DDE1E9] flex items-center gap-3 bg-blue-50/50">
                        <Info className="w-5 h-5 text-[#003DA5]" />
                        <p className="text-xs text-[#0D1117] font-medium">To modify weights or add questions, administrators must edit <code className="bg-white px-1.5 py-0.5 border border-[#DDE1E9] rounded font-mono text-[10px]">src/config/rubric_config.json</code> and redeploy. This prevents UI-driven mathematical errors.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#F8F9FB] border-b border-[#DDE1E9]">
                                <tr>
                                    <th className="px-8 py-5 font-bold text-[#4A5568] uppercase tracking-[0.2em] text-[9px]">Sub-Pillar</th>
                                    <th className="px-8 py-5 font-bold text-[#4A5568] uppercase tracking-[0.2em] text-[9px]">Expert Budget</th>
                                    <th className="px-8 py-5 font-bold text-[#4A5568] uppercase tracking-[0.2em] text-[9px]">Survey Budget</th>
                                    <th className="px-8 py-5 font-bold text-[#4A5568] uppercase tracking-[0.2em] text-[9px]">Indicator Budget</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE1E9]">
                                {Object.entries(rubric.subpillars).map(([code, sp]) => (
                                    <tr key={code} className="hover:bg-[#F8F9FB]/80 transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono font-bold text-[#003DA5] text-[11px] uppercase tracking-widest bg-[#E8EEFA] px-2 py-1 rounded-md">{code}</span>
                                                <span className="text-xs font-bold text-[#0D1117]">{sp.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-xs font-mono">{sp.component_budgets.expert.toFixed(2)}</td>
                                        <td className="px-8 py-4 text-xs font-mono">{sp.component_budgets.survey.toFixed(2)}</td>
                                        <td className="px-8 py-4 text-xs font-mono">{sp.component_budgets.indicator.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}