import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

import getNewStationDataRowSet from "../../views/Station/getNewStationDataRowSet.js";
import convertTableRowDataToDOM from "../../views/components/subComponents/convertTableRowDataToDOM.js";

const updateUI = (stationName) => {
  const $dataTable = document
    .querySelector(STATION_LIST)
    .querySelector("tbody");
  const [newStationDataRow] = getNewStationDataRowSet([stationName]);
  const $newStationDataRow = convertTableRowDataToDOM(newStationDataRow);
  $dataTable.appendChild($newStationDataRow);
};

export default (stationName) => {
  const updatedStationDataList = [...stationSelector(), stationName];
  stationReducer(updatedStationDataList);
  updateUI(stationName);
};
