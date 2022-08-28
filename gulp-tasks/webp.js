'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'
import imageminWebp from 'imagemin-webp'
import webp from 'gulp-webp'
import browsersync from 'browser-sync'

gulp.task('webp', () => {
  return gulp
    .src(paths.webp.src)
    .pipe(
      webp(
        imageminWebp({
          lossless: true,
          quality: 100,
          alphaQuality: 100,
        })
      )
    )
    .pipe(gulp.dest(paths.webp.dist))
    .on('end', browsersync.reload)
})
