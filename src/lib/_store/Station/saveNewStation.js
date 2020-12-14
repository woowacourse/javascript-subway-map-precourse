import { stationSelector } from "../selectors.js";
import { STATION_TAB_INDEX } from "../../common/constants.js";
import updateTable from "../common/updateTable.js";
import { stationReducer } from "../reducers.js";

export default (stationName) => {
  const updatedStationDataList = [...stationSelector(), stationName];
  //stationReducer(updatedStationDataList);
  updateTable({ STATION_TAB_INDEX });
};
