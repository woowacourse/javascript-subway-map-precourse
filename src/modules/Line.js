import Station from "./Station.js";
import { LINE_LIST } from "../constant/constant.js";
import {
  INVAILD_LINE_NAME_LENGTH_ALERT,
  INVALID_LINE_STATION,
  SAVED_LINE_ALERT,
} from "../constant/message.js";

export default class Line {
  constructor() {
    this._lineList = this._getSavedLineList();
    this._station = new Station();
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

  _getLineObject = (name, startStation, endStation) => {
    return { name, list: [startStation, endStation] };
  };

  _failToSaveNewStation = (isValidLength, isSavedLine, isValidStation) => {
    if (!isValidLength) {
      alert(INVAILD_LINE_NAME_LENGTH_ALERT);
    }

    if (isSavedLine) {
      alert(SAVED_LINE_ALERT);
    }

    if (!isValidStation) {
      alert(INVALID_LINE_STATION);
    }
  };

  saveNewLine = (name, startStation, endStation) => {
    const isValidLength = name.length > 0;
    const isSavedLine = this._isSavedLine(name);
    const isValidStation = startStation !== endStation;

    if (isValidLength && !isSavedLine && isValidStation) {
      this._lineList.push(this._getLineObject(name, startStation, endStation));
      this._setLineList(this._lineList);
      this._station.saveLineToStation(name, startStation);
      this._station.saveLineToStation(name, endStation);

      return;
    }

    this._failToSaveNewStation(isValidLength, isSavedLine, isValidStation);
  };
}
