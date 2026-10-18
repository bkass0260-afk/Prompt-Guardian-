export interface SamplePreset {
  id: string;
  name: string;
  category: 'Rust Test Log' | 'TypeScript AST' | 'Python Pytest' | 'Vitest / Node';
  description: string;
  rawInput: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'cargo-test',
    name: 'Cargo Test Panic (100 Tests)',
    category: 'Rust Test Log',
    description: '100 repetitive passing test lines with a single assertion panic at the bottom',
    rawInput: `running 102 tests
test auth::tests::test_jwt_claims_valid ... ok
test auth::tests::test_jwt_claims_expired ... ok
test auth::tests::test_session_rotation ... ok
test auth::tests::test_refresh_token_revocation ... ok
test db::pool::test_connection_acquisition ... ok
test db::pool::test_idle_timeout ... ok
test db::pool::test_max_overflow ... ok
test parser::ast::test_token_stream_empty ... ok
test parser::ast::test_token_stream_single ... ok
test parser::ast::test_ident_resolution ... ok
test parser::ast::test_scope_hierarchy ... ok
test parser::ast::test_closure_capture ... ok
test router::handlers::test_health_check ... ok
test router::handlers::test_metrics_export ... ok
test router::handlers::test_ping_pong ... ok
test cache::lru::test_eviction_strategy ... ok
test cache::lru::test_concurrency_lock ... ok
test cache::lru::test_capacity_boundary ... ok
test cache::prefix::test_sha256_checkpoint ... ok
test cache::prefix::test_hash_stability ... ok
test cache::prefix::test_ephemeral_boundary ... ok
test engine::prune::test_empty_payload ... ok
test engine::prune::test_passthrough_system_prompt ... ok
test engine::prune::test_strip_cargo_logs ... ok
test engine::prune::test_preserve_stacktrace ... ok
test engine::prune::test_diff_compression ... ok
test engine::prune::test_json_array_slicing ... ok
test proxy::axum::test_tls_termination ... ok
test proxy::axum::test_keepalive_timeout ... ok
test proxy::axum::test_stream_chunking ... ok
test proxy::axum::test_backpressure_buffer ... ok
test proxy::filter::test_header_stripping ... ok
test proxy::filter::test_content_length_rewrite ... ok
test telemetry::logger::test_hud_rendering ... ok
test telemetry::logger::test_byte_counter ... ok
test telemetry::logger::test_json_export ... ok
... (65 more passing unit tests omitted in sample) ...
test cache::storage::test_disk_quota ... ok
test cache::storage::test_corrupt_wal ... ok
test engine::tree_sitter::test_rust_parser ... ok
test engine::tree_sitter::test_typescript_parser ... ok
test engine::tree_sitter::test_syntax_error_recovery ... FAILED

failures:

---- engine::tree_sitter::test_syntax_error_recovery stdout ----
thread 'engine::tree_sitter::test_syntax_error_recovery' panicked at src/engine/tree_sitter.rs:184:9:
assertion \`left == right\` failed
  left: PrunedResult { status: "recovered", tokens: 142 }
 right: PrunedResult { status: "clean", tokens: 142 }
stack backtrace:
   0: rust_begin_unwind
             at /rustc/e71f9a2/library/std/src/panicking.rs:652:5
   1: core::panicking::panic_fmt
             at /rustc/e71f9a2/library/core/src/panicking.rs:72:14
   2: core::panicking::assert_failed_inner
   3: core::panicking::assert_failed
             at /rustc/e71f9a2/library/core/src/panicking.rs:443:5
   4: ast_prune_proxy::engine::tree_sitter::test_syntax_error_recovery
             at ./src/engine/tree_sitter.rs:184:9
   5: core::ops::function::FnOnce::call_once
             at /rustc/e71f9a2/library/core/src/ops/function.rs:250:5
note: run with \`RUST_BACKTRACE=1\` environment variable to display a full backtrace

test result: FAILED. 101 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.42s`,
  },
  {
    id: 'typescript-ast',
    name: 'TypeScript Large File Read (AST Prune)',
    category: 'TypeScript AST',
    description: 'Agent reads a 400-line service file to inspect interfaces; Guardian prunes unedited function bodies',
    rawInput: `import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TokenVault } from '../security/token-vault';
import { MetricsCollector } from '../monitoring/metrics';

export interface PruningPolicy {
  preserveSystemPrompts: boolean;
  minByteLength: number;
  collapsePassedTests: boolean;
  astPruningEnabled: boolean;
  allowedLanguages: ('rust' | 'typescript' | 'python')[];
}

export interface PruneTelemetry {
  originalTokens: number;
  prunedTokens: number;
  savingsRatio: number;
  latencyMicroseconds: number;
  cachePrefixHash: string;
}

@Injectable()
export class TokenOptimizationEngine {
  private readonly logger = new Logger(TokenOptimizationEngine.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly vault: TokenVault,
    private readonly metrics: MetricsCollector
  ) {}

  public async evaluatePayload(rawJson: string, policy: PruningPolicy): Promise<PruneTelemetry> {
    const startTime = performance.now();
    const parsed = JSON.parse(rawJson);
    let prunedTokens = 0;
    let originalTokens = Math.ceil(rawJson.length / 3.8);

    for (const msg of parsed.messages || []) {
      if (msg.role === 'user' && Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === 'tool_result' && typeof block.content === 'string') {
            const result = this.pruneContent(block.content, policy);
            block.content = result.cleanContent;
            prunedTokens += result.reducedTokens;
          }
        }
      }
    }

    const duration = (performance.now() - startTime) * 1000;
    return {
      originalTokens,
      prunedTokens: originalTokens - prunedTokens,
      savingsRatio: (prunedTokens / originalTokens) * 100,
      latencyMicroseconds: Math.round(duration),
      cachePrefixHash: this.computeSha256Prefix(rawJson)
    };
  }

  private pruneContent(content: string, policy: PruningPolicy): { cleanContent: string; reducedTokens: number } {
    if (content.length < policy.minByteLength) {
      return { cleanContent: content, reducedTokens: 0 };
    }
    const initialLen = content.length;
    // Log suppression pass
    const lines = content.split('\\n');
    const filteredLines = lines.filter(line => !line.includes('... ok'));
    const finalContent = filteredLines.join('\\n');
    const saved = Math.ceil((initialLen - finalContent.length) / 3.8);
    return { cleanContent: finalContent, reducedTokens: saved };
  }

  private computeSha256Prefix(data: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(data.slice(0, 4096)).digest('hex');
  }

  public async getHistoricalMetrics(timeframeHours: number): Promise<any[]> {
    const cutoff = new Date(Date.now() - timeframeHours * 3600 * 1000);
    return await this.db.query('SELECT * FROM telemetry WHERE timestamp >= $1 ORDER BY timestamp DESC', [cutoff]);
  }

  public async updatePruningPolicy(newPolicy: Partial<PruningPolicy>): Promise<void> {
    await this.vault.storeConfig('active_policy', JSON.stringify(newPolicy));
    this.logger.log('Pruning policy updated in local vault');
  }
}`,
  },
  {
    id: 'pytest-log',
    name: 'Python Pytest Run (85 Passed, 1 Failure)',
    category: 'Python Pytest',
    description: 'Pytest output with 85 passed test dots, environment banners, and 1 assertion error',
    rawInput: `============================= test session starts ==============================
platform linux -- Python 3.12.3, pytest-8.1.1, pluggy-1.4.0
rootdir: /home/dev/workspace/prompt-guardian
plugins: anyio-4.3.0, asyncio-0.23.6, cov-5.0.0
collected 86 items

tests/test_proxy.py .................................................... [ 60%]
tests/test_tokens.py ...........................F                        [ 90%]
tests/test_cache.py .....                                                [100%]

=================================== FAILURES ===================================
___________________________ test_cache_prefix_boundary _________________________

client = <TestClient(TestServer(proxy_app))>, sample_turn = {'role': 'user', 'content': 'inspect src/lib.rs'}

    def test_cache_prefix_boundary(client, sample_turn):
        response = client.post("/v1/messages", json={"messages": [sample_turn]})
        assert response.status_code == 200
        headers = response.headers
>       assert headers["x-cache-status"] == "prefix-hit"
E       AssertionError: assert 'cache-miss' == 'prefix-hit'
E         - prefix-hit
E         + cache-miss

tests/test_tokens.py:142: AssertionError
=========================== short test summary info ============================
FAILED tests/test_tokens.py::test_cache_prefix_boundary - AssertionError: assert 'cache-miss' == 'prefix-hit'
========================= 1 failed, 85 passed in 1.48s =========================`,
  },
  {
    id: 'vitest-build',
    name: 'Vitest / Node Build Output',
    category: 'Vitest / Node',
    description: 'Node test runner with verbose module specs and 1 syntax import failure',
    rawInput: ` ✓ src/utils/formatter.test.ts (14 tests) 18ms
 ✓ src/hooks/useMetrics.test.ts (8 tests) 24ms
 ✓ src/services/api.test.ts (22 tests) 54ms
 ✓ src/services/auth.test.ts (19 tests) 31ms
 ✓ src/components/Button.test.tsx (12 tests) 15ms
 ✓ src/components/Input.test.tsx (9 tests) 11ms
 ✓ src/components/Modal.test.tsx (16 tests) 29ms
 ✓ src/components/Sidebar.test.tsx (11 tests) 20ms
 ✓ src/pipeline/tokenizer.test.ts (34 tests) 78ms
 ❯ src/pipeline/ast-pruner.test.ts (1 test | 1 failed) 142ms
   × should prune nested closures cleanly without syntax distortion
     → TypeError: Cannot read properties of undefined (reading 'treeSitterRoot')
        at pruneAstNode (src/pipeline/ast-pruner.ts:88:24)
        at Context.<anonymous> (src/pipeline/ast-pruner.test.ts:34:18)

 Test Files  1 failed | 9 passed (10)
      Tests  1 failed | 145 passed (146)
   Start at  15:28:40
   Duration  412ms (transform 58ms, setup 0ms, collect 89ms, tests 265ms, environment 0ms, prepare 32ms)`,
  },
];
