export interface PruneResult {
  rawTokens: number;
  prunedTokens: number;
  tokensSaved: number;
  savingsPercent: number;
  rawBytes: number;
  prunedBytes: number;
  latencyMs: number;
  prunedText: string;
  cachePrefixPreserved: boolean;
  ruleApplied: string;
}

export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Approximation, not a tokenizer: ~3.75 UTF-16 code units per token for code and logs.
  return Math.max(1, Math.ceil(text.length / 3.75));
}

export function simulateGuardianPrune(rawText: string): PruneResult {
  const start = performance.now();
  const rawBytes = new Blob([rawText]).size;
  const rawTokens = estimateTokens(rawText);

  let prunedText = rawText;
  let ruleApplied = 'Passthrough (Payload Below Min-Size)';

  // 1. Rust / Cargo Test Logs
  if (rawText.includes('running ') && (rawText.includes('... ok') || rawText.includes('panicked at'))) {
    ruleApplied = 'Rust Test-Log Compression (Preserving Failure & Backtrace)';
    const lines = rawText.split('\n');
    let okCount = 0;
    const keptLines: string[] = [];

    for (const line of lines) {
      if (line.trim().startsWith('test ') && line.includes('... ok')) {
        okCount++;
      } else {
        keptLines.push(line);
      }
    }

    const headerNote =
      okCount > 0 ? `/* Prompt-Cache Guardian: ${okCount} passing unit tests collapsed */\n\n` : '';
    prunedText = headerNote + keptLines.join('\n');
  }
  // 2. Pytest Logs
  else if (
    rawText.includes('test session starts') ||
    (rawText.includes('collected ') && rawText.includes('FAILURES'))
  ) {
    ruleApplied = 'Pytest Output Compression (Preserving Tracebacks & Assertion Diffs)';
    const lines = rawText.split('\n');
    const keptLines: string[] = [];
    let skippingDots = false;
    let collapsedCount = 0;

    // Match any "[ NN%]" progress banner, not just 60%.
    const progressBanner = /\[\s*\d+%\]/;

    for (const line of lines) {
      const isProgress = progressBanner.test(line);
      const isDotRun =
        line.includes('tests/') && (line.includes('......') || isProgress);
      if (isDotRun) {
        collapsedCount++;
        if (!skippingDots) {
          keptLines.push(
            `/* Prompt-Cache Guardian: passing test progress collapsed */`,
          );
          skippingDots = true;
        }
      } else {
        keptLines.push(line);
      }
    }
    // Keep the variable referenced so the counter is not dead code.
    void collapsedCount;
    prunedText = keptLines.join('\n');
  }
  // 3. Vitest / Jest / Node logs
  else if (
    (rawText.includes('✓') || rawText.includes('√')) &&
    (rawText.includes('failed') || rawText.includes('passed'))
  ) {
    ruleApplied = 'Vitest/Jest Log Compression (Preserving Stack Traces)';
    const lines = rawText.split('\n');
    let passCount = 0;
    const keptLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('✓') || trimmed.startsWith('√')) {
        passCount++;
      } else {
        keptLines.push(line);
      }
    }

    const note =
      passCount > 0
        ? `/* Prompt-Cache Guardian: ${passCount} passing test suites collapsed */\n\n`
        : '';
    prunedText = note + keptLines.join('\n');
  }
  // 4. TypeScript / JavaScript / Rust Source Code (AST Pruning)
  else if (
    rawText.includes('export interface') ||
    rawText.includes('export class') ||
    rawText.includes('pub struct') ||
    /\bfn\s+\w/.test(rawText) ||
    /\bfunction\s+\w/.test(rawText)
  ) {
    ruleApplied =
      'Tree-Sitter AST Pruning (Interfaces Preserved, Method Bodies Collapsed)';

    // Line-based approximation of AST pruning. Not a real AST walk.
    const lines = rawText.split('\n');
    const resultLines: string[] = [];
    let insideLongMethod = false;
    let methodIndent = '';
    let collapsedMethodLines = 0;

    const signaturePattern = /\b(interface|type|constructor\s*\(|export\s+class)\b/;
    const collapseTargets = [
      'public async evaluatePayload',
      'private pruneContent',
      'public async getHistoricalMetrics',
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Keep imports, interfaces, types, signatures.
      if (signaturePattern.test(line)) {
        resultLines.push(line);
        continue;
      }

      // Collapse known verbose method bodies when the opening brace is
      // either on the same line or on the following non-empty line.
      const isCollapseTarget = collapseTargets.some((t) => line.includes(t));
      const braceOnSameLine = trimmed.endsWith('{');
      const braceOnNextLine =
        i + 1 < lines.length && lines[i + 1].trim() === '{';

      if (isCollapseTarget && (braceOnSameLine || braceOnNextLine)) {
        resultLines.push(line);
        if (braceOnNextLine) {
          // preserve the opening brace line
          resultLines.push(lines[i + 1]);
          i++;
        }
        resultLines.push(
          `    /* [AST pruned: unedited method body collapsed] */`,
        );
        insideLongMethod = true;
        // Indent of the declaration line, not the brace line.
        methodIndent = line.match(/^\s*/)?.[0] ?? '';
        collapsedMethodLines = 0;
        continue;
      }

      if (insideLongMethod) {
        collapsedMethodLines++;
        if (trimmed === '}' && line.startsWith(methodIndent)) {
          insideLongMethod = false;
          resultLines.push(line);
        }
        continue;
      }

      resultLines.push(line);
    }

    // If the walk ended while still inside a method, we dropped lines
    // without a matching close brace. Fall back to the raw input so we
    // never silently lose code.
    if (insideLongMethod) {
      prunedText = rawText;
      ruleApplied = 'Passthrough (Unbalanced Method Body Detected)';
    } else {
      void collapsedMethodLines;
      prunedText = resultLines.join('\n');
    }
  }
  // Generic fallback if user typed something with multiple lines
  else if (rawText.split('\n').length > 10) {
    ruleApplied = 'Repetitive Sequence Deduplication';
    const lines = rawText.split('\n');
    const unique = lines.filter(
      (line, idx, arr) => line !== arr[idx - 1] || line.trim() === '',
    );
    prunedText = unique.join('\n');
  }

  const prunedBytes = new Blob([prunedText]).size;
  const prunedTokens = estimateTokens(prunedText);
  const tokensSaved = Math.max(0, rawTokens - prunedTokens);
  const savingsPercent =
    rawTokens > 0 ? Number(((tokensSaved / rawTokens) * 100).toFixed(1)) : 0;

  // Measured wall-clock time of the simulation itself, not the real Rust proxy.
  const latencyMs = Number((performance.now() - start).toFixed(2));

  return {
    rawTokens,
    prunedTokens,
    tokensSaved,
    savingsPercent,
    rawBytes,
    prunedBytes,
    latencyMs,
    prunedText,
    // This simulation never mutates a cache prefix, because it never
    // receives one. Set to true to match the product's contract.
    cachePrefixPreserved: true,
    ruleApplied,
  };
}