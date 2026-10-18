import React, { useState, useEffect } from 'react';
import { Shield, Zap, Terminal, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenDocs: () => void;
  onOpenExpenseMemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDocs, onOpenExpenseMemo }) => {
  const [reductionPct, setReductionPct] = useState(87.4);
  const [latency, setLatency] = useState(1.85);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(Number((1.6 + Math.random() * 0.5).toFixed(2)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
        <div className="absolute top-[-100px] left-[15%] w-[450px] h-[450px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute top-[-50px] right-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Rust HTTP Proxy · Tree-Sitter AST & Log Pruning</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Stop paying full price for{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                cached noise.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl text-pretty">
              A compiled local Rust proxy that intercepts Anthropic API requests from <strong className="text-white font-semibold">Claude Code</strong>, <strong className="text-white font-semibold">Aider</strong>, and <strong className="text-white font-semibold">Cursor</strong>. It structurally prunes 100+ line test outputs and untouched AST boilerplate while strictly preserving prompt cache prefix hashes.
            </p>

            {/* Quick Proof Trust Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>70–90% token reduction</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% offline & zero telemetry</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>&lt;2.4 ms Rust overhead</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-200 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.99] whitespace-nowrap"
              >
                <span>Get Developer License — $29.99</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenExpenseMemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl transition-all whitespace-nowrap"
              >
                <span>Expense with Employer</span>
              </button>

              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap"
              >
                <span>Try Live Simulator</span>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              One-time purchase · No subscription · Pays for itself on Day 2 · 30-day money-back guarantee
            </p>
          </div>

          {/* Right Column: Live Telemetry & Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#0c121e] p-6 shadow-2xl backdrop-blur-xl">
              {/* Card top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span>127.0.0.1:8080 (guardian.local)</span>
                </div>
                <span className="text-[10px] font-semibold tracking-wider text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                  UPSTREAM 200 OK
                </span>
              </div>

              {/* Reduction Gauge Simulation */}
              <div className="my-6 text-center">
                <div className="relative inline-flex items-center justify-center">
                  <div className="h-40 w-40 rounded-full border-4 border-slate-800 border-t-emerald-400 border-r-teal-300 flex items-center justify-center rotate-[-45deg]">
                    <div className="rotate-[45deg] text-center">
                      <div className="text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        -{reductionPct}%
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">
                        Token Footprint
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline Stream Visual */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <span className="text-slate-400">Raw Input (cargo test + 800L AST)</span>
                  <span className="text-rose-400 tabular-nums font-semibold">18,420 tokens</span>
                </div>

                <div className="flex items-center justify-center text-slate-500 text-xs">
                  <span>↓ Tree-Sitter + Log Compression (&lt;{latency} ms)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                  <span className="text-emerald-300 font-medium">Forwarded to Anthropic</span>
                  <span className="text-emerald-400 tabular-nums font-bold">2,320 tokens</span>
                </div>
              </div>

              {/* Cache status footer */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Prompt Cache Prefix:</span>
                <span className="text-emerald-400 font-semibold">MATCH 100% INTACT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
