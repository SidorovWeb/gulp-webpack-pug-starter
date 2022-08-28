'use strict'

import gulp from 'gulp'
import { deleteAsync } from 'del'

gulp.task('clean', () => {
  return deleteAsync(['./dist/*'])
})
