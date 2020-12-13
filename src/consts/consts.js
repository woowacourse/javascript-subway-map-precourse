export const stationManagerButtonId = "station-manager-button";
export const lineManagerButtonId = "line-manager-button";
export const sectionManagerButtonId = "section-manager-button";
export const mapPrintManagerButtonId = "map-print-manager-button";

export const buttonIdArray = [
  stationManagerButtonId,
  lineManagerButtonId,
  sectionManagerButtonId,
  mapPrintManagerButtonId,
];

export const container = document.getElementById("container");

export const textLabel = {
  STATION_PARAGRAPH: "역 이름",
  STATION_ADD_BUTTON: "역 추가",
  STATION_HEADING: "지하철 역 목록",
  STATION_INPUT: "역 이름을 입력해주세요.",
  DELETE: "삭제",
  CONFIRM: "정말로 삭제하시겠습니까?",

  LINE_PARAGRAPH: "노선 이름",
  LINE_START_SPAN: "상행 종점",
  LINE_END_SPAN: "하행 종점",
  LINE_ADD_BUTTON: "노선 추가",
  LINE_HEADING: "지하철 노선 목록",
  LINE_INPUT: "노선 이름을 입력해주세요"
};

export const htmlLabel = {
  STATION_TABLE: `<tr><th>역 이름</th><th>설정</th></tr>`,
  LINE_TABLE: `<tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr>`,
};
