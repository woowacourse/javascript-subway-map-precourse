import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { lineSelector } from "../../_store/selectors.js";
import deleteLineData from "../../_store/Line/deleteLineData.js";

export default ({ lineName }) => {
  if (!confirm(DELETE_MESSAGE)) return null;
  const index = lineSelector()
    .map((lineData) => lineData.lineName)
    .indexOf(lineName);
  return new Promise((resolve) => {
    resolve(deleteLineData(lineName, index));
  });
};
