import React from 'react';
import { Check, X, Shield, Cpu, HelpCircle } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  guardian: string | boolean;
  naiveRegex: string | boolean;
  rawApi: string | boolean;
  tooltip: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Prompt Cache Prefix Preservation',
    guardian: true,
    naiveRegex: false,
    rawApi: true,
    tooltip: 'Maintains exact 1,024-token SHA-256 prefix hash required for Anthropic 90% cache discounts.',
  },
  {
    feature: 'Tree-Sitter AST Syntax Parsing',
    guardian: true,
    naiveRegex: false,
    rawApi: false,
    tooltip: 'True grammar parser for Rust & TypeScript that never breaks braces or export signatures.',
  },
  {
    feature: 'Test Failure & Panic Extraction',
    guardian: true,
    naiveRegex: 'Unreliable',
    rawApi: true,
    tooltip: 'Folds 100+ passing lines while preserving exact panic messages, assertion diffs & backtraces.',
  },
  {
    feature: 'Proxy Overhead Latency',
    guardian: '<2.4 ms (Rust)',
    naiveRegex: '150–400 ms (Script)',
    rawApi: '0 ms',
    tooltip: 'Zero-copy memory mapped stream inspection vs running slow external subprocesses.',
  },
  {
    feature: 'Local Offline Loopback (0 Telemetry)',
    guardian: true,
    naiveRegex: true,
    rawApi: 'N/A',
    tooltip: '100% offline binary on 127.0.0.1. No proxy relays, no analytics, no external servers.',
  },
  {
    feature: 'Zero-Config Agent Compatibility',
    guardian: true,
    naiveRegex: false,
    rawApi: true,
    tooltip: 'Works with Claude Code, Aider, Cursor, Cline, and Roo Code via standard ANTHROPIC_BASE_URL.',
  },
  {
    feature: 'Average Token Bill Reduction',
    guardian: '70% – 90%',
    naiveRegex: '5% – 15% (breaks cache)',
    rawApi: '0% (Full Price)',
    tooltip: 'Actual token footprint reduction on tool-heavy coding agent turns.',
  },
];

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-20 bg-[#080d16] border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>Architectural Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why not just write a custom regex script?
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Anthropic prompt caching is fragile: if a script alters the prefix or distorts tokens non-deterministically, the upstream cache misses and charges 10× more. Here is how Guardian compares:
          </p>
        </div>

        {/* Table Container */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="py-4 px-6 font-bold text-slate-300">Capability</th>
                <th className="py-4 px-6 font-extrabold text-emerald-400 bg-emerald-950/30 border-x border-emerald-800/40">
                  <div className="flex items-center gap-1.5">
                    <span>Prompt-Cache Guardian</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-400 text-slate-950">
                      Recommended
                    </span>
                  </div>
                </th>
                <th className="py-4 px-6 font-semibold text-slate-400">DIY Regex / Sed Script</th>
                <th className="py-4 px-6 font-semibold text-slate-400">Raw Anthropic API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
              {COMPARISON_ROWS.map((row, index) => (
                <tr key={index} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 font-sans font-medium text-slate-200">
                    <div>{row.feature}</div>
                    <div className="text-[11px] font-sans text-slate-400 mt-0.5">
                      {row.tooltip}
                    </div>
                  </td>

                  {/* Guardian Column */}
                  <td className="py-4 px-6 font-bold text-emerald-300 bg-emerald-950/20 border-x border-emerald-800/40">
                    {row.guardian === true ? (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Check className="h-4 w-4" />
                        <span>Supported (Deterministic)</span>
                      </div>
                    ) : (
                      <span className="text-emerald-400 font-semibold">{row.guardian}</span>
                    )}
                  </td>

                  {/* Naive Regex Column */}
                  <td className="py-4 px-6 text-slate-400">
                    {row.naiveRegex === false ? (
                      <div className="flex items-center gap-1.5 text-rose-400">
                        <X className="h-4 w-4" />
                        <span>Breaks Cache Offsets</span>
                      </div>
                    ) : (
                      <span>{String(row.naiveRegex)}</span>
                    )}
                  </td>

                  {/* Raw API Column */}
                  <td className="py-4 px-6 text-slate-400">
                    {row.rawApi === true ? (
                      <span className="text-slate-300">Supported (Full Cost)</span>
                    ) : row.rawApi === false ? (
                      <span className="text-slate-500">Not Available</span>
                    ) : (
                      <span>{String(row.rawApi)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
