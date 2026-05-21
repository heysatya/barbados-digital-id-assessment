"use client";
// File: src/app/admin/indicators/page.tsx

import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShieldAlert, Save, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Activity, Link as LinkIcon, Calendar, Layers, Settings2, Eye } from 'lucide-react';

interface IndicatorRegistryItem {
  code: string;
  pillar_code: string;
  subpillar_code: string;
  subpillar_name?: string;
  description: string;
  weight: number;
  source?: string;
  normalization: string;
  max_value?: number;
  input_type?: 'numeric' | 'binary' | 'ternary';
  sheet_value?: number | null;
  sheet_year?: string;
  sheet_link?: string;
}

interface IndicatorDBValue {
  id?: string;
  indicator_code: string;
  pillar_code: string;
  subpillar_code: string;
  raw_value: number | null;
  max_value: number | null;
  metadata?: { year?: string; link?: string; normalization?: string };
  environment_mode: string;
  rubric_version: string;
}

const PILLAR_NAMES: Record<string, string> = {
  P1: 'Service Delivery & User Value', P2: 'Safeguards, Trust & Accountability',
  P3: 'Ecosystem & Innovation', P4: 'Technology & DPI Integration',
  P5: 'Legal & Regulatory Foundations', P6: 'Institutional Capacity & Governance',
};

const PILLAR_COLORS: Record<string, string> = {
  P1: '#003DA5', P2: '#D69E2E', P3: '#2F855A',
  P4: '#C53030', P5: '#805AD5', P6: '#319795',
};

const SCORE_COLOR = (score: number) => {
  if (score < 1.81) return '#C53030';
  if (score < 2.61) return '#C05621';
  if (score < 3.41) return '#B7791F';
  if (score < 4.21) return '#276749';
  return '#1A365D';
};

