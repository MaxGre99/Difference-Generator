#!/usr/bin/env node
import { program } from 'commander'; // этот модуль надо устанавливать
import genDiffStatus from '../src/genDiffStatus.js';
import convertData from '../src/convertData.js';
import stylish from '../src/Formatters/stylish.js';

program
  .name('gendiff')
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>', 'filepathes to configs')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    if (program.opts().format === 'stylish') {
      console.log(stylish(convertData(filepath1,filepath2)));
    } else {
      console.log('IDK WHAT TO DO!1!!11111');
    }
  })
  .parse(process.argv);

/* Algorythm:
0. как-то надо упорядочить пути до файлов
1. Сравниваем значения ключей
2. Если равны, то пишем один без символа
2.5. если не равны, то пишем оба с соответствующими символами
3. Если есть в первом файле, но отличается/отсутствует во втором -- записываем со знаком минус
4.Если есть во втором файле, но отличается от первого/отсутствует в первом -- записываем со знаком +
5. результат -- строки, отсортированные по алфавиту (лодаш сортБу) */
