import _ from 'lodash';

const startIndent = 4;
const replacer = ' ';
const genIndent = (level, isOffset = false) => {
  const offset = isOffset ? 2 : 0;
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

const processDeleted = (key, value, level) => `${genIndent(level, true)}- ${key}: ${stringify(value, level + 1)}`;

const processAdded = (key, value, level) => `${genIndent(level, true)}+ ${key}: ${stringify(value, level + 1)}`;

const processUnchanged = (key, value, level) => `${genIndent(level, true)}  ${key}: ${stringify(value, level + 1)}`;

const processChanged = (key, value, level) => `${genIndent(level, true)}- ${key}: ${stringify(value[0], level + 1)}\n${genIndent(level, true)}+ ${key}: ${stringify(value[1], level + 1)}`;

const processNested = (key, value, level) => `${genIndent(level)}${key}: {\n${iter(value, level + 1)}\n${genIndent(level)}}`;

const iter = (data, level = 1) => {
  const result = [];

  for (const obj of data) {
    const { key, value, status } = obj;

    if (status === 'deleted') {
      result.push(processDeleted(key, value, level));
    } else if (status === 'added') {
      result.push(processAdded(key, value, level));
    } else if (status === 'unchanged') {
      result.push(processUnchanged(key, value, level));
    } else if (status === 'changed') {
      result.push(processChanged(key, value, level));
    } else if (status === 'nested') {
      result.push(processNested(key, value, level));
    }
  }

  return result.join('\n');
};

export default (data) => `{\n${iter(data)}\n}`;
