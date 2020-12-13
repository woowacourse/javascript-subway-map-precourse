import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (updatedLineName, deletedStationName) => {
  // 해당 라인은 업데이트 될 예정!
  // 기정 혹은 종점이 현재 라인 데이터에 있으면(객체지향 형태로 체크) 기점 혹은 정보 데이터 갱신
  console.log(updatedLineName, deletedStationName);
};
