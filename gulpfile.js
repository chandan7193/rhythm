var gulp                 = require('gulp');
var $                    = require('gulp-load-plugins')();
var browserSync          = require('browser-sync').create();
var webpack              = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

// Project Settings
var settings = require('./settings.js')

// Error Handler
function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}

// Webpack Compilers
var compiler = webpack(require('./webpack.config.js'))

// Webpack Logger
function webpackLog(done) {
  return function(error, stats) {
    if (error) { throw new errorHandler(error)
    } else {
      console.log(stats.toString({colors: true}))
    }
    if (done) done()
  }
}

// Tests
gulp.task('test', function () {
  return gulp.src(`${settings.paths.tests}/*.js`, {read: false})
    .pipe($.mocha({
            compilers: {
              js: require('babel-core/register')
            }
        }).on('error', errorHandler))
})

// Webpack Bundler
gulp.task('bundle', function(done) {
  compiler.run(webpackLog(done))
})

// Watcher
gulp.task('watch', function () {
  browserSync.init({
    browser: 'google chrome canary',
    server: settings.paths.demo,
    middleware: [
      webpackDevMiddleware(compiler, {
        // noInfo: true,
        stats: { colors: true, chunkModules: false }
      }),
      webpackHotMiddleware(compiler)
    ],
    files: [
      `${settings.paths.demo}/*.html`
    ]
  })

  gulp.watch([`${settings.paths.source}/*.js`,`${settings.paths.tests}/*.js`], gulp.series('test'))
})

// Default Tasks
gulp.task('default',
  gulp.series('test', settings.development ? 'watch' : 'bundle')
);
