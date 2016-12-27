// Features of BrowserSync
/*
Live reloading
Interaction synchronization
Simulate slower connections
URL history
*/


// npm install -g browser-sync gulp
// npm install --save-dev gulp-sass
// browser-sync --version

let gulp = require('gulp');
let bs = require('browser-sync').create();

gulp.task('browser-sync', function(){
  bs.init({
    server: {
      bseDir: "./"
    }
/*    ,
    proxy:{
      target: "localhost:8000" , // if there is an already existing server
      ws: true
    }
*/
  });
});

let sass = require('gulp-sass');
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
                    .pipe(sass())
                    .pipe(gulp.dest('css'))
                    .pipe(bs.reload({stream: true})); //reloads after compilations
});

gulp.task('watch',['browser-sync'], function() {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
});

