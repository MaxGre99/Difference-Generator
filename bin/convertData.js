import path from 'path'; // это нодовская библиотека, её дополнительно устанавливать не надо
import _ from 'lodash'; // этот модуль надо устанавливать
import fs from 'fs'; // это нодовская библиотека, её дополнительно устанавливать не надо
import genDiff from './genDiff-func.js';
import parsers from './parsers.js';

export default (filepath1, filepath2) => {
  const resolvedPath1 = path.resolve(process.cwd(), filepath1);
  const resolvedPath2 = path.resolve(process.cwd(), filepath2);

  const file1 = fs.readFileSync(resolvedPath1, 'utf-8'); // создаём строки с наполнением из файла
  const file2 = fs.readFileSync(resolvedPath2, 'utf-8');
  /* console.log(`-------------FILE INNIT----------------------`);
  console.log(`FILE === ${file1}`); */
  const fileExtension1 = path.extname(resolvedPath1);
  const fileExtension2 = path.extname(resolvedPath2);
  /* console.log(`-----------------FILE EXTENSION-----------------`);
  console.log(`EXTENSION === ${fileExtension1}`); */
  const obj1 = parsers(fileExtension1, file1);
  const obj2 = parsers(fileExtension2, file2);
  /* console.log(`----------------OBJECT +++ RESULT------------------------`);
  console.log(`PARSING RESULT === ${obj1}`); */

  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return (`{\n${genDiff(obj1, obj2, keys)}}`);
};
