import path from 'path'
import ExternalTemplateRemotesPlugin from "./ExternalTemplateRemotesPlugin";
import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import type { Configuration } from 'webpack'
export default {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    port: 8080
  },
  module: {
    rules: [{
      test: /\.m?(t|j)sx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      use: [
        'vue-loader',
      ]
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'base',
      filename: 'remoteEntry.js',
      exposes: {
        "./ElementPlus": "element-plus", // 暴露 Element Plus
      },
      remotes: {
        app1: `app1@[window.CDN.APP1_APP_CDN]/remoteEntry.js?v=[window.VERSION.P1]`,
        app2: 'app2@[window.CDN.APP2_APP_CDN]/app2.js?v=[window.VERSION.P2]',
        item_three: 'item_three@[window.CDN.APP3_APP_CDN]/item_three.js?v=[window.VERSION.P3]',
        app4: 'app4@[window.CDN.APP4_APP_CDN]/remoteEntry.js?v=[window.VERSION.P4]'
      },
      shared: {
        vue: {
          singleton: true,
        },
        "element-plus": {
          singleton: true, // 使用单例模式

        }
      }
    }),
    new ExternalTemplateRemotesPlugin()
  ]
} as Configuration