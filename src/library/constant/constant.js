export const ATTRIBUTES = {
  CLICK: 'click',
  SUBMIT: 'submit',
  BUTTON: 'button',
  TEXT: 'text',
  NUMBER: 'number',
};

export const NODES = {
  // app
  APP: 'app',
  // function
  FUNCTION: 'function',
  FUNCTION_SECTION: 'function-section',
  FUNCTION_BUTTON: 'function-button',
  FUNCTION_BUTTON_SECTION: 'function-button-section',
  // station manager
  STATION_MANAGER_BUTTON: 'station-manager-button',
  STATION_ADD_BUTTON: 'station-add-button',
  STATION_DELETE_BUTTON: 'station-delete-button',
  STATION_NAME_INPUT: 'station-name-input',
  // line manager
  LINE_MANAGER_BUTTON: 'line-manager-button',
  LINE_ADD_BUTTON: 'line-add-button',
  LINE_DELETE_BUTTON: 'line-delete-button',
  LINE_NAME_INPUT: 'line-name-input',
  LINE_START_STATION_SELECTOR: 'line-start-station-selector',
  LINE_END_STATION_SELECTOR: 'line-end-station-selector',
  // section line manager
  SECTION_LINE_MENU_BUTTON: 'section-line-menu-button',
  SECTION_ADD_BUTTON: 'section-add-button',
  SECTION_DELETE_BUTTON: 'section-delete-button',
  SECTION_ORDER_INPUT: 'section-order-input',
  SECTION_STAION_SELECTOR: 'section_station_selector',
  // map printer manager
  MAP: 'map',
  MAP_PRINT_MANAGER_BUTTON: 'map-print-manager-button',
};

export const CONTENTS_KOR = {
  // common
  SET: '설정',
  ADD: '등록',
  DELETE: '삭제',
  MANAGE: '관리',
  STATION: '역',
  // station manager
  STATION_MANAGER: '역 관리',
  STATION_NAME: '역 이름',
  STATION_NAME_PLACEHOLDER: '역 이름을 입력해주세요.',
  STATION_ADD: '역 추가',
  STATION_LIST: '지하철 역 목록',
  // line manager
  LINE_MANAGER: '노선 관리',
  LINE_NAME: '노선 이름',
  LINE_NAME_PLACEHOLDER: '노선 이름을 입력해주세요.',
  LINE_START_STATION: '상행 종점',
  LINE_END_STATION: '하행 종점',
  LINE_ADD: '노선 추가',
  LINE_LIST: '지하철 노선 목록',
  // section line manager
  SECTION_LINE_MANAGER: '구간 관리',
  SECTION_LINE_GUIDE: '구간을 수정할 노선을 선택해주세요.',
  SECTION_LINE_ADD: '구간 등록',
  SECTION_LINE_PLACEHOLDER: '순서',
  SECTION_LINE_DELETE: '노선에서 제거',
  // map print manager
  MAP_PRINT_MANAGER: '지하철 노선도 출력',
};

export const FUNCTION_NAMES = [
  '',
  CONTENTS_KOR.STATION_MANAGER,
  CONTENTS_KOR.LINE_MANAGER,
  CONTENTS_KOR.SECTION_LINE_MANAGER,
  CONTENTS_KOR.MAP_PRINT_MANAGER,
];
