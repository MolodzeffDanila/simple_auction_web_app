const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const babelCore = require('babel-core');
const clean_css = require('gulp-clean-css')
const pug = require('gulp-pug');
const del = require('del');

const clean = ()=> del(["assets"]);

function less_styles(){
    return gulp.src('./less/*.less').pipe(less()).pipe(clean_css()).pipe(gulp.dest('./assets/style/'));
}

function ECMA5(){
    return gulp.src('./*.js').pipe(babel()).pipe(gulp.dest('./assets/js/'))
}

gulp.task("default", gulp.series(clean, less_styles, ECMA5));
