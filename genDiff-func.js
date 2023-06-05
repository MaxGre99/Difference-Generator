import _ from 'lodash';

export default (obj1, obj2, keys) => keys.map((key) => {
  if (_.has(obj1, key) && _.has(obj2, key)) { // если ключ есть в первом файле И во втором файле
    if (_.isEqual(obj1[key], obj2[key])) { // И если знач-я у этих ключей одинаковы в обоих файлах
      return `  ${key}: ${obj1[key]}\n`; // возвращаем строку из ключа-значения
    } return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}\n`;
  }
  if (_.has(obj1, key)) {
    return `- ${key}: ${obj1[key]}\n`;
  } return `+ ${key}: ${obj2[key]}\n`;
}).join('');
