import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : value;
};

const formatter = (data, path = '') => {
  const filteredObjects = data.filter((obj) => obj.status !== 'unchanged');

  return filteredObjects.flatMap((obj) => {
    const { key, value, status } = obj;
    const currentPath = path ? `${path}.${key}` : key;

    switch (status) {
      case 'added':
        return `Property '${currentPath}' was ${status} with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${currentPath}' was ${status}`;
      case 'updated':
        return `Property '${currentPath}' was ${status}. From ${stringify(value[0])} to ${stringify(value[1])}`;
      case 'nested':
        return formatter(value, currentPath);
      default:
        return null;
    }
  });
};

export default (data) => formatter(data).join('\n');
