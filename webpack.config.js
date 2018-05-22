/* eslint-disable*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
// Development css works with hot module replacement which is not compatible with ExtractTextPlugin()
const cssDev = [
  'style-loader',
  'css-loader',
  'sass-loader'
]

// Production css option generates styles.css file in dist-folder 
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader',
    'sass-loader'
  ]
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src', 'index.js')
  ],
  devtool: isProd ? 'eval' : 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          'file-loader?name=images/[name].[ext]', // save original image names into dist/images/ folder
          'image-webpack-loader'  // compresses and optimizes images
        ]
      },
      { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' }
    ]
  },
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'src', 'public'),
    compress: false, // use in prod
    port: process.env.PORT || 3000,
    stats: 'errors-only',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(isProd ? 'https://digit.niemisami.com/api' : 'http://localhost:3037/api'),
      DEVELOPMENT: JSON.stringify(!isProd)
    }),
    new HtmlWebpackPlugin({
      title: 'Digit ry',
      minify: {
        collapseWhitespace: isProd // use in prod
      },
      hash: isProd, // use in prod
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: !isProd,
      allChunks: true
    }),
    new FaviconsWebpackPlugin(path.join(__dirname, 'src', 'public', 'favicon.png'))
  ],
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    alias: {
      flexboxgrid: path.join(__dirname, 'node_modules/flexboxgrid/dist/flexboxgrid.min.css'),
      normalize: path.join(__dirname, 'node_modules/normalize.css'),
      reactBigCalendar: path.join(__dirname, 'node_modules', 'react-big-calendar/lib/css/react-big-calendar.css')
    }
  }
}
/* eslint-enable */
