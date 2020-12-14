import updateLineListInfo from "../common/updateLineListInfo.js";

export default (deletedStationName, updatedLineList) => {
  updateLineListInfo(updatedLineList, deletedStationName);
};
