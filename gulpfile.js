const gulp = require('gulp');
// const gulpWatch = require('gulp-watch');
const del = require('del');
const merge = require('merge2');
// const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
// const argv = process.argv;
// const isRelease = argv.indexOf('--release') > -1;
const tslint = require("gulp-tslint");

gulp.task('lint', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

gulp.task('clean', function (){
  return del('build');
});

gulp.task('build', ['clean', 'lint'], function () {
  let tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts
      .pipe(gulp.dest('build')),

    tsResult.js
      //.pipe(concat('alfresco.ionic.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build'))
  ]);
});

gulp.task('default', ['build']);
