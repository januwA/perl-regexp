const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production", // production or development
  entry: {
    "perl-regexp": path.resolve(__dirname, "src/index.ts")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({})]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "PerlRegExp",
    libraryTarget: "umd",
    globalObject: "this"
  }
};
