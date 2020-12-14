import { nodeSelector } from '../selector/node_selector.js';

export default class Validator {
  constructor() {}

  isOverlapped(value, compareKey) {
    const compareValues = nodeSelector.selectClassAll(compareKey);

    for (const compareValue of compareValues) {
      if (value === compareValue.innerHTML) {
        return true;
      }
    }

    return false;
  }
}
