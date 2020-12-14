import { Station } from "../model/station.js";
import { Constant, ErrorMessage } from "./constant.js";

export const StationValidation = {
  isValidStation(name) {
    return this.hasValidName(name);
  },

  hasValidName(name) {
    if (!this.hasMinimumLength(name)) {
      alert(ErrorMessage.MINIMUM_NAME_LENGTH);
      return;
    }

    if (!this.isNotDuplicated(name)) {
      alert(ErrorMessage.DUPLICATED_NAME);
      return;
    }

    return true;
  },

  hasMinimumLength(name) {
    return (
      name.length >= Constant.MINIMUM_NAME_LENGTH &&
      !Constant.REGEX_CATCHING_WHITESPACE.test(name)
    );
  },

  isNotDuplicated(name) {
    return !Station.stations.includes(name);
  },
};
