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
    port: 8083
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.container.ModuleFederationPlugin({
      name: 'item_three',
      exposes: {
        './AppContainer': './src/project3.vue',
        './ModuleA': './src/components/moduleA.vue'
      }
    })
  ]
} as Configuration