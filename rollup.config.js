import beep from "@rollup/plugin-beep";
import resolve from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import buble from "rollup-plugin-buble";
import common from "rollup-plugin-commonjs";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";
import pkg from "./package.json";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.umd,
      format: "umd",
      exports: "named",
      strict: true,
      banner,
      name: "FloatMenu",
      globals: {
        vue: "vue",
      },
    },
  ],
  plugins: [
    scss(),
    vue(),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["typescript"],
    }),
    beep(),
    common(),
    buble(),
    resolve(),
    terser(),
  ],
  external: ["vue"],
};
