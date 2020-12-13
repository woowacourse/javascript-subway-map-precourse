import {
  SELECT_START_STATION,
  SELECT_END_STATION,
} from "../../common/IdAndClassNames.js";
import saveNewLine from "../../_store/Line/saveNewLine.js";

export default (newLineInfo) => {
  const $selectStartStation = document.querySelector(SELECT_START_STATION);
  const $selectEndStation = document.querySelector(SELECT_END_STATION);

  console.log($selectStartStation);

  // 상행 종점 !== 하행 종점
  return new Promise((resolve, reject) => {
    resolve(saveNewLine(newLineInfo));
  });
};
