import _ from 'lodash';

const indent = 4;
const replacer = ' ';

const stringify = (value, level) => {
  const newIndent = replacer.repeat(indent * level);

  if (!_.isObject(value)) {
    return String(value);
  }
  const lines = Object.entries(value)
    .map(([key, value]) => `${newIndent}${key}: ${stringify(value, level + 1)}\n`)
    .join('\n');
    return `{\n${lines}${newIndent}\n}`;
};

const iter = (data) => {
    return data.map (obj => {
      const { key, value, status } = obj;

      if (status === 'deleted') {
        return `- ${key}: ${stringify(value, 0)}\n`;
      }
      if (status === 'added') {
        return `+ ${key}: ${stringify(value, 0)}\n`;
      }
      if (status === 'unchanged') {
        return `  ${key}: ${stringify(value, 0)}\n`;
      }
      if (status === 'changed') {
        return `- ${key}: ${stringify(value[0], 0)}\n+ ${key}: ${stringify(value[1], 0)}\n`;
      }
      if (status === 'nested') {
        return `${key}: ${iter(value)}\n`;
      }
    }).join('');
  };

  export default iter;