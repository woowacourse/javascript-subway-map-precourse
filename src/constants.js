export const APP = document.getElementById('app');

export const MENU = {
  STATION: document.getElementById('station-manager-button'),
  LINE: document.getElementById('line-manager-button'),
  SECTION: document.getElementById('section-manager-button'),
  MAP: document.getElementById('map-print-manager-button'),
};

export const TEMPLATE = {
  STATION: document.getElementById('station-template'),
  LINE: document.getElementById('line-template'),
  SECTION: document.getElementById('section-template'),
  MAP: document.getElementById('map-template'),
};

export const STATION = {
  LISTNAME: 'stationList',
  INITLIST: '[]',
  VALIDNAMELENGTH: 2,
  DELETEMESSAGE: '삭제',
  INPUT: document.getElementById('station-name-input'),
  ADD: document.getElementById('station-add-button'),
  DELETE: document.getElementsByClassName('station-delete-button'),
  TABLE: document.getElementById('station-table-body'),
};

export const LINE = {
  LISTNAME: 'lineList',
  INITLIST: '[]',
  DELETEMESSAGE: '삭제',
  INPUT: document.getElementById('line-name-input'),
  START: document.getElementById('line-start-station-selector'),
  END: document.getElementById('line-end-station-selector'),
  ADD: document.getElementById('line-add-button'),
  DELETE: document.getElementsByClassName('line-delete-button'),
  TABLE: document.getElementById('line-table-body'),
};

export const SECTION = {
  SELECTION_LIST: document.getElementById('section-line-button-list'),
  SELECTION_CLASS_NAME: 'section-line-menu-button',
  SELECTION: document.getElementsByClassName('section-line-menu-button'),
  MANAGEMENT: document.getElementById('section-management'),
  MANAGEMENT_NAME: '관리',
  MANAGEMENT_TITLE: document.getElementById('section-management-title'),
  STATION: document.getElementById('section-station-selector'),
  ORDER: document.getElementById('section-order-input'),
  ADD: document.getElementById('section-add-button'),
  DELETE: document.getElementsByClassName('section-delete-button'),
  DELETE_MESSAGE: '노선에서 제거',
  VALIDSECTIONLENGTH: 2,
  TABLE: document.getElementById('section-table-body'),
};

export const ERRORMESSAGE = {
  STATION_INVALID: '유효하지 않은 역 이름입니다!',
  STATION_EXISTS: '이미 존재하는 역입니다!',
  STATION_INLINE: '노선에 포함되는 역은 삭제할 수 없습니다!',
  SECTION_OUTOFRANGE: '노선에 역을 추가할 수 있는 범위를 벗어났습니다!',
  SECTION_ENOUGHSTATION: '노선이 2개 이하인 경우 삭제할 수 없습니다!',
  LINE_EXISTS: '이미 존재하는 노선입니다!',
  LINE_RESET: '상행 종점, 하행 종점을 다시 설정하세요!',
};
