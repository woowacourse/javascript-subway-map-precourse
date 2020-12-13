import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";

export default (newLineInfo) => {
  const lineList = lineSelector();
  console.log("새 노선이 로컬 스토리지에 저장됩니다.", newLineInfo);
  lineList.push(newLineInfo);
  console.log(lineList);
  console.log(JSON.stringify(lineList));
};
