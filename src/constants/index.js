export const ID = {
  STATION_MANAGER_BUTTON: 'station-manager-button',
  STATION_MANAGER: 'station-manager',
  STATION_TABLE: 'station-table',
  STATION_NAME_INPUT: 'station-name-input',
  STATION_ADD_BUTTON: 'station-add-button',

  LINE_MANAGER_BUTTON: 'line-manager-button',
  LINE_MANAGER: 'line-manager',
  LINE_TABLE: 'line-table',
  LINE_NAME_INPUT: 'line-name-input',
  LINE_START_STATION_SELECTOR: 'line-start-station-selector',
  LINE_END_STATION_SELECTOR: 'line-end-station-selector',
  LINE_ADD_BUTTON: 'line-add-button',

  SECTION_MANAGER_BUTTON: 'section-manager-button',
  SECTION_MANAGER: 'section-manager',
  SECTION_LINE_MENU_BUTTON_CONTAINER: 'section-line-menu-button-container',
  SECTION_STATION_SELECTOR: 'section-station-selector',
  SECTION_ORDER_INPUT: 'section-order-input',
  SECTION_ADD_BUTTON: 'section-add-button',
  SECTION_ADD_CONTAINER: 'section-add-container',
  SECTION_TABLE: 'section-table',

  MAP_PRINT_MANAGER_BUTTON: 'map-print-manager-button',
  MAP_PRINT_MANAGER: 'map-print-manager',
};

export const CLASS = {
  STATION_DELETE_BUTTON: 'station-delete-button',
  LINE_DELETE_BUTTON: 'line-delete-button',
  SECTION_LINE_MENU_BUTTON: 'section-line-menu-button',
  SECTION_DELETE_BUTTON: 'section-delete-button',
  MAP: 'map',
};

export const NAME = {
  LOCALSTORAGE_STATION_KEY: 'station',
  LOCALSTORAGE_LINE_KEY: 'line',
  STATION_MANAGER_BUTTON_NAME: '1. 역 관리',
  LINE_MANAGER_BUTTON_NAME: '2. 노선 관리',
  SECTION_MANAGER_BUTTON_NAME: '3. 구간 관리',
  MAP_PRINT_MANAGER_BUTTON_NAME: '4. 지하철 노선도 출력',
};

export const ALERT = {
  VALID_STATION_NAME_LENGTH: '2글자 이상으로 적어주세요.',
  DUPLICATED_NAME: '중복된 이름이 존재합니다.',
  DUPLICATED_STATION: '중복된 역이 존재합니다.',
  VALID_LINE_NAME_LENGTH: '1글자 이상으로 적어주세요.',
  DELETE_ERROR: '삭제가 불가능합니다.',
  VALID_SECTION_NUMBER: '잘못된 순서입니다.',
  VALID_STATION: '역관리에서 역을 입력해주세요.',
};

export const NUMBER = {
  VALID_STATION_NAME_LENGTH: 2,
  VALID_LINE_NAME_LENGTH: 1,
  VALID_SECTION_LENGTH: 2,
};
