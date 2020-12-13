import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import { LINE_LIST } from "../../common/IdAndClassNames.js";

import getNewLineDataRowSet from "../../views/Line/getNewLineDataRowSet.js";
import convertTableRowDataToDOM from "../../views/components/subComponents/convertTableRowDataToDOM.js";

const updateUI = (newLineInfo) => {
  const $dataTable = document.querySelector(LINE_LIST).querySelector("tbody");
  const [newLineDataRow] = getNewLineDataRowSet([newLineInfo]);
  const $newLineDataRow = convertTableRowDataToDOM(newLineDataRow);
  $dataTable.appendChild($newLineDataRow);
};

export default (newLineInfo) => {
  const updatedLineList = lineSelector();
  updatedLineList.push(newLineInfo);
  lineReducer(updatedLineList);
  updateUI(newLineInfo);
};
