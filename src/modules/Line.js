import { LINE_LIST } from "../constant/constant.js";

export default class Line {
  constructor() {
    this._lineList = this._getSavedLineList();
  }

  _isSavedLine = name => {
    const savedLine = this._lineList.filter(line => line.name === name);

    return savedLine.length !== 0;
  };

  _setLineList = lineList => {
    localStorage.setItem(LINE_LIST, JSON.stringify(lineList));
  };

  _getSavedLineList = () => {
    const savedLineList = localStorage.getItem(LINE_LIST);

    return JSON.parse(savedLineList) || [];
  };
}
