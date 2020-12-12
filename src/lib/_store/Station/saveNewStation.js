import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

import getNewStationDataRowSet from "../../views/Station/getNewStationDataRowSet.js";
import convertTableRowDataToDOM from "../../views/components/subComponents/convertTableRowDataToDOM.js";

export default (stationName) => {
  const $dataTable = document
    .querySelector(STATION_LIST)
    .querySelector("tbody");
  const [newStationDataRow] = getNewStationDataRowSet([stationName]);
  const $newStationDataRow = convertTableRowDataToDOM(newStationDataRow);

  stationSelector.push(stationName);
  stationReducer(stationSelector);
  $dataTable.appendChild($newStationDataRow);
};
