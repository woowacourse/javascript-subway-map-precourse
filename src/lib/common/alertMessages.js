import { MIN_LENGTH_OF_STATION_NAME } from "./constants.js";

export const NAME_LENGTH_ERROR = `역 이름은 최소 ${MIN_LENGTH_OF_STATION_NAME}글자 이상이어야 합니다.`;
export const SAME_NAME_ERROR = `중복된 이름은 입력받을 수 없습니다.`;
export const SPACE_ERROR = `공백은 입력받을 수 없습니다.`;

export const DELETE_MESSAGE = "정말로 삭제하시겠습니까?";
export const DELETE_MESSAGE_FROM_LINE = "정말로 노선에서 삭제하시겠습니까?";
