"use client";
// File: src/components/dashboard/DashboardShell.tsx

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Target,
  LayoutGrid,
  ListTree,
  UserCheck,
  Scale,
  ShieldCheck,
  Database,
  Download,
  Settings,
  Shield,
  Eye,
  LogOut,
  ArrowRight
} from 'lucide-react';

export type DashboardTab =
  | 'executive'
  | 'pillars'
  | 'heatmap'
  | 'questions'
  | 'expert'
  | 'discrepancy'
  | 'quality'
  | 'raw'
  | 'exports'
  | 'admin';

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'executive', label: 'Executive Summary', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'pillars', label: 'Pillar Dashboard', icon: <Target className="w-5 h-5" /> },
  { id: 'heatmap', label: 'Sub-Pillar Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'questions', label: 'Question Analytics', icon: <ListTree className="w-5 h-5" /> },
  { id: 'expert', label: 'Expert Responses', icon: <UserCheck className="w-5 h-5" /> },
  { id: 'discrepancy', label: 'Divergence Analysis', icon: <Scale className="w-5 h-5" /> },
  { id: 'quality', label: 'Data Quality', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'raw', label: 'Raw Datastream', icon: <Database className="w-5 h-5" /> },
  { id: 'exports', label: 'Export Data', icon: <Download className="w-5 h-5" /> },
  { id: 'admin', label: 'Admin Actions', icon: <Settings className="w-5 h-5" />, adminOnly: true },
];

interface DashboardShellProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  userRole: 'admin' | 'viewer';
  activeMode: 'live' | 'test';
  onModeChange: (mode: 'live' | 'test') => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function DashboardShell({
  activeTab,
  onTabChange,
  userRole,
  activeMode,
  onModeChange,
  onLogout,
  children,
}: DashboardShellProps) {
  const visibleNav = NAV_ITEMS.filter((n) => !n.adminOnly || userRole === 'admin');

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] flex selection:bg-[#003DA5]/10 selection:text-[#003DA5] overflow-hidden font-sans">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-72 flex-shrink-0 flex-col border-r border-[#DDE1E9] bg-white shadow-2xl shadow-black/[0.02] z-20">
        {/* Logo */}
        <div className="px-8 py-8 border-b border-[#DDE1E9]">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-[1.25rem] bg-[#003DA5] flex items-center justify-center text-sm font-black text-white shadow-xl shadow-[#003DA5]/30 group-hover:scale-110 transition-all duration-300">
              ID
            </div>
            <div>
              <p className="text-lg font-black text-[#0D1117] leading-tight font-display tracking-tight">Barbados Trident</p>
              <p className="text-[10px] text-[#4A5568] font-bold uppercase tracking-[0.3em] mt-0.5 opacity-80">Survey Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Mode Toggle */}
        <div className="px-6 py-6 border-b border-[#DDE1E9] bg-gray-50/50">
          <p className="text-[10px] text-[#4A5568] font-black uppercase tracking-[0.2em] mb-3 px-2">Mode</p>
          <div className="flex bg-white border border-[#DDE1E9] rounded-xl p-1.5 shadow-sm">
            {(['live', 'test'] as const).map((m) => (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all duration-300 ${activeMode === m
                  ? m === 'live'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-[#003DA5] text-white shadow-md'
                  : 'text-[#4A5568] hover:text-[#0D1117] hover:bg-gray-50'
                  }`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {visibleNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200 text-left group relative ${isActive
                  ? 'bg-[#E8EEFA] text-[#003DA5] shadow-sm'
                  : 'text-[#4A5568] hover:text-[#0D1117] hover:bg-gray-50'
                  }`}
              >
                {isActive && (
                  <motion.div layoutId="nav-active" className="absolute left-0 w-1 h-6 bg-[#003DA5] rounded-r-full" />
                )}
                <span className={`transition-all duration-300 ${isActive ? 'text-[#003DA5]' : 'text-gray-400 group-hover:text-[#0D1117]'}`}>
                  {item.icon}
                </span>
                <span className="leading-none pt-0.5">{item.label}</span>
                {item.adminOnly && (
                  <span className="ml-auto text-[8px] bg-orange-100 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md font-black tracking-tighter">
                    ROOT
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="px-6 py-6 border-t border-[#DDE1E9] bg-gray-50/50 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE1E9] flex items-center justify-center shadow-sm">
                {userRole === 'admin' ? <Shield className="w-5 h-5 text-[#003DA5]" /> : <Eye className="w-5 h-5 text-[#4A5568]" />}
              </div>
              <div>
                <p className="text-xs font-black text-[#0D1117] uppercase tracking-wider">{userRole}</p>
                <p className="text-[9px] text-[#4A5568] font-bold uppercase tracking-widest opacity-80">Secure Session</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#4A5568] hover:text-red-600 hover:bg-red-50 transition-all duration-300 border border-transparent hover:border-red-100 shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-auto bg-[#F8F9FB] relative flex flex-col h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 px-6 lg:px-10 py-5 bg-white/90 backdrop-blur-xl border-b border-[#DDE1E9] flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-[#0D1117] font-display tracking-tight leading-none mb-1">
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black tracking-[0.2em] shadow-sm transition-all duration-300 ${activeMode === 'live'
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-[#E8EEFA] border-[#003DA5]/20 text-[#003DA5]'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${activeMode === 'live' ? 'bg-green-500 animate-pulse' : 'bg-[#003DA5]'}`} />
              {activeMode.toUpperCase()} DATASTREAM
            </div>

            <Link
              href="/admin/indicators"
              className="text-[10px] font-bold text-[#0D1117] hover:text-white bg-white hover:bg-[#003DA5] px-5 py-2.5 border border-[#DDE1E9] hover:border-[#003DA5] rounded-xl shadow-sm transition-all duration-200 uppercase tracking-[0.1em] flex items-center gap-2"
            >
              Indicators Registry <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full flex-grow">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}