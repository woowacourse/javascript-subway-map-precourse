import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

import deleteStationFromLine from "../common/deleteStationFromLine.js";
import getNewStationDataRowSet from "../../views/Station/getNewStationDataRowSet.js";
import convertTableRowDataToDOM from "../../views/components/subComponents/convertTableRowDataToDOM.js";

const updateUI = (updatedStationList) => {
  const $dataTable = document
    .querySelector(STATION_LIST)
    .querySelector("tbody");
  const updatedStationDataList = getNewStationDataRowSet(updatedStationList);
  const $updatedStationDataList = updatedStationDataList.map(
    (updatedStationData) => convertTableRowDataToDOM(updatedStationData),
  );

  $dataTable.innerHTML = "";
  $updatedStationDataList.forEach(($tr) => $dataTable.appendChild($tr));
};

const updateLineListInfo = (updatedLineNameList, deletedStation) => {
  if (!updatedLineNameList) return;
  updatedLineNameList.forEach((updatedLineName) =>
    deleteStationFromLine(updatedLineName, deletedStation),
  );
};

export default (deletedStation, index, updatedLineNameList) => {
  const updatedStationList = stationSelector()
    .slice(0, index)
    .concat(stationSelector().slice(index + 1, stationSelector().length));
  stationReducer(updatedStationList);
  updateUI(updatedStationList);
  updateLineListInfo(updatedLineNameList, deletedStation);
};
