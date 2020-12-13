import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { lineSelector } from "../../_store/selectors.js";
import deleteLineData from "../../_store/Line/deleteLineData.js";

export default (deletedLineName) => {
  if (!confirm(DELETE_MESSAGE)) return null;
  const index = lineSelector()
    .map(({ lineName }) => lineName)
    .indexOf(deletedLineName);
  return new Promise((resolve) => {
    resolve(deleteLineData(deletedLineName, index));
  });
};
