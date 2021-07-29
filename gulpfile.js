//переменные
const { src, dest, watch, parallel, series } = require('gulp');
// const scss = require('gulp-sass');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
// const svgSprite = require('gulp-svg-sprite');
const svgstore = require('gulp-svgstore');
const fileinclude = require('gulp-file-include');

//функции
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function styles () {
    return src([
        // 'node_modules/animate.css/animate.css',
        'app/scss/style.scss' //all,files for min
    ])
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        // 'node_modules/wow.js/dist/wow.js',
        'node_modules/slick-carousel/slick/slick.js',
        // 'node_modules/mixitup/dist/mixitup.js',
        // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        // 'node_modules/rateyo/src/jquery.rateyo.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}

function svgSprites () {
	return src('app/images/**/*.svg')
    .pipe(svgstore())
	.pipe(dest('./app/images'))
}

// функция под классический свг-спрайт, текущая версия нерабочая
// function svgSprites () {
// 	return src('app/images/**/*.svg')
// 	.pipe(svgSprite({
// 		mode: {
// 			stack: {
// 				sprite: "../sprite.svg"
// 			}
// 		}
// 	}))
// 	.pipe(dest('./app/images'))
// }

function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')

}

function htmlInclude() {
    return src('app/html/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch('app/html/**/*.html', htmlInclude);
    // watch(['app/*.html']).on('change', browserSync.reload);
    // watch(['app/images/**.svg'], svgSprite); //добавление в спрайт выполняется в момент запуска gulp
}

//вызовы функций
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.htmlInclude = htmlInclude;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching, svgSprites, htmlInclude);











// ======================================ПОЛНЫЙ текст старого галпа по лекциям Вадима 2020 года
// let gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     rename = require('gulp-rename'),
//     browserSync = require('browser-sync'),
//     autoprefixer = require('gulp-autoprefixer'),
//     concat = require('gulp-concat'),
//     uglify = require('gulp-uglify'),
//     cssmin = require('gulp-cssmin');
// gulp.task('sass', function(){
//     return gulp.src('app/scss/**/*.scss')
//         .pipe(sass({outputStyle: 'compressed'}))
//         .pipe(rename({suffix: ".min"}))
//         .pipe(autoprefixer({
//             overrideBrowserslist: ['last 8 version']
//         }))
//         .pipe(gulp.dest('app/css'))
//         .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('style', function(){
//     return gulp.src([
//         'node_modules/normalize.css/normalize.css',
//         'node_modules/slick-carousel/slick/slick.css',
//         // 'node_modules/magnific-popup/dist/magnific-popup.css',
//         // 'node_modules/rateyo/src/jquery.rateyo.css',
//         // 'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
//         // magnific-popup - всплывающие окна, rateyo - звезды рейтинга, rangeSlider - регулятор цены == плагины отключены, если надо - включить, новые подключаются по аналогии.
//     ])
//         .pipe(concat('libs.min.css'))
//         .pipe(cssmin())
//         .pipe(gulp.dest('app/css'))
// });
// gulp.task('script', function(){
//     return gulp.src([
//         'node_modules/slick-carousel/slick/slick.js',
//         // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
//         // 'node_modules/mixitup/dist/mixitup.js',
//         // 'node_modules/rateyo/src/jquery.rateyo.js',
//         // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
//     ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js'))
// });
// gulp.task('html', function(){
//     return gulp.src('app/*.html')
//     .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('js', function(){
//     return gulp.src('app/js/*.js')
//     .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "app/"
//         }
//     });
// });
// gulp.task('watch', function(){
//     gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // указываем, за кем следим. Если тот, за кем следим, меняется, то выполняется таск sass.
//     gulp.watch('app/*.html', gulp.parallel('html'));   //
//     gulp.watch('app/js/*.js', gulp.parallel('js'));  // чтобы за файлами хтмл и джс было слежение.
// });

// gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))
