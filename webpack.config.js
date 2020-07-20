const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'rainbow-utils.min.js' : 'rainbow-utils.js',
    libraryTarget: 'umd',
    library: 'rainbow',
  },
};

module.exports = config;
