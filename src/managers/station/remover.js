import { deleteItemFromLocalStroage } from '../../util/util-local-storage.js';
import { deleteItemFromTable } from '../../util/util-table.js';
import { Station } from '../../classes/station.js';
import { EXCEPTION_MESSAGE } from '../../configuration.js';

// 1. 역 관리 - 기존 역 삭제 요청
export const requestToDelete = (e, menu) => {
  const button = e.currentTarget;
  const stationName = button.dataset[menu];
  const station = new Station(stationName);
  const exception = station.unableToDelete();

  if (exception) {
    return processException(exception);
  }
  deleteItemFromLocalStroage(menu, station);
  deleteItemFromTable(button);
};

const processException = (exception) => {
  alert(EXCEPTION_MESSAGE[exception]);
};
