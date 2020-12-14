import { Station } from '../../classes/station.js';
import { deleteItemFromTable } from '../../util/util-table.js';
import { deleteItemFromLocalStroage } from '../../util/util-local-storage.js';
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
  deleteStation(menu, stationName, button);
};

const processException = (exception) => {
  alert(EXCEPTION_MESSAGE[exception]);
};

const deleteStation = (menu, stationName, button) => {
  deleteItemFromLocalStroage(menu, stationName);
  deleteItemFromTable(button);
};
