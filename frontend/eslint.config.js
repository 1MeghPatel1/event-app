import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			// Turn off unused variable and arguments checks
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",

			// Turn off no unused arguments
			"@typescript-eslint/no-unused-vars-experimental": "off",

			// Disable the rule that prevents using `any` type
			"@typescript-eslint/no-explicit-any": "off",

			// TypeScript-specific rules to switch off
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-inferrable-types": "off",
		},
	}
);

