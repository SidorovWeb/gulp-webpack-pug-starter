'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'
import browsersync from 'browser-sync'

gulp.task('serve', (done) => {
  browsersync.init({
    server: './dist/',
    // port: 4000,
    // open: false,
    notify: true,
  })

  gulp.watch(paths.views.watch, gulp.parallel('views'))
  gulp.watch(paths.styles.watch, gulp.parallel('styles'))
  gulp.watch(paths.scripts.watch, gulp.parallel('scripts'))
  gulp.watch(paths.svg.watch, gulp.parallel('svg'))
  gulp.watch(paths.svgSprite.watch, gulp.parallel('svgSprite'))
  gulp.watch(paths.images.watch, gulp.parallel('images'))
  gulp.watch(paths.webp.watch, gulp.parallel('webp'))
  gulp.watch(paths.fonts.watch, gulp.parallel('fonts'))

  return done()
})
