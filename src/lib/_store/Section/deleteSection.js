import deleteStationFromLine from "../common/deleteStationFromLine.js";

export default (deletedStationName, updatedLineName) => {
  deleteStationFromLine(updatedLineName, deletedStationName);
};
