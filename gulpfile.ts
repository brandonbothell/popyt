import * as gulp from 'gulp'
import * as fsn from 'fs-nextra'
import * as ts from 'gulp-typescript'
import * as sourcemaps from 'gulp-sourcemaps'
import typedoc from 'gulp-typedoc'
import merge from 'merge2'

const project = ts.createProject('tsconfig.json')

async function build () {
  await Promise.all([
    fsn.emptydir('out'),
    fsn.emptydir('typings')
  ])

  const result = project.src()
    .pipe(sourcemaps.init())
    .pipe(project())

  return merge([
    result.dts.pipe(gulp.dest('typings')),
    result.js.pipe(sourcemaps.write('.', { sourceRoot: '../src' })).pipe(gulp.dest('out'))
  ])
}

function docs () {
  const toReturn = gulp
    .src(['src/**/*.ts'])
    .pipe(typedoc({
      module: 'commonjs',
      readme: 'README.md',
      target: 'es2016',
      out: 'docs/docs',
      name: 'popyt',
      theme: 'default',
      mode: 'file'
    }))

  toReturn.on('end', () => {
    fsn.createFile('docs/.nojekyll')
  })

  return toReturn
}

gulp.task('typedoc', docs)
gulp.task('default', build)
gulp.task('build', build)
