import type { Configuration } from 'webpack'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

export default {
  mode: "development",
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  devServer: {
    port: 8084
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'app4',
      filename: 'remoteEntry.js',
      exposes: {
        './AppContainer': './src/index.tsx'
      },
      shared: {
        'react': {
          singleton: true
        },
        'react-dom': {
          singleton: true
        }
      }
    })
  ]
} as Configuration