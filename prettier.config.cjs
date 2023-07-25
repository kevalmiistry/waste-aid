/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    semi: false,
    singleQuote: false,
    tabWidth: 4,
    useTabs: false,
    trailingComma: "es5",
}

module.exports = config
