import React, { useState, useMemo } from 'react';
import { SAMPLE_PRESETS } from '../data/samples';
import { simulateGuardianPrune } from '../utils/pruner';
import { Check, Copy, Sparkles, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const LiveSimulator: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAMPLE_PRESETS[0].id);
  const [customInput, setCustomInput] = useState<string>(SAMPLE_PRESETS[0].rawInput);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [copiedRaw, setCopiedRaw] = useState<boolean>(false);
  const [copiedPruned, setCopiedPruned] = useState<boolean>(false);

  const activePreset = useMemo(() => {
    return SAMPLE_PRESETS.find((p) => p.id === selectedPresetId) || SAMPLE_PRESETS[0];
  }, [selectedPresetId]);

  const rawTextToEvaluate = isCustomMode ? customInput : activePreset.rawInput;
  const pruneResult = useMemo(() => {
    return simulateGuardianPrune(rawTextToEvaluate);
  }, [rawTextToEvaluate]);

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setIsCustomMode(false);
    const preset = SAMPLE_PRESETS.find((p) => p.id === id);
    if (preset) setCustomInput(preset.rawInput);
  };

  const handleCopy = (text: string, isRaw: boolean) => {
    navigator.clipboard.writeText(text);
    if (isRaw) {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 1800);
    } else {
      setCopiedPruned(true);
      setTimeout(() => setCopiedPruned(false), 1800);
    }
  };

  // Cost calculation based on Claude 3.5 Sonnet ($3.00/1M input tokens)
  const rawCost = (pruneResult.rawTokens / 1_000_000) * 3.0;
  const prunedCost = (pruneResult.prunedTokens / 1_000_000) * 3.0;

  return (
    <section id="simulator" className="py-20 border-t border-b border-slate-800/80 bg-[#080d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive AST &amp; Log Pruner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            See the Rust pruner in action.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Test how Prompt-Cache Guardian automatically eliminates repetitive passing unit tests and unused AST function bodies while strictly preserving errors, panics, and prompt-cache prefixes.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = !isCustomMode && selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset.name}
              </button>
            );
          })}

          <button
            onClick={() => setIsCustomMode(true)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              isCustomMode
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Paste Custom Output
          </button>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-xs text-slate-400 font-medium">Token Reduction</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                -{pruneResult.savingsPercent}%
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ({pruneResult.tokensSaved.toLocaleString()} saved)
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-xs text-slate-400 font-medium">Rust Proxy Latency</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                {pruneResult.latencyMs} ms
              </span>
              <span className="text-xs text-slate-400 font-mono">zero-copy</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-xs text-slate-400 font-medium">Per-Turn Cost Impact</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                ${prunedCost.toFixed(3)}
              </span>
              <span className="text-xs text-rose-400 font-mono line-through">
                ${rawCost.toFixed(3)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-xs text-slate-400 font-medium">Cache Prefix Integrity</span>
            <div className="mt-1 flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 font-mono">
                100% Intact
              </span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Terminal */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left: Raw Output */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/70 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="font-semibold text-slate-300">Raw Tool Output (Unpruned)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-rose-400 font-medium tabular-nums">
                  {pruneResult.rawTokens.toLocaleString()} tokens · {pruneResult.rawBytes.toLocaleString()} B
                </span>
                <button
                  onClick={() => handleCopy(rawTextToEvaluate, true)}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy raw content"
                >
                  {copiedRaw ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-4 flex-1">
              {isCustomMode ? (
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Paste terminal output, cargo test, pytest, vitest, or source code here..."
                  className="w-full h-80 bg-transparent text-xs font-mono text-slate-300 placeholder-slate-600 resize-none focus:outline-none"
                />
              ) : (
                <pre className="h-80 overflow-y-auto text-xs font-mono text-slate-400 whitespace-pre leading-relaxed select-text">
                  {rawTextToEvaluate}
                </pre>
              )}
            </div>

            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/40 text-[11px] font-mono text-slate-500">
              {isCustomMode ? 'Edit or paste above to recalculate live' : activePreset.description}
            </div>
          </div>

          {/* Right: Pruned by Guardian */}
          <div className="flex flex-col rounded-xl border border-emerald-900/40 bg-slate-950 overflow-hidden shadow-xl relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-900/40 bg-emerald-950/20 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-semibold text-emerald-300">Pruned by Guardian</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-medium tabular-nums">
                  {pruneResult.prunedTokens.toLocaleString()} tokens (-{pruneResult.savingsPercent}%)
                </span>
                <button
                  onClick={() => handleCopy(pruneResult.prunedText, false)}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy pruned content"
                >
                  {copiedPruned ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 bg-slate-950/80">
              <pre className="h-80 overflow-y-auto text-xs font-mono text-slate-200 whitespace-pre leading-relaxed select-text">
                {pruneResult.prunedText}
              </pre>
            </div>

            <div className="px-4 py-2 border-t border-emerald-900/40 bg-emerald-950/20 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
              <span>Rule: {pruneResult.ruleApplied}</span>
              <span className="text-slate-400">Zero syntax breaks</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
