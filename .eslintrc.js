module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "never"],
    "quotes": ["error", "double"],
  },
}
