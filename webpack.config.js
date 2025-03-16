const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/pages/index.js", 
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
          loader: "file-loader",
            options: {
              name: "[path][name].[ext]", // Preserve the original file name and path
              outputPath: "../se_project_aroundtheus/src/images", // Set the output folder for images in dist
              publicPath: "../se_project_aroundtheus/src/images", // Ensure the correct path when referenced in the HTML
      },
  }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./src/pages/index.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", 
      filename: "index.html",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    compress: true,
    port: 8080,
    open: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      publicPath: "/",
    },
  },
};


