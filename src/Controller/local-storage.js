import {KEY} from '../constant.js';

export const addSectionOnLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  const sectionIndex = localStorageValue.findIndex(
    (line) => line.lineName === value.lineName,
  );
  localStorageValue[sectionIndex].station.splice(
    value.number,
    0,
    value.sectionName,
  );

  return localStorage.setItem(key, JSON.stringify([...localStorageValue]));
};

export const setLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  if (localStorageValue === null) {
    return localStorage.setItem(key, JSON.stringify([value]));
  }

  return localStorage.setItem(
    key,
    JSON.stringify([...localStorageValue, value]),
  );
};

export const getLocalStorage = (key) => {
  const localStorageValue = JSON.parse(localStorage.getItem(key));

  return localStorageValue;
};

export const removeSectionOnLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  const sectionIndex = localStorageValue.findIndex(
    (line) => line.lineName === value.lineName,
  );
  localStorageValue[sectionIndex].station = localStorageValue[
    sectionIndex
  ].station.filter((station) => station !== value.station);

  return localStorage.setItem(key, JSON.stringify([...localStorageValue]));
};

export const removeLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  const filteredStorage = localStorageValue.filter((storage) => {
    if (key === KEY.STATION) {
      return storage !== value;
    }
    if (key === KEY.LINE) {
      return storage.lineName !== value;
    }
  });

  return localStorage.setItem(key, JSON.stringify(filteredStorage));
};
