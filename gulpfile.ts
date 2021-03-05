import * as gulp from 'gulp'
import * as fsn from 'fs-nextra'
import * as ts from 'gulp-typescript'
import * as sourcemaps from 'gulp-sourcemaps'
import * as TypeDoc from 'typedoc'
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

async function docs () {
  const app = new TypeDoc.Application()

  app.options.addReader(new TypeDoc.TSConfigReader())
  app.bootstrap({
    entryPoints: [ 'src/index.ts' ],
    readme: 'README.md',
    out: 'docs/docs',
    name: 'popyt',
    theme: 'default'
  })

  const project = app.convert()

  if (project) {
    await app.generateDocs(project, 'docs/docs')
    fsn.createFile('docs/.nojekyll')
  } else {
    Promise.reject('An error occured while converting the TypeDoc app to a project')
  }
}

gulp.task('typedoc', docs)
gulp.task('default', build)
gulp.task('build', build)
