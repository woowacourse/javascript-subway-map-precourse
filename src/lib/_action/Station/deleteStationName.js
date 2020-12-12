import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { stationSelector } from "../../_store/selectors.js";
import deleteStationData from "../../_store/Station/deleteStationData.js";

// 삭제할 인덱스는 여기서 찾읍시다!!

export default (deleteValue) => {
  if (!confirm(DELETE_MESSAGE)) return null;
  const index = stationSelector().indexOf(deleteValue);
  return new Promise((resolve) => {
    resolve(deleteStationData(deleteValue, index));
  });
};
