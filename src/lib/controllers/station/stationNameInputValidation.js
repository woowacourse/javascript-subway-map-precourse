import actionResult from "../actionResult.js";
import { stationSelector } from "../../_store/selectors.js";
import { MIN_LENGTH_OF_STATION_NAME } from "../../common/constants.js";

export default class StationNameInputValidation {
  constructor(inputValue) {
    this.isMoreThanTwoCharacters =
      inputValue.length >= MIN_LENGTH_OF_STATION_NAME;
  }

  // 2. 중복된 지하철 역 이름은 등록될 수 없다.
  _isUniqueStationName() {

  }

  // 3. 체크 결과 리턴하기.
  getInputResult() {
    if (!this.isMoreThanTwoCharacters)
      return actionResult(
        false,
        `역 이름은 최소 ${MIN_LENGTH_OF_STATION_NAME}글자 이상이어야 합니다.`,
      );

    return actionResult(true);
  }
}
