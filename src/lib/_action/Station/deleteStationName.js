import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import deleteStationData from "../../_store/Station/deleteStationData.js";

// 삭제할 인덱스는 여기서 찾읍시다!!

export default (deleteValue, index) => {
  if (!confirm(DELETE_MESSAGE)) return null;
  return new Promise((resolve) => {
    resolve(deleteStationData(deleteValue, index));
  });
};
