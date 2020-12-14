export const Constant = {
  // 초기 화면 버튼
  STATION_MANAGER_BTN_ID: "#station-manager-button",
  LINE_MANAGER_BTN_ID: "#line-manager-button",
  SECTION_MANAGER_BTN_ID: "#section-manager-button",
  MAP_PRINT_MANAGER_BTN_ID: "#map-print-manager-button",

  // 각 화면 container
  STATION_CONTAINER_CLASS: ".station-container",
  LINE_CONTAINER_CLASS: ".line-container",
  SECTION_CONTAINER_CLASS: ".section-container",
  MAP_PRINT_CONTAINER_CLASS: ".map-print-container",

  // 역 관리
  STATION_ADD_BUTTON_ID: "#station-add-button",
  STATION_NAME_INPUT_ID: "#station-name-input",

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
