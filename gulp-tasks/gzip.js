'use strict'

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'

gulp.task('gzip', () => {
  return gulp.src(paths.gzip.src).pipe(gulp.dest(paths.gzip.dist))
})
