import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, Shield } from 'lucide-react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const copyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full w-fit mb-3">
          <Terminal className="h-3.5 w-3.5" />
          <span>Technical Documentation &amp; CLI Reference</span>
        </div>

        <h3 className="text-2xl font-bold text-white">
          Prompt-Cache Guardian Setup
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Prompt-Cache Guardian is a compiled local HTTP proxy written in Rust that intercepts Anthropic Messages API requests (<code className="text-slate-200">POST /v1/messages</code>), inspects payloads for bulky tool-execution outputs, and structurally prunes redundant tokens before forwarding directly to Anthropic.
        </p>

        {/* Step 1: Start Daemon */}
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center justify-between">
            <span>1. Start the Local Daemon</span>
            <button
              onClick={() => copyCode('ast-prune-proxy', 1)}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {copiedIndex === 1 ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
            </button>
          </h4>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300">
            ast-prune-proxy
          </div>
          <p className="text-[11px] text-slate-400">
            Terminal output confirming proxy binding:
          </p>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-400 leading-relaxed whitespace-pre overflow-x-auto">
{`==============================================================================
[ast-prune-proxy] High-Performance LLM Token Pruning Proxy
  Proxy Listening: http://127.0.0.1:8080
  Target Upstream: https://api.anthropic.com
  AST Engine:      Tree-Sitter (Rust, TypeScript, JavaScript) + Test Log Heuristics
  Agent Base URL:  export ANTHROPIC_BASE_URL=http://127.0.0.1:8080
==============================================================================`}
          </div>
        </div>

        {/* Step 2: Configure Client */}
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center justify-between">
            <span>2. Configure Claude Code or Aider</span>
            <button
              onClick={() => copyCode('export ANTHROPIC_BASE_URL="http://127.0.0.1:8080"\nclaude', 2)}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {copiedIndex === 2 ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
            </button>
          </h4>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300 whitespace-pre">
{`export ANTHROPIC_BASE_URL="http://127.0.0.1:8080"
claude`}
          </div>
        </div>

        {/* Step 3: Health Check */}
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center justify-between">
            <span>3. Health Check &amp; Reduction Telemetry</span>
            <button
              onClick={() => copyCode('curl http://127.0.0.1:8080/health', 3)}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {copiedIndex === 3 ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copiedIndex === 3 ? 'Copied' : 'Copy'}</span>
            </button>
          </h4>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300">
            curl http://127.0.0.1:8080/health
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-400 leading-relaxed whitespace-pre overflow-x-auto">
{`{
  "status": "healthy",
  "version": "0.1.0",
  "upstream": "https://api.anthropic.com",
  "uptime_seconds": 1420,
  "total_requests": 38,
  "pruned_requests": 32,
  "tokens_saved": 218490,
  "bytes_saved": 819337,
  "savings_percentage": 78.4
}`}
          </div>
        </div>

        {/* Step 4: CLI Options */}
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-bold text-white">4. CLI Flags &amp; Options</h4>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre overflow-x-auto">
{`Usage: ast-prune-proxy [OPTIONS]

Options:
  -l, --listen <LISTEN>               Address and port to bind [default: 127.0.0.1:8080]
  -u, --upstream <UPSTREAM>           Target upstream API [default: https://api.anthropic.com]
      --min-prune-bytes <BYTES>       Min character length before pruning [default: 256]
      --prune-logs <BOOL>             Enable test log pruning [default: true]
      --prune-ast <BOOL>              Enable Tree-Sitter AST code pruning [default: true]
  -v, --verbose                       Detailed inspection output
  -h, --help                          Print help
  -V, --version                       Print version`}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Binary releases for Linux (x86_64) &amp; macOS
          </div>
          <a
            href="https://humanoidlady.gumroad.com/l/avreds?option=Developer%20License"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors"
          >
            <span>Get Developer License</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
