import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Github, Globe, CheckCircle2 } from 'lucide-react';

interface GhPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GITHUB_ACTIONS_WORKFLOW = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi

      - name: Build static site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

export const GhPagesModal: React.FC<GhPagesModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(GITHUB_ACTIONS_WORKFLOW);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full w-fit mb-3">
          <Github className="h-3.5 w-3.5" />
          <span>Publishing to GitHub Pages</span>
        </div>

        <h3 className="text-2xl font-bold text-white">
          Deploy This Site to GitHub Pages
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          This project is already pre-configured for GitHub Pages. Vite is configured with <code className="text-emerald-400 font-mono">base: './'</code> so assets load reliably on both custom domains and repository subpaths (<code className="text-slate-300 font-mono">username.github.io/repo-name/</code>).
        </p>

        {/* 3 Step Deployment Guide */}
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                1
              </span>
              <span>Push to GitHub Repository</span>
            </div>
            <p className="text-xs text-slate-400 pl-7 leading-relaxed">
              Create a new repository on GitHub and push these files to the <code className="text-slate-200 font-mono">main</code> branch.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                2
              </span>
              <span>Enable GitHub Actions for Pages</span>
            </div>
            <p className="text-xs text-slate-400 pl-7 leading-relaxed">
              In your GitHub repository, navigate to: <br />
              <strong className="text-slate-200">Settings → Pages → Build and deployment → Source: "GitHub Actions"</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                3
              </span>
              <span>Automatic Build &amp; Deploy Workflow</span>
            </div>
            <p className="text-xs text-slate-400 pl-7 leading-relaxed">
              Save the workflow below to <code className="text-slate-200 font-mono">.github/workflows/deploy.yml</code> (already added to your repository). Whenever you push to main, GitHub will build and host your site for free!
            </p>
          </div>
        </div>

        {/* Workflow Code Block */}
        <div className="mt-6">
          <div className="flex items-center justify-between pb-2 text-xs font-mono text-slate-400">
            <span>.github/workflows/deploy.yml</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy workflow</span>
                </>
              )}
            </button>
          </div>
          <pre className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-emerald-300 leading-relaxed overflow-x-auto max-h-52">
            {GITHUB_ACTIONS_WORKFLOW}
          </pre>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
