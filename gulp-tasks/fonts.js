'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'

gulp.task('fonts', () => {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dist))
})
