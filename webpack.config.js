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
    applications: './index.js',
    another: './another.js',
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
      title: 'FeeLWAY 2.0: Main',
      // chunks: ['applications'],
      filename: 'index.html',
      template: path.resolve(__dirname, './views', 'main.html')
    }),
    // FeeLWAY-Menus.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-Menus',
      // chunks: ['applications'],
      filename: 'feelway-menus.html',
      template: path.resolve(__dirname, './views', 'feelway-menus.html')
    }),
    // FeeLWAY-Images.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-images',
      // chunks: ['applications'],
      filename: 'feelway-images.html',
      template: path.resolve(__dirname, './views', 'feelway-images.html')
    }),
    // FeeLWAY-Buttons.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-buttons',
      // chunks: ['applications'],
      filename: 'feelway-buttons.html',
      template: path.resolve(__dirname, './views', 'feelway-buttons.html')
    }),
    // FeeLWAY-Forms.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-forms',
      // chunks: ['applications'],
      filename: 'feelway-forms.html',
      template: path.resolve(__dirname, './views', 'feelway-forms.html')
    }),
    // FeeLWAY-Filters.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-filters',
      // chunks: ['applications'],
      filename: 'feelway-filters.html',
      template: path.resolve(__dirname, './views', 'feelway-filters.html')
    }),
    // FeeLWAY-Tables.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-tables',
      // chunks: ['applications'],
      filename: 'feelway-tables.html',
      template: path.resolve(__dirname, './views', 'feelway-tables.html')
    }),
    // FeeLWAY-Other.html
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      title: 'FeeLWAY 2.0: Components-other',
      // chunks: ['applications'],
      filename: 'feelway-other.html',
      template: path.resolve(__dirname, './views', 'feelway-other.html')
    }),
    new MiniCssExtractPlugin({
      // filename: devMode ? 'css/[name]-[hash].css' : 'css/[name]-[hash].css',
      // chunkFilename: devMode ? 'css/[id]-[hash].css' : 'css/[id]-[hash].css',
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
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
      chunks: 'all',
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
