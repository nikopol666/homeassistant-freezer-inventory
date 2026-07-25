import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/freezer-inventory-card.ts",
  output: {
    file: "custom_components/freezer_inventory/frontend/freezer-inventory-card.js",
    format: "es",
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser({ ecma: 2022, format: { comments: false } }),
  ],
};
