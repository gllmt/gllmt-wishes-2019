const path = require('path');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const webpackConfigBase = require('./webpack.config.base.js');

const PUBLIC_PATH = './dist';

module.exports = webpackMerge(webpackConfigBase, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css',
    }),
    new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '../')}),
    new SWPrecacheWebpackPlugin({
      cacheId: 'jf-Gorceix-sw-precache',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/',
      mergeStaticsConfig: true, // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
      staticFileGlobsIgnorePatterns: [/\.map$/], // use this to ignore sourcemap files
    }),
    new WebpackPwaManifest({
      name: 'Wishes 2019 Gllmt',
      short_name: 'Gllmt 2019',
      description: 'Site Static for Wishes 2019 by Gllmt',
      background_color: '#000000',
      theme_color: '#000000',
      start_url: '/',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
        },
      ],
    }),
  ],
});
