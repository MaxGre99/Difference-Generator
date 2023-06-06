import genDiff from '../genDiff-func.js';

const commonObj = { a: 1, b: 2 };

describe('genDiff', () => { // название теста
  it('возвращает пустую строку, когда оба объекта пустые', () => { // название проверки
    const obj1 = {};
    const obj2 = {};
    const keys = [];

    const result = genDiff(obj1, obj2, keys);

    expect(result).toBe('');
  });

  it('возвращает строку с разными и с одинаковыми значениями (2 шт.)', () => {
    const obj1 = commonObj;
    const obj2 = { a: 3, b: 2 };
    const keys = ['a', 'b'];

    const result = genDiff(obj1, obj2, keys);

    const expected = '- a: 1\n+ a: 3\n  b: 2\n';
    expect(result).toBe(expected);
  });

  it('возвращает строку с разными и с одинаковыми значениями (3 шт.)', () => {
    const obj1 = commonObj;
    const obj2 = { b: 2, c: 3 };
    const keys = ['a', 'b', 'c'];

    const result = genDiff(obj1, obj2, keys);

    const expected = '- a: 1\n  b: 2\n+ c: 3\n';
    expect(result).toBe(expected);
  });

  it('возвращает строку со всеми отличительными значениями, когда все значения разные', () => {
    const obj1 = commonObj;
    const obj2 = { b: 3, c: 4 };
    const keys = ['a', 'b', 'c'];

    const result = genDiff(obj1, obj2, keys);

    const expected = '- a: 1\n- b: 2\n+ b: 3\n+ c: 4\n';
    expect(result).toBe(expected);
  });

  it('возвращает все строки, когда все файлы одинаковые', () => {
    const obj1 = commonObj;
    const obj2 = commonObj;
    const keys = ['a', 'b'];

    const result = genDiff(obj1, obj2, keys);

    const expected = '  a: 1\n  b: 2\n';
    expect(result).toBe(expected);
  });
});