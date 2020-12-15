import {ERRORMESSAGE, LINE} from '../constants.js';
import {addItem, deleteItem, getIndex} from './storageAccess.js';
import {addLineTableRow} from '../ui/line-ui.js';

LINE.ADD.addEventListener('click', () => {
  const lineName = LINE.INPUT.value;
  if (!isLineNameValid(lineName)) {
    window.alert(ERRORMESSAGE.LINE_EXISTS);
  }
  if (!isLineLengthValid(LINE.START.value, LINE.END.value)) {
    window.alert(ERRORMESSAGE.LINE_RESET);
  }
  if (isLineNameValid(lineName) && isLineLengthValid(LINE.START.value, LINE.END.value)) {
    addLineStorage(lineName, LINE.START.value, LINE.END.value);
    addLineTableRow(lineName, LINE.START.value, LINE.END.value);
  }
});

export function addLineStorage(lineName, startStation, endStation) {
  addItem(lineName, LINE.LISTNAME, -1);
  localStorage.setItem(lineName, `["${startStation}","${endStation}"]`);
}

export function deleteLineStorage(lineName) {
  deleteItem(lineName, LINE.LISTNAME);
  localStorage.removeItem(lineName);
}

function isLineNameValid(lineName) {
  return !hasLineName(lineName);
}

function hasLineName(lineName) {
  return (getIndex(lineName, LINE.LISTNAME)!==-1);
}

function isLineLengthValid(start, end) {
  return !(start===end);
}
