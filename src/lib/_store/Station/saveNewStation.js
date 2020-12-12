import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";

export default (stationName) => {
  console.log(`${stationName}이 성공적으로 로컬스토리지에 저장됩니다.`);
  stationSelector.push(stationName);
  stationReducer(stationSelector);
  console.log("after", localStorage);
};
