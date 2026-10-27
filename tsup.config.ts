import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Node >= 22 for v1 (plan decision D6). Every `node:` import will live in one
  // platform module, so a browser entry can follow without touching the rest.
  platform: "node",
  treeshake: true,
});
