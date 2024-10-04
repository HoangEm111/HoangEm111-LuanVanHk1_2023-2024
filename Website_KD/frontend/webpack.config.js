const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Điểm vào của ứng dụng
  output: {
    path: path.resolve(__dirname, "dist"), // Thư mục build
    filename: "bundle.js", // Tên file JS build
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Đối với các file .js
        exclude: /node_modules/, // Loại trừ node_modules
        use: {
          loader: "babel-loader", // Sử dụng babel-loader
        },
      },
      {
        test: /\.css$/, // Đối với các file .css
        use: ["style-loader", "css-loader"], // Sử dụng style-loader và css-loader
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // File HTML gốc
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"), // Thư mục chứa các file tĩnh
    compress: true, // Bật tính năng nén
    port: 3000, // Chạy server trên cổng 3000
  },
  mode: "development", // Chế độ phát triển
};
