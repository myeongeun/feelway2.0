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
            loader: 'css-loader?sourceMap',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader?sourceMap',
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          },
        ],
      },
    ],
  },
  entry: {
    common: './common.js',
    applications: './index.js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    // Main.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'THEME: Main',
      // chunks: ['applications'],
      filename: 'index.html',
      template: path.resolve(__dirname, './views', 'main.html')
    }),
    // Layout.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'THEME: Layout',
      // chunks: ['applications'],
      filename: 'layout.html',
      template: path.resolve(__dirname, './views', 'layout.html')
    }),
    // Content.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'THEME: Content',
      // chunks: ['applications'],
      filename: 'content.html',
      template: path.resolve(__dirname, './views', 'content.html')
    }),
    // Components.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'THEME: Components',
      // chunks: ['applications'],
      filename: 'components.html',
      template: path.resolve(__dirname, './views', 'components.html')
    }),
    // Utilities.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'THEME: Utilities',
      // chunks: ['applications'],
      filename: 'utilities.html',
      template: path.resolve(__dirname, './views', 'utilities.html')
    }),
    // plugins.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'THEME: Plugins',
      // chunks: ['applications'],
      filename: 'plugins.html',
      template: path.resolve(__dirname, './views', 'plugins.html')
    }),
    new MiniCssExtractPlugin({
      // filename: devMode ? 'css/[name]-[hash].css' : 'css/[name]-[hash].css',
      // chunkFilename: devMode ? 'css/[id]-[hash].css' : 'css/[id]-[hash].css',
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js',
  },
  performance: {
    hints: 'warning',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: '/[\\/]node_modules[\\/]/',
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
      // new OptimizeCSSAssetsPlugin({
      //   minimize: true,
      //   sourceMap: true,
      // }),
    ],
  },
};
