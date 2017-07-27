var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber');

gulp.task('default', ['server'] , function(){});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch("./*.sass", ['sass']);
	gulp.watch("./*.pug", ['pug']);

	gulp.watch("./*.css").on('change', browserSync.reload);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
	gulp.src("./*.sass")
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest("./"))
		// .pipe(browserSync.stream())
});

gulp.task('pug', function() {
	gulp.src("./*.pug")
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest("./"))
		// .pipe(browserSync.stream())
});

