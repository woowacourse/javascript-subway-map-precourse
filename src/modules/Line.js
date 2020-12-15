import { LINE_LIST, MIN_SECTION_LENGTH } from "../constant/constant.js";
import {
  INVAILD_LINE_NAME_LENGTH_ALERT,
  INVALID_LINE_STATION,
  INVALID_SECTION_ORDER,
  SAVED_LINE_ALERT,
  SAVED_STATION_IN_LINE_ALERT,
  TWO_STATION_IN_LINE_ALERT,
} from "../constant/message.js";

export default class Line {
  constructor(station) {
    this._lineList = this._getSavedLineList();
    this._station = station;
  }

  _isSavedLine = name => {
    const savedLine = this._lineList.filter(line => line.name === name);

    return savedLine.length !== 0;
  };

  _isStationInLine = (stationName, lineName) => {
    const line = this._lineList.filter(line => line.name === lineName)[0];

    return line.list.includes(stationName);
  };

  _isValidLengthToDelete = lineName => {
    const line = this._lineList.filter(line => line.name === lineName)[0];

    return line.list.length > MIN_SECTION_LENGTH;
  };

  _isValidOrder = (order, lineName) => {
    const line = this._lineList.filter(line => line.name === lineName)[0];

    return order >= 0 && order <= line.list.length;
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

  _failToSaveStationToLine = (isStationInLine, isVaildOrder) => {
    if (isStationInLine) {
      alert(SAVED_STATION_IN_LINE_ALERT);
    }

    if (!isVaildOrder) {
      alert(INVALID_SECTION_ORDER);
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

  getLineList = () => {
    return this._lineList;
  };

  deleteLine = name => {
    const newLineList = this._lineList.filter(line => line.name !== name);
    this._lineList = newLineList;
    this._setLineList(newLineList);
    this._station.deleteLineFromStation(name);
  };

  saveStationToLine = (stationName, lineName, order) => {
    const isStationInLine = this._isStationInLine(stationName, lineName);
    const isValidOrder = this._isValidOrder(order, lineName);

    if (isStationInLine || !isValidOrder) {
      this._failToSaveStationToLine(isStationInLine, isValidOrder);

      return;
    }

    const newLineList = this._lineList.map(({ name, list }) => {
      if (name === lineName) {
        list.splice(order, 0, stationName);
        this._station.saveLineToStation(lineName, stationName);
      }

      return { name, list };
    });
    this._lineList = newLineList;
    this._setLineList(newLineList);
  };

  deleteStationFromLine = (stationName, lineName) => {
    if (!this._isValidLengthToDelete(lineName)) {
      alert(TWO_STATION_IN_LINE_ALERT);

      return;
    }

    const newLineList = this._lineList.map(({ name, list }) => {
      if (name === lineName) {
        const index = list.indexOf(stationName);
        list.splice(index, 1);
      }

      return { name, list };
    });
    this._lineList = newLineList;
    this._setLineList(newLineList);
    this._station.deleteLineFromStation(lineName, stationName);
  };

  updateLineList = () => {
    this._lineList = this._getSavedLineList();
  };
}
