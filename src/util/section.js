import {SECTION} from '../constants.js';
import {addItem, deleteItem, getIndex, getList} from './storageAccess.js';

export function addSectionStorage(stationName, lineName, index) {
  addItem(stationName, lineName, index);
}

export function deleteSectionStorage(stationName, lineName) {
  deleteItem(stationName, lineName);
}

export function isAdditionValid(stationName, lineName, index) {
  return (!hasStationInLine(stationName, lineName) && !isIndexOutOfRange(lineName, index));
}

export function hasStationInLine(stationName, lineName) {
  return (getIndex(stationName, lineName)!==-1);
}

export function isIndexOutOfRange(lineName, index) {
  const stationList = getList(lineName);
  return (index<0 || stationList.length<index);
}

export function isDeletionValid(stationName, lineName) {
  return hasEnoughStations(lineName);
}

export function hasEnoughStations(lineName) {
  const stationList = getList(lineName);
  return (stationList.length > SECTION.VALIDSECTIONLENGTH);
}
