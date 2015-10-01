var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//JavaScript linting task
gulp.task('jshint', function() {
	return gulp.src('site/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

//Compile Sass task
gulp.task('sass', function() {
	return gulp.src('site/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('site/css'));
});

//Watch task
gulp.task('watch', function() {
	gulp.watch('site/js/*.js', ['jshint']);
	gulp.watch('site/scss/*.scss', ['sass']);
});