var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	imageop = require('gulp-image-optimization');

/**
 * Пути относительно gulpfile.js
 */
var path = {
	app: {
		root: 'app',
		css: 'app/css',
		js: 'app/js',
		images: 'app/img'
	},
	
	sass: {
		root: 'sass',
		base: 'sass/base',
		lib: 'sass/lib',
		project: 'sass/blocks',
		major: 'sass/main.sass'
	},

	js: {
		root: 'scripts',
		major: 'scripts/major',
		jqueryModules: 'scripts/jqueryModules',
		app: 'scripts/major/app.js',
		script: 'scripts/major/script.js'
	}
};

/**
 * Наименования файлов
 */
var names = {
	css: {
		main: 'main.css',
		mainMin: 'main.min.css'
	},
	js: {
		app: 'app.js',
		appMin: 'app.min.js'
	}
};

/**
 * Соединение с сервером
 */
gulp.task('connect', function () {
	connect.server({
		"root": path.app.root,
		"livereload": true
	});
});

/**
 * CSS / SASS
 */
gulp.task('css', function () {
	gulp.src(path.sass.major)
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename(names.css.main))
		.pipe(gulp.dest(path.app.css))
		.pipe(connect.reload());
});


/**
 * JS
 */
gulp.task('jsApp', function () {
	gulp.src([path.js.app, path.js.jqueryModules + '/**/*.*', path.js.script])
		.pipe(plumber())
		.pipe(concat(names.js.app))
		.pipe(rename(names.js.app))
		.pipe(gulp.dest(path.app.js))
		.pipe(connect.reload());
});


/**
 * Наблючение за файлами html
 */
gulp.task('html', function () {
	gulp.src('').pipe(connect.reload());
});

/**
 * Оптимизиция картинок
 */
gulp.task('images', function () {
	gulp.src([path.app.images + '/**/*.jpg', path.app.images + '/**/*.png', path.app.images + '/**/*.jpeg'])
		.pipe(imageop({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.app.images));
});


/**
 * Наблюдение за всеми файлами
 */
gulp.task('watch', function () {
	gulp.watch(path.sass.root + '/**/*.*', ['css']);
	gulp.watch([path.js.jqueryModules + '/**/*.*', path.js.major + '/**/*.*'], ['jsApp']);
	gulp.watch([path.app.root + '/**/*.html'], ['html']);
	gulp.watch([path.app.images + '/**/*.jpg', path.app.images + '/**/*.png', path.app.images + '/**/*.jpeg'], ['images']);
});


/**
 * production
 */
gulp.task('prod', function () {
	gulp.src(path.app.css + '/' + names.css.main)
		.pipe(autoprefixer('last 2 versions', '> fancybox%', 'ie 9'))
		.pipe(cleanCSS())
		.pipe(rename(names.css.mainMin))
		.pipe(gulp.dest(path.app.css));

	gulp.src(path.app.js + '/' + names.js.app)
		.pipe(uglify())
		.pipe(rename(names.js.appMin))
		.pipe(gulp.dest(path.app.js));
});


/**
 * DEFAULT
 */
gulp.task('default', ['connect', 'css', 'jsApp', 'watch']);