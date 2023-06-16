import { describe, test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const stylishResult = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const jsonResult = fs.readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');

describe('gendiffTest', () => {
  test.each([
    [
      'проверка форматирования Stylish',
      filepath1,
      filepath2,
      'stylish',
      stylishResult,
    ],
    [
      'проверка форматирования Plain',
      filepath1,
      filepath2,
      'plain',
      plainResult,
    ],
    [
      'проверка форматирования JSON',
      filepath1,
      filepath2,
      'json',
      jsonResult,
    ],
  ])(
    '%s',
    (description, filepathOne, filepathTwo, formatName, expected) => {
      const result = gendiff(filepathOne, filepathTwo, formatName);
      expect(`${result}\n`).toEqual(expected);
    },
  );
});
