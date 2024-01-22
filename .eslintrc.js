/* eslint-disable quotes */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-param-reassing": "off",
    "linebreak-style": 0,
    camecase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "max-len": ["error", { code: 80 }],
    // quotes: ["double"],
    "max-len": ["erro", { code: 80 }],
  },
};
