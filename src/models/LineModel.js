import { save, load } from '../utils.js';
import { MINIMUM_INPUT_LENGTH } from '../constants.js';
import {
  INPUT_LENGTH_MESSAGE,
  ALREADY_EXIST_LINE_NAME_MESSAGE,
  NOT_CORRECT_STATION_MESSAGE,
  SAME_STATION_MESSAGE,
  ALREADY_EXIST_SECTION_NAME_MESSAGE,
  VALID_ORDER_MESSAGE,
  MINIMUM_STATION_MESSAGE,
} from '../messages.js';

export default class LineModel {
  constructor() {
    this.data = load('lineList');
  }

  getLine(lineName) {
    return this.data.find((line) => line.name === lineName);
  }

  getLineIndex(lineName) {
    return this.data.findIndex((line) => line.name === lineName);
  }

  isExistSection(stationName, line) {
    return line.sectionList.some(({ name }) => name === stationName);
  }

  isValidOrder(order, line) {
    return order >= 0 && order <= line.sectionList.length;
  }

  isValidSection(station, line, order) {
    const { name } = station;

    if (this.isExistSection(name, line)) {
      throw new Error(ALREADY_EXIST_SECTION_NAME_MESSAGE);
    }

    if (!this.isValidOrder(order, line)) {
      throw new Error(VALID_ORDER_MESSAGE(line.sectionList.length));
    }

    return true;
  }

  saveSelectedLine(line) {
    const lineIndex = this.getLineIndex(line.name);
    const nextData = [...this.data];
    nextData[lineIndex] = line;
    save('lineList', nextData);
  }

  addSection(station, line, order) {
    this.isValidSection(station, line, order);
    line.sectionList.splice(order, 0, station);
    this.saveSelectedLine(line);
  }

  deleteSection(sectionName, line) {
    if (line.sectionList.length <= 2) {
      throw new Error(MINIMUM_STATION_MESSAGE);
    }

    const index = line.sectionList.findIndex((station) => station.name === sectionName);

    if (index < 0) {
      throw new Error('');
    }

    line.sectionList.splice(index, 1);
    this.saveSelectedLine(line);
  }

  isExistLine(name) {
    return this.data.some((line) => line.name === name);
  }

  isValidLine(name, startStation, endStation) {
    if (name.length < MINIMUM_INPUT_LENGTH) {
      throw new Error(INPUT_LENGTH_MESSAGE);
    }

    if (this.isExistLine(name)) {
      throw new Error(ALREADY_EXIST_LINE_NAME_MESSAGE);
    }

    if (!startStation || !endStation) {
      throw new Error(NOT_CORRECT_STATION_MESSAGE);
    }

    if (startStation === endStation) {
      throw new Error(SAME_STATION_MESSAGE);
    }

    return true;
  }

  addLine(line) {
    const { name, sectionList } = line;
    const startStation = sectionList[0];
    const endStation = sectionList[sectionList.length - 1];

    this.isValidLine(name, startStation, endStation);
    this.data.push(line);
    save('lineList', this.data);
  }

  deleteLine(name) {
    this.data = this.data.filter((line) => line.name !== name);
    save('lineList', this.data);
  }
}
