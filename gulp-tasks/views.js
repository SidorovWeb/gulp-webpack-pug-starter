'use strict'

import { paths, config } from '../gulpfile.js'
import gulp from 'gulp'
import pug from 'gulp-pug'
import gulpif from 'gulp-if'
import replace from 'gulp-replace'
import browsersync from 'browser-sync'
import plumber from 'gulp-plumber'

gulp.task('views', () => {
  return gulp
    .src(paths.views.src)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(plumber(config.plumber))
    .pipe(gulpif(config.production, replace('.css', '.min.css')))
    .pipe(gulpif(config.production, replace('.js', '.min.js')))
    .pipe(gulp.dest(paths.views.dist))
    .pipe(browsersync.stream())
})
