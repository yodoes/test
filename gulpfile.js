/**
 * Created by admin on 2017/4/18.
 */
var gulp = require('gulp');
var less = require('gulp-less');//less 编译css
var cssnano = require('gulp-cssnano'); //css压缩
var concat = require('gulp-concat'); //js合并
var uglify = require('gulp-uglify'); //js压缩
var html = require('gulp-htmlmin'); //html压缩

//less 文件编译为CSS
gulp.task('lessToCss',function () {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'));
    gulp.watch("dist/styles/*.css").on("change", browserSync.reload);
});

/**
 * js文件合并、压缩
 */
gulp.task('script',function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))   //合并
        .pipe(uglify())  //压缩
        .pipe(gulp.dest('dist/js'))
});

/**
 * 图片复制
 */
gulp.task('img',function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
});

/**
 * HTML压缩
 */
gulp.task('html',function () {
    gulp.src('src/*.html')
        // .pipe(html({
        //     collapseWhitespace: true,  //压缩html空格
        //     removeComments:true        //压缩注释，更多参数见插件
        // }))
        .pipe(gulp.dest('dist/'))
});

/**
 * 浏览器同步
 */
var browserSync = require('browser-sync').create();
gulp.task('serve',function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/less/*.less", ['lessToCss']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/less/*.less", ['lessToCss']);
    gulp.watch("dist/*.html").on("change", browserSync.reload);
});