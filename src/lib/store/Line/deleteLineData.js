import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import { LINE_TAB_INDEX } from "../../common/constants.js";
import updateTable from "../common/updateTable.js";

export default (deleteValue, index) => {
  const originalLineList = lineSelector();
  const updatedLineList = originalLineList
    .slice(0, index)
    .concat(lineSelector().slice(index + 1, lineSelector().length));
  lineReducer(updatedLineList);
  updateTable({ tabIndex: LINE_TAB_INDEX });
};
