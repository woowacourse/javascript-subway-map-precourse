import { Line } from '../../classes/line.js';
import { createSectionManagerUI } from './launcher.js';
import {
  getItemFromLocalStorage,
  addSubItemToLocalStroage,
} from '../../util/util-local-storage.js';
import { emptyElement } from '../../util/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 3. 구간 관리 - 신규 구간 추가 요청
export const requestToAddSection = (menu, lineSelected) => {
  const subContainer = document.getElementById('sub-container');
  const line = new Line(
    lineSelected.name,
    getItemFromLocalStorage('line', lineSelected.name).stationList
  );
  const stationSelector = document.getElementById(`${menu}-station-selector`);
  const orderInput = document.getElementById(`${menu}-order-input`);
  const exception = line.unableToAddSection(
    stationSelector.value,
    orderInput.value
  );

  if (exception) {
    return processException(exception, stationSelector, orderInput);
  }
  addNewSection(menu, line, stationSelector.value, orderInput.value);
  createSectionManagerUI(menu, subContainer, line);
};

const processException = (exception, select, input) => {
  alert(EXCEPTION_MESSAGE[exception]);
  if (exception === 'sectionAleardyRegistered') {
    return select.focus();
  }
  emptyElement(input);
  return input.focus();
};

const addNewSection = (menu, line, stationName, order) => {
  addSubItemToLocalStroage(
    'line',
    'stationList',
    line.name,
    stationName,
    order
  );
  addSubItemToLocalStroage('station', 'lineList', stationName, line.name);
};
