const { src, dest, series, watch, parallel, task } = require('gulp')

const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const webServer = require('gulp-webserver')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const ghPages = require('gulp-gh-pages')
const DEPENDENCIES = require('./dependencies.js')

const files = {
  js: 'app/js/**/*.js',
  dependencyJS: 'app/js-dependencies/**/*.js',
  css: ['app/css/**/*.css', 'app/css/**/*.sass', 'app/css/**/*.scss'],
  html: 'app/**/*.html',
  data: ['app/**/*.csv', 'app/**/*.json'],
  images: ['app/**/*.png', 'app/**/*.jpg']
}

function syncBrowser() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  browserSync.watch("./dist/**/*").on('change', browserSync.reload)
}

function prepareJs() {
  return src(files.js)
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(babel())
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/js'))
}

function prepareDependencyJS() {
  return src(files.dependencyJS)
    .pipe(dest('dist/js'))
}

function prepareCss() {
  return src(files.css)
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/css'))
}

function prepareHTML() {
  return src(files.html)
    .pipe(dest('dist'))
}

function prepareData() {
  return src(files.data)
    .pipe(dest('dist'))
}

function prepareImages() {
  return src(files.images)
    .pipe(dest('dist'))
}

function watchFiles() {
  watch(files.dependencyJS, prepareDependencyJS)
  watch(files.js, prepareJs)
  watch(files.css, prepareCss)
  watch(files.html, prepareHTML)
  watch(files.data, prepareData)
  watch(files.images, prepareImages)
}

NODE_MODULES_DIR = 'node_modules'
let getModule = x => `${NODE_MODULES_DIR}/${x}`

function includeJsDependencies() {
  return src(DEPENDENCIES.js.map(getModule))
    .pipe(dest('dist/js'))
}

function includeCssDependencies() {
  return src(DEPENDENCIES.css.map(getModule))
    .pipe(dest('dist/css'))
}

function build() {
  return series(
    // parallel(includeJsDependencies, includeCssDependencies),
    parallel(
      prepareDependencyJS, prepareJs, prepareCss,
      prepareHTML, prepareData, prepareImages)
  )
}

function pushToGitPages() {
  return src('./dist/**/*')
    .pipe(ghPages({
      branch: "gh-pages"
    }))
}

function pushToPublicGitPages() {
  return src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: "https://github.com/com-480-data-visualization/data-visualization-project-2021-d3-musketeers",
      branch: "gh-pages"
    }))
}

function deploy() {
  return series(
    build(),
    pushToGitPages
  )
}

function deployPublic() {
  return series(
    build(),
    pushToPublicGitPages
  )
}

exports.build = build()
exports.deploy = deploy()
exports.deployPublic = deployPublic()

exports.default = series(
  build(),
  parallel(watchFiles, syncBrowser)
)
