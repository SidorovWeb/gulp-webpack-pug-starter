'use strict'

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'

gulp.task('favicons', () => {
  return gulp.src(paths.favicons.src).pipe(gulp.dest(paths.favicons.dist))
})
