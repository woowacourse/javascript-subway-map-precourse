import { roleInterface } from '../../component/role_interface.js';
import {
  SECTION_ALERT_COUNT,
  SECTION_ALERT_ORDER,
  SECTION_ALERT_OVERLAP,
} from '../../library/constant/constant.js';
import Validator from './validator.js';

class SectionValidator extends Validator {
  constructor() {
    super();
  }

  checkValidInput(input, line) {
    const stations = this.getSectionLine(line);
    const order = input.value !== '' ? input.value : -1;

    if (!(order >= 0 && order < stations.length) || order % 1 !== 0) {
      this.alertOrderInvalid(input);

      return false;
    }

    return true;
  }

  getSectionLine(line) {
    const lineInfos = roleInterface.getLineInfos();

    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      if (lineInfo.hasOwnProperty(line)) {
        return lineInfo[line];
      }
    }
  }

  alertOrderInvalid(input) {
    input.value = '';
    alert(SECTION_ALERT_ORDER);
  }

  checkValidOption(selector, line) {
    const stations = this.getSectionLine(line);
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

  canDelete(line) {
    const stations = this.getSectionLine(line);

    if (stations.length > 2) {
      return true;
    }
    this.alertSectionCount();

    return false;
  }

  alertSectionCount() {
    alert(SECTION_ALERT_COUNT);
  }
}

export const sectionValidator = new SectionValidator();
