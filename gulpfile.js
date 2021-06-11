/*
 * -----------------------------------------
 *  REQUIREDS
 * - - - - - - - - - - - - - - - - - - - - -
 */
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

/*
 * -----------------------------------------
 *  PROD
 * - - - - - - - - - - - - - - - - - - - - -
 */
let isProd = false;
function setProd (done) {
  isProd = true;
  done();
}

/*
 * -----------------------------------------
 *  SERVER
 * - - - - - - - - - - - - - - - - - - - - -
 */
function browserSync (done) {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    port: 8080
  });
  done();
}

/*
 * -----------------------------------------
 *  PROCESS HTML
 * - - - - - - - - - - - - - - - - - - - - -
 */
function processHtml () {
  console.log('isProd:', isProd);
  return gulp.src('./src/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        prod: isProd,
        title: 'EV@L 3',
        bodyClass: '',
        userModal: true
      }
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
}

/*
 * -----------------------------------------
 *  PROCESS STYLES
 * - - - - - - - - - - - - - - - - - - - - -
 */
function processStyles (src, dest) {
  src = src || './src/scss/*.scss';
  dest = dest || './dist/assets/css';
  return gulp.src(src)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(dest))
    .pipe(browsersync.stream());
}

function processScss () {
  return processStyles();
}

/*
 * -----------------------------------------
 *  BOOTSTRAP
 * - - - - - - - - - - - - - - - - - - - - -
 */
function processVendorsScss () {
  return processStyles('./src/_vendors/*.scss');
}

/*
 * -----------------------------------------
 *  PROCESS SCRIPTS
 * - - - - - - - - - - - - - - - - - - - - -
 */
function processScripts () {
  return gulp.src('./src/js/app.js')
    .pipe(webpack({
      mode: isProd ? 'production': 'development',
      watch: !isProd,
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(uglify().on('error', function (uglify) {
      console.error(uglify.message);
      this.emit('end');
    }))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
}

/*
 * -----------------------------------------
 *  WATCH FILES
 * - - - - - - - - - - - - - - - - - - - - -
 */
function watchFiles() {
  gulp.watch('./src/html/**/*', processHtml);
  gulp.watch('./src/scss/**/*', processScss);
  gulp.watch('./src/js/**/*', processScripts);
}

/*
 * -----------------------------------------
 *  CLEAN
 * - - - - - - - - - - - - - - - - - - - - -
 */
function clean() {
  return del(['./dist/**/*']);
}

/*
 * -----------------------------------------
 *  COPY DROPZONE CSS
 * - - - - - - - - - - - - - - - - - - - - -
 */
function copyDropzoneCSS() {
  return gulp.src('./node_modules/dropzone/dist/dropzone.css')
    .pipe(gulp.dest('./dist/assets/css'));
}

/*
 * -----------------------------------------
 *  COPY ICONS
 * - - - - - - - - - - - - - - - - - - - - -
 */
function copyIcons() {
  return gulp.src(['./src/images/icons/*', '!./src/images/icons/*.ico'])
    .pipe(gulp.dest('./dist/assets/icons'));
}

function copyFavicon() {
  return gulp.src('./src/images/icons/*.ico')
    .pipe(gulp.dest('./dist'));
}

/*
 * -----------------------------------------
 *  COPY WALLPAPERS
 * - - - - - - - - - - - - - - - - - - - - -
 */
function copyWallpapers() {
  return gulp.src('./src/images/wallpapers/*')
    .pipe(gulp.dest('./dist/wallpapers'));
}

/*
 * -----------------------------------------
 *  TASKS
 * - - - - - - - - - - - - - - - - - - - - -
 */
const serve = gulp.series(clean, gulp.parallel(copyIcons, copyFavicon, copyWallpapers, copyDropzoneCSS, processHtml, processVendorsScss, processScss, processScripts, watchFiles, browserSync));
const build = gulp.series(clean, setProd, gulp.parallel(copyIcons, copyFavicon, copyWallpapers, copyDropzoneCSS, processHtml, processVendorsScss, processScss, processScripts));

/*
 * -----------------------------------------
 *  EXPORT
 * - - - - - - - - - - - - - - - - - - - - -
 */
exports.processHtml = processHtml;
exports.processStyles = processStyles;
exports.processVendorsScss = processVendorsScss;
exports.processScripts = processScripts;
exports.clean = clean;
exports.copyDropzoneCSS = copyDropzoneCSS;
exports.copyIcons = copyIcons;
exports.copyFavicon = copyFavicon;
exports.serve = serve;
exports.build = build;
exports.prod = build;
exports.default = serve;
