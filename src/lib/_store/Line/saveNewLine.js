import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (newLineInfo) => {
  const updatedLineList = lineSelector();
  updatedLineList.push(newLineInfo);
  lineReducer(updatedLineList);
};
