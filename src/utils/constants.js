export const stationText = {
  INPUT_LABEL: '역 이름',
  INPUT_ID: 'station-name-input',
  PLACEHOLDER: '역 이름을 입력해주세요',
  SUBMIT_ID: 'station-add-button',
  SUBMIT_TEXT: '역 추가',
  INPUT_CONTAINER: 'input-container',
  ALERT_DUPLICATE_NAME: '중복된 역 이름이 존재합니다.',
  ALERT_NAME_UNDER_TWO: '역 이름을 2자 이상으로 입력해 주세요.',
  RESULT_TITLE: '🚉 지하철 역 목록',
  TABLE_HEADER_1: '역 이름',
  TABLE_HEADER_2: '설정',
  TABLE_ID: 'station-table',
  DELETE_BTN_CLASS: 'station-delete-button',
  DELETE_BTN_TEXT: '삭제',
  ALERT_STATION_IN_LINE: '노선에 등록된 역은 삭제할 수 없습니다.',
  ALERT_CONFIRM_DELETE: '정말 삭제하시겠습니까?',
};

export const lineText = {
  INPUT_LABEL: '노선 이름',
  INPUT_ID: 'line-name-input',
  PLACEHOLDER: '노선 이름을 입력해주세요',
  SUBMIT_ID: 'line-add-button',
  SUBMIT_TEXT: '노선 추가',
  START_SELECTOR_ID: 'line-start-station-selector',
  START_SELECTOR_TEXT: '상행 종점',
  END_SELECTOR_ID: 'line-end-station-selector',
  END_SELECTOR_TEXT: '하행 종점',
  ALERT_DUPLICATE_NAME: '중복된 노선 이름이 존재합니다.',
  RESULT_TITLE: '🚉 지하철 노선 목록',
  TABLE_HEADER_1: '노선 이름',
  TABLE_HEADER_2: '상행 종점역',
  TABLE_HEADER_3: '하행 종점역',
  TABLE_HEADER_4: '설정',
  TABLE_ID: 'line-table',
  DELETE_BTN_CLASS: 'line-delete-button',
  DELETE_BTN_TEXT: '삭제',
  ALERT_CONFIRM_DELETE: '정말 삭제하시겠습니까?',
};

export const sectionText = {
  GUIDE_TEXT: '구간을 수정할 노선을 선택해주세요.',
  MENU_BUTTON_CLASS: 'section-line-menu-button',
  INPUT_ID: 'section-input',
  TABLE_ID: 'section-table',
  MANAGE_TEXT: '관리',
  REGISTER_TEXT: '구간 등록',
  SELECTOR_ID: 'section-station-selector',
  ORDER_INPUT_ID: 'section-order-input',
  PLACEHOLDER: '순서',
  SUBMIT_ID: 'section-add-button',
  SUBMIT_TEXT: '등록',
  TABLE_HEADER_1: '순서',
  TABLE_HEADER_2: '이름',
  TABLE_HEADER_3: '설정',
  DELETE_BTN_CLASS: 'section-delete-button',
  DELETE_BTN_TEXT: '노선에서 제거',
  ALERT_NEGATIVE_ORDER: '0보다 큰 순서를 입력해 주세요.',
  ALERT_OVERLOAD_ORDER: '노선 범위에 포함되는 순서를 입력해 주세요.',
  ALERT_STATION_UNDER_TWO: '노선에 포함된 역이 2개 이하일 때는 역을 삭제할 수 없습니다.',
  ALERT_CONFIRM_DELETE: '정말 삭제하시겠습니까?',
};

export const mapText = {
  RESULT_AREA_CLASS: 'map',
};
