import { stationSelector } from "../selectors.js";
import { stationReducer } from "../reducers.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

import getNewStationDataRowSet from "../../views/Station/getNewStationDataRowSet.js";
import convertTableRowDataToDOM from "../../views/components/subComponents/convertTableRowDataToDOM.js";

export default (deleteValue, index) => {
  const updatedStationList = stationSelector
    .slice(0, index)
    .concat(stationSelector.slice(index + 1, stationSelector.length));
  console.log(`${index} 번째 ${deleteValue} 역이 삭제될겁니다.`);
  console.log("before delete", stationSelector);
  console.log("after delete", updatedStationList);


  // 배열조작 후 업데이트
};
