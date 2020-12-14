import { Station } from '../../classes/station.js';
import { requestToDeleteStation } from './station-remover.js';
import { addItemToTable } from '../../utils/util-table.js';
import {
  addItemToLocalStroage,
  getArrayFromLocalStorage,
} from '../../utils/util-local-storage.js';
import {
  emptyElement,
  addEventListenerOnDeleteButton,
} from '../../utils/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 1. 역 관리 - 신규 역 추가 요청
export const requestToAddStation = (menu) => {
  const stationNameInput = document.getElementById(`${menu}-name-input`);
  const stationList = getArrayFromLocalStorage('station');
  const station = new Station(stationNameInput.value);
  const exception = station.unableToAddStation(stationList);

  if (exception) {
    return processException(exception, stationNameInput);
  }
  updateLocalStorage(menu, station);
  updateUI(menu, stationNameInput, station);
};

const processException = (exception, input) => {
  alert(EXCEPTION_MESSAGE[exception]);
  emptyElement(input);
  input.focus();
};

const updateLocalStorage = (menu, station) => {
  addItemToLocalStroage(menu, station);
};

const updateUI = (menu, input, station) => {
  let button;
  
  addItemToTable(menu, station);
  emptyElement(input);
  button = document.querySelector(`[data-${menu}="${station.name}"]`);
  addEventListenerOnDeleteButton(button, menu, requestToDeleteStation);
};
