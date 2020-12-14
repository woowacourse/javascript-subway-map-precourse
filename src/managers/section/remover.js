import { Line } from '../../classes/line.js';
import { createSectionManagerUI as updateUI } from './launcher.js';
import {
  getItemFromLocalStorage,
  deleteSubItemFromLocalStorage,
} from '../../util/util-local-storage.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';
import { getNthParent } from '../../util/util-ui.js';

// 3. 구간 관리 - 기존 구간 삭제 요청
export const requestToDeleteSection = (e, menu) => {
  const button = e.currentTarget;
  const tableDiv = getNthParent(button, 5);
  const lineName = tableDiv.id;
  const subContainer = getNthParent(tableDiv, 1);
  const stationName = button.dataset[menu];
  const stationList = getItemFromLocalStorage('line', lineName).stationList;
  const line = new Line(lineName, stationList);
  const exception = line.unableToDeleteSection();

  if (exception) {
    return processException(exception);
  }
  updateLocalStorage(stationName, line);
  updateUI(menu, subContainer, line);
};

const processException = (exception) => {
  alert(EXCEPTION_MESSAGE[exception]);
};

const updateLocalStorage = (stationName, line) => {
  deleteSubItemFromLocalStorage('line', 'stationList', line.name, stationName);
  deleteSubItemFromLocalStorage('station', 'lineList', stationName, line.name);
};
