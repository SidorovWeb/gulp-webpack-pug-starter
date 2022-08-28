'use strict'

import { paths } from '../gulpfile.js'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import imageminSvgo from 'imagemin-svgo'
import imageminPngquant from 'imagemin-pngquant'
import imageminZopfli from 'imagemin-zopfli'
import imageminMozjpeg from 'imagemin-mozjpeg'
import rename from 'gulp-rename'
import browsersync from 'browser-sync'

gulp.task('images', () => {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imageminPngquant({
          speed: 4,
          quality: [0.8, 0.95],
        }),
        imageminZopfli({
          more: true,
        }),
        imageminMozjpeg({
          progressive: true,
          quality: 90,
        }),
        imageminSvgo({
          plugins: [
            { removeViewBox: false },
            { removeUnusedNS: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
            { removeComments: true },
            { removeEmptyAttrs: true },
            { removeEmptyText: true },
            { collapseGroups: true },
          ],
        }),
      ])
    )
    .pipe(
      rename(function (path) {
        path.extname = path.extname.replace('jpeg', 'jpg')
      })
    )
    .pipe(gulp.dest(paths.images.dist))
    .on('end', browsersync.reload)
})
