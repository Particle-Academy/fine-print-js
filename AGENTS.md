# Using @particle-academy/fine-print (Node) — guide for agents

How an agent installs and uses this package in a consumer app. What the package
is, is in [README.md](./README.md). Notes for working ON this repo's code are in
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Install

**Not released.** This port is at its foundation (phase W0) and has no PDF code
yet, so there is nothing to install. Do not add it to a project.

Until it ships, the working fine-print is the PHP package
`particle-academy/fine-print` (Composer); a Python port, `fine-print-py`,
also exists.

## Find it on the Fancy MCP server

The catalog server is `https://ui.particle.academy/mcp` (streamable HTTP, no API
key; MCP id `fancy-ui`). This package is **not listed there yet**; it appears
once it is published. Use `search-backend-packages` (stack `node`) to check
whether it has been.

## API essentials

When it ships it will be a port of PHP fine-print 0.5.0, held to the shared
`fine-print/*` conformance suites, so the PHP package's `AGENTS.md` describes
the API it will expose. Node 22 or later, no runtime dependencies.
