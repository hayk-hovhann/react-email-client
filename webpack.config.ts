import * as path from "path";
import * as webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "underscore-template-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My Dear BoilerPlate",
      template: "index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  optimization: {
    runtimeChunk: "single",
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};

export default config;
