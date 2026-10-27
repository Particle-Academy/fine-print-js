# AGENTS.md — fine-print-js

This file describes **this repository's code**: what it is, the invariants it
must keep, and the traps in porting to it. Process rules (publishing, version
policy, backports) live in the envelope's `RULES.md` and are never copied here.

## What this is

`@particle-academy/fine-print`: the Node/TypeScript port of PHP
`particle-academy/fine-print`. **It is a port of fine-print 0.5.0**
(`PHP_REFERENCE` in `src/index.ts`), and parity is a test result, not a claim:
the `fine-print/*` suites in fancy-conformance are exported from PHP 0.5.0 and
this package must pass them row for row.

**Status: W0 (foundation).** No PDF code exists yet. The writer comes first
(phase W), then the reader (R), the renderer (X1 to X4) and page serving (S).
The plan is the envelope's `.ai/plans/fine-print-ports.md`.

- **Zero runtime dependencies.** `node:zlib` and `node:crypto` only, behind ONE
  `platform` module (plan decision D6), so a browser entry can follow. Our own
  inflate (Node has no synchronous incremental inflate, and the 4 KB bomb
  judgement needs one), our own RC4/AES and CRC-32, and our own PDF text
  encoding tables, never platform codecs. Anything third-party is an approval
  request to the owner.
- **Never regenerate a conformance row.** The bytes are the contract. If a row
  looks wrong, the PHP reference is wrong or the port is; raise it, and the fix
  lands in PHP and is re-exported.
- **The PHP oracle is required.** CI checks out PHP fine-print at the pinned
  tag (`FINE_PRINT_PHP_SRC`), and a missing PHP fails the run (D12).

## The contract

| suite | what it pins |
|---|---|
| `fine-print/php-semantics` | the PHP behaviours a `php` helper module must reproduce: `%.4F` ties (half-to-even on exact ties), `round()` pre-rounding, `number_format`, mbstring `?` substitution, WinAnsi by table |
| `fine-print/writer-model` | validate, validateAndRepair, fromArray, describe, lint, jsonSchema, guide |
| `fine-print/writer-bytes` | the PDF: raw byte identity, or identity after `canon()` |

Normative text: fancy-conformance `suites/fine-print/SPEC.md` (file
references, `canon()`, tiers, the PHP empty-object rule, pixel tolerances).

## Invariants (restated from PHP; every one is enforced by rows)

1. `Agent` is the only agent surface; `Document` is the host's raw view.
2. Nothing executes, follows or fetches: no network or process API in `src`
   (a source-grep test will enforce it).
3. No attacker text in reports by default; scripts by length + SHA-256;
   excerpts only on request.
4. Names are compared decoded (`#xx`).
5. Every loop a file can lengthen is bounded, in the same change as the loop.
6. Refusals use the 12 REASONS, never a crash, hang or partial result. One
   refusal exception type.
7. Text streams through generators (`function*`) and never materialises.
8. Decompression is judged while it runs, in 4 KB chunks.
9. The extractor keeps hidden text; only the guard removes it.
10. Encryption: the empty password only; `secure()` before any resolve; never
    report key, O or U; our own RC4/AES.
11. Writer: nothing active is emitted; links are checked twice; model text is
    hex-only; names are sanitised; output is deterministic; images are bounded.
12. Renderer: pixels judged before allocating; operators counted; form depth
    and `q` stack capped; its own budget; everything undrawn reported.
13. Per-edge work is bounded by the canvas (`MAX_SEGMENTS`, `MAX_DASHES`,
    INF/NAN to 0).
14. Font cache and glyph limits; hinting is never executed.
15. Image bounds are checked before decoding; JPEG planes are checked.
16. Group/mask buffers are cropped before allocation.
17. Serving: authorise before the cache; never open client paths; checksummed
    packets, no `eval`; the watermark fails closed.

## JavaScript traps (plan section 5)

- **Bytes, not strings.** `Uint8Array` throughout. V8 caps string length, so
  never concatenate a decoded stream into a string; `latin1` only for short
  tokens; never spread a big array into a call.
- **Key order.** Integer-like keys reorder in plain objects; use `Map`.
- **Numbers.** Beyond 2^53 needs PHP-saturating ints; bitwise operators are
  32-bit (`>>> 0`); `Math.round` is not PHP `round`; `toFixed` is not `%.4F`;
  `Math.*` is not libm. The `php-semantics` rows are the arbiter.
- **Regex.** JS `\b` and `\d` are ASCII-only even with `/u`; translate PHP's
  Unicode classes by hand.
- **Parsing and memory.** An iterative parser; memory measured as
  `heapUsed + arrayBuffers`, sampled every 512 ticks.
