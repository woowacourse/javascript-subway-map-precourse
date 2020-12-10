export const isValidNameLength = (name, limit) => name.length >= limit;

export const isDuplicatedName = (name, nameList) =>
  nameList.every(target => target !== name);
