const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: './demos/main.js',
  },
  output: {
    path: __dirname,
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: ['transform-vue-jsx', 'transform-runtime'],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // `dart-sass` 是首选
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 1024,
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'MY Test App',
      template: './index.html',
    }),
  ],
  optimization: {
    minimize: true,
  },
};

module.exports = config;
