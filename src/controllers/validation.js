export const overTwo = name => {
  return name.length >= 2;
};

export const notDuplicateStation = (name, list) => {
  return !list.includes(name);
};

export const notDuplicateLine = (name, list) => {
  for (let element of list) {
    if (element.name == name) return false;
  }
  return true;
};

export const stationNotInLine = (stationName, lineList) => {
  for (let line of lineList) {
    if (line.list.includes(stationName)) {
      return false;
    }
  }
  return true;
};
