var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sourcemaps = require('gulp-sourcemaps'),
	htmlmin = require('gulp-htmlmin'),
	svgo = require('gulp-svgo'),
	// minify = require('gulp-minify'),
	jshint = require('gulp-jshint'),
	jslint = require('gulp-jslint'),
	uglify = require('gulp-uglify'),
	uglifyJS = require('uglify-js'),
	pump = require('pump'),
	babel = require("gulp-babel"),
	concat = require("gulp-concat");

gulp.task('default', ['server'] , function(){});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch("./dev/*.sass", ['sass']);
	gulp.watch("./dev/*.pug", ['pug']);
	gulp.watch("./dev/includes/*.pug", ['pug']);
	gulp.watch("./dev/*.js", ['js']);

	gulp.watch("./*.js").on('change', browserSync.reload);
	gulp.watch("./*.css").on('change', browserSync.reload);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
	gulp.src("./dev/*.sass")
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest("./"));
});

gulp.task('pug', function() {
	gulp.src("./dev/*.pug")
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest("./"));
});

gulp.task('js', function(){
	gulp.src('./dev/*.js')
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		// .pipe(jslint())
		// .pipe(jslint.reporter('stylish'))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("default.js"))
		.pipe(sourcemaps.write("."))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});

gulp.task('imgs', function() {
	gulp.src('./dev/imgs/*')
	.pipe(imagemin())
	.pipe(svgo())
	.pipe(gulp.dest('./imgs/'));
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
		.pipe(svgo())
		.pipe(gulp.dest('./imgs/'));

	gulp.src('./dev/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("default.js"))
		.pipe(sourcemaps.write("."))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});
