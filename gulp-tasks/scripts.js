'use strict'

import { paths, config } from '../gulpfile.js'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import gulp from 'gulp'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import browsersync from 'browser-sync'
import plumber from 'gulp-plumber'
import webpackConfig from '../webpack.config.js'

gulp.task('scripts', () => {
  webpackConfig.mode = config.production ? 'production' : 'development'

  return gulp
    .src(paths.scripts.src)
    .pipe(plumber(config.plumber))
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(
      gulpif(
        config.production,
        rename({
          suffix: '.min',
        })
      )
    )
    .pipe(gulp.dest(paths.scripts.dist))
    .on('end', browsersync.reload)
})
