export const convertKeysToCamelCase = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      // check if value of this key is an object
      if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
        newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      } else {
        newObj[camelCaseKey] = obj[key];
      }
    }
  }
  return newObj;
};
