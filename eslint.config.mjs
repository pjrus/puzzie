import nextPlugin from "@next/eslint-plugin-next";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    languageOptions: {
      parser,
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    rules: nextPlugin.configs.recommended.rules
  },
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];
