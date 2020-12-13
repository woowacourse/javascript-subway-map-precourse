export const STATION_NAME_LENGTH_LOW_LIMIT = 2;

export const EXCEPTION_MESSAGE = {
  stationNameOnlySpace: `공백만으로는 역 이름을 등록할 수 없습니다.😥\n유효한 이름으로 다시 입력해주세요`,
  stationNameTooShort: `입력해주신 역 이름이 너무 짧아 등록할 수 없습니다.😥\n${STATION_NAME_LENGTH_LOW_LIMIT}글자 이상으로 다시 입력해주세요`,
  stationNameAlreadyRegistered:
    '입력해주신 역은 이미 등록된 역 이름입니다.😥\n다른 역 이름으로 다시 입력해주세요',
  stationRegisteredToLine:
    '해당 역은 노선에 등록되어 있어 삭제할 수 없습니다.😥\n노선 관리에서 해당 역에 등록된 노선을 먼저 삭제하신 뒤 다시 시도해주세요',
  bothStartEndSame:
    '상행 종점과 하행 종점은 서로 같을 수 없습니다.😥\n상행 종점과 하행 종점을 다르게 선택해주세요.',
  lineNameOnlySpace: `공백만으로는 노선 이름을 등록할 수 없습니다.😥\n유효한 이름으로 다시 입력해주세요`,
  lineNameAlreadyRegistered:
    '입력해주신 노선은 이미 등록된 노선 이름입니다.😥\n다른 노선 이름으로 다시 입력해주세요',
  sectionAleardyRegistered:
    '입력해주신 구간은 이미 등록된 구간입니다.😥\n다른 역 이름으로 다시 입력해주세요',
  orderOnlySpace:
    '공백만으로는 순서를 지정할 수 없습니다.😥\n원하시는 순서값을 입력해주세요',
  orderNotNumber:
    '입력해주신 순서값은 숫자가 아닙니다.😥\n원하시는 순서값을 숫자로 입력해주세요',
  orderNotInteger:
    '입력해주신 순서값은 정수가 아닙니다.😥\n원하시는 순서값을 양의 정수로 입력해주세요',
  orderNegativeNumber:
    '입력해주신 순서값은 음수입니다.😥\n0 이상의 값으로 다시 입력해주세요',
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
