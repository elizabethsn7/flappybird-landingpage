var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var bower = require('gulp-bower');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rimraf = require('gulp-rimraf');
var gulpsync = require('gulp-sync')(gulp);

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('../site/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
return gulp.src('./lib', { read: false }) // much faster
  .pipe(rimraf());
});

gulp.task('bower', function() {
  return bower('./bower_components')
    .pipe(gulp.dest('lib/'))
});

// move bourbon and neat libraries into place
gulp.task('copy-bourbon',function() {
  return gulp.src('./lib/bourbon/app/assets/stylesheets/**/*.scss')
    .pipe(gulp.dest('./scss/bourbon'));
});
gulp.task('copy-neat',function() {
  return gulp.src('./lib/neat/app/assets/stylesheets/**/*.scss')
    .pipe(gulp.dest('./scss/neat'));
});
gulp.task('copy-normalize',function() {
  return gulp.src('./lib/normalize.css/*.css')
    .pipe(gulp.dest('./scss/base/'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../site/css'));
});



// Watch task
gulp.task('watch', function() {
  gulp.watch('../site/js/*.js', ['jshint']);
  gulp.watch('scss/**/*.scss', ['sass']);
});

// Minify index
gulp.task('html', function() {
  gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('../site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('../site/js/'));
});

//Styles build task, concatenates all the files
gulp.task('styles', function() {
  gulp.src('../site/css/*.css')
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('../site/css'));
});

//Image optimization task
gulp.task('images', function() {
  gulp.src('../site/img/*.images')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'));
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

gulp.task('copy', gulpsync.sync([
    // sync 
    [
        // async 
        'bower'
    ],
    [
        // async 
        'copy-normalize',
        'copy-bourbon',
        'copy-neat'
    ],
    [
        // async 
        'clean'
    ]
]));

//Build task
gulp.task('build',gulpsync.sync([
    ['copy'],
    [
        'jshint', 'sass', 'html', 'scripts', 'styles', 'images'
    ]
]));
gulp.task('build', ['copy','jshint', 'sass', 'html', 'scripts', 'styles', 'images']);