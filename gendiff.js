#!/usr/bin/env node
import { program } from 'commander';

program
.name('gendiff')
.version('0.0.2')
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>', 'filepathes to configs')
//  .option('-V, --version', 'output the version number')
//  .option('-h, --help', 'output usage information')
.option('-f, --format <type>', 'output format')
//  .argument('<filepath2>', 'filepath to the second config')
.parse(process.argv);

console.log(program.helpInformation());
