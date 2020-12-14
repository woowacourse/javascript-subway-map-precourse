import actionResult from "../actionResult.js";
import Section from "../../models/section.js";
import {
  EMPTY_ORDER_ERROR,
  INVALID_NUMBER_ERROR,
  ALREADY_EXIST_ERROR,
} from "../../common/alertMessages.js";
import { lineSelector } from "../../_store/selectors.js";
import { isInvalidNumber, isEmptyInput } from "../common.js";

export default class AddSectionValidation extends Section {
  constructor(props) {
    const { stationName, order, lineName } = props;
    super(stationName, order, lineName);
    this.isOrderEmpty = isEmptyInput(this.order);
    this.isInValidOrderNumber = isInvalidNumber(this.order);
  }

  _isAlreadyExist() {
    return lineSelector()
      .filter(({ lineName }) => this.lineName === lineName)[0]
      .stations.includes(this.stationName);
  }

  getInputResult() {
    if (this.isOrderEmpty) return actionResult(false, EMPTY_ORDER_ERROR);
    if (this.isInValidOrderNumber)
      return actionResult(false, INVALID_NUMBER_ERROR);
    if (this._isAlreadyExist()) return actionResult(false, ALREADY_EXIST_ERROR);

    return actionResult(true);
  }
}
