import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  } else if (formatName === 'plain') {
    return plain(data);
  } else {
    return `Unknown formatter: ${formatName}`;
  }
};
