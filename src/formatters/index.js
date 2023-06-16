import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  } else if (formatName === 'plain') {
    return plain(data);
  } else if (formatName === 'json') {
    return json(data);
  } else {
    return `Unknown formatter: ${formatName}`;
  }
};
