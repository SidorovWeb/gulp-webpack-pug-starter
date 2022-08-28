'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'

gulp.task('mail', () => {
  return gulp.src(paths.mail.src).pipe(gulp.dest(paths.mail.dist))
})
