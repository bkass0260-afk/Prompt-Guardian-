import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight } from 'lucide-react';

interface IntegrationGuide {
  id: string;
  name: string;
  agentLabel: string;
  commandSnippet: string;
  explanation: string;
}

const GUIDES: IntegrationGuide[] = [
  {
    id: 'claude-code',
    name: 'Claude Code CLI',
    agentLabel: 'Official Anthropic CLI',
    commandSnippet: `# 1. Start Guardian proxy daemon (listens on 127.0.0.1:8080)
ast-prune-proxy &

# 2. Point Claude Code to local proxy via standard environment variable
export ANTHROPIC_BASE_URL="http://127.0.0.1:8080"

# 3. Launch Claude Code normally (all pruning happens transparently)
claude`,
    explanation: 'Claude Code automatically routes all Messages API calls through the local proxy. Your API key in ANTHROPIC_API_KEY is forwarded securely without modification.',
  },
  {
    id: 'aider',
    name: 'Aider',
    agentLabel: 'Terminal Pair Programmer',
    commandSnippet: `# Start Aider with custom Anthropic base URL
aider --model anthropic/claude-3-7-sonnet-20250219 \\
      --anthropic-api-base "http://127.0.0.1:8080/v1"`,
    explanation: 'Aider pairs seamlessly with Guardian. When Aider runs git diffs or pytest suites, test noise is folded before reaching the API.',
  },
  {
    id: 'cursor',
    name: 'Cursor IDE',
    agentLabel: 'AI Code Editor',
    commandSnippet: `// In Cursor: Settings -> Features -> Models -> Anthropic
{
  "anthropic_base_url": "http://127.0.0.1:8080",
  "anthropic_api_key": "sk-ant-api03-..."
}`,
    explanation: 'Configure Cursor to point to your local port. Multi-file edits and terminal runs are automatically pruned before leaving your computer.',
  },
  {
    id: 'cline',
    name: 'Cline & Roo Code',
    agentLabel: 'Autonomous Agent Extensions',
    commandSnippet: `// In VS Code Settings -> Cline / Roo Code Provider Configuration
API Provider: "Anthropic"
Custom Base URL: "http://127.0.0.1:8080"
API Key: <your-existing-anthropic-key>`,
    explanation: 'Both Cline and Roo Code support custom Anthropic endpoints out of the box. No extension forks or source modifications needed.',
  },
  {
    id: 'sdk',
    name: 'Python & Node.js SDK',
    agentLabel: 'Direct Anthropic SDK',
    commandSnippet: `// TypeScript / Node.js
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  baseURL: 'http://127.0.0.1:8080',
  apiKey: process.env.ANTHROPIC_API_KEY,
});

# Python
from anthropic import Anthropic

client = Anthropic(
    base_url="http://127.0.0.1:8080",
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)`,
    explanation: 'For custom agentic loops, pipelines, and evaluation harnesses. Drop in the baseURL option and Guardian transparently optimizes payloads.',
  },
];

export const AgentIntegration: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(GUIDES[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeGuide = GUIDES.find((g) => g.id === activeTabId) || GUIDES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeGuide.commandSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="integration" className="py-20 bg-[#070b12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span>Drop-In Agent Compatibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Works with your existing coding tools.
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            No code changes or custom prompt engineering. Set one environment variable or base URL option, and your agent immediately benefits from AST and log pruning.
          </p>
        </div>

        {/* Integration Workspace */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          
          {/* Tab buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
            {GUIDES.map((guide) => {
              const isSelected = activeTabId === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setActiveTabId(guide.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{guide.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Code Snippet */}
            <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60 text-xs font-mono">
                <span className="text-slate-400">{activeGuide.name} Setup</span>
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
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <pre className="text-xs sm:text-sm font-mono text-emerald-300 whitespace-pre overflow-x-auto leading-relaxed">
                  {activeGuide.commandSnippet}
                </pre>
              </div>
            </div>

            {/* Right: Explanation & Security notes */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {activeGuide.agentLabel}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeGuide.explanation}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-2 text-xs font-mono text-slate-400">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <span>Transparent Upstream Proxy</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Traffic is routed to <code className="text-slate-200">https://api.anthropic.com</code> over TLS. No credentials are saved or inspected.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
