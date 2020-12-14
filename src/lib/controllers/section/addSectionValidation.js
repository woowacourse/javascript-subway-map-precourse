import actionResult from "../actionResult.js";
import Section from "../../models/section.js";
import {
  EMPTY_ORDER_ERROR,
  INVALID_NUMBER_ERROR,
} from "../../common/alertMessages.js";
import { isInvalidNumber, isEmptyInput } from "../common.js";

export default class AddSectionValidation extends Section {
  constructor(props) {
    const { stationName, order } = props;
    super(stationName, order);
    this.isOrderEmpty = isEmptyInput(this.order);
    this.isInValidOrderNumber = isInvalidNumber(this.order);
  }

  getInputResult() {
    if (this.isOrderEmpty) return actionResult(false, EMPTY_ORDER_ERROR);
    if (this.isInValidOrderNumber)
      return actionResult(false, INVALID_NUMBER_ERROR);

    return actionResult(true);
  }
}
