import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";

export default (stationName) => {
  const updatedStationDataList = [...stationSelector(), stationName];
  stationReducer(updatedStationDataList);
};
