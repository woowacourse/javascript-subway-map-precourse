export const overTwo = name => {
  return name.length >= 2;
};

export const notDuplicateStation = (name, list) => {
  return !list.includes(name);
};

export const notDuplicateLine = (name, list) => {
  for (const element of list) {
    if (element.name == name) return false;
  }
  return true;
};
