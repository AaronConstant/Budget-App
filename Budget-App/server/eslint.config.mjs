import globals from "globals";
import pluginJs from "@eslint/js";
import { default as pluginNode } from "eslint-config-node";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["server/**/*.{js,mjs,cjs}"] },
  { files: ["server/**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      "no-undef": "off",
    },
  },
  pluginJs.configs.recommended,
  pluginNode,
];
