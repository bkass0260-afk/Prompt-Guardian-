import React from 'react';
import { Terminal, Shield, ExternalLink, Github } from 'lucide-react';

interface HeaderProps {
  onOpenDocs: () => void;
  onOpenGhPages: () => void;
  onOpenExpenseMemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDocs, onOpenGhPages, onOpenExpenseMemo }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b12]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <a href="#top" className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Shield className="h-4 w-4" />
          </div>
          <span>Prompt-Cache Guardian</span>
        </a>

        {/* Zone 2: Navigation Links (Single-Line, Whitespace-Nowrap) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#simulator" className="transition-colors hover:text-emerald-400 whitespace-nowrap shrink-0">
            Simulator
          </a>
          <a href="#mechanics" className="transition-colors hover:text-emerald-400 whitespace-nowrap shrink-0">
            Cache Mechanics
          </a>
          <a href="#calculator" className="transition-colors hover:text-emerald-400 whitespace-nowrap shrink-0">
            ROI Calculator
          </a>
          <a href="#integration" className="transition-colors hover:text-emerald-400 whitespace-nowrap shrink-0">
            Supported Agents
          </a>
          <a href="#pricing" className="transition-colors hover:text-emerald-400 whitespace-nowrap shrink-0">
            Pricing
          </a>
        </nav>

        {/* Zone 3: Actions (Docs / Expense / Primary Buy CTA) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenExpenseMemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Expense Memo</span>
          </button>

          <button
            onClick={onOpenGhPages}
            title="How to publish this site on GitHub Pages"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Pages</span>
          </button>

          <a
            href="https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg hover:from-emerald-300 hover:to-teal-200 transition-all shadow-sm hover:shadow-emerald-500/20 whitespace-nowrap shrink-0"
          >
            <span>Get Guardian</span>
          </a>
        </div>
      </div>
    </header>
  );
};

