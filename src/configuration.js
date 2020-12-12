export const STATION_NAME_LENGTH_LOW_LIMIT = 2;

export const EXCEPTION_MESSAGE = {
  stationNameOnlySpace: `공백만으로는 역 이름을 등록할 수 없습니다.😥\n유효한 이름으로 다시 입력해주세요`,
  stationNameTooShort: `입력해주신 역 이름이 너무 짧아 등록할 수 없습니다.😥\n${STATION_NAME_LENGTH_LOW_LIMIT}글자 이상으로 다시 입력해주세요`,
  stationNameAlreadyExist:
    '입력해주신 역은 이미 등록된 역 이름입니다.😥\n다른 역 이름으로 다시 입력해주세요',
  stationRegisteredToLine:
    '해당 역은 노선에 등록되어 있어 삭제할 수 없습니다.😥\n노선 관리에서 해당 역에 등록된 노선을 먼저 삭제하신 뒤 다시 시도해주세요',
  bothStartEndSame:
    '상행 종점과 하행 종점은 서로 같을 수 없습니다.😥\n상행 종점과 하행 종점을 다르게 선택해주세요.',
  lineNameOnlySpace: `공백만으로는 노선 이름을 등록할 수 없습니다.😥\n유효한 이름으로 다시 입력해주세요`,
  lineNameAlreadyExist:
    '입력해주신 노선은 이미 등록된 노선 이름입니다.😥\n다른 노선 이름으로 다시 입력해주세요',
};

export const MENU_LIST = [
  {
    menu: 'station',
    content: '역 관리',
    id: '#station-manager-button',
  },
  {
    menu: 'line',
    content: '노선 관리',
    id: '#line-manager-button',
  },
  {
    menu: 'section',
    content: '구간 관리',
    id: '#section-manager-button',
  },
  {
    menu: 'map',
    content: '지하철 노선도 출력',
    id: '#map-print-manager-button',
  },
];

export const TABLE = {
  header: {
    station: ['역 이름', '설정'],
    line: ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
    section: ['순서, 이름, 설정'],
  },
  deleteButtonText: { station: '삭제', line: '삭제', section: '노선에서 제거' },
};

export const SELECTOR = {
  startStation: {
    id: '#line-start-station-selector',
    label: '상행 종점',
    dataLocation: 'station',
  },
  endStation: {
    id: '#line-end-station-selector',
    label: '하행 종점',
    dataLocation: 'station',
  },
  section: {
    id: '#section-station-selector',
    label: '',
    dataLocation: 'line',
  },
};
