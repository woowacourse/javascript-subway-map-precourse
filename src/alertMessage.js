import { constant } from "./constant.js";

export const alertMessage = {
  SHORT_LENGTH_ERROR: `최소 ${constant.minLength} 글자 이상 입력해야 합니다.`,
  ORDERING_INPUT_NOTHING_ERROR: `순서를 입력해주세요`,
  DELETE_CHECK_MESSAGE: "정말로 삭제하시겠습니까?",
  DELETE_STATION_ON_LINE_MESSAGE: "이 역은 현재 노선에 등록되어 있어 삭제가 불가능합니다.",
  DELETE_STATIONS_ON_LINE_SHORTAGE_MESSAGE: `선택한 노선의 역이 ${constant.minStations}개 이하인 경우에는 삭제할 수 없습니다.`,
  SAME_DESTINATION_ERROR: `상행과 하행이 같습니다. 다시 입력해주세요.`,
  SAME_LINE_EXIST_ERROR: "이미 같은 이름을 가진 노선이 있습니다.",
  SAME_STATION_EXIST_ERROR: "이미 같은 이름을 가진 역이 있습니다.",
  SAME_SECTION_EXIST_ERROR: "이미 같은 구간이 등록되어 있습니다.",
};
