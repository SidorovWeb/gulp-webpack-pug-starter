'use strict'

import gulp from 'gulp'
import yargs from 'yargs'
import c from 'ansi-colors'

const argv = yargs(process.argv).argv,
  production = !!argv.production

if (production) {
  console.log(c.bgGreen.bold('🚚 Production mode 🚚'))
} else {
  console.log(c.bgWhite.bold('🔧 Development mode 🔧'))
}

export const config = {
  production: production,
  plumber: {
    errorHandler: function (error) {
      console.log(c.red(error.message))
      this.emit('end')
    },
  },
}

export const paths = {
  views: {
    src: ['./src/views/index.pug', './src/views/pages/*.pug'],
    dist: './dist/',
    watch: ['./src/blocks/**/*.pug', './src/views/**/*.pug'],
  },
  styles: {
    src: './src/styles/main.{scss,sass}',
    dist: './dist/styles/',
    watch: ['./src/blocks/**/*.{scss,sass}', './src/styles/**/*.{scss,sass}'],
  },
  scripts: {
    src: './src/js/index.js',
    dist: './dist/js/',
    watch: ['./src/blocks/**/*.js', './src/js/**/*.js'],
  },
  images: {
    src: ['./src/img/**/*.{jpg,jpeg,png,gif,tiff}', '!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}'],
    dist: './dist/img/',
    watch: './src/img/**/*.{jpg,jpeg,png,gif}',
  },
  webp: {
    src: ['./src/img/**/*.{jpg,jpeg,png,tiff}', '!./src/img/favicon/*.{jpg,jpeg,png,gif}'],
    dist: './dist/img/',
    watch: ['./src/img/**/*.{jpg,jpeg,png,tiff}', '!./src/img/favicon.{jpg,jpeg,png,gif}'],
  },
  svg: {
    src: './src/img/svg/*.svg',
    dist: './dist/img/svg/',
    watch: './src/img/svg/*.svg',
  },
  spritesMono: {
    src: './src/img/sprites/sprite-mono/*.svg',
    dist: './dist/img/sprites/',
    watch: './src/img/sprites/sprite-mono/*.svg',
  },
  spritesMulti: {
    src: './src/img/sprites/sprite-multi/*.svg',
    dist: './dist/img/sprites/',
    watch: './src/img/sprites/sprite-multi/*.svg',
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2}',
    dist: './dist/fonts/',
    watch: './src/fonts/**/*.{woff,woff2}',
  },
  mail: {
    src: './src/mail/**/*.php',
    dist: './dist/mail/',
  },
  favicons: {
    src: './src/img/favicon/*.{jpg,jpeg,png,gif,tiff}',
    dist: './dist/img/favicons/',
  },
  gzip: {
    src: './src/.htaccess',
    dist: './dist/',
  },
}

import './gulp-tasks/views.js'
import './gulp-tasks/styles.js'
import './gulp-tasks/scripts.js'
import './gulp-tasks/images.js'
import './gulp-tasks/webp.js'
import './gulp-tasks/svg.js'
import './gulp-tasks/sprites-mono.js'
import './gulp-tasks/sprites-multi.js'
import './gulp-tasks/fonts.js'
import './gulp-tasks/mail.js'
import './gulp-tasks/favicons.js'
import './gulp-tasks/serve.js'
import './gulp-tasks/clean.js'

export const development = gulp.series(
  'clean',
  gulp.parallel([
    'styles',
    'scripts',
    'images',
    'webp',
    'fonts',
    'views',
    'svg',
    'spritesMono',
    'spritesMulti',
    'mail',
    'favicons',
  ]),
  gulp.parallel('serve')
)

export const prod = gulp.series(
  'clean',
  gulp.series([
    'styles',
    'scripts',
    'images',
    'webp',
    'views',
    'svg',
    'spritesMono',
    'spritesMulti',
    'fonts',
    'mail',
    'favicons',
  ])
)

export default development
