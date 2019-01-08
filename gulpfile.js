var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		gulpSass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify"),
		fileinclude 	 = require('gulp-file-include'),
		htmlmin 	 		 = require('gulp-htmlmin'),
		rimraf         = require("rimraf");

function minifyHtml(cb) {
  gulp.src('app/htmlparts/**/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('app/htmlmin'))
  setTimeout(() => cb(), 100);
}

function commonJs(cb) {
	gulp.src([
	'app/js/**/*.js',
	])
	.pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
   }))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(uglify())
	.pipe(gulp.dest('app/minjs'))
	.pipe(browserSync.stream());
	cb();
}

function browser(cb) {
	browserSync({
		server: {
			baseDir: 'app'
		},
		open: false,
		notify: false,
	});
	cb();
}

function code(cb) {
	gulp.src('app/*.html')
	.pipe(browserSync.stream());
	cb();
}

function sass(cb) {
	gulp.src('app/scss/**/*.scss')
	.pipe(gulpSass({
		outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 2 versions']))
	.pipe(cleanCSS()) // comment on debug
	.pipe(gulp.dest('app/css'))
	setTimeout(() => cb(), 100);
	
}

function files(cb) {
	setTimeout(() => {
		gulp.src([
		'app/minjs/common.min.js'
		])
		.pipe(rename('acctoolbar.min.js'))
		.pipe(gulp.dest('acctoolbar'));
		gulp.src([
			'app/cursors/**/*',
			]).pipe(gulp.dest('acctoolbar/cursors'));
		cb();
	}, 500);
}

function remDist(cb) {
	rimraf('acctoolbar', cb);
}

function clearCache (cb) { 
	cache.clearAll();
	cb(); 
}

function watch(cb) {
	gulp.watch('app/scss/**/*.scss', gulp.series(sass, commonJs));
	gulp.watch('app/htmlparts/**/*.html', gulp.series(minifyHtml, commonJs));
	gulp.watch('app/js/**/*.js', gulp.parallel(commonJs));
	gulp.watch('app/*.html', gulp.parallel(code));
	cb();
}

// exports.build = gulp.series(remDist, minifyHtml, sass, commonJs, files);
exports.build = gulp.series(remDist, minifyHtml, sass, commonJs, files);

exports.clearcache = gulp.parallel(clearCache);

exports.rem = gulp.parallel(remDist);
exports.buildhtml = gulp.parallel(minifyHtml);
exports.buildcss = gulp.parallel(sass);
exports.buildjs = gulp.parallel(commonJs);
exports.buildfiles = gulp.parallel(files);

exports.default = gulp.parallel(watch, browser);
// exports.build = gulp.parallel(buildall);

