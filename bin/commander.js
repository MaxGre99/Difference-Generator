#!/usr/bin/env node
import { program } from 'commander'; // этот модуль надо устанавливать
import genDiff from '../src/genDiff.js';

program
  .name('gendiff')
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>', 'filepathes to configs')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.opts().format)))
  .parse(process.argv);

/* Algorythm:
0. как-то надо упорядочить пути до файлов
1. Сравниваем значения ключей
2. Если равны, то пишем один без символа
2.5. если не равны, то пишем оба с соответствующими символами
3. Если есть в первом файле, но отличается/отсутствует во втором -- записываем со знаком минус
4.Если есть во втором файле, но отличается от первого/отсутствует в первом -- записываем со знаком +
5. результат -- строки, отсортированные по алфавиту (лодаш сортБу) */
