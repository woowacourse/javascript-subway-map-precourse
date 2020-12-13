import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (updatedLineName, deletedStationName) => {
  // 해당 라인은 업데이트 될 예정!
  // 기정 혹은 종점이 현재 라인 데이터에 있으면(객체지향 형태로 체크) 기점 혹은 정보 데이터 갱신
  // 구간 관리에서 삭제하면(true처리) ui업데이트, 아니면 안함
  console.log(updatedLineName, deletedStationName);
};
