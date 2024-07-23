import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    {rules: {
        "indent": ["error", 4],
        "quotes": ["warn", "double"],
        "semi": ["error", "always"],
        "no-undef": "off"
    }}
];