// ── The Smart Row Component (Handles Overrides + Safety) ──
const IndicatorRow = ({
  indicator,
  dbValue,
  onChange,
  readOnly = false
}: {
  indicator: IndicatorRegistryItem;
  dbValue: IndicatorDBValue | undefined;
  onChange: (val: number | null, meta: { year?: string; link?: string; normalization?: string }, maxVal: number) => void;
  readOnly?: boolean;
}) => {
  const [localVal, setLocalVal] = useState<string>(dbValue?.raw_value !== null && dbValue?.raw_value !== undefined ? String(dbValue.raw_value) : '');
  const [localMeta, setLocalMeta] = useState<{ year?: string, link?: string, normalization?: string }>(dbValue?.metadata || {});

  // Editable UI overrides for Rules and Max Values
  const [localRule, setLocalRule] = useState<string>(dbValue?.metadata?.normalization || indicator.normalization);
  const [localMax, setLocalMax] = useState<number>(dbValue?.max_value || indicator.max_value || 100);

  const [showEvidence, setShowEvidence] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setLocalVal(dbValue?.raw_value !== null && dbValue?.raw_value !== undefined ? String(dbValue.raw_value) : '');
    setLocalMeta(dbValue?.metadata || {});
    setLocalRule(dbValue?.metadata?.normalization || indicator.normalization);
    setLocalMax(dbValue?.max_value || indicator.max_value || 100);
  }, [dbValue, indicator]);

  const isBinary = indicator.input_type === 'binary' || localRule === 'binary_map';
  const isPct = localRule === 'pct_to_5';

  const parsed = parseFloat(localVal);
  const hasError = !isBinary && localVal !== '' && (isNaN(parsed) || parsed > localMax || parsed < 0);
  const hasMetadata = !!(localMeta.year || localMeta.link);

  const handleBlur = () => {
    setIsFocused(false);
    if (!hasError && localVal !== '') {
      // VALIDATION FIX: Clamp precision to 2 decimal places to prevent DB bloat
      const roundedVal = Math.round(parseFloat(localVal) * 100) / 100;
      setLocalVal(String(roundedVal));
      onChange(roundedVal, { ...localMeta, normalization: localRule }, localMax);
    } else if (localVal === '') {
      onChange(null, { ...localMeta, normalization: localRule }, localMax);
    }
  };

  const handleQualitative = (val: number | null) => {
    setLocalVal(val !== null ? String(val) : '');
    onChange(val, { ...localMeta, normalization: localRule }, localMax);
  };

  const updateMeta = (field: 'year' | 'link', value: string) => {
    // VALIDATION FIX: Strict Year format
    if (field === 'year' && value !== '' && !/^\d+$/.test(value)) return;

    const nextMeta = { ...localMeta, [field]: value, normalization: localRule };
    setLocalMeta(nextMeta);
    onChange(localVal === '' ? null : parseFloat(localVal), nextMeta, localMax);
  };

  // VALIDATION FIX: Rule Change Auto-Binder ensures max value matches rule strictly
  const handleRuleChange = (newRule: string) => {
    setLocalRule(newRule);
    let newMax = 100;
    if (newRule === 'index_to_5') newMax = 1.0;

    setLocalMax(newMax);
    onChange(localVal === '' ? null : parseFloat(localVal), { ...localMeta, normalization: newRule }, newMax);
  };

  // Real-Time Math directly respects the UI Overrides
  const normScore = useMemo(() => {
    if (localVal === '' || hasError) return 'N/A';
    const raw = parseFloat(localVal);
    const max = localMax || 100;

    if (localRule === 'pct_to_5' || localRule === 'binary_map') return (1 + (raw / 100) * 4).toFixed(2);
    if (localRule === 'index_to_5') return (1 + raw * 4).toFixed(2);
    if (max === 0) return 'N/A';
    return (1 + (raw / max) * 4).toFixed(2);
  }, [localVal, hasError, localRule, localMax]);

  const sColor = normScore !== 'N/A' ? SCORE_COLOR(Number(normScore)) : '#8A95A3';

  return (
    <div className="p-6 flex flex-col xl:flex-row xl:items-start justify-between gap-8 hover:bg-[#F8FAFC]/50 transition-colors border-b border-[#F1F5F9] last:border-0 bg-white">

      {/* 1. Context & Admin Rule Overrides */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-black px-2 py-1 rounded bg-[#F1F5F9] text-[#4A5568] border border-[#E2E8F0] tracking-widest uppercase shadow-sm">
            {indicator.code}
          </span>
          {hasMetadata && (
            <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-widest flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Evidence Attached
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-[#0D1117] leading-relaxed max-w-3xl mb-3">{indicator.description}</p>

        {/* Admin Dropdowns for Normalization & Auto-bound Max Value */}
        <div className="flex items-center gap-4 bg-[#F8F9FB] p-2 rounded-lg border border-[#E2E8F0] w-fit">
          <div className="flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-[#8A95A3]" />
            <select
              value={localRule}
              onChange={(e) => handleRuleChange(e.target.value)}
              disabled={readOnly}
              className={`text-[10px] font-bold text-[#0D1117] bg-white border border-[#DDE1E9] rounded px-2 py-1 outline-none focus:border-[#003DA5] shadow-sm ${readOnly ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer'}`}
            >
              <option value="pct_to_5">Percentage Scale (0-100)</option>
              <option value="index_to_5">Index Scale (0.0 - 1.0)</option>
              <option value="binary_map">Qualitative (Yes/No)</option>
            </select>
          </div>
          <div className="w-px h-4 bg-[#DDE1E9]" />
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest">Max:</span>
            {/* Auto-Bound Max Value Badge replaces the risky text input */}
            <span className="text-[10px] font-black text-[#0D1117] bg-[#E2E8F0] px-2 py-0.5 rounded border border-[#CBD5E1]">
              {localMax}
            </span>
          </div>
          <div className="w-px h-4 bg-[#DDE1E9]" />
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors ${showEvidence ? 'text-[#003DA5]' : 'text-[#8A95A3] hover:text-[#4A5568]'}`}
          >
            <LinkIcon className="w-3 h-3" /> {showEvidence ? 'Close Evidence' : '+ Add Evidence'}
          </button>
        </div>

        {/* Audit Trail Drawer */}
        <AnimatePresence>
          {showEvidence && (
            <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
              <div className="bg-[#F8F9FB] p-4 rounded-xl border border-[#DDE1E9] flex gap-4 max-w-2xl">
                <div className="w-32">
                  <label className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest mb-1.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Year</label>
                  <input type="text" disabled={readOnly} maxLength={4} placeholder="e.g. 2024" value={localMeta.year || ''} onChange={(e) => updateMeta('year', e.target.value)} onBlur={handleBlur} className={`w-full bg-white border border-[#DDE1E9] rounded-lg px-3 py-2 text-xs font-bold text-[#0D1117] outline-none focus:border-[#003DA5] ${readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest mb-1.5 flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Source</label>
                  <input type="text" disabled={readOnly} maxLength={500} placeholder="URL or Document Name..." value={localMeta.link || ''} onChange={(e) => updateMeta('link', e.target.value)} onBlur={handleBlur} className={`w-full bg-white border border-[#DDE1E9] rounded-lg px-3 py-2 text-xs font-medium text-[#0D1117] outline-none focus:border-[#003DA5] ${readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Input Guard & Controls */}
      <div className="flex items-center gap-6 xl:w-auto">
        <div className="flex flex-col items-end min-w-[160px]">
          {isBinary ? (
            <div className="flex items-center p-1 bg-[#F8F9FB] border border-[#DDE1E9] rounded-xl shadow-sm">
              <button disabled={readOnly} onClick={() => handleQualitative(100)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${localVal === '100' ? 'bg-[#00B050] text-white shadow-md' : 'text-[#8A95A3] hover:text-[#4A5568]'} ${readOnly ? 'cursor-not-allowed opacity-80' : ''}`}>Yes</button>
              <button disabled={readOnly} onClick={() => handleQualitative(0)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${localVal === '0' ? 'bg-[#C00000] text-white shadow-md' : 'text-[#8A95A3] hover:text-[#4A5568]'} ${readOnly ? 'cursor-not-allowed opacity-80' : ''}`}>No</button>
              <button disabled={readOnly} onClick={() => handleQualitative(null)} className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${localVal === '' ? 'bg-[#E2E8F0] text-[#4A5568] shadow-inner' : 'text-[#8A95A3] hover:text-[#4A5568]'} ${readOnly ? 'cursor-not-allowed opacity-80' : ''}`}>N/A</button>
            </div>
          ) : (
            <>
              <div className={`relative flex items-center bg-[#F8F9FB] border ${hasError ? 'border-red-400 ring-1 ring-red-400' : isFocused ? 'border-[#003DA5] ring-1 ring-[#003DA5]' : 'border-[#DDE1E9] hover:border-[#A0AEC0]'} rounded-xl overflow-hidden transition-all duration-200 w-32 shadow-sm`}>
                <input type="number" step="any" disabled={readOnly} value={localVal} onChange={(e) => setLocalVal(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={handleBlur} placeholder="Value..." className={`w-full bg-transparent px-4 py-2.5 text-sm font-black text-[#0D1117] outline-none placeholder:font-medium placeholder:text-[#A0AEC0] text-right ${readOnly ? 'cursor-not-allowed text-gray-500 bg-gray-50/50' : ''}`} />
                {isPct && <span className="pr-4 font-black text-[#8A95A3] select-none">%</span>}
              </div>
              <div className="h-4 mt-1 flex items-center justify-end w-full pr-1">
                {hasError && (
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Over Max ({localMax})</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-20">
          <span className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest mb-1.5">Score</span>
          <span className="inline-flex items-center justify-center w-full px-2 py-1.5 rounded-xl text-sm font-black transition-all border shadow-sm" style={{ backgroundColor: normScore !== 'N/A' ? `${sColor}15` : '#F8F9FB', color: sColor, borderColor: normScore !== 'N/A' ? `${sColor}30` : '#DDE1E9' }}>
            {normScore}
          </span>
        </div>
      </div>
    </div>
  );
};


export default function IndicatorManagementPage() {
  const [userRole, setUserRole] = useState<'admin' | 'viewer' | null>(null);
  const [indicators, setIndicators] = useState<IndicatorRegistryItem[]>([]);
  const [dbValues, setDbValues] = useState<Record<string, IndicatorDBValue>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [rubricVersion, setRubricVersion] = useState('3.0');
  const [saveMessage, setSaveMessage] = useState('');

  const [isDirty, setIsDirty] = useState(false);

  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({
    P1: false, P2: false, P3: false, P4: false, P5: false, P6: false
  });
  const [expandedSubPillars, setExpandedSubPillars] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ''; // Triggers browser warning
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    async function checkAuthAndLoadData() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session retrieval failed:', error.message);
        await supabase.auth.signOut();
        setUserRole(null);
        setLoading(false);
        return;
      }
      if (!session) { setUserRole(null); setLoading(false); return; }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      if (!profile || !['admin', 'viewer'].includes(profile.role)) { setUserRole(null); setLoading(false); return; }

      setUserRole(profile.role as 'admin' | 'viewer');

      try {
        const res = await fetch('/api/indicators');
        const data = await res.json();
        let registryData: IndicatorRegistryItem[] = [];
        let rVersion = '3.0';

        if (data.registry) {
          registryData = data.registry;
          setIndicators(registryData);
          rVersion = data.version || '3.0';
          setRubricVersion(rVersion);
        }

        const { data: valuesData, error } = await supabase.from('indicator_values').select('*').eq('environment_mode', 'live');

        const valMap: Record<string, IndicatorDBValue> = {};

        registryData.forEach((ind) => {
          valMap[ind.code] = {
            indicator_code: ind.code,
            pillar_code: ind.pillar_code,
            subpillar_code: ind.subpillar_code,
            raw_value: ind.sheet_value !== undefined ? ind.sheet_value : null,
            max_value: ind.max_value || 100,
            metadata: {
              year: ind.sheet_year || '',
              link: ind.sheet_link || '',
              normalization: ind.normalization
            },
            environment_mode: 'live',
            rubric_version: rVersion
          };
        });

        if (!error && valuesData) {
          valuesData.forEach(v => {
            if (valMap[v.indicator_code]) {
              const existingMeta = valMap[v.indicator_code].metadata || {};
              const dbMeta = v.metadata || {};
              valMap[v.indicator_code] = {
                ...valMap[v.indicator_code],
                ...v,
                metadata: { ...existingMeta, ...dbMeta }
              };
            } else {
              valMap[v.indicator_code] = v;
            }
          });
        }

        setDbValues(valMap);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    checkAuthAndLoadData();
  }, []);

  const handleValueChange = (code: string, val: number | null, meta: { year?: string; link?: string; normalization?: string }, maxVal: number) => {
    setIsDirty(true); // Locks the page tab
    setDbValues(prev => {
      const existing = prev[code] || {
        indicator_code: code,
        pillar_code: indicators.find(i => i.code === code)?.pillar_code || '',
        subpillar_code: indicators.find(i => i.code === code)?.subpillar_code || '',
        environment_mode: 'live',
        rubric_version: rubricVersion
      };
      return { ...prev, [code]: { ...existing, raw_value: val, metadata: meta, max_value: maxVal } };
    });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveMessage('');
    const upsertPayload = Object.values(dbValues).map(v => ({ ...v, updated_at: new Date().toISOString() }));
    if (upsertPayload.length === 0) { setSaving(false); return; }

    const { error } = await supabase.from('indicator_values').upsert(upsertPayload, { onConflict: 'indicator_code,environment_mode,rubric_version' });
    if (error) {
      console.error(error);
      setSaveMessage('error');
    } else {
      setIsDirty(false); // Unlocks the page tab successfully
      setSaveMessage('success');
      setTimeout(() => setSaveMessage(''), 3000);
    }
    setSaving(false);
  };

  const healthStats = useMemo(() => {
    const total = indicators.length;
    const populated = indicators.filter(ind => dbValues[ind.code]?.raw_value !== null && dbValues[ind.code]?.raw_value !== undefined).length;
    const missing = total - populated;
    const pct = total === 0 ? 0 : Math.round((populated / total) * 100);
    return { total, populated, missing, pct };
  }, [indicators, dbValues]);

  const groupedIndicators = useMemo(() => {
    const map: Record<string, Record<string, IndicatorRegistryItem[]>> = {};
    indicators.forEach(ind => {
      if (!map[ind.pillar_code]) map[ind.pillar_code] = {};
      if (!map[ind.pillar_code][ind.subpillar_code]) map[ind.pillar_code][ind.subpillar_code] = [];
      map[ind.pillar_code][ind.subpillar_code].push(ind);
    });

    return Object.keys(map).sort().reduce((acc, pillarKey) => {
      const sortedSubPillars = Object.keys(map[pillarKey]).sort().reduce((subAcc, subKey) => {
        subAcc[subKey] = map[pillarKey][subKey];
        return subAcc;
      }, {} as Record<string, IndicatorRegistryItem[]>);

      acc[pillarKey] = sortedSubPillars;
      return acc;
    }, {} as Record<string, Record<string, IndicatorRegistryItem[]>>);
  }, [indicators]);

  if (loading) return <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#003DA5]" /></div>;
  if (userRole === null) return <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center"><ShieldAlert className="w-12 h-12 text-red-600" /></div>;

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] p-6 lg:p-12 font-sans selection:bg-[#003DA5]/30">
      <div className="max-w-[1400px] mx-auto space-y-8">

        {/* Health Dashboard & Save Button */}
        <div className={`bg-white border transition-colors duration-300 rounded-[2rem] p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${isDirty ? 'border-amber-400 ring-1 ring-amber-400' : 'border-[#DDE1E9]'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8F9FB] rounded-full -mr-32 -mt-32 opacity-50" />
          <div className="relative z-10 flex-1 w-full">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-[#003DA5]" />
              <h2 className="text-2xl font-black text-[#0D1117] font-display uppercase tracking-tight">Digital ID Indicators Registry</h2>
              {isDirty && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1 animate-pulse"><AlertCircle className="w-3 h-3" /> Unsaved Changes</span>
              )}
            </div>
            <p className="text-sm font-medium text-[#4A5568] max-w-xl">
              {userRole === 'admin' 
                ? 'Input qualitative and quantitative data for Digital ID indicators.' 
                : 'View qualitative and quantitative data for Digital ID indicators.'}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-lg">
              <div><p className="text-[10px] font-black text-[#8A95A3] uppercase tracking-widest mb-1">Total Variables</p><p className="text-2xl font-black text-[#0D1117]">{healthStats.total}</p></div>
              <div><p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Populated</p><p className="text-2xl font-black text-green-700">{healthStats.populated}</p></div>
              <div><p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Missing</p><p className="text-2xl font-black text-amber-600">{healthStats.missing}</p></div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center min-w-[260px] bg-[#F8F9FB] p-6 rounded-3xl border border-[#DDE1E9]">
            <div className="flex justify-between w-full mb-2"><span className="text-[10px] font-black text-[#4A5568] uppercase tracking-widest">Data Readiness</span><span className="text-[10px] font-black text-[#003DA5]">{healthStats.pct}%</span></div>
            <div className="h-3 w-full bg-[#E2E8F0] rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} animate={{ width: `${healthStats.pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={`h-full rounded-full ${healthStats.pct === 100 ? 'bg-[#00B050]' : 'bg-[#003DA5]'}`} /></div>
            {saveMessage === 'success' && <span className="mt-3 text-[10px] font-bold text-green-600 flex items-center gap-1 uppercase"><CheckCircle2 className="w-3 h-3" /> Registry Updated</span>}
            {saveMessage === 'error' && <span className="mt-3 text-[10px] font-bold text-red-600 flex items-center gap-1 uppercase"><ShieldAlert className="w-3 h-3" /> Save Failed</span>}
            {userRole === 'admin' ? (
              <button onClick={handleSaveAll} disabled={saving || !isDirty} className={`w-full mt-4 text-white px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${isDirty ? 'bg-[#003DA5] hover:bg-[#002A7A]' : 'bg-[#0D1117] opacity-50 cursor-not-allowed'}`}>
                {saving ? <Activity className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}{saving ? 'Committing...' : isDirty ? 'Commit Changes' : 'Fully Synced'}
              </button>
            ) : (
              <div className="w-full mt-4 bg-[#E2E8F0] text-[#4A5568] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 select-none shadow-sm">
                <Eye className="w-4 h-4 text-[#4A5568]" /> Read-Only View
              </div>
            )}
          </div>
        </div>

        {/* 3-Tier Grouped Registry */}
        <div className="space-y-6">
          {Object.entries(groupedIndicators).map(([pillarCode, subPillars]) => {
            const color = PILLAR_COLORS[pillarCode] || '#A0AEC0';
            const name = PILLAR_NAMES[pillarCode] || pillarCode;
            const isExpanded = expandedPillars[pillarCode];

            const allPillarIndicators = Object.values(subPillars).flat();
            const pillarTotal = allPillarIndicators.length;
            const pillarPop = allPillarIndicators.filter(i => dbValues[i.code]?.raw_value !== null && dbValues[i.code]?.raw_value !== undefined).length;

            return (
              <div key={pillarCode} className="bg-white border border-[#DDE1E9] rounded-3xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">

                {/* Pillar Header (Tier 1) */}
                <button onClick={() => setExpandedPillars(p => ({ ...p, [pillarCode]: !p[pillarCode] }))} className="w-full flex items-center justify-between p-6 bg-[#F8FAFC] border-b border-[#DDE1E9] transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner" style={{ backgroundColor: `${color}15`, color }}>
                      <span className="text-sm font-black uppercase tracking-widest">{pillarCode}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-base font-black text-[#0D1117] font-display uppercase tracking-tight">{name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-[#8A95A3] uppercase tracking-widest">Data Points: {pillarTotal}</span>
                        {pillarPop === pillarTotal && pillarTotal > 0 ? (
                          <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> COMPLETE</span>
                        ) : (
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {pillarTotal - pillarPop} PENDING</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DDE1E9] flex items-center justify-center text-[#4A5568] shadow-sm">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">

                      {/* Sub-Pillar Iteration (Tier 2) */}
                      {Object.entries(subPillars).map(([subPillarCode, indicators]) => {
                        const isSubExpanded = expandedSubPillars[subPillarCode];
                        const subName = indicators[0]?.subpillar_name || 'Sub-Pillar Details';
                        const subTotal = indicators.length;
                        const subPop = indicators.filter(i => dbValues[i.code]?.raw_value !== null && dbValues[i.code]?.raw_value !== undefined).length;

                        return (
                          <div key={subPillarCode} className="border-b border-[#E2E8F0] last:border-0 bg-[#F8FAFC]">

                            {/* Sub-Pillar Accordion Header */}
                            <button
                              onClick={() => setExpandedSubPillars(p => ({ ...p, [subPillarCode]: !p[subPillarCode] }))}
                              className="w-full flex items-center justify-between px-6 py-4 bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors border-y border-[#E2E8F0]"
                            >
                              <div className="flex items-center gap-3">
                                <Layers className="w-4 h-4 text-[#4A5568]" />
                                <h4 className="text-[11px] font-black text-[#0D1117] uppercase tracking-widest text-left">
                                  {subPillarCode} <span className="opacity-40 mx-1">|</span> {subName}
                                </h4>
                              </div>
                              <div className="flex items-center gap-4">
                                {subPop === subTotal && subTotal > 0 ? (
                                  <span className="text-[9px] font-bold text-green-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {subPop}/{subTotal}</span>
                                ) : (
                                  <span className="text-[9px] font-bold text-[#8A95A3] flex items-center gap-1">{subPop}/{subTotal} Populated</span>
                                )}
                                <div className="w-6 h-6 rounded-full bg-white border border-[#DDE1E9] flex items-center justify-center shadow-sm">
                                  {isSubExpanded ? <ChevronUp className="w-3 h-3 text-[#4A5568]" /> : <ChevronDown className="w-3 h-3 text-[#4A5568]" />}
                                </div>
                              </div>
                            </button>

                            {/* Data Points Iteration (Tier 3) */}
                            <AnimatePresence>
                              {isSubExpanded && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-white">
                                  <div className="divide-y divide-[#F1F5F9]">
                                    {indicators.map(indicator => (
                                      <IndicatorRow
                                        key={indicator.code}
                                        indicator={indicator}
                                        dbValue={dbValues[indicator.code]}
                                        onChange={(val, meta, max) => handleValueChange(indicator.code, val, meta, max)}
                                        readOnly={userRole !== 'admin'}
                                      />
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                        );
                      })}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}