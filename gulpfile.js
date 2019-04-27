const gulp = require('gulp')

const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const source = require('vinyl-source-stream')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const minify = require('gulp-babel-minify')

gulp.task('css', () => {
  return gulp.src(['src/css/main.css', 'src/css/colours.css'])
    .pipe(concat('bundle.css'))
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', () => {
  return gulp.src('src/js/main.js')
    .pipe(webpack({
      // watch: true,
      output: { filename: 'bundle.js' }
    }))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('css', 'js'))
