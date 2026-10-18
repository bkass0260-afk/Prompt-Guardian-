import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, Check } from 'lucide-react';

interface ModelPricing {
  name: string;
  inputPerMillion: number;
  cacheReadPerMillion: number;
}

const MODELS: Record<string, ModelPricing> = {
  'claude-3-7-sonnet': {
    name: 'Claude 3.7 Sonnet',
    inputPerMillion: 3.0,
    cacheReadPerMillion: 0.3,
  },
  'claude-3-5-sonnet': {
    name: 'Claude 3.5 Sonnet',
    inputPerMillion: 3.0,
    cacheReadPerMillion: 0.3,
  },
  'claude-3-opus': {
    name: 'Claude 3 Opus',
    inputPerMillion: 15.0,
    cacheReadPerMillion: 1.5,
  },
  'claude-3-5-haiku': {
    name: 'Claude 3.5 Haiku',
    inputPerMillion: 0.8,
    cacheReadPerMillion: 0.08,
  },
};

export const RoiCalculator: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('claude-3-7-sonnet');
  const [devCount, setDevCount] = useState<number>(3);
  const [turnsPerDay, setTurnsPerDay] = useState<number>(40);
  const [avgTokensPerTurn, setAvgTokensPerTurn] = useState<number>(45000);
  const [pruneEfficiency, setPruneEfficiency] = useState<number>(65); // percentage of tool tokens pruned

  const calculations = useMemo(() => {
    const model = MODELS[selectedModel];
    const workingDaysPerMonth = 22;

    // Total turns across team per month
    const monthlyTurns = devCount * turnsPerDay * workingDaysPerMonth;

    // In a coding agent, roughly 40% of the prompt volume consists of volatile tool outputs (test logs, file dumps, compiler output)
    const volatileTokensPerTurn = avgTokensPerTurn * 0.45;
    const stableTokensPerTurn = avgTokensPerTurn * 0.55;

    // Without Guardian:
    // Every turn with bloated tools pays full input rate on new tokens + cache read on stable prefix.
    // However, when noisy test logs change line count or unedited files shift context, cache misses happen frequently (~35% of turns).
    const withoutCacheReadRate = 0.65;
    const withoutCacheMissRate = 0.35;

    const unoptimizedCostPerTurn =
      ((stableTokensPerTurn * withoutCacheReadRate * model.cacheReadPerMillion) +
       (stableTokensPerTurn * withoutCacheMissRate * model.inputPerMillion) +
       (volatileTokensPerTurn * model.inputPerMillion)) / 1_000_000;

    const monthlyCostWithout = monthlyTurns * unoptimizedCostPerTurn;

    // With Guardian:
    // Volatile tool output is pruned by pruneEfficiency (e.g. 65%), saving direct tokens.
    // Crucially: Because Guardian preserves exact prefix hashes, cache hit rate rises to ~92%!
    const prunedVolatileTokens = volatileTokensPerTurn * (1 - (pruneEfficiency / 100));
    const withCacheReadRate = 0.92;
    const withCacheMissRate = 0.08;

    const optimizedCostPerTurn =
      ((stableTokensPerTurn * withCacheReadRate * model.cacheReadPerMillion) +
       (stableTokensPerTurn * withCacheMissRate * model.inputPerMillion) +
       (prunedVolatileTokens * model.inputPerMillion)) / 1_000_000;

    const monthlyCostWith = monthlyTurns * optimizedCostPerTurn;
    const monthlySavings = Math.max(0, monthlyCostWithout - monthlyCostWith);
    const annualSavings = monthlySavings * 12;

    // License cost: if devCount === 1, $29.99; otherwise $199 enterprise license
    const licenseCost = devCount === 1 ? 29.99 : 199.0;
    const dailySavings = monthlySavings / workingDaysPerMonth;
    const paybackDays = dailySavings > 0 ? Number((licenseCost / dailySavings).toFixed(1)) : 1;

    return {
      monthlyCostWithout,
      monthlyCostWith,
      monthlySavings,
      annualSavings,
      paybackDays,
      licenseCost,
    };
  }, [selectedModel, devCount, turnsPerDay, avgTokensPerTurn, pruneEfficiency]);

  return (
    <section id="calculator" className="py-20 bg-[#070b12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive ROI &amp; Savings Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Calculate your token cost reduction.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            See how much your engineering team or solo workflow saves each month by eliminating redundant tool tokens and stabilizing Anthropic prompt-cache prefixes.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6">
            
            {/* Model Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Primary Model
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(MODELS).map(([key, model]) => {
                  const isSelected = selectedModel === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedModel(key)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{model.name}</div>
                      <div className="text-[11px] font-mono text-emerald-400 mt-1">
                        ${model.inputPerMillion}/M
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dev Count Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                <span>Developers using Claude Code / Aider</span>
                <span className="font-mono text-emerald-400 text-sm tabular-nums">
                  {devCount} {devCount === 1 ? 'developer' : 'developers'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={devCount}
                onChange={(e) => setDevCount(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>1 (Solo)</span>
                <span>10 (Team)</span>
                <span>25 (Enterprise)</span>
              </div>
            </div>

            {/* Turns Per Day Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                <span>Agent turns per dev / day</span>
                <span className="font-mono text-emerald-400 text-sm tabular-nums">
                  {turnsPerDay} turns/day
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={turnsPerDay}
                onChange={(e) => setTurnsPerDay(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>10 (Light)</span>
                <span>50 (Active)</span>
                <span>120 (Power User)</span>
              </div>
            </div>

            {/* Average Context Size Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                <span>Average prompt context size</span>
                <span className="font-mono text-emerald-400 text-sm tabular-nums">
                  {avgTokensPerTurn.toLocaleString()} tokens
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={120000}
                step={5000}
                value={avgTokensPerTurn}
                onChange={(e) => setAvgTokensPerTurn(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>15k tokens</span>
                <span>60k tokens</span>
                <span>120k tokens</span>
              </div>
            </div>

            {/* Pruning Ratio Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                <span>Estimated tool noise reduction</span>
                <span className="font-mono text-emerald-400 text-sm tabular-nums">
                  {pruneEfficiency}% reduction
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={85}
                step={5}
                value={pruneEfficiency}
                onChange={(e) => setPruneEfficiency(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>40% (Conservative)</span>
                <span>65% (Typical)</span>
                <span>85% (Aggressive)</span>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Big Savings Card */}
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900/70 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Projected Net Savings
              </span>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums tracking-tight">
                  ${Math.round(calculations.monthlySavings).toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ month</span>
              </div>

              <div className="mt-2 text-sm text-emerald-300 font-mono">
                ${Math.round(calculations.annualSavings).toLocaleString()} saved annually
              </div>

              {/* Payback period indicator */}
              <div className="mt-6 pt-6 border-t border-emerald-900/50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">License Payback Period</div>
                  <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                    {calculations.paybackDays} working {calculations.paybackDays === 1 ? 'day' : 'days'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">One-Time License</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                    ${calculations.licenseCost}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={
                    devCount === 1
                      ? 'https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License'
                      : 'https://humanoidlady.gumroad.com/l/zrhju?option=Enterprise%20Team%20License%20(%24199)'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    Claim License (${calculations.licenseCost})
                  </span>
                </a>
              </div>
            </div>

            {/* Breakdown card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-400">
                <span>Monthly Bill without Guardian:</span>
                <span className="text-rose-400 font-semibold tabular-nums">
                  ${Math.round(calculations.monthlyCostWithout).toLocaleString()}/mo
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>Monthly Bill with Guardian:</span>
                <span className="text-emerald-400 font-semibold tabular-nums">
                  ${Math.round(calculations.monthlyCostWith).toLocaleString()}/mo
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800">
                <span>Cache Hit Rate Boost:</span>
                <span className="text-white font-semibold">65% → 92%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
