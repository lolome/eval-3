/*
 * -----------------------------------------
 *  REQUIREDS
 * - - - - - - - - - - - - - - - - - - - - -
 */

import gulp from 'gulp';
import gulpif from 'gulp-if';
import fileinclude from 'gulp-file-include';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import bs from 'browser-sync';
import del from 'del';

/*
 * -----------------------------------------
 *  DEFINE
 * - - - - - - - - - - - - - - - - - - - - -
 */

let isProd = false;

const htmlSrc = './src/html/*.html';
const htmlDest = './dist';
const htmlWatch = './src/html/**/*';
const htmlContext = {
  prod: isProd,
  title: 'EV@L 3',
  bodyClass: '',
  userModal: true,
  synthese: false
};

const scssSrc = './src/scss/*.scss';
const scssDest = './dist/assets/css';
const scssWatch = './src/scss/**/*.scss';

const scriptSrc = './src/js/*.js';
const scriptDest = './dist/assets/js';
const scriptWatch = './src/js/**/*.js';

const browserSync = bs.create();
const server = './dist';

/*
 * -----------------------------------------
 *  PROCESS HTML
 * - - - - - - - - - - - - - - - - - - - - -
 */

const processHtml = () => {
  return gulp.src(htmlSrc)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
      context: htmlContext
    }))
    .pipe(gulp.dest(htmlDest))
    .pipe(gulpif(!isProd, browserSync.stream()))
  ;
};

/*
 * -----------------------------------------
 *	PROCESS SCRIPTS
 * - - - - - - - - - - - - - - - - - - - - -
 */

const processScripts = () => {
  return gulp.src(scriptSrc, { sourcemaps: (isProd ? false : true) })
    .pipe(named())
    .pipe(webpack({
      mode: isProd ? 'production': 'development'
    }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify().on('error', function (uglify) {
      console.error(uglify.message);
      this.emit('end');
    }))
    .pipe(gulp.dest(scriptDest, { sourcemaps: (isProd ? false : true) }))
    .pipe(gulpif(!isProd, browserSync.stream()))
  ;
};

/*
 * -----------------------------------------
 *	PROCESS SCSS
 * - - - - - - - - - - - - - - - - - - - - -
 */

const _processScss = (src, dest) => {
  src = src || scssSrc;
  dest = dest || scssDest;
  return gulp.src(src, { sourcemaps: (isProd ? false : true) })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(dest, { sourcemaps: (isProd ? false : true) }))
    .pipe(gulpif(!isProd, browserSync.stream()))
  ;
};

const processScss = () => {
  return _processScss();
};

const processVendorsScss = () => {
  return _processScss('./src/_vendors/*.scss');
};

/*
 * -----------------------------------------
 *  COPY DROPZONE CSS
 * - - - - - - - - - - - - - - - - - - - - -
 */

const copyDropzoneCSS = () => {
  return gulp.src('./node_modules/dropzone/dist/dropzone.css')
    .pipe(gulp.dest('./dist/assets/css'));
};

/*
 * -----------------------------------------
 *  COPY ICONS
 * - - - - - - - - - - - - - - - - - - - - -
 */

const copyIcons = () => {
  return gulp.src(['./src/images/icons/*', '!./src/images/icons/*.ico'])
    .pipe(gulp.dest('./dist/assets/icons'));
};

const copyFavicon = () => {
  return gulp.src('./src/images/icons/*.ico')
    .pipe(gulp.dest('./dist'));
};

/*
 * -----------------------------------------
 *  COPY LOGOS
 * - - - - - - - - - - - - - - - - - - - - -
 */

const copyLogos = () => {
  return gulp.src('./src/images/logos/*')
    .pipe(gulp.dest('./dist/assets/logos'));
};

/*
 * -----------------------------------------
 *  COPY WALLPAPERS
 * - - - - - - - - - - - - - - - - - - - - -
 */

const copyWallpapers = () => {
  return gulp.src('./src/images/wallpapers/*')
    .pipe(gulp.dest('./dist/wallpapers'));
};

/*
 * -----------------------------------------
 *	WATCH
 * - - - - - - - - - - - - - - - - - - - - -
 */

const watchForChanges = () => {
  browserSync.init({
    server,
    port: 8080
  });
  gulp.watch(htmlWatch, processHtml);
  gulp.watch(scriptWatch, processScripts);
  gulp.watch(scssWatch, processScss);
};

/*
 * -----------------------------------------
 *	CLEAN
 * - - - - - - - - - - - - - - - - - - - - -
 */

const cleanDist = () => {
  return del(['./dist/**/*']);
};

/*
 * -----------------------------------------
 *  SET PROD
 * - - - - - - - - - - - - - - - - - - - - -
 */

const setProd = done => {
  isProd = true;
  done();
};

/*
 * -----------------------------------------
 *	EXPORT
 * - - - - - - - - - - - - - - - - - - - - -
 */

export default gulp.series(cleanDist, gulp.parallel(copyIcons, copyFavicon, copyWallpapers, copyLogos, copyDropzoneCSS, processHtml, processVendorsScss, processScss, processScripts), watchForChanges);

export const prod = gulp.series(cleanDist, setProd, gulp.parallel(copyIcons, copyFavicon, copyWallpapers, copyLogos, copyDropzoneCSS, processHtml, processVendorsScss, processScripts, processScss));
