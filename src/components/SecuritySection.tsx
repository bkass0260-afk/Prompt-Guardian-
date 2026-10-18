import React from 'react';
import { Shield, EyeOff, Lock, Network, Terminal } from 'lucide-react';
import { SecurityAuditBadge } from './TrustBadges';

export const SecuritySection: React.FC = () => {
  return (
    <section className="py-20 bg-[#070b12] border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Shield className="h-3.5 w-3.5" />
            <span>Privacy &amp; Security Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Your code and API keys never leave your machine.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Prompt-Cache Guardian is a self-contained local binary running on loopback (127.0.0.1). It is engineered with zero telemetry and zero external network calls other than forwarding your authorized request directly to Anthropic.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <EyeOff className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Telemetry</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No analytics, no ping-backs, no user tracking, and no crash reports sent to third parties. Guardian runs entirely offline.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">No Token or Key Logging</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your <code className="text-slate-200">x-api-key</code> header and request payload bodies are never persisted to disk or external databases.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Network className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Loopback Bound</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Binds strictly to <code className="text-slate-200">127.0.0.1</code> by default. Cannot be accessed across public networks without explicit binding.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Terminal className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Verifiable Network I/O</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verify network calls yourself at any time with <code className="text-slate-200">lsof -i :8080</code> or Wireshark packet capture.
            </p>
          </div>

        </div>

        {/* Audit terminal verification command */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-200">
              Verify Local Loopback Socket in Terminal:
            </span>
            <div className="text-xs font-mono text-emerald-400">
              lsof -i :8080 &amp;&amp; netstat -an | grep 8080
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Target Upstream: https://api.anthropic.com
          </span>
        </div>

        {/* Enterprise Compliance & Security Seal */}
        <div className="mt-8">
          <SecurityAuditBadge />
        </div>

      </div>
    </section>
  );
};
