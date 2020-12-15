import {STATION, LINE, ERRORMESSAGE} from '../constants.js';
import {addItem, deleteItem, getList, getIndex} from './storageAccess.js';
import {addStationTableRow} from '../ui/station-ui.js';

STATION.ADD.addEventListener('click', () => {
  const stationName = STATION.INPUT.value;
  if (isStationNameShort(stationName)) {
    window.alert(ERRORMESSAGE.STATION_INVALID);
  }
  if (hasStationName(stationName)) {
    window.alert(ERRORMESSAGE.STATION_EXISTS);
  }
  if (isStationNameValid(stationName)) {
    addStationStorage(stationName);
    addStationTableRow(stationName);
  }
});

export function deleteStationStorage(stationName) {
  if (isStationDeletionValid(stationName)) {
    deleteItem(stationName, STATION.LISTNAME);
  }
}

export function addStationStorage(stationName) {
  addItem(stationName, STATION.LISTNAME, -1);
}

function isStationNameValid(stationName) {
  return (!hasStationName(stationName) && !isStationNameShort(stationName));
}

function hasStationName(stationName) {
  return (getIndex(stationName, STATION.LISTNAME)!==-1);
}

function isStationNameShort(stationName) {
  return stationName.length < STATION.VALIDNAMELENGTH;
}

export function isStationDeletionValid(stationName) {
  return !isStationInLine(stationName);
}

export function isStationInLine(stationName) {
  let result = false;
  const lineList = getList(LINE.LISTNAME);
  for (let i=0; i<lineList.length; i++) {
    const stationList = getList(lineList[i]);
    result = stationList.includes(stationName);
  }
  return result;
}
