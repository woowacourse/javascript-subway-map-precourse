import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (updatedLineNameList, deletedStation) => {
  if (!updatedLineNameList) return;
  updatedLineNameList.forEach((updatedLineName) => {
    const updatedLineData = lineSelector().map((lineInfo) => {
      if (lineInfo.lineName === updatedLineName)
        lineInfo.deleteStation(deletedStation);
      return lineInfo;
    });
    lineReducer(updatedLineData);
  });
};
