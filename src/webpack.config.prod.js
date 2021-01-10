const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './app.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]

  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};
