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
    .map(([key, val]) => `${genIndent(level)}${key}: ${stringify(val, level + 1)}`)
    .join('\n');

  return `{\n${lines}\n${genIndent(level - 1)}}`;
};

const iter = (data, level = 1) => data.map((obj) => {
  const { key, value, status } = obj;
  const standartIndent = genIndent(level, true);
  const stringValue = stringify(value, level + 1);

  switch (status) {
    case 'removed':
      return `${standartIndent}- ${key}: ${stringValue}`;
    case 'added':
      return `${standartIndent}+ ${key}: ${stringValue}`;
    case 'unchanged':
      return `${standartIndent}  ${key}: ${stringValue}`;
    case 'updated':
      return `${standartIndent}- ${key}: ${stringify(value[0], level + 1)}\n${standartIndent}+ ${key}: ${stringify(value[1], level + 1)}`;
    case 'nested':
      return `${genIndent(level)}${key}: {\n${iter(value, level + 1)}\n${genIndent(level)}}`;
    default:
      return null;
  }
}).join('\n');

export default (data) => `{\n${iter(data)}\n}`;
