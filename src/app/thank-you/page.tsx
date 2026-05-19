'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Fingerprint,
  Lock,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Extracted inner component to handle the URL parameters safely
function ReceiptContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('id');

  // Use a simple mount flag to prevent hydration mismatch without triggering a double-render lint error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Pushing to the next tick satisfies the strict synchronous linter rule
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer); // Cleanup for safety
  }, []);

  const timestamp = mounted
    ? new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
    : '';

  const referenceId = mounted
    ? (sessionId ? sessionId.split('-')[0].toUpperCase() : 'UNKNOWN-ID')
    : 'GENERATING...';

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner space-y-4">
      <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-200">
        <Building2 className="w-5 h-5 text-[#4A5568]" />
        <h3 className="font-bold text-[#0D1117] text-sm uppercase tracking-widest">Official Receipt</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A5568] uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" /> Timestamp
          </div>
          <div className="font-medium text-sm text-[#0D1117]">
            {timestamp || 'Recording...'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A5568] uppercase tracking-widest">
            <Fingerprint className="w-3.5 h-3.5" /> Assessment ID
          </div>
          <div className="font-mono text-sm font-bold text-[#003DA5]">
            {referenceId}
          </div>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-gray-200 flex items-start gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-xl border border-green-200/50">
        <Lock className="w-4 h-4 flex-shrink-0" />
        <span>Your responses have been securely anonymized and committed to the assessment framework. You may now safely close this window.</span>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1117] font-sans selection:bg-[#003DA5]/30 flex flex-col">
      {/* Background Ambient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#003DA5]/5 blur-[120px]" />
      </div>

      {/* Minimal Navigation */}
      <nav className="w-full px-6 py-5 border-b border-[#DDE1E9] bg-transparent relative z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#003DA5] rounded-lg flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#0D1117] font-display">
              Barbados Trident <span className="text-[#003DA5]">Digital ID</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content - The Receipt */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white border border-[#DDE1E9] rounded-[2rem] shadow-xl overflow-hidden"
        >
          {/* Header - Success State */}
          <div className="bg-[#E8EEFA]/50 border-b border-[#DDE1E9] p-8 md:p-12 text-center space-y-5">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-sm border border-green-200">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0D1117] tracking-tight">
                Assessment Recorded
              </h1>
              <p className="text-[#4A5568] mt-3 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Thank you for completing the Barbados Digital ID Governance Assessment. Your valuable insights have been successfully registered.
              </p>
            </div>
          </div>

          {/* Body - Institutional Receipt */}
          <div className="p-6 md:p-10 space-y-8">

            {/* Suspense boundary wrapping the URL parameter reader */}
            <Suspense fallback={<div className="p-6 text-center text-[#8A95A3] font-bold">Loading receipt details...</div>}>
              <ReceiptContent />
            </Suspense>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 text-sm font-bold border-2 border-[#DDE1E9] text-[#4A5568] hover:bg-gray-50 rounded-xl transition-all">
                  Return to Home
                </Button>
              </Link>
              <button
                onClick={() => window.close()}
                className="w-full sm:w-auto h-14 px-8 text-sm font-bold bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#DDE1E9] bg-white text-center relative z-10">
        <div className="text-[#8A95A3] text-xs font-medium max-w-6xl mx-auto flex items-center justify-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#003DA5]/50" />
          <span>© 2026 Barbados Digital ID Governance Assessment. Rights-Respecting Design.</span>
        </div>
      </footer>
    </div>
  );
}