import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { PHP_REFERENCE, VERSION, version } from "../src/index";

/*
 * The W0 placeholder suite. It asserts the three claims this repository makes
 * before it has any PDF code, so CI has something real to run:
 *
 * 1. it reproduces a NAMED PHP release, and the PHP checkout CI uses is that
 *    release (plan section 6: pinned, and a test asserting the ref);
 * 2. it has zero runtime dependencies;
 * 3. its version is stated once.
 *
 * FINE_PRINT_PHP_SRC is REQUIRED. A missing PHP reference is a failure, never
 * a skip (plan decision D12): the live oracle this becomes must not be able to
 * pass by not running.
 */

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
  version: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

describe("foundation", () => {
  it("names the PHP release it ports, and CI checked out exactly that release", () => {
    const src = process.env.FINE_PRINT_PHP_SRC;
    expect(src, "FINE_PRINT_PHP_SRC must point at the PHP fine-print src/ checkout").toBeTruthy();

    const agent = readFileSync(join(src!, "Agent.php"), "utf8");
    const declared = /const VERSION = '([^']+)';/.exec(agent)?.[1];
    expect(declared).toBe(PHP_REFERENCE);
  });

  it("has no runtime dependencies", () => {
    expect(pkg.dependencies ?? {}).toEqual({});
    expect(pkg.peerDependencies ?? {}).toEqual({});
  });

  it("states its version once", () => {
    expect(VERSION).toBe(pkg.version);
    expect(version()).toEqual({ version: pkg.version, phpReference: PHP_REFERENCE });
  });
});
