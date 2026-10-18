import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Award, FileCheck, Zap, DownloadCloud } from 'lucide-react';

export const TrustBadgesStrip: React.FC = () => {
  return (
    <section className="border-b border-slate-800/80 bg-[#060a12] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          
          {/* Badge 1: 30-Day Guarantee */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/90 bg-slate-900/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">30-Day Refund</div>
              <div className="text-[11px] text-slate-400">100% money-back</div>
            </div>
          </div>

          {/* Badge 2: Verified Gumroad Checkout */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/90 bg-slate-900/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">256-bit SSL</div>
              <div className="text-[11px] text-slate-400">Gumroad secured</div>
            </div>
          </div>

          {/* Badge 3: Zero Telemetry */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/90 bg-slate-900/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Zero Telemetry</div>
              <div className="text-[11px] text-slate-400">100% offline binary</div>
            </div>
          </div>

          {/* Badge 4: Instant Binary Download */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/90 bg-slate-900/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <DownloadCloud className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Instant Delivery</div>
              <div className="text-[11px] text-slate-400">Linux &amp; macOS</div>
            </div>
          </div>

          {/* Badge 5: SHA-256 Checksums */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/90 bg-slate-900/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">SHA-256 Signed</div>
              <div className="text-[11px] text-slate-400">Verified checksums</div>
            </div>
          </div>

          {/* Badge 6: Lifetime Minor Updates */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/90 bg-slate-900/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">No Subscription</div>
              <div className="text-[11px] text-slate-400">Lifetime updates</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const PaymentMethodsBadge: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-slate-400 text-xs font-medium">
      <span className="text-[11px] text-slate-500">Accepted Payment Methods:</span>
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
          VISA
        </span>
        <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
          Mastercard
        </span>
        <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
          AMEX
        </span>
        <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
          Apple Pay
        </span>
        <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
          Google Pay
        </span>
        <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
          PayPal
        </span>
      </div>
    </div>
  );
};

export const SecurityAuditBadge: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>Enterprise Security &amp; Compliance Verified</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              AUDITED
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-2xl">
            Compiled with <code className="text-slate-200 font-mono">rustc 1.84+</code> targeting static musl libc. 0 external dynamic dependencies, 0 network telemetry daemons, and 0 local cache databases. Traffic strictly proxies directly to <code className="text-slate-200 font-mono">https://api.anthropic.com</code>.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <div className="text-center px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Binaries</div>
          <div className="text-xs font-bold text-white font-mono">x86_64 / arm64</div>
        </div>
        <div className="text-center px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Telemetry</div>
          <div className="text-xs font-bold text-emerald-400 font-mono">0 Bytes Out</div>
        </div>
        <div className="text-center px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Socket</div>
          <div className="text-xs font-bold text-cyan-400 font-mono">127.0.0.1 Only</div>
        </div>
      </div>
    </div>
  );
};
