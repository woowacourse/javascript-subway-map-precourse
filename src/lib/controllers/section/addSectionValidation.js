import actionResult from "../actionResult.js";
import {
  EMPTY_ORDER_ERROR,
  INVALID_NUMBER_ERROR,
} from "../../common/alertMessages.js";
import { isInvalidNumber, isEmptyInput } from "../common.js";

export default class addSectionValidation {
  constructor(props) {
    const { stationName, order } = props;
    this.stationName = stationName;
    this.order = order;
    this.isOrderEmpty = isEmptyInput(order);
    this.isInValidOrder = isInvalidNumber(order);
  }

  getInputResult() {
    if (this.isOrderEmpty) return actionResult(false, EMPTY_ORDER_ERROR);
    if (this.isInValidOrder) return actionResult(false, INVALID_NUMBER_ERROR);

    return actionResult(true);
  }
}
