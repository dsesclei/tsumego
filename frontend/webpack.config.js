module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/../backend/static',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  devtool: 'source-map',
};