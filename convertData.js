import fs from 'fs'; // это нодовская библиотека, её дополнительно устанавливать не надо
import path from 'path'; // это нодовская библиотека, её дополнительно устанавливать не надо
import _ from 'lodash'; // этот модуль надо устанавливать
import genDiff from './genDiff-func.js';

export default (filepath1, filepath2) => {
  const resolvedPath1 = path.resolve(process.cwd(), filepath1);
  const resolvedPath2 = path.resolve(process.cwd(), filepath2);

  const file1 = fs.readFileSync(resolvedPath1, 'utf-8'); // создаём строки с наполнением из файла
  const file2 = fs.readFileSync(resolvedPath2, 'utf-8');

  const obj1 = JSON.parse(file1); // превращаем строки в объекты (ключ: значение)
  const obj2 = JSON.parse(file2);

  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return (`{\n${genDiff(obj1, obj2, keys)}}\n`);
};