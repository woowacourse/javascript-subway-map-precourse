import LineNameInputValidation from "./lineNameInputValidation.js";
import actionResult from "../actionResult.js";
import { SAME_START_END_STATION_ERROR } from "../../common/alertMessages.js";

export default class AddNewLineInfoValidation {
  constructor(newLineInfo) {
    const { stations } = newLineInfo;
    this.lineName = newLineInfo.lineName;
    this.isSameStartStationAndEndStation = stations[0] === stations[1];
  }

  getInputResult() {
    const newLineNameInputResult = new LineNameInputValidation(this.lineName);
    if (!newLineNameInputResult.getInputResult().ok)
      return newLineNameInputResult.getInputResult();

    if (this.isSameStartStationAndEndStation)
      return actionResult(false, SAME_START_END_STATION_ERROR);

    return actionResult(true);
  }
}
