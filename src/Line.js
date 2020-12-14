import { getStateFromStorage, setStateToStorage } from "./utils/storage.js";
import { LOCAL_STORAGE_LINES_KEY } from "./constants/index.js";

export default class Line {
  constructor(name, section) {
    this.name = name;
    this.section = section;
  }

  add() {
    const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
    if (!lines) {
      setStateToStorage(LOCAL_STORAGE_LINES_KEY, [this]);
      return;
    }
    setStateToStorage(LOCAL_STORAGE_LINES_KEY, [...lines, this]);
  }
}
