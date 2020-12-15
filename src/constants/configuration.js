export const SUBWAY_STATION_NAME_LENGTH_LIMIT = 2;
export const SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT = 2;
export const SUBWAY_MAP_ITEM_NAME = 'Subway-Map';
export const INTERFACE_DATA_ITEM_NAME = 'Data';
export const SHORT_STATION_NAME_ALERT_MESSAGE =
  '역의 이름이 너무 짧습니다. 2글자 이상의 이름을 입력해주세요';
export const SAME_STATION_NAME_EXIST_MESSAGE =
  '이미 동일한 이름의 역이 등록되어 있습니다. 다른 이름을 입력해주세요';
export const STATION_REGISTERED_IN_LINE_MESSAGE =
  '이 역은 노선의 구간으로 등록되어 있습니다. 삭제를 원하신다면 해당 노선 구간에서 역을 빼주세요.';
export const SAME_LINE_NAME_EXIST_MESSAGE =
  '이미 동일한 이름의 노선이 등록되어 있습니다. 다른 이름을 입력해주세요';
export const END_AND_START_STATION_NAME_SAME_MESSAGE =
  '상행 종점역과 하행 종점역이 같습니다. 서로 다른 종점역들을 선택해주세요.';
export const SAME_STATION_REGISTER_TRY_MESSAGE =
  '이 역은 이미 노선의 이 노선에 등록되어 있습니다. 다른 역을 선택해주세요';
export const LESS_THAN_DELETE_LENGTH_LIMIT_MESSAGE = `이 역을 빼면 노선의 개수가 ${SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT}개 이하가 되므로 뺄 수 없습니다`;
export const INDEX_IS_NOT_NUMBER_MESSAGE = '순서로 넣은 값이 숫자로 보이지 않습니다. 다시 입력해주세요'

export default {
  SUBWAY_STATION_NAME_LENGTH_LIMIT,
  SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT,
  SUBWAY_MAP_ITEM_NAME,
  SAME_LINE_NAME_EXIST_MESSAGE,
  END_AND_START_STATION_NAME_SAME_MESSAGE,
  SAME_STATION_REGISTER_TRY_MESSAGE,
  LESS_THAN_DELETE_LENGTH_LIMIT_MESSAGE,
  INDEX_IS_NOT_NUMBER_MESSAGE
};
