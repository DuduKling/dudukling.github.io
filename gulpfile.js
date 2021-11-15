import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import originalSass from 'sass';
import pug from 'gulp-pug';
import data from 'gulp-data';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import svgo from 'gulp-svgo';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import fs from 'fs';

const paths = {
	sass: {
		src: './src/assets/style.sass',
		dest: './assets/',
	},
	sassImports: {
		src: './src/assets/**/*.sass',
	},
	pug: {
		ptbr: {
			src: './src/index.pug',
			dest: './',
			name: 'index.html',
			includes: './src/includes/**/*.pug',
			lang: './src/assets/content/ptbr.json',
		},
		eng: {
			src: './src/index.pug',
			dest: './',
			name: 'index-eng.html',
			includes: './src/includes/**/*.pug',
			lang: './src/assets/content/eng.json',
		},
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
		css: './assets/*.css',
		html: './*.html',
		js: './assets/*.js',
	},
};

const bs = browserSync.create();

function reload(done) {
	bs.reload();
	done();
}

function runWatch() {
	bs.init({ server: { baseDir: paths.root.src } });

	gulp.watch(paths.sass.src, runSass);
	gulp.watch(paths.sassImports.src, runSass);

	const runPugPtbr = () => runPug(paths.pug.ptbr);
	gulp.watch(paths.pug.ptbr.src, runPugPtbr);
	gulp.watch(paths.pug.ptbr.lang, runPugPtbr);
	gulp.watch(paths.pug.ptbr.includes, runPugPtbr);

	const runPugEng = () => runPug(paths.pug.eng);
	gulp.watch(paths.pug.eng.src, runPugEng);
	gulp.watch(paths.pug.eng.lang, runPugEng);
	gulp.watch(paths.pug.eng.includes, runPugEng);

	gulp.watch(paths.js.src, runJs);

	gulp.watch(paths.root.css, reload);
	gulp.watch(paths.root.html, reload);
	gulp.watch(paths.root.js, reload);
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

function runPug(path) {
	return _pug(path);
}

function runPugLangs(done) {
	for (const lang of Object.values(paths.pug)) {
		_pug(lang);
	}

	return done();
}

function _pug(path) {
	return gulp.src(path.src)
		.pipe(plumber())
		.pipe(data(() => JSON.parse(fs.readFileSync(path.lang))))
		.pipe(pug())
		.pipe(rename(path.name))
		.pipe(gulp.dest(path.dest));
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
const runBuild = gulp.parallel(runSassPrd, runPugLangs, runJsPrd, runImgs);

export default runWatch;
export {
	runWatch,
	runBuild,
	runSass,
	runPugLangs,
	runJs,
	runImgs,
};
