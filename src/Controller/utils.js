export const BUTTON_MANAGEMENT_ID = {
  STATION: 'station-manager-button',
  LINE: 'line-manager-button',
  SECTION: 'section-manager-button',
  MAP: 'map-print-manager-button',
};

export const ADD_BUTTON_CLASS = {
  STATION_DELETE: 'station-delete-button',
  LINE_DELETE: 'line-delete-button',
  SECTION_DELETE: 'section-delete-button',
  SECTION_LINE_MENU: 'section-line-menu-button',
};

export const TEXT = {
  LINE_MANAGEMENT: '관리',
  DELETE_FROM_LINE: '노선에서 삭제',
  DELETE: '삭제',
};

export const KEY = {
  STATION: 'station',
  LINE: 'line',
};

export const ERROR_MESSAGE = {
  LINE_HAVE_SAME_STATION: '노선에 존재하는 역은 삭제할 수 없습니다.',
  LESS_THAN_TWO_STATION: '노선에 역이 2개 이하이면 삭제할 수 없습니다.',
  WRONG_INPUT: '띄어쓰기 없이 한글과 숫자만 입력해주세요.',
  LESS_THAN_ONE_LETTER: '2글자 이상으로 입력해주세요.',
  SAME_STATION: '같은 이름의 역이 존재합니다.',
  SAME_LINE: '같은 이름의 노선이 존재합니다.',
  ALREADY_INCLUDE_STATION: '이미 역이 추가되어 있습니다.',
  SAME_LAST_STOP: '상행과 하행이 같은 역이 될 수 없습니다.',
  NOT_NUMBER: '숫자를 입력해주세요.',
  LENGTH_LIMIT: '이하의 수를 입력해주세요.',
};

export const MIN_LETTER = 2;
export const MIN_LINE_LENGTH = 2;
