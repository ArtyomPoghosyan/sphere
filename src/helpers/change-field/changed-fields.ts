export function getChangedValues(dirtyFields: any, allValues: any): object {
    if (dirtyFields === true || Array.isArray(dirtyFields))
      return allValues;
    return Object.fromEntries(Object.keys(dirtyFields).map(key => [key, getChangedValues(dirtyFields[key], allValues[key])]));
  }