import { Station } from '../../classes/station.js';
import { requestToDelete } from './remover.js';
import { addItemToTable } from '../../util/util-table.js';
import { addItemToLocalStroage } from '../../util/util-local-storage.js';
import {
  emptyElement,
  addEventListenerOnDeleteButton,
} from '../../util/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 1. 역 관리 - 신규 역 추가 요청
export const requestToAdd = (menu) => {
  const stationNameInput = document.getElementById(`${menu}-name-input`);
  const station = new Station(stationNameInput.value);
  const exception = station.unableToAdd();

  if (exception) {
    return processException(exception, stationNameInput);
  }
  addNewStation(menu, station);
  emptyElement(stationNameInput);
};

const processException = (exception, input) => {
  alert(EXCEPTION_MESSAGE[exception]);
  emptyElement(input);
  input.focus();
};

const addNewStation = (menu, station) => {
  let button;

  addItemToLocalStroage(menu, station);
  addItemToTable(menu, station);
  button = document.querySelector(`[data-${menu}="${station.name}"]`);
  addEventListenerOnDeleteButton(button, menu, requestToDelete);
};
