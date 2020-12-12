import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import deleteStationData from "../../_store/Station/deleteStationData.js";

export default (deleteValue, index) => {
  if (!confirm(DELETE_MESSAGE)) return null;
  return new Promise((resolve) => {
    resolve(deleteStationData(deleteValue, index));
  });
};
