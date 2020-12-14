import { Line } from '../../classes/line.js';
import { appendSectionManagerUI as updateUI } from './section-launcher.js';
import {
  getItemFromLocalStorage,
  deleteSubItemFromLocalStorage,
} from '../../utils/util-local-storage.js';
import { getNthParent } from '../../utils/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

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
