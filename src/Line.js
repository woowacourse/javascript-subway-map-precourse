import { getStateFromStorage, setStateToStorage } from "./utils/storage.js";
import { LOCAL_STORAGE_LINES_KEY } from "./constants/index.js";

export default class Line {
  constructor(name, section) {
    this.name = name;
    this.section = section;
  }

  add() {
    const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
    setStateToStorage(LOCAL_STORAGE_LINES_KEY, {
      ...lines,
      [this.name]: this.section,
    });
  }
}
