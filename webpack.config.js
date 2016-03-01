// WEBPACK CONFIGURATION

// For instructions about this file refer to:
// http://webpack.github.io
var webpack  = require('webpack')

// Development Settings
var settings = require('./settings')


var babelQuery = {
  presets: ['react']
}
if(settings.development) {
  babelQuery.presets.push('react-hmre')
}


module.exports = {

  debug: true,

  devtool: settings.development ? '#eval-source-map' : null,

  context: __dirname,

  entry: {
    demo: settings.development ? ['webpack-hot-middleware/client?reload=true', `./${settings.paths.demo}`] : [`./${settings.paths.demo}`],
    rhythm: settings.development ? ['webpack-hot-middleware/client?reload=true', `./${settings.paths.source}`] : [`./${settings.paths.source}`]
  },

  output: {
    path: __dirname,
    filename: settings.development ? '[name].min.js' : '[name]/[name].min.js'
  },

  resolve: {
    extensions: ['', '.js','.jsx']
  },

  plugins: settings.development ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],

  module: {
    preLoaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      // Scripts
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel', query: babelQuery }
    ]
  }
}
