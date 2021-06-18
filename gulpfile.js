const projectFolder                 = "dist";
const sourceFolder                  = "#src";

let path = {
    build: {
        root: projectFolder + '/',
        styles: projectFolder + '/styles/',
        js: projectFolder + '/js/',
        pictures: projectFolder + '/pictures/',
        icons: projectFolder + '/icons/',
    },
    src: {
        parts: sourceFolder + '/parts/',
        root: sourceFolder + '/',
        styles: sourceFolder + '/styles/',
        js: sourceFolder + '/js/',
        pictures: sourceFolder + '/pictures/',
        icons: sourceFolder + '/icons/',
    }
};

const {src, dest, watch, parallel}  = require('gulp');
const gulp                          = require('gulp');
const scss                          = require('gulp-sass');
const concat                        = require('gulp-concat');
const browserSync                   = require('browser-sync').create();
const uglify                        = require('gulp-uglify-es').default;
const autoprefixer                  = require('gulp-autoprefixer');
const imagemin                      = require('gulp-imagemin');
const { css }                       = require('jquery');
const fileinclude                   = require('gulp-file-include');
const glob                          = require('glob');

function styles(){
    return src(path.src.styles + 'style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
    }))
    .pipe(dest(path.build.styles))
    .pipe(dest(path.src.styles))
    .pipe(browserSync.stream())
};

function html(){
    return src([path.src.root + '*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: path.src.parts,
      }))
    .pipe(concat('index.html'))
    .pipe(dest('dist'))
};

function imageMin(){
    return src(path.src.pictures + '**/*.{jpg,png,svg,gif,ico,webp,JPG,PNG,SVG,GIF,ICO,WEBP}')
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
        .pipe(dest(path.build.pictures))
};

function jsCompressor(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        //'#src/js/anim.js'
        path.src.js + 'main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(dest(path.src.js))
    .pipe(browserSync.stream())
}

async function builder(){
    src([
        path.src.styles + 'style.min.css',
        path.src.js + 'main.min.js',
        path.src.icons + '*.svg',
    ], {base: "#src"})
    .pipe(dest('dist'));
    html();
};

function pagesync(){
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        port: 3000,
        notify: false,
    });
};

function watching(){
    watch([path.src.styles + '**/*.scss'], styles).on('change', browserSync.reload);
    watch([path.src.root + '**/*.html'], html).on('change', browserSync.reload);
    watch([path.src.js + '**/*.js', '!' + path.src.js + 'main.min.js'], jsCompressor).on('change', browserSync.reload);
};

exports.builder = builder;
exports.pagesync = pagesync;
exports.watching = watching;
exports.jsCompressor = jsCompressor;
exports.imageMin = imageMin;
exports.styles = styles;
exports.html = html;
exports.default = parallel(watching, pagesync, styles, jsCompressor, builder);