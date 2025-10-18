import type { ConfigArray as LinterConfigs } from "typescript-eslint"

import eslint from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

const __CONFIGS__: LinterConfigs = defineConfig({
  // /-- ignore --/
  ignores: [ "dist", "build", "coverage", "node_modules" ],
  // /-- built-in (recommended) --/
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
  ],
  // /-- custom (extended) --/
  plugins: {
    react,
    "react-hooks": reactHooks,
    "@stylistic": stylistic,
  },
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.es2020,
      ...globals.node,
    },
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    react: { version: "detect" },
  },
  rules: {
    // /-- stylistic --/
    "@stylistic/array-bracket-spacing": [ "error", "always" ],
    "@stylistic/arrow-parens": [ "error", "as-needed" ],
    "@stylistic/arrow-spacing": [ "error", { "before": true, "after": true } ],
    "@stylistic/block-spacing": "error",
    "@stylistic/brace-style": [ "error", "1tbs", { "allowSingleLine": true } ],
    "@stylistic/comma-dangle": [ "error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
    } ],
    "@stylistic/comma-spacing": "error",
    "@stylistic/comma-style": "error",
    "@stylistic/computed-property-spacing": "error",
    "@stylistic/dot-location": [ "error", "property" ],
    "@stylistic/eol-last": [ "error", "always" ],
    "@stylistic/function-paren-newline": [ "error", "multiline-arguments" ],
    "@stylistic/indent": [ "error", 2, { "SwitchCase": 1 } ],
    "@stylistic/keyword-spacing": "error",
    "@stylistic/linebreak-style": [ "error", "unix" ],
    "@stylistic/max-statements-per-line": [ "error", { "max": 2 } ],
    "@stylistic/no-floating-decimal": "off",
    "@stylistic/no-mixed-spaces-and-tabs": "error",
    "@stylistic/no-multi-spaces": "error",
    "@stylistic/no-multiple-empty-lines": [ "error", { "max": 2, "maxEOF": 1, "maxBOF": 0 } ],
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/object-curly-spacing": [ "error", "always" ],
    "@stylistic/template-curly-spacing": "error",
    "@stylistic/quotes": [ "error", "double" ],
    "@stylistic/rest-spread-spacing": "error",
    "@stylistic/semi": [ "error", "never" ],
    "@stylistic/space-before-blocks": "error",
    "@stylistic/space-before-function-paren": [ "error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always",
    } ],
    "@stylistic/space-in-parens": "error",
    "@stylistic/space-infix-ops": "error",
    "@stylistic/space-unary-ops": "error",
    "@stylistic/spaced-comment": [ "error", "always", { "markers": [ "/" ] } ],
    // /-- ts-eslint --/
    "@typescript-eslint/no-explicit-any": "off",
    // /-- eslint --/
    "prefer-template": "error",
    "curly": [ "error", "multi-line", "consistent" ],
    // /-- react --/
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },

})

export default __CONFIGS__
