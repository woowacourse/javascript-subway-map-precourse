import { NUM } from "./number.js";

export const MESSAGE = {
  EMPTY_NAME_ERROR: `이름을 입력해주세요.`,
  EMPTY_NUMBER_ERROR: `숫자를 입력해주세요.`,
  DUPLICATED_NAME_ERROR: `중복된 이름입니다.`,
  STATION_NAME_LIMIT_ERROR: `이름은 ${NUM.STATION_NAME_LIMIT}글자 이상이어야 합니다.`,
  REMOVE_STATION_ERROR: `역이 노선에 포함되어 지울 수 없습니다.`,
  SAME_STATION_SELECT_ERROR: `상행 종점과 하행 종점은 달라야합니다.`,
  CONFIRM: `정말로 삭제하시겠습니까 ?`,
  INDEX_OVER_ERROR: `범위가 벗어난 순서입니다.`,
  SECTION_LENGTH_ERROR: `${NUM.SECTION_LENGTH_LIMIT}개 이하로 역을 삭제할 수 없습니다.`,
};
