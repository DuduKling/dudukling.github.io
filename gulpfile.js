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
	minify = require('gulp-minify'),
	jshint = require('gulp-jshint');

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

	gulp.watch("./*.css").on('change', browserSync.reload);
	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch("./*.js").on('change', browserSync.reload);
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
		.pipe(minify({
			ext:{
				src:'-debug.js',
				min:'.js'
			},
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		}))
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
		.pipe(minify({
			ext:{
				src:'-debug.js',
				min:'.js'
			},
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		}))
		.pipe(gulp.dest('./'));
});
