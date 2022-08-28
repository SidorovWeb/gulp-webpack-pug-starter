'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import browsersync from 'browser-sync'

gulp.task('spritesMono', () => {
  return gulp
    .src(paths.spritesMono.src)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite-mono.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name', 'fill', 'stroke.*'],
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(paths.spritesMono.dist))
    .on('end', browsersync.reload)
})
