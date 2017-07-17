var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var gulpsync = require('gulp-sync')(gulp);
var notifier = require('node-notifier');

// prevent gulp crash when error
function onError(err) {
    console.log(err.stack);
     
    notifier.notify({
      'title': 'Compile Error',
      'message': err.message
    });

    this.emit("end")
}

gulp.task('js', function() {
    return browserify({
        extensions: ['.js', '.jsx'],
        entries: './src/js/index.js',
    })
    .transform(babelify.configure({
        ignore: /(bower_components)|(node_modules)/,
        presets: ["es2015", "react", "stage-0"]
    }))
    //.transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on('error', onError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('vendor', function() {
  return gulp.src('./src/js/vendor/*.js')
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('styles', function() {
      return gulp.src('./src/less/**/main.less')
        .pipe($.less({
		    	plugins: [autoprefix]
	  		}))
        .on('error', onError)
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./public/css'))
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('./public/fonts'))
});

gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('./public/images'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('./public'))
});

gulp.task('minify:js', function() {
    return gulp.src('public/js/**/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('minify:css', function() {
    return gulp.src('public/css/**/*.css')
        .pipe($.cleanCss())
        .pipe(gulp.dest('public/css'))
});

gulp.task('server', function() {
  gulp.src('public')
    .pipe($.webserver({
	  fallback: 'index.html',
	  port: 3030,
      livereload: {
	      enable: true,
	      port: 35728
	    },
      open: true
    }));
});

gulp.task('bundle', ['js', 'styles', 'html', 'fonts', 'vendor', 'images']);
//gulp.task('bundle', ['js', 'styles', 'html']);

gulp.task('watch', gulpsync.sync(['bundle', 'server']), function () {
	gulp.watch(['./src/js/**/*.js'], ['js']);
	gulp.watch(['./src/less/**/*.less'], ['styles']);
	gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('default', ['watch']);
gulp.task('minify', ['minify:js', 'minify:css']);
