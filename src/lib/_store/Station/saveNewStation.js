import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

import getNewStationDataRowSet from "../../views/Station/getNewStationDataRowSet.js";
import addTableRow from "../../views/components/subComponents/addTableRow.js";

export default (stationName) => {
  const $dataTable = document
    .querySelector(STATION_LIST)
    .querySelector("tbody");

  

  stationSelector.push(stationName);
  stationReducer(stationSelector);
};
