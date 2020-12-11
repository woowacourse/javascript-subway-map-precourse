export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
  }

  addNewStation({ name }) {
    const newStation = {
      name: name,
      lineNumber: null,
    };
    this.stations_.push(newStation);
  }
  getStationsNames() {
    let stationNames = [];
    this.stations_.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
}
