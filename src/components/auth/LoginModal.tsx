'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Lock, Loader2, Mail, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginModalProps {
  onSuccess: (role: 'admin' | 'viewer') => void;
}

export default function LoginModal({ onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!user) throw new Error('Authentication failed');

      // Check role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        if (user.email === 'trident-admin@dida.local') {
          console.warn('⚠️ Profile lookup failed, using fallback admin role.');
          onSuccess('admin');
          return;
        }
        throw new Error('Access denied: No profile found');
      }

      if (!['admin', 'viewer'].includes(profile.role)) {
        throw new Error('Access denied: Unauthorized clearance level');
      }

      onSuccess(profile.role as 'admin' | 'viewer');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      {/* Deep Institutional Backdrop */}
      <div className="absolute inset-0 bg-[#0D1117]/60 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border border-[#DDE1E9] rounded-[2rem] p-10 shadow-2xl overflow-hidden relative">

          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003DA5]" />

          <div className="relative space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#E8EEFA] rounded-2xl flex items-center justify-center mx-auto border border-[#003DA5]/10 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#003DA5]" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#0D1117] tracking-tight font-display">Admin Dashboard Access</h1>
                <p className="text-[#4A5568] text-sm font-medium mt-1">Barbados Trident Digital ID Governance Assessment</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6" id="login-form">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-xs font-medium flex items-start gap-3 shadow-sm"
                >
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span className="leading-relaxed">{error}</span>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.2em] ml-1">Login</label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F9FB] border border-[#DDE1E9] rounded-xl p-4 text-[#0D1117] text-sm font-medium focus:ring-2 focus:ring-[#003DA5]/20 focus:border-[#003DA5] outline-none transition-all pl-12 placeholder:text-[#8A95A3]"
                    placeholder="admin@gov.bb"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A95A3] group-focus-within:text-[#003DA5] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8F9FB] border border-[#DDE1E9] rounded-xl p-4 text-[#0D1117] text-sm font-medium focus:ring-2 focus:ring-[#003DA5]/20 focus:border-[#003DA5] outline-none transition-all pl-12 placeholder:text-[#8A95A3]"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A95A3] group-focus-within:text-[#003DA5] transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#003DA5] hover:bg-[#1A56C4] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying Clearance...
                  </>
                ) : (
                  'Authorize Access'
                )}
              </button>
            </form>

          </div>
        </div>
      </motion.div>
    </div>
  );
}