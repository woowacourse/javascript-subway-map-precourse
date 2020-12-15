import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import deleteStationFromLine from "../common/deleteStationFromLine.js";
import updateTable from "../common/updateTable.js";
import { STATION_TAB_INDEX } from "../../common/constants.js";

const updateLineListInfo = (updatedLineNameList, deletedStation) => {
  if (!updatedLineNameList) return;
  updatedLineNameList.forEach((updatedLineName) =>
    deleteStationFromLine(updatedLineName, deletedStation),
  );
};

export default (deletedStation, index, updatedLineNameList) => {
  const originalStationList = stationSelector();
  const updatedStationList = originalStationList
    .slice(0, index)
    .concat(stationSelector().slice(index + 1, stationSelector().length));
  stationReducer(updatedStationList);
  updateLineListInfo(updatedLineNameList, deletedStation);
  updateTable({ tabIndex: STATION_TAB_INDEX });
};
