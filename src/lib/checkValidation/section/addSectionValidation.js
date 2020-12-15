import actionResult from "../actionResult.js";
import Section from "../../models/section.js";
import {
  EMPTY_ORDER_ERROR,
  INVALID_NUMBER_ERROR,
  ALREADY_EXIST_ERROR,
  LARGE_ORDER_NUMBER_ERROR,
} from "../../common/alertMessages.js";
import { lineSelector } from "../../store/selectors.js";
import { isInvalidNumber, isEmptyInput } from "../common.js";

export default class AddSectionValidation extends Section {
  constructor(props) {
    const { stationName, order, lineName } = props;
    super(stationName, order, lineName);
    this.isOrderEmpty = isEmptyInput(this.order);
    this.isInValidOrderNumber = isInvalidNumber(this.order);
    this.lineStationsList = lineSelector().filter(
      (lineData) => this.lineName === lineData.lineName,
    )[0].stations;
  }

  _isAlreadyExist() {
    return this.lineStationsList.includes(this.stationName);
  }

  _orderIsLargerThanLineLength() {
    return this.order > this.lineStationsList.length;
  }

  getInputResult() {
    if (this.isOrderEmpty) return actionResult(false, EMPTY_ORDER_ERROR);
    if (this.isInValidOrderNumber)
      return actionResult(false, INVALID_NUMBER_ERROR);
    if (this._isAlreadyExist()) return actionResult(false, ALREADY_EXIST_ERROR);
    if (this._orderIsLargerThanLineLength())
      return actionResult(false, LARGE_ORDER_NUMBER_ERROR);

    return actionResult(true);
  }
}
