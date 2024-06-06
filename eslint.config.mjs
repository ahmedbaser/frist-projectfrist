import eslint from '@eslint/js';
import globals from "globals";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended, {
    languageOptions: {
      globals: {
        ...globals.node,
        process: "readonly"
      }
    },
  }, {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error"
    },

  },

  {
    ignores: ["**/node_modules/", "**/dist/"]
  }

);






// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";


// export default [{
//     ignores: ["**/node_modules/", ".dist/"],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         process: "readonly"
//       },
//     },
//     rules: {
//       "no-unused-vars": "error",
//       "no-unused-expressions": "error",
//       "prefer-const": "error",
//       "no-console": "warn",
//       "no-undef": "error"
//     },
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];