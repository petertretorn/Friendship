'use strict';
var gulp = require('gulp');
var inject = require('gulp-inject');

var paths = {
    appScripts: 'public/app/**/*.js'
};

gulp.task('injectjs', function(){
    var target = gulp.src('./server/views/index.ejs');
    var sources = gulp.src([paths.appScripts]);

    return target.pipe(inject(sources, {relative: false, ignorePath: "public"}))
        .pipe(gulp.dest('./server/views'));

});