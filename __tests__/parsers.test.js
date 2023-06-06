import parsers from '../bin/parsers.js';

describe('parsers', () => {
  test.each([
    [
      'возвращает парсированный файл, если его формат ".json"',
      '.json',
      `{
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
      }`,
      {
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
      },
    ],
    [
      'возвращает парсированный файл, если его формат ".yaml"',
      '.yaml',
      `{
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
      }`,
      {
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
      },
    ],
    [
      'возвращает парсированный файл, если его формат ".yml"',
      '.yml',
      `{
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
      }`,
      {
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
      },
    ],
     [
      'возвращает ошибку, если формат файла не соответствует параметрам',
      '....asfasfasd',
      `{
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
      }`,
      {
        error: 'Invalid file format'
      },
    ],
  ])(
    '%s',
    (description, fileExtension, file, expected) => {
      const result = parsers(fileExtension, file);
      expect(result).toEqual(expected);
    },
  );
});