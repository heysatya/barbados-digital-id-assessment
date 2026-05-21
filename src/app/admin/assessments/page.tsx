"use client";
// File: src/app/admin/assessments/page.tsx

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, ShieldAlert, Loader2, Trash2, Search, Calendar } from 'lucide-react';
import type { RawAssessmentSession } from '@/lib/assessmentAggregation';

export default function AssessmentManagementPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [sessions, setSessions] = useState<RawAssessmentSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modeFilter, setModeFilter] = useState<'all' | 'live' | 'test'>('all');

    async function fetchSessions() {
        setLoading(true);
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
        const { data } = await supabase.from('assessment_sessions').select('*').order('created_at', { ascending: false });
        if (data) setSessions(data as RawAssessmentSession[]);
        setLoading(false);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSessions();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this session? This will also delete all associated responses.')) return;

        // Deleting the session will cascade and delete the responses in Supabase if foreign keys are set up correctly.
        const { error } = await supabase.from('assessment_sessions').delete().eq('id', id);
        if (!error) {
            setSessions(prev => prev.filter(s => s.id !== id));
        } else {
            alert(`Failed to delete: ${error.message}`);
        }
    };

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

    const filtered = sessions.filter(s => {
        if (modeFilter !== 'all' && s.environment_mode !== modeFilter) return false;
        if (search && !s.organization_name?.toLowerCase().includes(search.toLowerCase()) && !s.id.includes(search)) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] p-6 lg:p-12 font-sans selection:bg-[#003DA5]/30">
            <div className="max-w-[1400px] mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-6 bg-white border border-[#DDE1E9] rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-[#E8EEFA] rounded-2xl flex items-center justify-center text-[#003DA5] shadow-sm border border-[#003DA5]/10 flex-shrink-0">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-[#0D1117] font-display tracking-tight mb-2">Session Management</h1>
                            <p className="text-sm text-[#4A5568] font-medium max-w-2xl leading-relaxed">
                                View, filter, and manage individual respondent sessions. Deleting a session removes it from the scoring engine pipeline.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 px-6 py-4 bg-white border border-[#DDE1E9] rounded-2xl shadow-sm">
                    <div className="relative flex-1 min-w-[250px]">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Organization or ID..."
                            className="w-full bg-[#F8F9FB] border border-[#DDE1E9] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0D1117] focus:ring-2 focus:ring-[#003DA5]/20 focus:border-[#003DA5] outline-none transition-all uppercase tracking-widest"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A95A3]" />
                    </div>
                    <select
                        value={modeFilter}
                        onChange={(e) => setModeFilter(e.target.value as 'all' | 'live' | 'test')}
                        className="bg-[#F8F9FB] border border-[#DDE1E9] rounded-xl px-4 py-2.5 text-[10px] font-bold text-[#0D1117] outline-none uppercase tracking-[0.15em] cursor-pointer"
                    >
                        <option value="all">All Environments</option>
                        <option value="live">Live Data Only</option>
                        <option value="test">Test Data Only</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#F8F9FB] border-b border-[#DDE1E9]">
                                <tr>
                                    {['Session ID', 'Environment', 'Type', 'Organization', 'Date', 'Action'].map(h => (
                                        <th key={h} className="px-8 py-5 font-bold text-[#4A5568] uppercase tracking-[0.2em] text-[9px]">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE1E9]">
                                {filtered.map(s => (
                                    <tr key={s.id} className="hover:bg-[#F8F9FB]/80 transition-colors">
                                        <td className="px-8 py-4 font-mono font-bold text-[#8A95A3] text-[10px]">{s.id.slice(0, 8)}...</td>
                                        <td className="px-8 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${s.environment_mode === 'live' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                                                }`}>{s.environment_mode}</span>
                                        </td>
                                        <td className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#003DA5]">{s.survey_type}</td>
                                        <td className="px-8 py-4 text-xs font-bold text-[#0D1117]">{s.organization_name || 'N/A'}</td>
                                        <td className="px-8 py-4 text-xs text-[#4A5568] flex items-center gap-2"><Calendar className="w-3 h-3" /> {new Date(s.created_at).toLocaleDateString()}</td>
                                        <td className="px-8 py-4">
                                            <button onClick={() => handleDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
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