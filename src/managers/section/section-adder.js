import { Line } from '../../classes/line.js';
import { appendSectionManagerUI as updateUI } from './section-launcher.js';
import {
  getItemFromLocalStorage,
  addSubItemToLocalStroage,
} from '../../utils/util-local-storage.js';
import { emptyElement } from '../../utils/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 3. 구간 관리 - 신규 구간 추가 요청
export const requestToAddSection = (menu, lineSelected) => {
  const subContainer = document.getElementById('sub-container');
  const stationSelector = document.getElementById(`${menu}-station-selector`);
  const orderInput = document.getElementById(`${menu}-order-input`);
  const line = new Line(
    lineSelected.name,
    getItemFromLocalStorage('line', lineSelected.name).stationList
  );
  const exception = line.unableToAddSection(
    stationSelector.value,
    orderInput.value
  );

  if (exception) {
    return processException(exception, stationSelector, orderInput);
  }
  updateLocalStorage(menu, line, stationSelector.value, orderInput.value);
  updateUI(menu, subContainer, line);
};

const processException = (exception, select, input) => {
  alert(EXCEPTION_MESSAGE[exception]);
  if (exception === 'SECTION_ALREADY_REGISTERED') {
    return select.focus();
  }
  emptyElement(input);
  return input.focus();
};

const updateLocalStorage = (menu, line, stationName, order) => {
  addSubItemToLocalStroage(
    'line',
    'stationList',
    line.name,
    stationName,
    order
  );
  addSubItemToLocalStroage('station', 'lineList', stationName, line.name);
};
