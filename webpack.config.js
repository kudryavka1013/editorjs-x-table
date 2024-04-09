const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "RsTable",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};
