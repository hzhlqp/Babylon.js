const path = require("path");

module.exports = {
  entry: "./customBabylon.ts", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "babylon.js", // 输出文件名
    library: "BABYLON", // 导出的库名称，可以在 HTML 中直接引用
    libraryTarget: "umd", // 生成通用模块格式（支持多种模块加载器）
  },
  resolve: {
    extensions: [".ts", ".js"], // 自动解析扩展名
    alias: {
      "@core": path.resolve(__dirname, "packages/dev/core/src"), // 定义别名，优化路径
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: "ts-loader", // 使用 ts-loader 转译 TypeScript
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // 处理 JavaScript 文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // 支持 ES6+
            plugins: [
              "@babel/plugin-transform-typescript", // 支持 TS 枚举
            ],
          },
        },
      },
    ],
  },
  mode: "production",
};
