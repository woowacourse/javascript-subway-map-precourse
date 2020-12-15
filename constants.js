const MINIMUM_INPUT_LENGTH = 2;
const MINIMUM_STATION_COUNT = 2;

export const REGISTERD_STATION_MESSAGE = `노선에 등록된 역은 삭제할 수 없습니다!`;
export const DUPLICATED_STATION_MESSAGE = `중복된 지하철 역 이름은 등록될 수 없습니다!`;
export const TEXT_LENGTH_MESSAGE = `지하철 역은 ${MINIMUM_INPUT_LENGTH}글자 이상이어야 합니다!`;

export const DUPLICATED_LINE_MESSAGE = `중복된 지하철 노선 이름은 등록될 수 없습니다!`;

export const DUPLICATED_SECTION_MESSAGE = `노선 내에 이미 등록된 역입니다!`;
export const ORDER_MESSAGE = (number) => `순서는 0 ~ ${number}로 지정해주세요!`;
export const MINIMUM_STATION_MESSAGE = `노선에는 역이 ${MINIMUM_STATION_COUNT} 개 이상 포함되어 있어야 합니다!`;

export const DELET_CONFIRM_MESSAGE = `정말로 삭제하시겠습니까?`;
