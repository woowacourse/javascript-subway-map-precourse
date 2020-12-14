export const DOMs = {
  STATION_MANAGER_BUTTON: document.getElementById('station-manager-button'),
  LINE_MANAGER_BUTTON: document.getElementById('line-manager-button'),
  SECTION_MANAGER_BUTTON: document.getElementById('section-manager-button'),
  MAP_PRINT_MANAGER_BUTTON: document.getElementById('map-print-manager-button'),
  MANAGER_CONTAINER: document.getElementById('manager-container'),
};

export const DOMStrings = {
  // station manager
  STATION_MANAGER: 'station-manager',
  STATION_NAME_INPUT: 'station-name-input',
  STATION_ADD_BUTTON: 'station-add-button',
  STATION_LIST_TABLE: 'station-list',
  STATION_DELETE_BUTTON: 'station-delete-button',

  // line manager
  LINE_MANAGER: 'line-manager',
  LINE_NAME_INPUT: 'line-name-input',
  LINE_START_STATION_SELECTOR: 'line-start-station-selector',
  LINE_END_STATION_SELECTOR: 'line-end-station-selector',
  LINE_ADD_BUTTON: 'line-add-button',
  LINE_LIST_TABLE: 'line-list',
  LINE_DELETE_BUTTON: 'line-delete-button',

  // section manager
  SECTION_CONTAINER: 'section-container',
  SECTION_LINE_MENU_BUTTON: 'section-line-menu-button',
  SECTION_MANAGER: 'section-manager',
  SECTION_STATION_SELECTOR: 'section-station-selector',
  SECTION_ORDER_INPUT: 'section-order-input',
  SECTION_ADD_BUTTON: 'section-add-button',
  SECTION_LIST_TABLE: 'sections',
  SECTION_DELETE_BUTTON: 'section-delete-button',
  SECTION_HEADER: 'section-header',

  // map print manager
  MAP_PRINT_MANAGER: 'map',
};

export const strings = {
  STATION_NAME: '역 이름',
  STATION_PLACEHOLDER: '역 이름을 입력해주세요.',
  STATION_ADD: '역 추가',
  STATION_LIST_TITLE: '🚉 지하철 역 목록',
  LINE_NAME: '노선 이름',
  LINE_PLACEHOLDER: '노선 이름을 입력해주세요.',
  LINE_START: '상행 종점',
  LINE_END: '하행 종점',
  LINE_START_STATION: '상행 종점역',
  LINE_END_STATION: '하행 종점역',
  LINE_ADD: '노선 추가',
  LINE_LIST_TITLE: '🚉 지하철 노선 목록',
  SECTION_SELECT_TITLE: '구간을 수정할 노선을 선택해주세요.',
  SECTION_ADD_TITLE: '구간 등록',
  SECTION_DELETE: '노선에서 제거',
  SETTING: '설정',
  ORDER: '순서',
  DELETE: '삭제',
  MANAGE: '관리',
  ADD: '등록',
  NAME: '이름',
  CONFIRM_DELETION: '정말로 삭제하시겠습니까?',
  CONFIRM_DELETE_FROM_LINE: '정말로 노선에서 제거하시겠습니까?',
  VALID_ADDITION: 'addition',
  VALID_DELETION: 'deletion',
};

export const DOMCtrl = {
  clearManagerContainer() {
    DOMs.MANAGER_CONTAINER.innerHTML = '';
  },
};
