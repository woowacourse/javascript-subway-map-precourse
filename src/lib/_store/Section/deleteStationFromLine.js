import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (deletedStationName, updatedLineName, isSectionManagement) => {
  // 해당하는 노선 업데이트 처리

  // 섹션 구간이 true면 UI 업데이트
  console.log(updatedLineName, deletedStationName);
};
