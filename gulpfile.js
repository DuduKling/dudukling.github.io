import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import svgo from 'gulp-svgo';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

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

export default runWatch;
export {
	runWatch,
	runBuild,
	runSass,
	runPug,
	runJs,
	runImgs,
};
