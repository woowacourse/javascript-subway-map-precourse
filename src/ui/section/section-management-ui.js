import {ERRORMESSAGE, SECTION, STATION} from '../../constants.js';
import {getList, createStationOption} from '../../util/storageAccess.js';
import {addSectionStorage, isAdditionValid, isIndexOutOfRange} from '../../util/section.js';
import {setTemplateVisible, clearHTML} from '../init-ui.js';
import {resetSectionTable, addSectionTableRow, resetTableIndexColumn} from './section-management-table-ui.js';

export function openLineManagement(lineName) {
  setTemplateVisible(SECTION.MANAGEMENT);
  SECTION.MANAGEMENT_TITLE.innerText = `${lineName} ${SECTION.MANAGEMENT_NAME}`;
  SECTION.TABLE.dataset.line = lineName;
  resetStationOption();
  resetSectionTable(lineName);
  resetAddButtonLinePointer(lineName);
}

function resetAddButtonLinePointer(lineName) {
  SECTION.ADD.addEventListener('click', () => {
    if (isIndexOutOfRange(lineName)) {
      window.alert(ERRORMESSAGE.SECTION_OUTOFRANGE);
    }
    if (isAdditionValid(SECTION.STATION.value, lineName, SECTION.ORDER.value)) {
      addSectionStorage(SECTION.STATION.value, lineName, parseInt(SECTION.ORDER.value));
      addSectionTableRow(SECTION.STATION.value, lineName, SECTION.ORDER.value);
      resetTableIndexColumn();
    }
  });
}

function resetStationOption() {
  clearHTML(SECTION.STATION);
  const stationList = getList(STATION.LISTNAME);
  for (let i=0; i<stationList.length; i++) {
    createStationOption(SECTION.STATION, stationList[i]);
  }
}
