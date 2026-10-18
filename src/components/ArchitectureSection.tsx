import React from 'react';
import { Cpu, Shield, Layers, Hash, AlertOctagon, CheckCircle2 } from 'lucide-react';
import heroProxyTechImg from '../assets/images/hero_proxy_tech_1792362631466.jpg';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="mechanics" className="py-20 border-t border-slate-800/80 bg-[#080d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>Prompt Caching Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why naive pruning destroys your cache.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Anthropic prompt caching gives a <strong className="text-white font-semibold">90% discount</strong> ($0.30/M vs $3.00/M), but requires byte-exact prefix matching on blocks of 1,024+ tokens. Here is how Guardian prunes tokens without breaking cache hashes.
          </p>
        </div>

        {/* Isometric Architecture Rendering */}
        <div className="mt-10 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950 relative">
          <img
            src={heroProxyTechImg}
            alt="Prompt-Cache Guardian Rust Proxy Architecture and Token Flow"
            className="w-full h-auto object-cover max-h-[460px] opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300 bg-slate-900/85 backdrop-blur-md p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Pipeline: Client App → Axum Local Proxy → Tree-Sitter Parser → Anthropic API</span>
            </div>
            <div className="text-emerald-400 font-semibold">
              Latency: ~1.2ms (Zero-Copy Slicing)
            </div>
          </div>
        </div>

        {/* 2-Column Comparison: Naive vs Guardian */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Naive Truncation */}
          <div className="rounded-2xl border border-rose-900/40 bg-slate-900/30 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertOctagon className="h-5 w-5 shrink-0" />
              <h3 className="text-lg font-bold">Naive Regex or Arbitrary Truncation</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Modifying timestamps, stripping lines randomly, or changing header strings alters the byte sequence. As soon as a single byte in the prefix changes:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 shrink-0">✕</span>
                <span>The 1,024-token SHA-256 checkpoint misses upstream</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 shrink-0">✕</span>
                <span>Anthropic re-evaluates the entire 40k+ system prompt at full $3.00/M price</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 shrink-0">✕</span>
                <span>Agent generates syntax errors from truncated code snippets</span>
              </li>
            </ul>

            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs font-mono text-rose-300">
              Outcome: Token count goes down by 5%, but your monthly API bill triples due to 0% cache hits.
            </div>
          </div>

          {/* Prompt-Cache Guardian */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/10 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <h3 className="text-lg font-bold">Prompt-Cache Guardian Method</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Guardian strictly isolates static context from volatile tool execution results:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>System prompts &amp; tool schemas pass through 100% untouched</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>All <code className="text-emerald-300">cache_control: &#123; type: "ephemeral" &#125;</code> checkpoints are preserved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>Deterministic Tree-Sitter AST folding maintains exact syntax validity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>Identical inputs yield byte-for-byte identical output tokens</span>
              </li>
            </ul>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs font-mono text-emerald-300">
              Outcome: 70–90% reduction on volatile tools + 90%+ prompt cache hit rate maintained across turns.
            </div>
          </div>

        </div>

        {/* 3 Mechanism Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Layers className="h-4 w-4" />
            </div>
            <h4 className="text-base font-bold text-white">Tree-Sitter Grammar Parsers</h4>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Uses compiled Rust tree-sitter grammars (<code className="text-slate-200">tree-sitter-rust</code>, <code className="text-slate-200">tree-sitter-typescript</code>) to inspect AST node types. Preserves exports, interfaces, signatures, and unedited contracts while folding large untouched function bodies.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Hash className="h-4 w-4" />
            </div>
            <h4 className="text-base font-bold text-white">Log Tail &amp; Panic Extraction</h4>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              When cargo test, vitest, or pytest runs, hundreds of passing lines are collapsed into a single summary comment, while failure assertion banners, stack traces, and line pointers are preserved with zero byte distortion.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
              <Shield className="h-4 w-4" />
            </div>
            <h4 className="text-base font-bold text-white">Zero-Copy Rust Pipeline</h4>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Built on Tokio asynchronous I/O and Axum. Zero garbage collection pauses, SIMD-accelerated string scanning, and direct byte streaming ensure less than 2.4 ms added latency on your local loopback.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
