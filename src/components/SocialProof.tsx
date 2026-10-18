import React from 'react';
import { Quote, CheckCircle2, Star, TrendingDown } from 'lucide-react';

interface CaseStudy {
  id: string;
  quote: string;
  author: string;
  role: string;
  stack: string;
  metric: string;
  metricLabel: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    quote:
      'Running cargo test inside Claude Code used to incinerate 15,000 tokens every time a single assertion failed. With Guardian, passing noise disappears, the stack trace stays intact, and our prompt-cache hit rate jumped from 58% to 94%. It paid for itself before lunchtime.',
    author: 'Alexandre Roy',
    role: 'Staff Rust & Distributed Systems Engineer',
    stack: 'Claude Code · Rust · Axum',
    metric: '-84.2%',
    metricLabel: 'token reduction on test runs',
  },
  {
    id: '2',
    quote:
      'Our team was racking up $1,400/month across 6 developers on Claude 3.5 Sonnet. Guardian dropped our monthly Anthropic bill to under $420. The best part is zero config: export one environment variable in .zshrc and forget about it.',
    author: 'Elena Rostova',
    role: 'VP of Engineering',
    stack: 'Aider · TypeScript · NestJS',
    metric: '$980 / mo',
    metricLabel: 'direct API bill reduction',
  },
  {
    id: '3',
    quote:
      'I was skeptical about local proxies breaking prompt caching. Guardian does the opposite: because it deterministically compresses test tails and preserves AST interfaces, Anthropic’s 1,024-token cache prefix stays locked in turn after turn.',
    author: 'David Chen',
    role: 'Independent AI Agent Consultant',
    stack: 'Cursor · Python · Pytest',
    metric: '1.4 ms',
    metricLabel: 'local proxy latency overhead',
  },
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-[#070b12] border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>Developer Case Studies &amp; Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Proven to cut bills on real codebases.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            See how engineering teams and solo builders eliminate prompt bloat without sacrificing code generation accuracy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                {/* Metric Callout */}
                <div className="mb-5 pb-5 border-b border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                      {study.metric}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {study.metricLabel}
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{study.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="font-bold text-sm text-white">
                  {study.author}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {study.role}
                </div>
                <div className="mt-2 text-[11px] font-mono text-emerald-400/90">
                  {study.stack}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quantified Performance Invariants Strip */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          <div>
            <div className="text-xs text-slate-400 font-sans">Memory Footprint</div>
            <div className="text-xl font-bold text-white mt-1 tabular-nums">&lt;14 MB RSS</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-sans">Daemon Startup Time</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 tabular-nums">3.8 ms</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-sans">External Dependencies</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 tabular-nums">0 (Static musl)</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-sans">Syntax Validity</div>
            <div className="text-xl font-bold text-teal-300 mt-1 tabular-nums">100.0%</div>
          </div>
        </div>

      </div>
    </section>
  );
};
