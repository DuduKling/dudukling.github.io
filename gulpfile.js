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
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat');


const paths = {
	sass: {
		src: './src/*.sass',
		dest: './',
	},
	pug: {
		src: './src/*.pug',
		src2: './src/includes/*.pug',
		dest: './',
	},
	js: {
		src: './src/*.js',
		dest: './',
	},
	imgs: {
		src: './src/imgs/*',
		src2: './src/*.png',
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
			baseDir: paths.root.src,
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

function runSass() {
	return gulp.src(paths.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.sass.dest));
}

function runSassPrd() {
	return gulp.src(paths.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['defaults'],
			cascade: false
		}))
		.pipe(cssnano())
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
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat("default.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.js.dest));
}

function runJsPrd() {
	return gulp.src(paths.js.src)
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat("default.js"))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest));
}

function runImgsAssets() {
	return gulp.src(paths.imgs.src)
		.pipe(imagemin())
		.pipe(svgo())
		.pipe(gulp.dest(paths.imgs.dest));
}

function runImgsIcons() {
	return gulp.src(paths.imgs.src2)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.root.src));
}

const runImgs = gulp.parallel(runImgsAssets, runImgsIcons);
const runBuild = gulp.parallel(runSassPrd, runPug, runJsPrd, runImgs);


exports.runWatch = runWatch;
exports.runBuild = runBuild;
exports.runSass = runSass;
exports.runPug = runPug;
exports.runJs = runJs;
exports.runImgs = runImgs;

exports.default = runWatch;