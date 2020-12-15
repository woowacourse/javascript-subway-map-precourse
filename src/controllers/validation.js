export const geTwo = name => {
  return name.length >= 2;
};

export const gtTwo = selectedLineList => {
  return selectedLineList.length > 2;
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

export const stationNotInLine = (station, lineList) => {
  for (let line of lineList) {
    if (line.list.includes(station)) {
      return false;
    }
  }
  return true;
};

export const notFirstOrLast = (order, lineList) => {
  return order > 0 && order <= lineList.length - 1;
};

export const stationNotInSelectedLine = (station, selectedLineList) => {
  return !selectedLineList.includes(station);
};
