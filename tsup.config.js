export default {
  entry: ['src/**/*.ts'],
  format: ["esm", "cjs"],
  dts: true,
  bundle: false,
  sourcemap: true,
  outExtension({ format }) {
    const extension = format === 'esm' ? '.mjs' : '.cjs'
    return {
      js: `${extension}`,
    }
  },
};