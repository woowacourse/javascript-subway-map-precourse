import {LINE, STATION} from '../constants.js';
import {getList, getIndex, createStationOption} from '../util/storageAccess.js';
import {deleteLineStorage} from '../util/line.js';
import {clearHTML} from './init-ui.js';

export function resetLineTable() {
  clearHTML(LINE.TABLE);
  const lineList = getList(LINE.LISTNAME);
  for (let i=0; i<lineList.length; i++) {
    const line = getList(lineList[i]);
    addLineTableRow(lineList[i], line[0], line[line.length-1]);
  }
}

export function resetStartOption() {
  clearHTML(LINE.START);
  const stationList = getList(STATION.LISTNAME);
  for (let i=0; i<stationList.length; i++) {
    createStationOption(LINE.START, stationList[i]);
  }
}

export function resetEndOption() {
  clearHTML(LINE.END);
  const stationList = getList(STATION.LISTNAME);
  for (let i=0; i<stationList.length; i++) {
    createStationOption(LINE.END, stationList[i]);
  }
}

export function addLineTableRow(lineName, startStation, endStation) {
  const row = LINE.TABLE.insertRow(-1);
  const name = row.insertCell(0);
  const start = row.insertCell(1);
  const end = row.insertCell(2);
  const button = row.insertCell(3);

  name.append(document.createTextNode(lineName));
  start.append(document.createTextNode(startStation));
  end.append(document.createTextNode(endStation));
  button.append(createLineDeleteButton(lineName));
}

function deleteLineTableRow(lineName) {
  LINE.TABLE.deleteRow(getIndex(lineName, LINE.LISTNAME));
}

function createLineDeleteButton(lineName) {
  const lineDeleteButton = document.createElement('button');
  lineDeleteButton.innerText = LINE.DELETEMESSAGE;

  lineDeleteButton.addEventListener('click', () => {
    deleteLineTableRow(lineName);
    deleteLineStorage(lineName);
  });

  return lineDeleteButton;
}
