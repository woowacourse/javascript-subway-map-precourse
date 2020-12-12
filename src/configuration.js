export const STATION_NAME_LENGTH_LOW_LIMIT = 2;

export const EXCEPTION_MESSAGE = {
  stationNameOnlySpace: `공백만으로는 역 이름을 등록할 수 없습니다.😥\n유효한 이름으로 다시 입력해주세요`,
  stationNameTooShort: `입력해주신 역 이름이 너무 짧아 등록할 수 없습니다.😥\n${STATION_NAME_LENGTH_LOW_LIMIT}글자 이상으로 다시 입력해주세요`,
  stationNameAlreadyExist:
    '입력해주신 역은 이미 등록된 역입니다.😥 다른 역으로 다시 입력해주세요',
  stationRegisteredToLine:
    '해당 역은 노선에 등록되어 있어 삭제할 수 없습니다.😥 노선 관리에서 해당 역에 등록된 노선을 먼저 삭제하신 뒤 다시 시도해주세요',
};

export const MENU = [
  {
    content: '역 관리',
    id: '#station-manager-button',
  },
  {
    content: '노선 관리',
    id: '#line-manager-button',
  },
  {
    content: '구간 관리',
    id: '#section-manager-button',
  },
  {
    content: '지하철 노선도 출력',
    id: '#map-print-manager-button',
  },
];

export const TABLE_HEADER = [
  ['역 이름', '설정'],
  ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
  ['순서, 이름, 설정'],
];
