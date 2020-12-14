import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import {LINE_TAB_INDEX} from "../../common/constants.js";
import updateTable from "../common/updateTable.js";

export default (newLineInfo) => {
  const updatedLineList = lineSelector();
  updatedLineList.push(newLineInfo);
  lineReducer(updatedLineList);
};
