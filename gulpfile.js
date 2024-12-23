const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const del = require('delete');
const sasslint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const include = require('gulp-include');
const sizereport = require('gulp-sizereport');
const browserSync = require('browser-sync');
require('dotenv').config();

const server = browserSync.create();
const serverReload = server.reload;

const app = {
  scss: ['src/scss/**/*.scss'],
  js: ['src/js/**/*.js'],
  pug: ['src/pug/*.pug'],
  pugWatch: ['src/pug/**/*.pug'],
};
const output = {
  html: 'dist',
  css: 'dist/css',
  js: 'dist/js',
  assets: 'dist/assets',
  clean: 'dist',
};

let options = {
  minify: process.env.NODE_ENV === 'production',
  includeJS: {
    hardFail: true,
    includePaths: [
      __dirname + '/',
      __dirname + '/node_modules',
      __dirname + '/src/js'
    ]
  },
  pugOpts: {
    pretty: process.env.NODE_ENV !== 'production',
  },
  scssOpts: {
    style: 'expanded', // expanded, compressed
  },
  sassLintOpts: {
    config: '.sasslint.yml'
  }
};

const notifyCompileCSS = {
  title: 'Gulp notification',
  message: 'Error compiling CSS. Please double check your code.'
};

const notifyCompileJS = {
  title: 'Gulp notification',
  message: 'Error compiling JS. Please double check your code.'
};

const runServer = (cb) => {
  server.init({
    server: {
      baseDir: output.html
    }
  });
  cb();
};

const sizereportJS = () => {
  return src(output.js + '/*.js')
    .pipe(sizereport());
};

const sizereportCSS = () => {
  return src(output.css + '/*.css')
    .pipe(sizereport());
};

const sizereportDest = () => {
  return src([output.js + '/*.js', output.css + '/*.css'])
    .pipe(sizereport());
};

const clean = (cb) => {
  del.sync(output.clean);
  cb();
};

const esLint = () => {
  return src(app.js)
    .pipe(plumber({errorHandler: notify.onError(notifyCompileJS)}))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(notify(() => false));
};

const sassLint = () => {
  return src(app.scss)
    .pipe(plumber({errorHandler: notify.onError(notifyCompileCSS)}))
    .pipe(sasslint(options.sassLintOpts))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    .pipe(notify(() => false));
};

const pugTranspile = () => {
  const compiled = src(app.pug)
    .pipe(pug(options.pugOpts))
    .pipe(dest(output.html));

  return compiled;
};

const cssTranspile = () => {
  // Minify css
  if (options.minify) {
    options.scssOpts.style = 'compressed';
  }

  const compiled = src(app.scss)
    .pipe(plumber({errorHandler: notify.onError(notifyCompileCSS)}))
    .pipe(sasslint(options.sassLintOpts))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    .pipe(
      sass(options.scssOpts)
        .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(server.stream({ match: '**/*.css' }));

  compiled.pipe(dest(output.css));

  return compiled;
};

const jsTranspile = () => {
  const compiled = src(app.js)
    .pipe(plumber({errorHandler: notify.onError(notifyCompileJS)}))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(include(options.includeJS));

  // Minify JS
  if (options.minify) {
    compiled.pipe(uglify());
  }

  compiled.pipe(dest(output.js));

  return compiled;
};

const buildWatch = () => {
  const watchPug = watch(app.pugWatch, pugTranspile);
  const watchCss = watch(app.scss, cssTranspile);
  const watchJS = watch(app.js, jsTranspile);
  watchPug.on('change', serverReload);
  watchCss.on('change', serverReload);
  watchJS.on('change', serverReload);
  console.log('==================================================================');
  console.log('== Watch function is running.                                   ==');
  console.log('== The system will automatically compile when there is a change.==');
  console.log('== Copyright © 2024. Developed by hvduc.                        ==');
  console.log('==================================================================');
};

const start = series(clean, parallel(pugTranspile, jsTranspile, cssTranspile), sizereportDest, runServer, buildWatch);

const init = (cb) => {
  console.log(options);
  console.log('===============================================');
  console.log('== Please use command "gulp --tasks".        ==');
  console.log('== Copyright © 2024. Developed by hvduc.     ==');
  console.log('===============================================');
  cb();
};

module.exports = {
  'default': init,
  'lint': parallel(esLint, sassLint),
  'compile:html': series(pugTranspile),
  'compile:css': series(cssTranspile, sizereportCSS),
  'compile:js': series(jsTranspile, sizereportJS),
  'compile:assets': series(init),
  'build': series(clean, parallel(pugTranspile, jsTranspile, cssTranspile), sizereportDest),
  'watch': series(runServer, buildWatch),
  'server': runServer,
  'start': start,
  'dev': start,
}
