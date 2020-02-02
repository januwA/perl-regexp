const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyFilePlugin = require("webpack-copy-file-plugin");

// 最小化生产
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
  plugins: [
    new CleanWebpackPlugin(),
    new CopyFilePlugin(
      ["./README.md", "./LICENSE", "./.gitignore", "./package.json"].map(f =>
        path.resolve(__dirname, f)
      )
    )
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "PerlRegExp",
    libraryTarget: "umd",
    globalObject: "this"
  }
};
