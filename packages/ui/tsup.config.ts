import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/lib/utils.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react"],
  treeshake: true,
  sourcemap: true,
  splitting: true,
  minify: true,
  outDir: "dist",
  onSuccess: "echo '🎉 Build complete!'",
}) 