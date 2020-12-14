import { Line } from '../../classes/line.js';
import { deleteItemFromTable } from '../../utils/util-table.js';
import {
  getItemFromLocalStorage,
  deleteItemFromLocalStroage,
  deleteSubItemFromLocalStorage,
} from '../../utils/util-local-storage.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 2. 노선 관리 - 기존 노선 삭제 요청
export const requestToDeleteLine = (e, menu) => {
  const button = e.currentTarget;
  const lineName = button.dataset[menu];
  const stationList = getItemFromLocalStorage('line', lineName).stationList;
  const line = new Line(lineName, stationList);
  const exception = line.unableToDeleteLine();

  if (exception) {
    return processException(exception);
  }
  updateLocalStorage(menu, line);
  updateUI(button);
};

const processException = (exception) => {
  alert(EXCEPTION_MESSAGE[exception]);
};

const updateLocalStorage = (menu, line) => {
  deleteItemFromLocalStroage(menu, line.name);
  line.stationList.forEach((stationName) =>
    deleteSubItemFromLocalStorage('station', 'lineList', stationName, line.name)
  );
};

const updateUI = (button) => {
  deleteItemFromTable(button);
};
