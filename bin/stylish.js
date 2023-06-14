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
  return data.map(obj => {
    const { key, value, status } = obj;

    if (status === 'deleted') {
      return `${genIndent(level, true)}- ${key}: ${stringify(value, level + 1)}`;
    }
    if (status === 'added') {
      return `${genIndent(level, true)}+ ${key}: ${stringify(value, level + 1)}`;
    }
    if (status === 'unchanged') {
      return `${genIndent(level, true)}  ${key}: ${stringify(value, level + 1)}`;
    }
    if (status === 'changed') {
      return `${genIndent(level, true)}- ${key}: ${stringify(value[0], level + 1)}\n${genIndent(level, true)}+ ${key}: ${stringify(value[1], level + 1)}`;
    }
    if (status === 'nested') {
      return `${genIndent(level)}${key}: {\n${iter(value, level + 1)}\n${genIndent(level)}}`;
    }
  }).join('\n');
};

export default (data) => `{\n${iter(data)}\n}`;
