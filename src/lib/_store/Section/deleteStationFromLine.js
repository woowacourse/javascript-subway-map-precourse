import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (deletedStationName, updatedLineName) => {
  const isSectionManagement = updatedLineName !== null;


  // 구간 관리에서 삭제하면(true처리) ui업데이트, 아니면 안함
  console.log(updatedLineName, deletedStationName);
};
