import { Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";

export class LineObject {
  constructor(name, start, end) {
    this.name = name;
    this.stations = [start, end];
  }
}

export const Line = {
  key: Constant.STORAGE_KEY_LINE,
  lines: [],

  add(lineObject) {
    this.lines.push(lineObject);
    Storage.save(this.key, this.lines);
  },

  delete() {},
};
