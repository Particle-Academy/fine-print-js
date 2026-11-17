# @particle-academy/fine-print

The Node/TypeScript port of [particle-academy/fine-print](https://github.com/Particle-Academy/fine-print):
a zero-dependency PDF writer, reader and renderer for agentic documents. It
writes PDF from the last-word JSON document model, never writes active content,
and reads hostile PDFs with an agent-read guard against prompt injection.

**Status: not released.** This repository is at its foundation (phase W0). The
writer is the first phase to ship; until then there is nothing to install.

<!-- fancy-agents-note:start -->
> **For agents.** This package is not listed on the Fancy MCP catalog server
> yet. The server, `https://ui.particle.academy/mcp` (streamable HTTP, no API key; MCP id
> `fancy-ui`), lists the released Fancy packages with install commands and
> docs. How an agent installs and uses this package is in [AGENTS.md](https://github.com/Particle-Academy/fine-print-js/blob/main/AGENTS.md).
<!-- fancy-agents-note:end -->

## Parity

This package targets **PHP fine-print 0.5.0**. Parity is measured, not claimed:
the shared `fine-print/*` suites in
[fancy-conformance](https://github.com/Particle-Academy/fancy-conformance) are
exported from the PHP reference, and CI runs them here on Linux and Windows,
with the PHP writer as a live oracle.

## Requirements

Node 22 or later. No runtime dependencies.

## License

MIT
