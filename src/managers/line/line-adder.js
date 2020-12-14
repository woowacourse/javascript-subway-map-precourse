import { Line } from '../../classes/line.js';
import { requestToDeleteLine } from './line-remover.js';
import { addItemToTable } from '../../utils/util-table.js';
import {
  getArrayFromLocalStorage,
  addItemToLocalStroage,
  addSubItemToLocalStroage,
} from '../../utils/util-local-storage.js';
import {
  emptyElement,
  addEventListenerOnDeleteButton,
} from '../../utils/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 2. 노선 관리 - 신규 노선 추가 요청
export const requestToAddLine = (menu) => {
  const lineList = getArrayFromLocalStorage('line');
  const lineNameInput = document.getElementById(`${menu}-name-input`);
  const start = document.getElementById(`${menu}-start-station-selector`);
  const end = document.getElementById(`${menu}-end-station-selector`);
  const line = new Line(lineNameInput.value, [start.value, end.value]);
  const exception = line.unableToAddLine(lineList);

  if (exception) {
    return processException(exception, lineNameInput, start);
  }
  updateLocalStorage(menu, line, start.value, end.value);
  updateUI(menu, line, lineNameInput);
};

const processException = (exception, input, start) => {
  alert(EXCEPTION_MESSAGE[exception]);
  if (exception === 'BOTH_START_END_STATION_SAME') {
    return start.focus();
  }
  emptyElement(input);
  return input.focus();
};

const updateLocalStorage = (menu, line, startStationName, endStationName) => {
  addItemToLocalStroage(menu, line);
  addSubItemToLocalStroage('station', 'lineList', startStationName, line.name);
  addSubItemToLocalStroage('station', 'lineList', endStationName, line.name);
};

const updateUI = (menu, line, input) => {
  let button;

  addItemToTable(menu, line);
  button = document.querySelector(`[data-${menu}="${line.name}"]`);
  addEventListenerOnDeleteButton(button, menu, requestToDeleteLine);
  emptyElement(input);
};
