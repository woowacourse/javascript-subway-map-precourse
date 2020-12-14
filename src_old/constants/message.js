import { NUM } from "./number.js";

export const MESSAGE = {
  EMPTY_NAME_ERROR: `이름을 입력해주세요.`,
  DUPLICATED_NAME_ERROR: `중복된 이름입니다.`,
  STATION_NAME_LIMIT_ERROR: `이름은 ${NUM.STATION_NAME_LIMIT}글자 이상이어야 합니다.`,
  REMOVE_STATION_ERROR: `역이 노선에 포함되어 지울 수 없습니다.`,
  SAME_STATION_SELECT_ERROR: `상행 종점과 하행 종점은 달라야합니다.`,
};
