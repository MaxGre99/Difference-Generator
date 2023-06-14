import _ from 'lodash';

const startIndent = 4;
const replacer = ' ';
const genIndent = (level, isOffset = false) => {
  const offset = (isOffset) ? 2 : 0;
  return replacer.repeat(startIndent * level - offset);
};

const stringify = (value, level = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value)
    .map(([key, value]) => `${genIndent(level)}${key}: ${stringify(value, level + 1)}`)
    .join('\n');

  return `{\n${lines}\n${genIndent(level - 1)}}`;
};

const iter = (data, level = 1) => {
  const result = [];

  for (const obj of data) {
    const { key, value, status } = obj;
    const standartIndent = genIndent(level, true);
    const stringValue = stringify(value, level + 1);

    if (status === 'deleted') {
      result.push(`${standartIndent}- ${key}: ${stringValue}`);
    } else if (status === 'added') {
      result.push(`${standartIndent}+ ${key}: ${stringValue}`);
    } else if (status === 'unchanged') {
      result.push(`${standartIndent}  ${key}: ${stringValue}`);
    } else if (status === 'changed') {
      result.push(`${standartIndent}- ${key}: ${stringify(value[0], level + 1)}\n${standartIndent}+ ${key}: ${stringify(value[1], level + 1)}`);
    } else if (status === 'nested') {
      result.push(`${genIndent(level)}${key}: {\n${iter(value, level + 1)}\n${genIndent(level)}}`);
    }
  }
  return result.join('\n');
};

export default (data) => `{\n${iter(data)}\n}`;
