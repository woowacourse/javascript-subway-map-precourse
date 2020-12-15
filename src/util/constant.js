export const Constant = {
  // 초기 화면 버튼
  STATION_MANAGER_BTN_ID: "#station-manager-button",
  LINE_MANAGER_BTN_ID: "#line-manager-button",
  SECTION_MANAGER_BTN_ID: "#section-manager-button",
  MAP_PRINT_MANAGER_BTN_ID: "#map-print-manager-button",

  // 역 관리
  STATION_CONTAINER_CLASS: ".station-container",
  STORAGE_KEY_STATION: "stations",
  STATION_ADD_BUTTON_ID: "#station-add-button",
  STATION_NAME_INPUT_ID: "#station-name-input",
  STATION_DELELE_BUTTON_CLASS: ".station-delete-button",

  // 노선 관리
  LINE_CONTAINER_CLASS: ".line-container",
  STORAGE_KEY_LINE: "lines",
  LINE_START_STATION_SELECTOR_ID: "#line-start-station-selector",
  LINE_END_STATION_SELECTOR_ID: "#line-end-station-selector",
  LINE_ADD_BUTTON_ID: "#line-add-button",
  LINE_NAME_INPUT_ID: "#line-name-input",

  // 구간 관리
  SECTION_CONTAINER_CLASS: ".section-container",
  SECTION_LINE_MENU_CLASS: ".section-line-menu",
  SECTION_MANAGER_CLASS: ".section-manager",
  SECTION_MANAGER_TITLE_CLASS: ".section-manager-title",
  SECTION_STATION_SELECTOR_ID: "#section-station-selector",
  SECTION_ADD_BUTTON_ID: "#section-add-button",
  SECTION_ORDER_INPUT_ID: "#section-order-input",

  // 지하철 노선 관리
  MAP_PRINT_CONTAINER_CLASS: ".map-print-container",

  // validation
  MINIMUM_LENGTH: 2,
  REGEX_CATCHING_WHITESPACE: /^\s*$/,
  REGEX_CATCHING_INTEGER: /^[0-9 ()+-]+$/,

  // tag 관련
  CLICK: "click",
  NONE: "none",
  BLOCK: "block",
  TBODY: "tbody",
  BUTTON: "BUTTON",
};

export const ErrorMessage = {
  // 공통
  DUPLICATED_STATION_NAME: "중복되지 않은 역 이름을 입력해 주세요.",

  // 역 관리
  MINIMUM_NAME_LENGTH: "공백이 아닌 2글자 이상의 역 이름을 입력해 주세요.",
  STATION_RELATED_LINE: "노선에 포함된 역은 제거할 수 없습니다.",

  // 노선 관리
  NAME_WHITE_SPACE: "공백이 아닌 노선 이름을 입력해 주세요.",
  SAME_START_END_STATION: "서로 다른 종점을 선택해 주세요.",
  DUPLICATED_START_END_STATION: "기존 노선과 다른 상행, 하행 종점을 선택해 주세요.",
  DUPLICATED_LINE_NAME: "중복되지 않은 노선 이름을 입력해 주세요.",

  // 구간 관리
  NOT_INTEGER_ORDER: "1 이상 정수의 순서를 입력해 주세요.",
  MINIMUM_ORDER: "1 이상의 순서를 입력해 주세요.",
  MINIMUM_STATIONS: "노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없습니다.",
};

export const ConfirmMessage = {
  CHECK_DELETION: "정말로 삭제하시겠습니까?",
  CHECK_DELETION_FROM_LINE: "정말로 노선에서 삭제하시겠습니까?",
};
