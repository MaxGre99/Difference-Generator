import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return String(value);
};

const formatter = (path, value, status) => {
  switch (status) {
    case 'added':
      return `Property ${path} was ${status} with value: ${stringify(value)}`;
    case 'removed':
      return `Property ${path} was ${status}`;
    case 'updated':
      return `Property ${path} was ${status}. From ${stringify(value[0])} to ${stringify(value[1])}`;
    default:
      return null;
  }
};

const getPath = (data, path = '') => {
  const result = [];

  const filteredObjects = data.filter((obj) => obj.status !== 'unchanged');

  filteredObjects.forEach((obj) => {
    const { key, value, status } = obj;
    const currentPath = path ? `${path}.${key}` : key;

    if (status === 'nested') {
      result.push(...getPath(value, currentPath));
    } else {
      result.push(formatter(currentPath, value, status));
    }
  })
  return result;
};


export default (data) => getPath(data).join('\n');

// возможно стоит переделать, чтобы была одна рекурсивная функция, которая и принимает данные и собирает путь.