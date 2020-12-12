import { addEventListenerOnDeleteButton } from './launcher.js';
import { deleteItemFromLocalStroage } from '../../util/util-local-storage.js';
import { refreshTable } from '../../util/util-table.js';
import { Station } from '../../classes/station.js';

// 1. 역 관리 - 기존 역 삭제 요청
export const requestToDelete = (e, index, menu) => {
  const stationName = e.currentTarget.dataset[menu];
  const station = new Station(stationName);
  const exception = station.unableToDelete();

  if (exception) {
    return alert(exception);
  }
  deleteItemFromLocalStroage(station, menu);
  refreshTable(index, menu, addEventListenerOnDeleteButton);
};
