const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sourcemaps = require('gulp-sourcemaps'),
	svgo = require('gulp-svgo'),
	minify = require('gulp-minify'),
	jshint = require('gulp-jshint');

const paths = {
	sass: {
		src: './dev/*.sass',
		dest: './',
	},
	pug: {
		src: './dev/*.pug',
		src2: './dev/includes/*.pug',
		dest: './',
	},
	js: {
		src: './dev/*.js',
		dest: './',
	},
	imgs: {
		src: './dev/imgs/*',
		dest: './imgs/',
	},
	root: {
		src: './',
		css: './*.css',
		html: './*.html',
		js: './*.js',
	},
};

function runWatch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(paths.sass.src, runSass);
	gulp.watch(paths.pug.src, runPug);
	gulp.watch(paths.pug.src2, runPug);
	gulp.watch(paths.js.src, runJs);

	gulp.watch(paths.root.css, browserSync.reload);
	gulp.watch(paths.root.html, browserSync.reload);
	gulp.watch(paths.root.js, browserSync.reload);
}

const runBuild = gulp.parallel(runSassPrd, runPug, runJsPrd, runImgs);

function runSass() {
	return gulp.src(paths.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.sass.dest));
}

function runSassPrd() {
	return gulp.src(paths.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['defaults'],
			cascade: false
		}))
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.sass.dest));
}

function runPug() {
	return gulp.src(paths.pug.src)
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest(paths.pug.dest));
}

function runJs() {
	return gulp.src(paths.js.src)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(minify({
			ext:{
				min:'.js'
			},
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		}))
		.pipe(gulp.dest(paths.js.dest));
}

function runJsPrd() {
	return gulp.src(paths.js.src)
		.pipe(minify({
			ext:{
				min:'.js'
			},
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		}))
		.pipe(gulp.dest(paths.js.dest));
}

function runImgs() {
	return gulp.src(paths.imgs.src)
		.pipe(imagemin())
		.pipe(svgo())
		.pipe(gulp.dest(paths.imgs.dest));
}

exports.runWatch = runWatch;
exports.runBuild = runBuild;
exports.runSass = runSass;
exports.runPug = runPug;
exports.runJs = runJs;
exports.runImgs = runImgs;

exports.default = runWatch;