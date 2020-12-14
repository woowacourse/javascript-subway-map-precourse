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

export const alertLabel = {
  STATION_NUMBER_MINIMUM: "역은 반드시 두개 이상 존재해야 합니다!",
  STATION_IN_LINE: "노선에 등록된 역은 삭제할 수 없습니다!",

  LINE_START_END_EQUAL: "상행 종점과 하행 종점은 같을 수 없습니다!",
  LINE_NAME_ALREADY_EXISTS: "이미 존재하는 노선 이름입니다!",
  LINE_STATION_ALREADY_EXISTS: "이미 다른 노선에 역이 포함되어 있습니다!",
};

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
  LINE_INPUT: "노선 이름을 입력해주세요",

  SECTION_HEADING: "구간을 수정할 노선을 선택해주세요.",
  SECTION_CONTAINER_PARAGRAPH: "구간 등록",
  SECTION_ADD_BUTTON: "등록",
  SECTION_DELETE_BUTTON: "노선에서 제거",
  SECTION_INPUT: "순서",
};

export const htmlLabel = {
  STATION_TABLE: `<tr><th>역 이름</th><th>설정</th></tr>`,
  LINE_TABLE: `<tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr>`,
  SECTION_TABLE: `<tr><th>순서</th><th>이름</th><th>설정</th></tr>`,
};
