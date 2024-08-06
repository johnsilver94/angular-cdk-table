import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import html from "@html-eslint/eslint-plugin"
import htmlParser from "@html-eslint/parser"

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		...html.configs["flat/recommended"],
		files: ["**/*.html"],
		plugins: {
			"@html-eslint": html
		},
		languageOptions: {
			parser: htmlParser
		},
		rules: {
			...html.configs["flat/recommended"].rules,
			"@html-eslint/indent": ["error", "tab"]
		}
	}
]
