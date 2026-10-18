import React from 'react';
import { Check, ShieldCheck, Zap, Lock, ArrowRight, FileText, Download, Mail, CreditCard } from 'lucide-react';
import { PaymentMethodsBadge } from './TrustBadges';

interface PricingSectionProps {
  onOpenExpenseMemo: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenExpenseMemo }) => {
  return (
    <section id="pricing" className="py-20 border-t border-slate-800/80 bg-[#080d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Zap className="h-3.5 w-3.5" />
            <span>Transparent One-Time Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            One purchase. No subscription.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Own the compiled static binary forever. Both licenses include lifetime minor updates and 100% offline local execution.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Developer License (Featured) */}
          <div className="relative rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-slate-900 to-[#0b121e] p-8 shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-3.5 left-8 bg-emerald-400 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Most Popular · Solo Devs
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-2xl font-bold text-white">Developer License</h3>
                  <p className="text-xs text-slate-400 mt-1">For individual engineers and consultants</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white font-mono tabular-nums tracking-tight">
                  $29.99
                </span>
                <span className="text-sm font-semibold text-slate-400">one-time payment</span>
              </div>

              <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                Pre-compiled static binary for Linux &amp; macOS. Slashes your Claude Code and Aider token bill from your very first session.
              </p>

              <div className="mt-8 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Included Capabilities:
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Tree-Sitter Rust &amp; TypeScript AST pruning</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Cargo, Vitest &amp; Pytest log tail compression</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Prompt-cache prefix hash preservation (100%)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Linux (x86_64 musl static) &amp; macOS binaries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Single environment variable setup</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Lifetime minor updates included</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <a
                href="https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99]"
              >
                <span>Buy Developer License — $29.99</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenExpenseMemo}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Expense this license via your employer</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-400" /> Gumroad Checkout
                </span>
                <span>·</span>
                <span>Instant Binary Download</span>
              </div>
            </div>
          </div>

          {/* Enterprise Team License */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-2xl font-bold text-white">Enterprise Team License</h3>
                  <p className="text-xs text-slate-400 mt-1">For engineering teams up to 10 developers</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white font-mono tabular-nums tracking-tight">
                  $199
                </span>
                <span className="text-sm font-semibold text-slate-400">one-time payment</span>
              </div>

              <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                Organization-wide deployment rights with custom configuration policies and priority architectural advisory.
              </p>

              <div className="mt-8 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Everything in Developer, plus:
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Multi-seat rights (up to 10 developer workstations)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Custom <code className="text-slate-200">config.toml</code> policy overrides</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Whitelisting for security logs &amp; proprietary files</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Shared team proxy deployment guide (Docker/LAN)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Priority email &amp; architecture review support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Team invoice &amp; tax compliance receipts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <a
                href="https://humanoidlady.gumroad.com/l/zrhju?option=Enterprise%20Team%20License%20(%24199)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all active:scale-[0.99]"
              >
                <span>Buy Enterprise License — $199</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenExpenseMemo}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Generate Team Expense Justification</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-400" /> Gumroad Checkout
                </span>
                <span>·</span>
                <span>Up to 10 Workstations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Badge */}
        <div className="mt-8 max-w-xl mx-auto">
          <PaymentMethodsBadge />
        </div>

        {/* What Happens Immediately After Purchase */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/30 p-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h4 className="text-lg font-bold text-white">What Happens Immediately After You Order</h4>
            <p className="text-xs text-slate-400 mt-1">Zero waiting. Start saving tokens in less than 60 seconds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Mail className="h-4 w-4" />
              </div>
              <div className="font-bold text-white">1. Instant Download Link</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Gumroad immediately delivers an email containing your download links and license key.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Download className="h-4 w-4" />
              </div>
              <div className="font-bold text-white">2. Standalone Binary</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Download the compiled static executable for Linux x86_64 or macOS Apple Silicon / Intel.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <div className="font-bold text-white">3. Tax Receipt / Invoice</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Automatic VAT / tax receipt generated for hassle-free reimbursement via Expensify, Ramp, or Brex.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="font-bold text-white">4. 30-Day Guarantee</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                If your Anthropic bill doesn't drop, get a 100% refund within one business day.
              </p>
            </div>
          </div>
        </div>

        {/* 30-Day Money-Back Guarantee Trust Box */}
        <div className="mt-8 max-w-5xl mx-auto rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="h-9 w-9" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">30-Day Risk-Free Money-Back Guarantee</h4>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              If Prompt-Cache Guardian does not measurably reduce your token consumption and Anthropic API invoice within 30 days, send an email to <a href="mailto:bkass0260@gmail.com" className="text-emerald-400 underline underline-offset-2">bkass0260@gmail.com</a> and your purchase will be refunded in full within one business day.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
