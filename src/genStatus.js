import _ from 'lodash';

export default (obj1, obj2) => {
  const compareObjects = (curObj1, curObj2) => {
    const keys = _.sortBy(_.union(_.keys(curObj1), _.keys(curObj2)));

    return keys.map((key) => {
      const value1 = curObj1[key];
      const value2 = curObj2[key];

      if (_.isObject(value1) && _.isObject(value2)) {
        return ({ key, value: compareObjects(value1, value2), status: 'nested' });
      }
      if (_.has(curObj1, key) && _.has(curObj2, key)) {
        if (_.isEqual(value1, value2)) {
          return ({ key, value: value1, status: 'unchanged' });
        }
        return ({ key, value: [value1, value2], status: 'updated' });
      }
      if (_.has(curObj1, key)) {
        return ({ key, value: value1, status: 'removed' });
      }
      return ({ key, value: value2, status: 'added' });
    });
  };
  return compareObjects(obj1, obj2);
};
