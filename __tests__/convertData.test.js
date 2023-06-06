import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import convertData from '../bin/convertData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

it('проверяем корректность сравнения плоских json-файлов', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expectedResult = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

  expect(`${convertData(filepath1,filepath2)}\n`).toEqual(expectedResult);
});
