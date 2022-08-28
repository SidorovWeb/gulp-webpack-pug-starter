'use strict'

import { paths, config } from '../gulpfile.js'
import gulp from 'gulp'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
// import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import browsersync from 'browser-sync'

gulp.task('styles', () => {
  return (
    gulp
      .src(paths.styles.src)
      // .pipe(gulpif(!config.production, sourcemaps.init()))
      .pipe(plumber(config.plumber))
      .pipe(sass())
      .pipe(sass({ 'include css': true }))
      .pipe(
        postCss([
          autoprefixer({ grid: 'autoplace' }),
          cssnano({ preset: ['default', { discardComments: { removeAll: true } }] }),
        ])
      )
      // .pipe(gulpif(config.production, cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })))
      .pipe(
        gulpif(
          config.production,
          rename({
            suffix: '.min',
          })
        )
      )
      .pipe(plumber.stop())
      // .pipe(gulpif(!config.production, sourcemaps.write('./maps/')))
      .pipe(gulp.dest(paths.styles.dist))
      .pipe(browsersync.stream())
  )
})
