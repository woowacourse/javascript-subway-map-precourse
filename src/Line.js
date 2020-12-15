import { getStateFromStorage, setStateToStorage } from "./utils/storage.js";
import * as storageKey from "./constants/storageKey.js";

export default class Line {
  constructor(name, section) {
    this.name = name;
    this.section = section;
  }

  add() {
    const lines = getStateFromStorage(storageKey.LINES);
    setStateToStorage(storageKey.LINES, {
      ...lines,
      [this.name]: this.section,
    });
  }
}
