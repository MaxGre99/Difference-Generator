#!/usr/bin/env node
import { program } from 'commander'; // этот модуль надо устанавливать
import fs from 'fs'; // это нодовская библиотека, её дополнительно устанавливать не надо
import path from 'path'; // это нодовская библиотека, её дополнительно устанавливать не надо
import _ from 'lodash'; // этот модуль надо устанавливать
import genDiff from './gendiff-func.js';

program
.name('gendiff')
.version('0.0.3')
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>', 'filepathes to configs')
.option('-f, --format <type>', 'output format')
.action((filepath1, filepath2) => {
    const resolvedPath1 = path.resolve(process.cwd(), filepath1);
    const resolvedPath2 = path.resolve(process.cwd(), filepath2);
    
    const file1 = fs.readFileSync(resolvedPath1, 'utf-8'); // создаём строки с наполнением из файла
    const file2 = fs.readFileSync(resolvedPath2, 'utf-8');
    
    const obj1 = JSON.parse(file1); // превращаем строки в объекты (ключ: значение)
    const obj2 = JSON.parse(file2);
    
    const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

    console.log(`{\n${genDiff(obj1, obj2, keys)}}`);
})
.parse(process.argv);

/* Algorythm:
0. как-то надо упорядочить пути до файлов
1. Сравниваем значения ключей
2. Если равны, то пишем один без символа
2.5. если не равны, то пишем оба с соответствующими символами
3. Если есть в первом файле, но отличается/отсутствует во втором -- записываем со знаком минус
4. Если есть во втором файле, но отличается от первого/отсутствует в первом -- записываем со знаком плюс
5. результат -- строки, отсортированные по алфавиту (лодаш сортБу) */
