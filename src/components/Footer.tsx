import React from 'react';
import { Shield, Mail, ExternalLink, Github, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenGhPages: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenGhPages }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#060910] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Shield className="h-4 w-4" />
              </div>
              <span>Prompt-Cache Guardian</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A high-performance compiled Rust HTTP proxy that intercepts Claude Code, Aider, and LLM coding agent requests. Prunes redundant tool logs &amp; AST boilerplate while preserving Anthropic prompt-cache prefixes.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              100% offline local loopback · Zero telemetry · Linux &amp; macOS binaries
            </div>
          </div>

          {/* Product links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#simulator" className="hover:text-emerald-400 transition-colors">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#mechanics" className="hover:text-emerald-400 transition-colors">
                  Cache Mechanics
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#integration" className="hover:text-emerald-400 transition-colors">
                  Agent Guides
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing &amp; Licenses
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Setup */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenDocs}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  CLI Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGhPages}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1"
                >
                  <span>Deploy to GitHub Pages</span>
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ &amp; Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="https://humanoidlady.gumroad.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Storefront</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Support
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions about your agent setup or volume licensing? Email us directly:
            </p>
            <a
              href="mailto:bkass0260@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>bkass0260@gmail.com</span>
            </a>
            <div className="pt-2 text-[11px] text-slate-500">
              Response guaranteed within one business day.
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Prompt-Cache Guardian. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Product: avreds / zrhju</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
