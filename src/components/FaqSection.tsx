import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    id: 'agents',
    question: 'Does it work with Claude Code, Aider, and Cursor?',
    answer:
      'Yes. Prompt-Cache Guardian is designed specifically for agentic coding tools like Claude Code, Aider, Cursor, Cline, and Roo Code. You simply point your existing client at the local proxy (http://127.0.0.1:8080) using standard environment variables — zero code or SDK modifications required.',
  },
  {
    id: 'security',
    question: 'What happens to my Anthropic API keys and prompt data?',
    answer:
      'Guardian runs 100% locally on your machine as a compiled Rust binary. It does not send telemetry, ping home, or persist your request bodies. The proxy transparently forwards your API keys and pruned requests directly to https://api.anthropic.com over TLS.',
  },
  {
    id: 'failures',
    question: 'Will pruning omit test failures, panics, or stack traces?',
    answer:
      'No. The pruning heuristics are specifically built for test runners (cargo test, pytest, vitest, jest). Guardian only suppresses repetitive passing test assertions. If an assertion fails, a panic occurs, or a stack backtrace is emitted, it is preserved byte-for-byte so Claude has all the context needed to debug.',
  },
  {
    id: 'open-source',
    question: 'Is Prompt-Cache Guardian open source?',
    answer:
      'Prompt-Cache Guardian is a closed-source binary distributed as a standalone release. The license includes lifetime access to minor updates and bug fixes.',
  },
  {
    id: 'platforms',
    question: 'Which operating systems and architectures are supported?',
    answer:
      'Pre-compiled static binaries are provided for Linux (x86_64 musl static with zero libc dependencies) and macOS (Apple Silicon M1/M2/M3/M4 and Intel x86_64). Windows is supported via WSL2.',
  },
  {
    id: 'difference',
    question: 'What is the difference between Developer and Enterprise licenses?',
    answer:
      'The Developer License ($29.99) is a standalone binary for solo developers on 1 machine. The Enterprise Team License ($199) grants multi-seat deployment rights for up to 10 developer workstations, custom config.toml policy overrides (for whitelisting proprietary files or tuning minimum pruning thresholds), and priority architectural support.',
  },
  {
    id: 'prompt-rewrite',
    question: 'Do I need to rewrite my prompts or agent system instructions?',
    answer:
      'No. Guardian is a completely transparent drop-in proxy. It prunes deterministic tool noise before payloads reach the API while preserving your prompt structure and Anthropic cache_control ephemeral markers.',
  },
  {
    id: 'refund',
    question: 'What is the refund policy?',
    answer: (
      <span>
        30-day, no-questions-asked money-back guarantee. If Prompt-Cache Guardian does not measurably reduce your token bill, send an email to{' '}
        <a href="mailto:support@promptcacheguardian.com" className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
          support@promptcacheguardian.com
        </a>{' '}
        within 30 days and your purchase will be refunded in full within one business day.
      </span>
    ),
  },
  {
    id: 'updates',
    question: 'How do software updates and new releases work?',
    answer:
      'Your one-time purchase includes lifetime access to all v0.x minor updates, performance patches, and compatibility releases as new models or agent versions launch. You will receive an email update with a fresh download link whenever a release is published.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['agents', 'security']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 border-t border-slate-800/80 bg-[#080d16]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything you need to know.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Have questions before downloading? Here are the most common technical questions answered.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
