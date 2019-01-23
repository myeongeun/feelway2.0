const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
  mode: 'production',
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
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  entry: {
    'index': './index.js',
    'css': './css.js',
    'javascript': './javascript.js',
    'components': './components.js',
    'guide': './guide.js',
  },
  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      title: 'index',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      template: './views/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'css',
      inject: true,
      chunks: ['css'],
      filename: 'css.html',
      template: './views/css.html',
    }),
    new HtmlWebpackPlugin({
      title: 'javascript',
      inject: true,
      chunks: ['javascript'],
      filename: 'javascript.html',
      template: './views/javascript.html',
    }),
    new HtmlWebpackPlugin({
      title: 'components',
      inject: true,
      chunks: ['components'],
      filename: 'components.html',
      template: './views/components.html',
    }),
    new HtmlWebpackPlugin({
      title: 'guide',
      inject: true,
      chunks: ['guide'],
      filename: 'guide.html',
      template: './views/guide.html',
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name]-[hash].css' : 'css/[name]-[hash].css',
      chunkFilename: devMode ? 'css/[id]-[hash].css' : 'css/[id]-[hash].css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: devMode ? 'js/[name]-[hash].js' : 'js/[name]-[hash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};
