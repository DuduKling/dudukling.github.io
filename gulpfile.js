var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass');


gulp.task('default', function() {});

gulp.task('s', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch("./**/*.sass", ['sass']);
	gulp.watch("./**/*.css").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./**/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});