const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js", //bundle.[contenthash].js: unique build
    path: path.resolve(__dirname, "dist"), //absolute path required
    publicPath: "/dist/",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, ""),
    },
  },

  devtool: "inline-source-map", //source map
  module: {
    rules: [
      {
        test: /\.ts$/, //convert ts to js
        use: "ts-loader",
        exclude: /node-modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], //bundle files with these extensions
  },
};
