import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ["esm", "cjs"],
  dts: true,
  bundle: false,
  sourcemap: true,
  clean: true,
  outExtension({ format }) {
    const extension = format === 'esm' ? '.mjs' : '.cjs'
    return {
      js: `${extension}`,
    }
  },
})
