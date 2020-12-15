// constants (eng)

// active
export const ACTIVE = 'active';
export const HIDE = 'hide';

// app
export const APP = 'app';

// local storage
export const STATIONS_LS = 'stations';
export const LINES_LS = 'lines';

// role
export const ROLE = 'role';
export const ROLE_BUTTON = 'role-button';
export const ROLE_BUTTON_SECTION = 'role-button-section';
export const ROLE_SECTION = 'role-section';

// station manager
export const STATION = 'station';
export const STATION_MANAGER = 'station-manager';
export const STATION_MANAGER_BUTTON = 'station-manager-button';
export const STATION_NAME_INPUT = 'station-name-input';
export const STATION_ADD_BUTTON = 'station-add-button';
export const STATION_DELETE_BUTTON = 'station-delete-button';
export const STATION_TABLE = 'station-table';
export const STATION_HEADER = 'station-header';
export const STATION_ROW = 'station-row';
export const STATION_ALERT_INVALID =
  '일치하는 역 이름이 없네요. 😅\n실제 (서울) 지하철 역만 추가할 수 있어요!';
export const STATION_ALERT_OVERLAP = '이미 추가한 역이에요. 😅';
export const STATION_ALERT_HAS_LINE =
  '노선에 추가한 역은 삭제할 수 없어요!\n해당 역이 추가된 노선이에요:';
export const STATION_CONFIRM = '정말로 삭제하시나요?';

// line manager
export const LINE = 'line';
export const LINE_MANAGER = 'line-manager';
export const LINE_MANAGER_BUTTON = 'line-manager-button';
export const LINE_NAME_INPUT = 'line-name-input';
export const LINE_ADD_BUTTON = 'line-add-button';
export const LINE_DELETE_BUTTON = 'line-delete-button';
export const LINE_START_STATION_SELECTOR = 'line-start-station-selector';
export const LINE_END_STATION_SELECTOR = 'line-end-station-selector';
export const LINE_HEADER = 'line-header';
export const LINE_TABLE = 'line-table';
export const LINE_ROW = 'line-row';
export const LINE_ALERT_INVALID =
  '일치하는 호선 이름이 없네요. 😅\n실제 (서울) 지하철 호선만 추가할 수 있어요!';
export const LINE_ALERT_OVERLAP = '이미 추가한 노선이에요. 😅';
export const OPTION_ALERT_INVALID =
  '상행 종점과 하행 종점에 들어갈 역은 중복되지 않게 한 번씩만 추가할 수 있어요.';
export const LINE_CONFIRM = '정말로 해당 호선을 삭제하시나요?';

// section manager
export const SECTION_MANAGER = 'section-manager';
export const SECTION_MANAGER_BUTTON = 'section-manager-button';
export const LINE_MENU_BUTTON_SECTION = 'line-menu-button-section';
export const SECTION_LINE_MENU_BUTTON = 'section-line-menu-button';
export const SECTION_LINE = 'section-line';
export const SECTION_LINE_TITLE = 'section-line-title';
export const SECTION_ADD_BUTTON = 'section-add-button';
export const SECTION_DELETE_BUTTON = 'section-delete-button';
export const SECTION_ORDER_INPUT = 'section-order-input';
export const SECTION_STAION_SELECTOR = 'section-station-selector';
export const SECTION_TABLE = 'section-table';
export const SECTION_HEADER = 'section-header';
export const SECTION_ROW = 'section-row';
export const SECTION_ALERT_ORDER =
  '순서는 상행, 하행 종점 사이의 정수 값만 입력할 수 있어요. 😅';
export const SECTION_ALERT_OVERLAP =
  '역은 각 노선마다 한 번만 추가가 가능해요. 😅';
export const SECTION_ALERT_COUNT =
  '종점만 남은 노선에서는 삭제가 불가능해요. 😅';
export const SECTION_CONFIRM = '정말로 해당 구간을 삭제하시나요?';
export const MIN_STATION_LENGTH = 2;

// map print manager
export const MAP = 'map';
export const MAP_PRINT_MANAGER = 'map-print-manager';
export const MAP_PRINT_MANAGER_BUTTON = 'map-print-manager-button';

// selectors
export const SELECTORS = [
  LINE_START_STATION_SELECTOR,
  LINE_END_STATION_SELECTOR,
  SECTION_STAION_SELECTOR,
];

// fetch url
export const STATION_URL = 'http://openapi.seoul.go.kr:8088';
export const STATION_KEY = '4b75656e576d6b69313236656b74766a';
export const STATION_FORMAT = 'json';
export const STATION_INFO = 'SearchSTNBySubwayLineInfo';
export const STATION_ROW_START = '1';
export const STATION_ROW_END = '730';
export const STATION_FETCH_URL = `${STATION_URL}/${STATION_KEY}/${STATION_FORMAT}/${STATION_INFO}/${STATION_ROW_START}/${STATION_ROW_END}`;

// constants (kor)
export const NONE_K = '없음';
export const DELETE_K = '삭제';
export const MANAGE_K = '관리';
export const STATION_MANAGER_K = '역 관리';
export const LINE_MANAGER_K = '노선 관리';
export const SECTION_MANAGER_K = '구간 관리';
export const SECTION_DELETE_K = '노선에서 제거';
export const MAP_PRINT_MANAGER_K = '지하철 노선도 출력';

export const ROLE_NAMES = [
  '',
  STATION_MANAGER_K,
  LINE_MANAGER_K,
  SECTION_MANAGER_K,
  MAP_PRINT_MANAGER_K,
];

export const LINE_NAMES = [
  '1호선',
  '2호선',
  '3호선',
  '4호선',
  '5호선',
  '6호선',
  '7호선',
  '8호선',
  '9호선',
  '인천1호선',
  '인천2호선',
  '신분당',
  '경의중앙선',
  '경춘선',
  '수인분당',
  '공항',
  '의정부',
  '에버라인',
  '자기부상',
  '경강선',
  '우이신설',
  '서해선',
  '김포골드',
];
