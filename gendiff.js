import { program } from 'commander';

program
.name('gendiff')
//  version
.description('Compares two configuration files and shows a difference.')
.option('-V, --version', 'output the version number')
.option('-h, --help', 'output usage information')
.parse(process.argv);

console.log(program.helpInformation());
