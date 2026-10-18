import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveSimulator } from './components/LiveSimulator';
import { SocialProof } from './components/SocialProof';
import { ComparisonTable } from './components/ComparisonTable';
import { ArchitectureSection } from './components/ArchitectureSection';
import { RoiCalculator } from './components/RoiCalculator';
import { AgentIntegration } from './components/AgentIntegration';
import { SecuritySection } from './components/SecuritySection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SetupModal } from './components/SetupModal';
import { GhPagesModal } from './components/GhPagesModal';
import { ExpenseMemoModal } from './components/ExpenseMemoModal';
import { TrustBadgesStrip } from './components/TrustBadges';
import { ArrowRight, Shield, Zap, Sparkles, Terminal, FileText } from 'lucide-react';

export default function App() {
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [ghPagesModalOpen, setGhPagesModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 650);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navigation Bar */}
      <Header
        onOpenDocs={() => setDocsModalOpen(true)}
        onOpenGhPages={() => setGhPagesModalOpen(true)}
        onOpenExpenseMemo={() => setExpenseModalOpen(true)}
      />

      <main id="main">
        {/* Hero Section */}
        <Hero
          onOpenDocs={() => setDocsModalOpen(true)}
          onOpenExpenseMemo={() => setExpenseModalOpen(true)}
        />

        {/* Quantified Impact Strip */}
        <section className="border-y border-slate-800/80 bg-[#060910]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  94.5%
                </div>
                <div className="mt-1 text-xs text-slate-400 font-medium">
                  Max Token Reduction Seen
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 tabular-nums">
                  &lt;2.4 ms
                </div>
                <div className="mt-1 text-xs text-slate-400 font-medium">
                  Rust Proxy Overhead
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-teal-300 tabular-nums">
                  100%
                </div>
                <div className="mt-1 text-xs text-slate-400 font-medium">
                  Cache Prefix Hash Retained
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  0 B
                </div>
                <div className="mt-1 text-xs text-slate-400 font-medium">
                  Telemetry or Remote Logs
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security, Guarantee & Platform Trust Badges */}
        <TrustBadgesStrip />

        {/* Live Interactive Simulator Playground */}
        <LiveSimulator />

        {/* Developer Case Studies & Verified Results */}
        <SocialProof />

        {/* Why Not DIY Regex? Comprehensive Comparison Matrix */}
        <ComparisonTable />

        {/* Deep-Dive: Anthropic Prompt Cache Prefix Mechanics */}
        <ArchitectureSection />

        {/* Interactive ROI & Monthly Savings Calculator */}
        <RoiCalculator />

        {/* Supported Coding Agents & 1-Minute Setup */}
        <AgentIntegration />

        {/* Privacy, Security & Local Loopback Verification */}
        <SecuritySection />

        {/* Pricing Tiers & Money-Back Guarantee */}
        <PricingSection onOpenExpenseMemo={() => setExpenseModalOpen(true)} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* High-Intent Final Conversion Callout */}
        <section className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-[#080d16] to-[#05080e] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Keep the Cache. Cut the Noise.</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Stop paying full price for tokens you already sent.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Add Prompt-Cache Guardian to your developer toolkit today. Stabilize your Anthropic prompt cache prefixes and cut token expenses across every turn.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-200 transition-all shadow-xl shadow-emerald-500/25 active:scale-[0.99]"
              >
                <span>Get Developer License — $29.99</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => setExpenseModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>Expense with Employer</span>
              </button>

              <button
                onClick={() => setDocsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              >
                <Terminal className="h-4 w-4" />
                <span>CLI Setup Guide</span>
              </button>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              One-time payment · No subscription · Pays for itself on Day 2 · 30-day money-back guarantee
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenDocs={() => setDocsModalOpen(true)}
        onOpenGhPages={() => setGhPagesModalOpen(true)}
      />

      {/* Mobile Floating Sticky Purchase Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 p-3 sm:hidden border-t border-slate-800 bg-[#070b12]/95 backdrop-blur-lg transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href="https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 text-center text-xs font-bold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors"
          >
            Developer $29.99
          </a>
          <button
            onClick={() => setExpenseModalOpen(true)}
            className="py-2.5 px-3 text-center text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg transition-colors"
          >
            Expense
          </button>
          <a
            href="https://humanoidlady.gumroad.com/l/zrhju?option=Enterprise%20Team%20License%20(%24199)"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 text-center text-xs font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Enterprise $199
          </a>
        </div>
      </div>

      {/* Technical CLI Setup Modal */}
      <SetupModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />

      {/* GitHub Pages Deployment Guide Modal */}
      <GhPagesModal
        isOpen={ghPagesModalOpen}
        onClose={() => setGhPagesModalOpen(false)}
      />

      {/* Employer Expense Memo Kit Modal */}
      <ExpenseMemoModal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
      />
    </div>
  );
}
