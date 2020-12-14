import { save, load } from '../utils.js';
import { MINIMUM_INPUT_LENGTH } from '../constants.js';
import { INPUT_LENGTH_MESSAGE, ALREADY_EXIST_STATION_NAME_MESSAGE, REGISTERED_STATION_MESSAGE } from '../messages.js';

export default class StationModel {
  constructor() {
    this.data = load('stationList');
  }

  getStation(name) {
    return this.data.find((station) => station.name === name);
  }

  isValidStation(station) {
    const { name } = station;

    if (name.length < MINIMUM_INPUT_LENGTH) {
      throw new Error(INPUT_LENGTH_MESSAGE);
    }

    if (this.data.includes(name)) {
      throw new Error(ALREADY_EXIST_STATION_NAME_MESSAGE);
    }

    return true;
  }

  isRegisteredStation(station, lineList) {
    return lineList.some((line) => {
      const index = line.sectionList.findIndex((section) => section.name === station.name);
      return index >= 0;
    });
  }

  addStation(station) {
    this.isValidStation(station);
    this.data.push(station);
    save('stationList', this.data);
  }

  deleteStation(name, lineList) {
    const index = this.data.findIndex((station) => station.name === name);

    if (this.isRegisteredStation(this.data[index], lineList)) {
      throw new Error(REGISTERED_STATION_MESSAGE);
    }

    this.data.splice(index, 1);
    save('stationList', this.data);
  }
}
