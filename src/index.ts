/**
 * @particle-academy/fine-print -- the Node port of PHP particle-academy/fine-print.
 *
 * Phase W0 (foundation): this package has no PDF code yet. The contract it
 * will be held to is the `fine-print/*` suites in fancy-conformance, exported
 * from the PHP reference; see AGENTS.md.
 */

/** This package's own version. Independent of PHP's (plan decision D10). */
export const VERSION = "0.0.0";

/** The PHP fine-print release this port reproduces, row for row. */
export const PHP_REFERENCE = "0.5.0";

/** `version()`, as PHP's `Agent::version()`, plus the parity it claims. */
export function version(): { version: string; phpReference: string } {
  return { version: VERSION, phpReference: PHP_REFERENCE };
}
