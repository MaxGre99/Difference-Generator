import yaml from 'js-yaml';

export default (fileExtension, file) => {
  if (fileExtension === '.json') {
  const obj = JSON.parse(file); // превращаем строки в объекты (ключ: значение)
  return obj;
  } else if (fileExtension === '.yaml' || fileExtension === '.yml') {
    const obj = yaml.load(file);
    return obj;
  } else {
    return { error: 'Invalid file format' };
  };
};