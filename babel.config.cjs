module.exports = {
  "presets": ["@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]],
  "plugins": ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-runtime", "@babel/plugin-transform-modules-commonjs"]
};