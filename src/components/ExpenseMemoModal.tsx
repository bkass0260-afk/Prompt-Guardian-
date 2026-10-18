import React, { useState } from 'react';
import { X, Copy, Check, FileText, Send, DollarSign } from 'lucide-react';

interface ExpenseMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpenseMemoModal: React.FC<ExpenseMemoModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [licenseType, setLicenseType] = useState<'developer' | 'enterprise'>('developer');

  if (!isOpen) return null;

  const cost = licenseType === 'developer' ? '$29.99' : '$199.00';
  const licenseName = licenseType === 'developer' ? 'Developer License (1 seat)' : 'Enterprise Team License (up to 10 seats)';
  const expectedMonthlySavings = licenseType === 'developer' ? '$80 – $220 / month' : '$600 – $1,800 / month';

  const memoText = `Hi [Manager Name],

I would like to request expense approval for a one-time software license for Prompt-Cache Guardian (${cost}).

What it is:
A compiled local Rust proxy that optimizes LLM token usage for coding agents (Claude Code, Aider, and Cursor) by pruning bulky test logs and unedited AST boilerplate.

Why it makes financial sense for our team:
1. Slashes our Anthropic API token spend by an estimated 70–90% on tool-heavy turns.
2. Preserves Anthropic's prompt cache prefix checkpoints (90% discount on cached reads).
3. Projected net savings: ${expectedMonthlySavings} on our API invoices.
4. One-time payment (no recurring subscription), paying for itself in under 3 business days.
5. 100% offline and secure: Runs locally on loopback (127.0.0.1) with zero telemetry, so our codebase and API keys never leave the workstation.
6. 30-day money-back guarantee.

Purchase link:
https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License

Receipt & tax invoice will be submitted immediately via our expense portal upon purchase.

Thanks,
[Your Name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" />

      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full w-fit mb-3">
          <FileText className="h-3.5 w-3.5" />
          <span>Employer Reimbursement Kit</span>
        </div>

        <h3 className="text-2xl font-bold text-white">
          Expense Prompt-Cache Guardian
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Most software engineering teams and managers eagerly approve Prompt-Cache Guardian because a single one-time {cost} expense saves hundreds of dollars every month on company Anthropic API invoices.
        </p>

        {/* License Switcher */}
        <div className="mt-6 flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setLicenseType('developer')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              licenseType === 'developer'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Developer License ($29.99)
          </button>
          <button
            onClick={() => setLicenseType('enterprise')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              licenseType === 'enterprise'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Enterprise Team License ($199)
          </button>
        </div>

        {/* Memo Preview */}
        <div className="mt-4">
          <div className="flex items-center justify-between pb-2 text-xs font-mono text-slate-400">
            <span>Pre-Written Manager Email / Slack Message:</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors font-sans text-xs font-semibold"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Expense Memo</span>
                </>
              )}
            </button>
          </div>
          <pre className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72">
            {memoText}
          </pre>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>Gumroad generates standard business tax receipts for Expensify, Ramp, or Brex.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
