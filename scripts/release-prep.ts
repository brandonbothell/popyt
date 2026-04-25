import fs from 'fs'

// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

const source = fs.readFileSync(__dirname + '/../package.json').toString('utf-8')
const sourceObj = JSON.parse(source)

sourceObj.scripts = {}
delete sourceObj.nyc
delete sourceObj.workspaces
delete sourceObj.resolutions
delete sourceObj.engines
delete sourceObj.packageManager

sourceObj.main = 'index.js'
sourceObj.types = 'typings/index.d.ts'

fs.writeFileSync(__dirname + '/../out/src/package.json', Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8'))
fs.writeFileSync(__dirname + '/../out/version.txt', Buffer.from(sourceObj.version, 'utf-8'))

fs.cpSync(__dirname + '/../typings/src', __dirname + '/../out/src/declarations', { recursive: true })
