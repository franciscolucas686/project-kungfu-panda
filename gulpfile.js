const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function scripts() {
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

function compileSass() {
    return gulp.src('./src/style/*.scss')
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(gulp.dest('./dist/style'))
}

function images() {
    return gulp.src('./src/image/**/*', {encoding: false})
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/image'))
}

function watchFiles() {
    gulp.watch('./src/style/*.scss', gulp.parallel(compileSass))
    gulp.watch('./src/image/**/*', gulp.parallel(images))
    gulp.watch('./src/js/*.js', gulp.parallel(scripts))
}

exports.compileSass = compileSass;
exports.watch = watchFiles;
exports.images = images;
exports.scripts = scripts;

exports.default = gulp.parallel(compileSass, watchFiles,images,scripts);