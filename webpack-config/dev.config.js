import path from 'path';
import webpack from 'webpack';

const dev = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true,
    proxy: {
      "/": {
        target: "http://localhost:3000",
        pathRewrite: {"^/api" : ""},
      }
    }
  }
};

export default dev;