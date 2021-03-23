"Use strict";

const gulp = require("gulp");
const debug = require("gulp-debug");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const del = require("del");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const replace = require("gulp-replace");

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("copy", function () {
  return gulp
    .src(["./source/fonts/**/*.{eot,svg,ttf,woff,woff2}", "./source/js/*.js"], {
      base: "source",
    })
    .pipe(gulp.dest("./build/"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html").pipe(htmlmin()).pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series("clean", "copy", "css", "html"));

gulp.task("start", gulp.series("build", "server"));
