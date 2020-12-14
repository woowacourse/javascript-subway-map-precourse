import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import deleteStationFromLine from "../common/deleteStationFromLine.js";

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
  updateLineListInfo(updatedLineNameList, deletedStation);
};
