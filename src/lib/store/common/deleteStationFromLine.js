import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (updatedLineName, deletedStation) => {
  const originalLineData = lineSelector();
  const updatedLineData = originalLineData.map((lineInfo) => {
    if (lineInfo.lineName === updatedLineName)
      lineInfo.deleteStation(deletedStation);
    return lineInfo;
  });
  lineReducer(updatedLineData);
};
