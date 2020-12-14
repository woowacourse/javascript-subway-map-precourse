import {
  DELETE_STATION_INPUT,
  DELETE_LINE_BUTTON,
  DELETE_SECTION_BUTTON,
} from "../../../common/IdAndClassNames.js";

export const tableTitleList = ["🚉 지하철 역 목록", "🚉 지하철 노선 목록", ""];
export const tableHeaderList = [
  ["역 이름", "설정"],
  ["노선 이름", "상행 종점역", "하행 종점역", "설정"],
  ["순서", "이름", "설정"],
];
export const deleteHelperText = ["삭제", "삭제", "노선에서 제거"];
export const deleteButtonClass = [
  DELETE_STATION_INPUT,
  DELETE_LINE_BUTTON,
  DELETE_SECTION_BUTTON,
];
