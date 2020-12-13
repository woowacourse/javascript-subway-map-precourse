import { Line } from '../../classes/line.js';
import { deleteItemFromTable } from '../../util/util-table.js';
import {
  getItemFromLocalStorage,
  deleteItemFromLocalStroage,
  deleteSubItemFromLocalStorage,
} from '../../util/util-local-storage.js';
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
  deleteLine(menu, line, button);
};

const processException = (exception) => {
  alert(EXCEPTION_MESSAGE[exception]);
};

const deleteLine = (menu, line, button) => {
  deleteItemFromLocalStroage(menu, line);
  line.stationList.forEach((stationName) =>
    deleteSubItemFromLocalStorage('station', 'lineList', stationName, line)
  );
  deleteItemFromTable(button);
};
