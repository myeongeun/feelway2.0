const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
  mode: 'development',
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
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './fonts/',
          },
        }],
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
      filename: devMode ? 'applications-[hash].css' : 'applications-[hash].css',
      chunkFilename: devMode ? 'applications-[hash].css' : 'applications-[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'applications',
      inject: true,
      chunks: ['applications'],
      filename: 'index.html',
      template: './views/main.html',
    }),
    new HtmlWebpackPlugin({
      title: 'applications',
      inject: true,
      chunks: ['applications'],
      filename: 'css.html',
      template: './views/css.html',
    }),
    new HtmlWebpackPlugin({
      title: 'applications',
      inject: true,
      chunks: ['applications'],
      filename: 'helper.html',
      template: './views/helper.html',
    }),
    new HtmlWebpackPlugin({
      title: 'applications',
      inject: true,
      chunks: ['applications'],
      filename: 'components.html',
      template: './views/components.html',
    }),
    new HtmlWebpackPlugin({
      title: 'applications',
      inject: true,
      chunks: ['applications'],
      filename: 'layouts.html',
      template: './views/layouts.html',
    }),
    new HtmlWebpackPlugin({
      title: 'applications',
      inject: true,
      chunks: ['applications'],
      filename: 'guide.html',
      template: './views/guide.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: devMode ? '[name]-[hash].js' : '[name]-[hash].js',
    chunkFilename: devMode ? '[id]-[hash].js' : '[id]-[hash].js',
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
