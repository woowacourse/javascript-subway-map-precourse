import { lineSelector } from "../../_store/selectors.js";
import actionResult from "../actionResult.js";
import { DELETE_STATION_ERROR } from "../../common/alertMessages.js";

export default class DeleteStationFromLineValidation {
  constructor(deletedLineName) {
    this.deletedLineName = deletedLineName;
    this.updatedLineList = [];
  }

  getDeleteValidationResult() {}
}
