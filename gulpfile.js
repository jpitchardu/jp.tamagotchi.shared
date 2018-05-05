const gulp = require('gulp');

const paths = {
  protos: ['./proto/**/*.proto']
};

gulp.task('copy-protos', function() {
  gulp.src(paths.protos).pipe(gulp.dest('dist/proto'));
});

gulp.task('ts', ['copy-protos'], () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});
