import { includeIgnoreFile } from "@eslint/compat";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default defineConfig({
    extends: [prettierConfig, tseslint.configs.recommended],
    plugins: { "@typescript-eslint": tseslint.plugin },
    languageOptions: { parserOptions: { project: ["tsconfig.json"], tsconfigRootDir: import.meta.dirname } },
    rules: {
        // eslint rule
        "no-throw-literal": "error",
        "no-empty-function": "off",
        "no-unused-vars": "off",
        "no-unused-expressions": "off",

        // typescript rules
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_+$", varsIgnorePattern: "^_+$" }],
        "@typescript-eslint/no-unused-expressions": "off",
    },
    ignores: ["**/*.{js,mjs,cjs}", ...(includeIgnoreFile(gitignorePath).ignores ?? [])],
});
