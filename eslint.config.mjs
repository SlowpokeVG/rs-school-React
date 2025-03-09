import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/__tests__/**",
      "**/__mocks__/**",
      "**/*.test.*",
      "**/*.spec.*",
      "**/.next/**",
      "**/node_modules/**",
      "**/coverage/**",
    ],
  }
  
];

export default eslintConfig;
