import {deleteStationStorage, isStationDeletionValid, isStationInLine} from '../util/station.js';
import {clearHTML} from './init-ui.js';
import {STATION, ERRORMESSAGE} from '../constants.js';
import {getIndex, getList} from '../util/storageAccess.js';

export function resetStationTable() {
  clearHTML(STATION.TABLE);
  const stationList = getList(STATION.LISTNAME);
  for (let i=0; i<stationList.length; i++) {
    addStationTableRow(stationList[i]);
  }
}

export function addStationTableRow(stationName) {
  const row = STATION.TABLE.insertRow(-1);
  const name = row.insertCell(0);
  const button = row.insertCell(1);

  name.append(document.createTextNode(stationName));
  button.append(createStationDeleteButton(stationName));
}

function createStationDeleteButton(stationName) {
  const stationDeleteButton = document.createElement('button');
  stationDeleteButton.innerText = STATION.DELETEMESSAGE;

  stationDeleteButton.addEventListener('click', () => {
    if (isStationInLine(stationName)) {
      window.alert(ERRORMESSAGE.STATION_INLINE);
    }  
    if (isStationDeletionValid(stationName)) {
      deleteStationTableRow(stationName);
      deleteStationStorage(stationName);
    }
  });

  return stationDeleteButton;
}

function deleteStationTableRow(stationName) {
  STATION.TABLE.deleteRow(getIndex(stationName, STATION.LISTNAME));
}
