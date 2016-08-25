const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const del = require('del');
const merge = require('merge2');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const argv = process.argv;

// compilation
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

// bundling
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");

const isRelease = argv.indexOf('--release') > -1;

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
const tslint = require('ionic-gulp-tslint');

gulp.task('bundle', ['clean', 'build'], function() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: [
      'src/index.ts',
      './typings/index.d.ts'
    ],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('alfresco.ionic.bundle.js'))
  .pipe(gulp.dest('build/bundles'));
});

gulp.task('lint', function() {
  return tslint({
    src: 'src/**/*.ts',
  });
});

gulp.task('clean', function(){
  return del('build');
});

gulp.task('build', ['clean'], function () {
  let tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts
      .pipe(gulp.dest('build/typings')),

    tsResult.js
      .pipe(concat('alfresco.ionic.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build/js'))
  ]);
});

gulp.task('default', ['build']);
