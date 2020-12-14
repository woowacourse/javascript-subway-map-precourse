import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (updatedLineName, deletedStation) => {
  const updatedLineData = lineSelector().map((lineInfo) => {
    if (lineInfo.lineName === updatedLineName)
      lineInfo.deleteStation(deletedStation);
    return lineInfo;
  });
  lineReducer(updatedLineData);
};
