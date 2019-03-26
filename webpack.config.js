const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  entry: {
    applications: './index.js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // filename: devMode ? 'css/[name]-[hash].css' : 'css/[name]-[hash].css',
      // chunkFilename: devMode ? 'css/[id]-[hash].css' : 'css/[id]-[hash].css',
      filename: devMode ? 'css/applications.css' : 'applications.css',
      chunkFilename: devMode ? 'css/applications.css' : 'applications.css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'index.html',
      template: './views/main.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'plugins.html',
      template: './views/plugins.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'helper.html',
      template: './views/helper.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'components.html',
      template: './views/components.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'layouts.html',
      template: './views/layouts.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'guide.html',
      template: './views/guide.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'applications',
      chunks: ['applications'],
      filename: 'steps-basic.html',
      template: './views/steps-basic.html'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: devMode ? '' : 'dist',
    filename: devMode ? 'js/[name].js' : '[name].js',
    chunkFilename: devMode ? 'js/[id].js' : '[id].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
    },
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        minimize: true,
        sourceMap: true,
      }),
    ],
  },
};
