import { LINE_LIST } from "../constant/constant.js";

export default class Line {
  constructor() {}

  _setLineList = lineList => {
    localStorage.setItem(LINE_LIST, JSON.stringify(lineList));
  };
}
