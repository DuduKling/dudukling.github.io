var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sourcemaps = require('gulp-sourcemaps');


gulp.task('default', ['server'] , function(){});


gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch("./dev/*.sass", ['sass']);
	gulp.watch("./dev/*.pug", ['pug']);

	gulp.watch("./*.css").on('change', browserSync.reload);
	gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('sass', function() {
	gulp.src("./dev/*.sass")
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest("./dev/"))
});


gulp.task('pug', function() {
	gulp.src("./dev/*.pug")
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest("./"))
});


gulp.task('optimizeImages', function() {
	gulp.src('./dev/imgs/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./imgs/'))
});


gulp.task('autoprefixer', function() {
	gulp.src('./dev/*.css')
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dev/'))
});


gulp.task('cssnano', function () {
	gulp.src('./dev/*.css')
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dev/'));
});


gulp.task('buildcss', function () {
	gulp.src('./dev/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./'));
});


gulp.task('build', function () {
	gulp.src('./dev/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./'));
	gulp.src("./dev/*.pug")
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest("./"));
	gulp.src('./dev/imgs/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./imgs/'));
});

