export const ALERT_MESSAGE = {
  stationNameTooShort: '🚨　역 이름이 너무 짧습니다.',
  stationNameAlreadyExist: '🚨　이미 등록된 역입니다.',
};

export const MENU = [
  {
    index: 0,
    content: '역 관리',
    id: '#station-manager-button',
  },
  {
    index: 1,
    content: '노선 관리',
    id: '#line-manager-button',
  },
  {
    index: 2,
    content: '구간 관리',
    id: '#section-manager-button',
  },
  {
    index: 3,
    content: '지하철 노선도 출력',
    id: '#map-print-manager-button',
  },
];

export const TABLE_HEADER = [
  ['역 이름', '설정'],
  ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
  ['순서, 이름, 설정'],
];
