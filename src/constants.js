const CONSTANTS = {
  'STORAGE': {
    'STATION': {'KEY': 'station'},
    'LINE': {'KEY': 'line'},
    'SECTION': {'KEY': 'section'},
  },
  'MENU': {
    'ID': 'menu',
    'BUTTON': {
      'STATION': {'ID': 'station-manager-button'},
      'LINE': {'ID': 'line-manager-button'},
      'SECTION': {'ID': 'section-manager-button'},
      'MAP': {'ID': 'map-print-manager-button'},
    },
  },
  'MAIN': {'ID': 'main'},
  'STATION': {
    'ALERT': {
      'DUPLICATION': '역 이름이 중복되지 않게 입력해주세요',
      'LENGTH': '역 이름은 2글자 이상으로 입력해주세요',
      'DELETE': '역을 정말로 삭제하시겠습니까?',
      'REGISTERED': '노선에 등록된 역은 삭제 할 수 없습니다',
    },
    'DIV': {
      'REGISTER': {'ID': 'station-register'},
      'RESULT': {'ID': 'station-result'},
    },
    'INPUT': {'ID': 'station-name-input'},
    'BUTTON': {
      'ADD': {'ID': 'station-add-button'},
      'DELETE': {'CLASS': 'station-delete-button'},
    },
  },
  'LINE': {
    'ALERT': {
      'EMPTY': '노선 이름을 입력해주세요',
      'EMPTY_STATION': '역을 먼저 등록해주세요',
      'DUPLICATION': '노선 이름이 중복되지 않게 입력해주세요',
      'DELETE': '노선을 정말로 삭제하시겠습니까?',
    },
    'DIV': {
      'REGISTER': {'ID': 'line-register'},
      'RESULT': {'ID': 'line-result'},
    },
    'INPUT': {'ID': 'line-name-input'},
    'SELECT': {
      'START': {'ID': 'line-start-station-selector'},
      'END': {'ID': 'line-end-station-selector'},
    },
    'BUTTON': {
      'ADD': {'ID': 'line-add-button'},
      'DELETE': {'CLASS': 'line-delete-button'},
    },
  },
  'SECTION': {
    'ALERT': {
      'NOT_LAST': '종점 사이의 숫자를 입력해주세요',
      'DELETE': '구간을 정말로 삭제하시겠습니까?',
      'NOT_DELETE': '더 이상 삭제할 수 없습니다.',
    },
    'DIV': {
      'CHOICE': {'ID': 'section-choice'},
      'REGISTER': {'ID': 'section-register'},
      'RESULT': {'ID': 'section-result'},
    },
    'INPUT': {
      'ORDER': {'ID': 'section-order-input'},
    },
    'SELECT': {
      'STATION': {'ID': 'section-station-selector'},
    },
    'BUTTON': {
      'LINE': {'CLASS': 'section-line-menu-button'},
      'ADD': {'ID': 'section-add-button'},
      'DELETE': {'CLASS': 'section-delete-button'},
    },
  },
  'MAP': {'CLASS': 'map'},
};

export const {
  STORAGE, MENU, MAIN, STATION, LINE, SECTION, MAP,
} = CONSTANTS;
