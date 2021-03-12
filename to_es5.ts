import {parse} from '@babel/parser'
import * as babel from '@babel/core'

const code = `let a = 1; let b = 2`
const ast = parse(code, {sourceType: 'module'})
const result = babel.transformFromAstSync(ast, code, {
  presets: ['@babel/preset-env']
})

console.log(result.code);
