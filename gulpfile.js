'use strict';

var   gulp = require('gulp'),

	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename');

gulp.task("concatJS", function(){
	return gulp.src([
		'js/jquery-1.11.3.min.js',
		'js/bootstrap3.3.6.min.js'])
	.pipe(concat("scriptbundle.js"))
	.pipe(gulp.dest("js"));
});

gulp.task("minifyJS", ["concatJS"], function(){
	return gulp.src("js/scriptbundle.js")
		.pipe(uglify())
		.pipe(rename('scriptbundle.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task("concatCSS", function(){
	return gulp.src([
		'css/bootstrap.min.css', 
		'css/styles.css'])
	.pipe(concat("stylesbundle.css"))
	.pipe(gulp.dest("css"));
});

gulp.task("minifyCSS", ["concatCSS"], function(){
	return gulp.src("css/stylesbundle.css")
		.pipe(cleancss())
		.pipe(rename('stylesbundle.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['minifyCSS']);
  gulp.watch('js/*.js', ['minifyJS']);
});

gulp.task('default', ['minifyJS', 'minifyCSS']);