import {
  emptyElement,
  requestInputAgain,
  addEventListenerOnDeleteButton,
} from '../../util/util-ui.js';
import { addItemToLocalStroage } from '../../util/util-local-storage.js';
import { addItemToTable } from '../../util/util-table.js';
import { Station } from '../../classes/station.js';

// 1. 역 관리 - 신규 역 추가 요청
export const requestToAdd = (menu) => {
  const stationNameInput = document.getElementById(`${menu}-name-input`);
  const station = new Station(stationNameInput.value);
  const exception = station.unableToAdd();
  let button;

  if (exception) {
    alert(exception);
    return requestInputAgain(stationNameInput);
  }
  addItemToLocalStroage(menu, station);
  addItemToTable(menu, station);
  button = document.querySelector(`[data-${menu}="${station.name}"]`);
  addEventListenerOnDeleteButton(button, menu);
  emptyElement(stationNameInput);
};
