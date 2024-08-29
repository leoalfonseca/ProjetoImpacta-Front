export function compareValues(obj1: any, obj2: any) {
  const diffObj: Record<string, any> = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        diffObj[key] = obj2[key];
      }
    } else {
      diffObj[key] = obj1[key];
    }
  }

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
      diffObj[key] = obj2[key];
    }
  }

  return diffObj;
}
