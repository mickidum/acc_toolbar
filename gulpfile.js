var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify"),
		fileinclude 	 = require('gulp-file-include'),
		htmlmin 	 		 = require('gulp-htmlmin');


gulp.task('minify-html', function() {
  return gulp.src('app/htmlparts/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app/htmlmin'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/**/*.js',
		])
	.pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
   }))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(uglify())
	.pipe(gulp.dest('app/minjs'))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({
		outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'browser-sync', 'common-js', 'minify-html'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass', 'common-js']);
	gulp.watch(['app/js/**/*.js'], ['common-js']);
	gulp.watch(['app/htmlparts/**/*.html'], ['minify-html', 'common-js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['removedist', 'sass', 'minify-html', 'common-js'], function() {

	var buildFiles = gulp.src([
		'app/minjs/common.min.js'
		])
	.pipe(rename('acctoolbar.min.js'))
	.pipe(gulp.dest('acctoolbar'));

	var buildCursors = gulp.src([
		'app/cursors/**/*',
		]).pipe(gulp.dest('acctoolbar/cursors'));

	// var buildCss = gulp.src([
	// 	'app/css/app.min.css',
	// 	]).pipe(gulp.dest('dist/css'));

	// var buildJs = gulp.src([
	// 	'app/js/scripts.min.js',
	// 	'app/js/common.min.js',
	// 	]).pipe(gulp.dest('dist/js'));

	// var buildFonts = gulp.src([
	// 	'app/fonts/**/*',
	// 	]).pipe(gulp.dest('dist/fonts'));

	// var buildApi = gulp.src([
	// 	'app/api/**/*',
	// 	]).pipe(gulp.dest('dist/api'));


});



gulp.task('removedist', function() { return del.sync('acctoolbar'); });
gulp.task('clearcache', function () { return cache.clearAll(); });


gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
