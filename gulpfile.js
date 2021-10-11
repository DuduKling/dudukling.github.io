import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import originalSass from 'sass';
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
		src: './src/assets/*.sass',
		dest: './assets/',
	},
	pug: {
		src: './src/index.pug',
		dest: './',
	},
	pugIncludes: {
		src: './src/includes/*.pug',
	},
	js: {
		src: './src/assets/*.js',
		dest: './assets/',
	},
	imgs: {
		src: './src/assets/images/*',
		dest: './assets/images/',
	},
	icons: {
		src: './src/assets/icons/*.png',
		dest: './assets/icons/',
	},
	root: {
		src: './',
		css: './*.css',
		html: './*.html',
		js: './*.js',
	},
};

function runWatch() {
	const bs = browserSync.create();

	bs.init({
		server: {
			baseDir: paths.root.src,
		}
	});

	gulp.watch(paths.sass.src, runSass);
	gulp.watch(paths.pug.src, runPug);
	gulp.watch(paths.pugIncludes.src, runPug);
	gulp.watch(paths.js.src, runJs);

	gulp.watch(paths.root.css, bs.reload);
	gulp.watch(paths.root.html, bs.reload);
	gulp.watch(paths.root.js, bs.reload);
}

function runSass() {
	const sass = gulpSass(originalSass);
	return gulp.src(paths.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.sass.dest));
}

function runSassPrd() {
	const sass = gulpSass(originalSass);
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
	return gulp.src(paths.icons.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.icons.dest));
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
