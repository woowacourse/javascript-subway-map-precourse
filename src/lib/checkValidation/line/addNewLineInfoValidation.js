import LineNameInputValidation from "./lineNameInputValidation.js";
import actionResult from "../actionResult.js";
import { SAME_START_END_STATION_ERROR } from "../../common/alertMessages.js";

export default class AddNewLineInfoValidation extends LineNameInputValidation {
  constructor(newLineInfo) {
    super(newLineInfo);
    const { stations } = newLineInfo;
    this.lineName = newLineInfo.lineName;
    this.isSameStartStationAndEndStation = stations[0] === stations[1];
  }

  getInputResult() {
    if (this.isSameStartStationAndEndStation)
      return actionResult(false, SAME_START_END_STATION_ERROR);

    return super.getInputResult();
  }
}
