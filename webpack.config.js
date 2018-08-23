const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './ui/app.js'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './ui/dist/'),
    publicPath: '/',
  },
  node: {
    fs: "empty",
    tls: "empty",
    net: "empty",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ]
  },
  mode: "development"
}