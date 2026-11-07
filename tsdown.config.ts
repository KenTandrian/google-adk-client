import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: "src/index.ts",
    "ai-sdk/index": "src/ai-sdk/index.ts",
    "react/index": "src/react/index.ts",
    "server/index": "src/server/index.ts",
  },
  fixedExtension: false,
  format: "esm",
  sourcemap: true,
});
