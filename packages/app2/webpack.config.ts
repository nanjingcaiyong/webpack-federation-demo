import type { Configuration } from 'webpack'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import path from 'path'

export default {
  mode: "development",
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\m(t|j)sx?$/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  devServer: {
    port: 8082
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.container.ModuleFederationPlugin({
      name: 'app2',
      exposes: {
        './app': './src/project2.vue'
      },
      remotes: {
        'base': 'base@http://localhost:8080/remoteEntry.js'
      },
      shared: {
        vue: {
          singleton: true,
        },
        "element-plus": {
          singleton: true, // 使用单例模式
        }
      }
    })
  ]
} as Configuration