import { addEventListenerOnDeleteButton } from './launcher.js';
import { emptyElement, requestInputAgain } from '../../util/util-ui.js';
import { addItemToLocalStroage } from '../../util/util-local-storage.js';
import { refreshTable } from '../../util/util-table.js';
import { Station } from '../../classes/station.js';

// 1. 역 관리 - 신규 역 추가 요청
export const requestToAdd = (index, menu) => {
  const stationNameInput = document.getElementById('station-name-input');
  const station = new Station(stationNameInput.value);
  const exception = station.unableToAdd();

  if (exception) {
    alert(exception);
    return requestInputAgain(stationNameInput);
  }
  addItemToLocalStroage(station, menu);
  refreshTable(index, menu, addEventListenerOnDeleteButton);
  emptyElement(stationNameInput);
};
