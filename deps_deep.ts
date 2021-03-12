import * as fs from 'fs';
import {parse} from '@babel/parser';
import {relative, resolve, dirname} from 'path';
import traverse from '@babel/traverse';

// 设置根目录
const projectRoot = resolve(__dirname, 'project2_deep');
// 类型声明
type DepRelation = {
  [key: string]: { deps: string[], code: string }
}
// 初始化一个空的 depRelation 用于收集数据
const depRelation:DepRelation = {};

const collectCodeAndDeps = (filePath: string) => {
  // 文件的项目路径 如 index.js
  const key = getProjectPath(filePath);
  // 获取文件内容, 将内容放至 depRelation 里面
  const code = fs.readFileSync(filePath).toString();
  depRelation[key] = {deps: [], code};
  // 将代码转化位 AST
  const ast = parse(code, {sourceType: 'module'});
  traverse(ast, {
    enter: item => {
      if (item.node.type === 'ImportDeclaration') {
        // path.node.source.value 目录往往是一个相对目录，如 ./a3.js， 需要先把他转换为一个绝对路径
        const depAbsolutePath = resolve(dirname(filePath), item.node.source.value);
        // 然后转为项目路径
        const depProjectPath = getProjectPath(depAbsolutePath)
        // 把依赖写进 depRelation
        depRelation[key].deps.push(depProjectPath)
        // 递归
        collectCodeAndDeps(depAbsolutePath)
      }
    }
  });
};

const getProjectPath = (filePath: string) => {
  return relative(projectRoot, filePath);
};

collectCodeAndDeps(resolve(projectRoot, 'index.js'))

console.log(depRelation);
