import path from 'path'; // это нодовская библиотека, её дополнительно устанавливать не надо
import _ from 'lodash'; // этот модуль надо устанавливать
import fs from 'fs'; // это нодовская библиотека, её дополнительно устанавливать не надо
import genStatus from './genStatus.js';
import parsers from './parsers.js';
import formatter from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const resolvedPath1 = path.resolve(process.cwd(), filepath1);
  const resolvedPath2 = path.resolve(process.cwd(), filepath2);

  const file1 = fs.readFileSync(resolvedPath1, 'utf-8'); // создаём строки с наполнением из файла
  const file2 = fs.readFileSync(resolvedPath2, 'utf-8');

  const fileExtension1 = path.extname(resolvedPath1).slice(1);
  const fileExtension2 = path.extname(resolvedPath2).slice(1);

  const obj1 = parsers(fileExtension1, file1);
  const obj2 = parsers(fileExtension2, file2);

  const data = genStatus(obj1, obj2);

  return formatter(data, formatName);
};
