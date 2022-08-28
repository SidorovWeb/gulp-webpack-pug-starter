'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import browsersync from 'browser-sync'

gulp.task('spritesMulti', () => {
  return gulp
    .src(paths.spritesMulti.src)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite-multi.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name'],
                    },
                  },
                  {
                    removeUselessStrokeAndFill: false,
                  },
                  {
                    inlineStyles: true,
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(paths.spritesMulti.dist))
    .on('end', browsersync.reload)
})
