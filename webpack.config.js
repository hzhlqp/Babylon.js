const fs = require("fs");
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./splitConfig.js", // 入口文件指向 'index.js'
  output: {
    filename: "[name].[contenthash].js", // 动态生成的模块文件
    path: path.resolve(__dirname + "/assets/", "babylon"),
    clean: true, // 清理旧的输出文件
    library: "BABYLON", // UMD 格式库
    libraryTarget: "umd",
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 分离所有模块
      minSize: 10000, // 模块大小超过 10KB 才分离
      maxSize: 250000, // 最大文件大小限制
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 处理 TypeScript 文件
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"], // 支持 .ts 和 .js 文件
  },
  devtool: "source-map", // 开启源代码映射
};
