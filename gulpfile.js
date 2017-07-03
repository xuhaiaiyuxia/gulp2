/**
 * Created by Administrator on 2017/7/3.
 */

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

gulp.task("css",function () {
    gulp.src("css/*.css")
        .pipe(cssnano())
        .pipe(gulp.dest("dest/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task("js",function () {
    gulp.src("js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dest/js"))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task("html",function () {
    gulp.src("*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dest"))
        .pipe(browserSync.reload({
            stream: true
        }));
})
gulp.task("server",function () {
    browserSync({
        server: {
            baseDir: ['dest']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch("*.html",['html'])
    gulp.watch("css/*.css",['css'])
    gulp.watch("js/*.js",['js'])
})