import {STATION, LINE} from '../constants.js';

export function initStorage() {
  if (!localStorage.getItem(STATION.LISTNAME)) {
    localStorage.setItem(STATION.LISTNAME, STATION.INITLIST);
  }
  if (!localStorage.getItem(LINE.LISTNAME)) {
    localStorage.setItem(LINE.LISTNAME, LINE.INITLIST);
  }
  console.log(localStorage);
}

export function addItem(item, listName, index) {
  const storageList = getList(listName);
  storageList.splice(index, 0, item);
  localStorage.setItem(listName, JSON.stringify(storageList));
}

export function deleteItem(item, listName) {
  const storageList = getList(listName);
  storageList.splice(storageList.indexOf(item), 1);
  localStorage.setItem(listName, JSON.stringify(storageList));
}

export function getIndex(item, listName) {
  const storageList = getList(listName);
  return storageList.indexOf(item);
}

export function getList(listName) {
  return JSON.parse(localStorage.getItem(listName));
}

export function createStationOption(select, station) {
  const option = document.createElement('option');
  option.text = station;
  select.add(option);
}
