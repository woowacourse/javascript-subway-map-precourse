import { MINIMUM_INPUT_LENGTH } from './constants.js';

export const INPUT_LENGTH_MESSAGE = `${MINIMUM_INPUT_LENGTH}글자 이상 입력해주세요`;
export const ALREADY_EXIST_STATION_NAME_MESSAGE = '이미 존재하는 역 이름입니다';
export const REGISTERED_STATION_MESSAGE = '이미 노선에 등록된 역으로 삭제할 수 없습니다';

export const ALREADY_EXIST_LINE_NAME_MESSAGE = '이미 존재하는 역 이름입니다';
export const NOT_CORRECT_STATION_MESSAGE = '종점역을 올바르게 지정해주세요';
export const SAME_STATION_MESSAGE = '종점역은 서로 다르게 지정해주세요';

export const ALREADY_EXIST_SECTION_NAME_MESSAGE = '이미 같은 노선에 등록되어 있는 역입니다';
export const VALID_ORDER_MESSAGE = (number) => `0 부터 ${number} 사이에서 입력해주세요`;
export const MINIMUM_STATION_MESSAGE = '각 노선은 상행 종점, 하행 종점을 하나씩 포함해야 합니다';
export const INVALID_DATA_INDEX_MESSAGE = '올바르지 않은 데이터 인덱스입니다.';

export const DELETE_MESSAGE = '정말로 삭제하시겠습니까?';
