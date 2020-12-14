import { Station } from '../../classes/station.js';
import { deleteItemFromTable } from '../../utils/util-table.js';
import { deleteItemFromLocalStroage } from '../../utils/util-local-storage.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 1. 역 관리 - 기존 역 삭제 요청
export const requestToDeleteStation = (e, menu) => {
  const button = e.currentTarget;
  const stationName = button.dataset[menu];
  const station = new Station(stationName);
  const exception = station.unableToDeleteStation();

  if (exception) {
    return processException(exception);
  }
  updateLocalStorage(menu, stationName);
  updateUI(button);
};

const processException = (exception) => {
  alert(EXCEPTION_MESSAGE[exception]);
};

const updateLocalStorage = (menu, stationName) => {
  deleteItemFromLocalStroage(menu, stationName);
};

const updateUI = (button) => {
  deleteItemFromTable(button);
};
