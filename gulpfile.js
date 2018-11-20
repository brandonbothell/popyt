const gulp = require('gulp')
const fsn = require('fs-nextra')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const typedoc = require('gulp-typedoc')
const merge = require('merge2')
const project = ts.createProject('tsconfig.json')

async function build () {
  await Promise.all([
    fsn.emptydir('out'),
    fsn.emptydir('typings'),
  ])

  const result = project.src()
    .pipe(sourcemaps.init())
    .pipe(project())

  return merge([
    result.dts.pipe(gulp.dest('typings')),
    result.js.pipe(sourcemaps.write('.', { sourceRoot: '../src' })).pipe(gulp.dest('out')),
  ])
}

async function docs () {
  await fsn.emptydir('docs')

  return gulp
    .src(['src/**/*.ts'])
    .pipe(typedoc({
      module: 'commonjs',
      readme: 'README.md',
      target: 'es6',
      out: 'docs/',
      name: 'Better YouTube API'
    }))
}

gulp.task('typedoc', docs)
gulp.task('default', build)
gulp.task('build', build)
