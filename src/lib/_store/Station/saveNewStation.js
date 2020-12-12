import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

export default (stationName) => {
  const $dataTable = document
    .querySelector(STATION_LIST)
    .querySelector("tbody");

  stationSelector.push(stationName);
  stationReducer(stationSelector);
};
