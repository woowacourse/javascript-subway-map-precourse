const CONSTANTS = {
  'STORAGE': {
    'STATION': {
      'KEY': 'station',
    },
    'LINE': {
      'KEY': 'line',
    },
  },
  'MENU': {
    'ID': 'menu',
    'BUTTON': {
      'STATION': {
        'ID': 'station-manager-button',
      },
      'LINE': {
        'ID': 'line-manager-button',
      },
      'SECTION': {
        'ID': 'section-manager-button',
      },
      'MAP': {
        'ID': 'map-print-manager-button',
      },
    },
  },
  'REGISTER': {
    'ID': 'register',
  },
  'RESULT': {
    'ID': 'result',
  },
  'STATION': {
    'ALERT': {
      'DUPLICATION': '역 이름이 중복되지 않게 입력해주세요',
      'LENGTH': '역 이름은 2글자 이상으로 입력해주세요',
      'DELETE': '역을 정말로 삭제하시겠습니까?',
    },
    'INPUT': {
      'ID': 'station-name-input',
    },
    'BUTTON': {
      'ADD': {
        'ID': 'station-add-button',
      },
      'DELETE': {
        'CLASS': 'station-delete-button',
      },
    },
  },
  'LINE': {
    'ALERT': {
      'EMPTY': '노선 이름을 입력해주세요',
      'EMPTY_STATION': '역을 먼저 등록해주세요',
      'DUPLICATION': '노선 이름이 중복되지 않게 입력해주세요',
      'DELETE': '노선을 정말로 삭제하시겠습니까?',
    },
    'INPUT': {
      'ID': 'line-name-input',
    },
    'SELECT': {
      'START': {
        'ID': 'line-start-station-selector',
      },
      'END': {
        'ID': 'line-end-station-selector',
      },
    },
    'BUTTON': {
      'ADD': {
        'ID': 'line-add-button',
      },
      'DELETE': {
        'CLASS': 'line-delete-button',
      },
    },
  },
};

export const {
  STORAGE, MENU, REGISTER, RESULT, STATION, LINE,
} = CONSTANTS;
