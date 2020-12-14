import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import updateUI from "./updateUI.js";

export default (sectionData) => {
  const { lineName } = sectionData;
  // map 함수 이용해서 추가시키고 리듀서에 저장하기.
  updateUI(lineName);
};
