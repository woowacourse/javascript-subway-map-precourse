export const DOM_MENU = {
  STATION_MANAGER_BUTTON_ID: "station-manager-button",
  LINE_MANAGER_BUTTON_ID: "line-manager-button",
  SECTION_MANAGER_BUTTON_ID: "section-manager-button",
  MAP_PRINT_MANAGER_BUTTON_ID: "map-print-manager-button",
  MENU_NAV_ID: "menu-nav",
};

export const DOM_STATION = {
  STATION_NAME_INPUT_ID: "station-name-input",
  STATION_ADD_BUTTON_ID: "station-add-button",
  STATION_DELETE_BUTTON_CLASS: "station-delete-button",
  STATION_FORM_ID: "station-form",
  STATION_LIST_TBODY_ID: "station-list-tbody",
};

export const DOM_LINE = {
  LINE_NAME_INPUT_ID: "line-name-input",
  LINE_START_STATION_SELECTOR_ID: "line-start-station-selector",
  LINE_END_STATION_SELECTOR_ID: "line-end-station-selector",
  LINE_ADD_BUTTON_ID: "line-add-button",
  LINE_DELETE_BUTTON_CLASS: "line-delete-button",
  LINE_NAME_FORM_ID: "line-name-form",
  LINE_LIST_TBODY_ID: "line-list-tbody",
};

export const DOM_SECTION = {
  SECTION_LINE_MENU_BUTTON_CLASS: "section-line-menu-button",
  SECTION_STATION_SELECTOR_ID: "section-station-selector",
  SECTION_ORDER_INPUT_ID: "section-order-input",
  SECTION_ADD_BUTTON_ID: "section-add-button",
  SECTION_DELETE_BUTTON_CLASS: "section-delete-button",
  SECTION_LINE_MENU_NAV_ID: "section-line-menu-nav",
  SECTION_ADD_FORM_ID: "section-add-form",
  SECTION_LIST_TBODY_ID: "section-list-tbody",
};

export const DOM_ID = {
  ID: "app",
};

export const INITIAL_STATE_ID = "station-manager-button";

export const ERROR_MESSAGE = {
  DELETE_MSG_CONFIRM: "정말로 삭제 하시겠습니까?",
  IS_VALID_2DIGITS: "역 이름은 2자리수 이상이여햐 합니다.",
  IS_DUPLICATE_STATION_NAME: "역 이름이 중복 됩니다.",
  IS_DUPLICATE_LINE_NAME: "같은 이름의 노선이 있습니다. 다시 입력해 주세요",
  IS_MIN_STATION_COUNT: "역의 개수는 2개 이상이여야 합니다. 역을 추가해주세요",
  IS_START_END_SANME:
    "상행 종점과 하행 종점이 같습니다. 서로 다른 종점을 선택해 주세요",
  IS_CONTINUOUS_STAION_ADD: "연속된 역 이름은 등록 하실 수 없습니다.",
  IS_MAX_ORDER: (order) => `0부터 ${order}까지의 순서만 입력 가능합니다.`,
  IS_MIN_ORDER: "0이상의 순서를 입력해주세요",
  IS_EMPTY: "값을 입력해 주세요",
  IS_MIN_SECTION_COUNT: "구간의 개수가 2개 이하는 삭제 할 수 없습니다.",
  IS_USED_LINE: "노선에 등록된 역은 삭제 할 수 없습니다.",
};
