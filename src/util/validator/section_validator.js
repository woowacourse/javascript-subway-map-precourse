import { roleInterface } from '../../component/role_interface.js';
import {
  SECTION_ALERT_ORDER,
  SECTION_ALERT_OVERLAP,
} from '../../library/constant/constant.js';
import Validator from './validator.js';

class SectionValidator extends Validator {
  constructor() {
    super();
  }

  checkValidInput(input, line) {
    const stations = roleInterface.getSectionLine(line);
    const order = input.value;

    if (!(order >= 0 && order < stations.length) || order % 1 !== 0) {
      this.alertOrderInvalid(input);

      return false;
    }

    return true;
  }

  alertOrderInvalid(input) {
    input.value = '';
    alert(SECTION_ALERT_ORDER);
  }

  checkValidOption(selector, line) {
    const stations = roleInterface.getSectionLine(line);
    const station = selector.value;

    if (stations.includes(station)) {
      this.alertOptionInvalid();

      return false;
    }

    return true;
  }

  alertOptionInvalid() {
    alert(SECTION_ALERT_OVERLAP);
  }
}

export const sectionValidator = new SectionValidator();
