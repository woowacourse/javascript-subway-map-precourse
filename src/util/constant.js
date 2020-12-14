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
  LINE_START_STATION_SELECTOR_ID: "#line-start-station-selector",
  LINE_END_STATION_SELECTOR_ID: "#line-end-station-selector",

  // 구간 관리
  SECTION_CONTAINER_CLASS: ".section-container",

  // 지하철 노선 관리
  MAP_PRINT_CONTAINER_CLASS: ".map-print-container",

  // 
  MINIMUM_NAME_LENGTH: 2,
  REGEX_CATCHING_WHITESPACE: /^\s*$/,

  // etc
  CLICK: "click",
  NONE: "none",
  BLOCK: "block",

  // tag
  TBODY: "tbody",
};

export const ErrorMessage = {
  MINIMUM_NAME_LENGTH: "공백이 아닌 2글자 이상의 역 이름을 입력해 주세요.",
  DUPLICATED_NAME: "중복되지 않은 역 이름을 입력해 주세요.",
};

export const ConfirmMessage = {
  CHECK_DELETION: "정말로 삭제하시겠습니까?",
};
