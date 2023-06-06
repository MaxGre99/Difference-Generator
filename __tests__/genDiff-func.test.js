/* import genDiff from '../genDiff-func.js';

const { a: 1, b: 2 } = { a: 1, b: 2 };
const twoKeys = ['a', 'b'];
const threeKeys = ['a', 'b', 'c']; 

describe('genDiff', () => { // название теста
  it('возвращает пустую строку, когда оба объекта пустые', () => { // название проверки
    const obj1 = {};
    const obj2 = {};
    const keys = [];

    const result = genDiff(obj1, obj2, keys);

    expect(result).toBe('');
  });

  it('возвращает строку с разными и с одинаковыми значениями (2 шт.)', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 3, b: 2 };
    const keys = twoKeys;

    const result = genDiff(obj1, obj2, keys);

    const expected = '- a: 1\n+ a: 3\n  b: 2\n';
    expect(result).toBe(expected);
  });

  it('возвращает строку с разными и с одинаковыми значениями (3 шт.)', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 2, c: 3 };
    const keys = threeKeys;

    const result = genDiff(obj1, obj2, keys);

    const expected = '- a: 1\n  b: 2\n+ c: 3\n';
    expect(result).toBe(expected);
  });

  it('возвращает строку со всеми отличительными значениями, когда все значения разные', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const keys = threeKeys;

    const result = genDiff(obj1, obj2, keys);

    const expected = '- a: 1\n- b: 2\n+ b: 3\n+ c: 4\n';
    expect(result).toBe(expected);
  });

  it('возвращает все строки, когда все файлы одинаковые', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const keys = twoKeys;

    const result = genDiff(obj1, obj2, keys);

    const expected = '  a: 1\n  b: 2\n';
    expect(result).toBe(expected);
  });
}); */

/* import genDiff from '../genDiff-func.js';
const testEach = require('test-each'); */

/* const commonObj = { a: 1, b: 2 };
const twoKeys = ['a', 'b'];
const threeKeys = ['a', 'b', 'c']; */

/* describe('genDiff', () => {
  testEach(
    [
      [['возвращает пустую строку, когда оба объекта пустые'], {}, {}, [], ''],
      [['возвращает строку с разными и с одинаковыми значениями (2 шт.)'], { a: 1, b: 2 }, { a: 3, b: 2 }, ['a', 'b'], '- a: 1\n+ a: 3\n  b: 2\n'],
      [['возвращает строку с разными и с одинаковыми значениями (3 шт.)'], { a: 1, b: 2 }, { b: 2, c: 3 }, ['a', 'b', 'c'], '- a: 1\n  b: 2\n+ c: 3\n'],
      [['возвращает строку со всеми отличительными значениями, когда все значения разные'], { a: 1, b: 2 }, { b: 3, c: 4 }, ['a', 'b', 'c'], '- a: 1\n- b: 2\n+ b: 3\n+ c: 4\n'],
      [['возвращает все строки, когда все файлы одинаковые'], { a: 1, b: 2 }, { a: 1, b: 2 }, ['a', 'b'], '  a: 1\n  b: 2\n'],
    ],
    (description, obj1, obj2, keys, expected) => {
      it(description, () => {
        const result = genDiff(obj1, obj2, keys);
        expect(result).toBe(expected);
      });
    },
  );
}); */

import genDiff from '../bin/genDiff-func.js';

describe('genDiff', () => {
  test.each([
    [
      'возвращает пустую строку, когда оба объекта пустые',
      {},
      {},
      [],
      '',
    ],
    [
      'возвращает строку с разными и с одинаковыми значениями (2 шт.)',
      { a: 1, b: 2 },
      { a: 3, b: 2 },
      ['a', 'b'],
      '- a: 1\n+ a: 3\n  b: 2\n',
    ],
    [
      'возвращает строку с разными и с одинаковыми значениями (3 шт.)',
      { a: 1, b: 2 },
      { b: 2, c: 3 },
      ['a', 'b', 'c'],
      '- a: 1\n  b: 2\n+ c: 3\n',
    ],
    [
      'возвращает строку со всеми отличительными значениями, когда все значения разные',
      { a: 1, b: 2 },
      { b: 3, c: 4 },
      ['a', 'b', 'c'],
      '- a: 1\n- b: 2\n+ b: 3\n+ c: 4\n',
    ],
    [
      'возвращает все строки, когда все файлы одинаковые',
      { a: 1, b: 2 },
      { a: 1, b: 2 },
      ['a', 'b'],
      '  a: 1\n  b: 2\n',
    ],
  ])(
    '%s',
    (description, obj1, obj2, keys, expected) => {
      const result = genDiff(obj1, obj2, keys);
      expect(result).toBe(expected);
    },
  );
});
