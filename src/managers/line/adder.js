import { Line } from '../../classes/line.js';
import { addItemToTable } from '../../util/util-table.js';
import {
  addItemToLocalStroage,
  addSubItemToLocalStroage,
} from '../../util/util-local-storage.js';
import {
  emptyElement,
  addEventListenerOnDeleteButton,
} from '../../util/util-ui.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 2. 노선 관리 - 신규 노선 추가 요청
export const requestToAdd = (menu) => {
  const lineNameInput = document.getElementById(`${menu}-name-input`);
  const start = document.getElementById('line-start-station-selector');
  const end = document.getElementById('line-end-station-selector');
  const line = new Line(lineNameInput.value, start.value, end.value);
  const exception = line.unableToAdd();

  if (exception) {
    return processException(exception, lineNameInput, start);
  }
  addNewLine(menu, line, start.value, end.value);
  emptyElement(lineNameInput);
};

const processException = (exception, input, start) => {
  alert(EXCEPTION_MESSAGE[exception]);
  if (exception === 'bothStartEndSame') {
    return start.focus();
  }
  if (exception === 'lineNameOnlySpace') {
    emptyElement(input);
    return input.focus();
  }
  if (exception === 'lineNameAlreadyExist') {
    emptyElement(input);
    return input.focus();
  }
};

const addNewLine = (menu, line, startStation, endStation) => {
  let button;

  addItemToLocalStroage(menu, line);
  addSubItemToLocalStroage('station', line, startStation, 'lineList');
  addSubItemToLocalStroage('station', line, endStation, 'lineList');
  addItemToTable(menu, line);
  button = document.querySelector(`[data-${menu}="${line.name}"]`);
  addEventListenerOnDeleteButton(button, menu);
};
