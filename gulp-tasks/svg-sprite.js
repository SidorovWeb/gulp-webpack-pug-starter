'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'
import gulpSvgSprite from 'gulp-svg-sprite'
import browsersync from 'browser-sync'

gulp.task('svgSprite', () => {
  return gulp
    .src(paths.svgSprite.src)
    .pipe(
      gulpSvgSprite({
        mode: {
          symbol: {
            sprite: '../svg-sprite.svg',
          },
        },
        shape: {
          transform: ['svgo'],
        },
      })
    )
    .pipe(gulp.dest(paths.svgSprite.dist))
    .on('end', browsersync.reload)
})
