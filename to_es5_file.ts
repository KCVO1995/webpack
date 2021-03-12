import * as babel from '@babel/core'
import * as fs from 'fs'
import {parse} from '@babel/parser';

const code = fs.readFileSync('./es6_code.js').toString()
const ast = parse(code, {sourceType: 'module'})
const result = babel.transformFromAstSync(ast, code, {
  presets: ['@babel/preset-env']
})
fs.writeFileSync('./es5_code.js', result.code)

console.log(result.code);

