const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'rainbow-common.min.js' : 'rainbow-common.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: {
      root: 'Rainbow',
      amd: 'rainbow-common',
      commonjs: 'rainbow-common',
    },
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
        test: /.(png|jpg|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  optimization: {
    minimize: true,
    // minimizer: [new TerserPlugin({ sourceMap: true })],
  },
};

module.exports = config;
