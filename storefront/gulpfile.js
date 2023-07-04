/* eslint-disable */
const gulp              = require('gulp');
const uglify            = require('gulp-uglify');
const concat            = require('gulp-concat');
const sass              = require('gulp-sass');
const cssmin            = require('gulp-clean-css');
const jshint            = require('gulp-jshint');
const cached            = require('gulp-cached');
const remember          = require('gulp-remember');
const sourcemaps        = require('gulp-sourcemaps');
const through2          = require('through2');
const util              = require('gulp-util');

let devMode = true;

let config = {
  production:   !!util.env.production
};

const paths = {
  dist:  {
    src:            './assets/'
  },
  src: {
    styles:         './src/scss/*.scss',
    scripts:        './src/js/*.js'
  },
  watch: {
    styles:         './src/scss/**/*.scss',
    scripts:        './src/js/*.js'
  }
};

function passthrough() {
  return through2.obj();
}

function isDev(fn) {
  if(devMode) {
    return fn;
  } else {
    return passthrough();
  }
}

gulp.task('js_lint', () => {
  return gulp.src('./src/js/*.js', {
    since: gulp.lastRun('js_lint')
  })
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('jshint-stylish', { beep: true }))
});

gulp.task('javascript', gulp.series('js_lint', () => {
  return gulp.src(paths.src.scripts)
    .pipe(isDev(sourcemaps.init()))
    .pipe(cached('javascript'))
    .pipe(uglify())
    .pipe(remember('javascript'))
    .pipe(concat('storefront.js'))
    .pipe(config.production ? util.noop() : (sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist.src + '/js/'))
}));

gulp.task('scss', () => {
  return gulp.src(paths.src.styles)
    .pipe(isDev(sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(config.production ? util.noop() : (sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist.src + '/styles/'))
});

gulp.task('default', gulp.series(
  gulp.parallel('scss', 'javascript'), (done) => {
    gulp.watch(paths.watch.styles,  gulp.parallel('scss')),
    gulp.watch(paths.watch.scripts, gulp.parallel('js_lint', 'javascript')),
    done();
  }
));
