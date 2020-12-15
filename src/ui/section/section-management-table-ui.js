import {ERRORMESSAGE, SECTION} from '../../constants.js';
import {getList, getIndex} from '../../util/storageAccess.js';
import {deleteSectionStorage, hasEnoughStations, isDeletionValid} from '../../util/section.js';
import {clearHTML} from '../init-ui.js';

export function resetSectionTable(lineName) {
  clearHTML(SECTION.TABLE);
  const lineSection = getList(lineName);
  for (let i=0; i<lineSection.length; i++ ) {
    addSectionTableRow(lineSection[i], lineName, -1);
  }
}

export function addSectionTableRow(stationName, lineName, index) {
  const row = SECTION.TABLE.insertRow(index);
  const idx = row.insertCell(0);
  const name = row.insertCell(1);
  const button = row.insertCell(2);

  idx.append(document.createTextNode(getIndex(stationName, lineName)));
  name.append(document.createTextNode(stationName));
  button.append(createSectionDeleteButton(stationName, lineName));
}

function deleteSectionTableRow(stationName, lineName) {
  SECTION.TABLE.deleteRow(getIndex(stationName, lineName));
}

function createSectionDeleteButton(stationName, lineName) {
  const sectionDeleteButton = document.createElement('button');
  sectionDeleteButton.innerText = SECTION.DELETE_MESSAGE;
  sectionDeleteButton.dataset.station = stationName;
  sectionDeleteButton.dataset.line = lineName;

  sectionDeleteButton.addEventListener('click', () => {
    if (!hasEnoughStations(lineName)) {
      window.alert(ERRORMESSAGE.SECTION_ENOUGHSTATION);
    }
    if (isDeletionValid(stationName, lineName)) {
      deleteSectionTableRow(stationName, lineName);
      deleteSectionStorage(stationName, lineName);
      resetTableIndexColumn();
    }
  });
  return sectionDeleteButton;
}

export function resetTableIndexColumn() {
  const table = SECTION.TABLE.childNodes;
  for (let i=0; i<table.length; i++) {
    table[i].cells[0].innerText = i;
  }
}
