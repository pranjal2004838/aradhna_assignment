import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // This app stores all data in the browser (localStorage). We load that
      // data inside a mount useEffect, which is the standard pattern for
      // client-only data and prevents server/client hydration mismatches.
      // The React Compiler rule flags any setState-in-effect, so we relax it.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
