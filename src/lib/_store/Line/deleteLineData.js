import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import { LINE_LIST } from "../../common/IdAndClassNames.js";
import getNewLineDataRowSet from "../../views/Line/getNewLineDataRowSet.js";
import convertTableRowDataToDOM from "../../views/components/subComponents/convertTableRowDataToDOM.js";

const updateUI = (updatedLineList) => {
  const $dataTable = document
    .querySelector(LINE_LIST)
    .querySelector("tbody");
  const updatedLineDataList = getNewLineDataRowSet(updatedLineList);
  const $updatedLineDataList = updatedLineDataList.map(
    (updatedStationData) => convertTableRowDataToDOM(updatedStationData),
  );

  $dataTable.innerHTML = "";
  $updatedLineDataList.forEach(($tr) => $dataTable.appendChild($tr));
};

export default (deleteValue, index) => {
  const updatedLineList = lineSelector()
    .map((lineData) => lineData.lineName)
    .slice(0, index)
    .concat(lineSelector().slice(index + 1, lineSelector().length));
  lineReducer(updatedLineList);
  updateUI(updatedLineList);
};
