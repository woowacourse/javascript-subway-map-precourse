import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (deleteValue, index) => {
  const updatedLineList = lineSelector()
    .map((lineData) => lineData.lineName)
    .slice(0, index)
    .concat(lineSelector().slice(index + 1, lineSelector().length));
  lineReducer(updatedLineList);
};
