export default class SubwayMapViewModel {
  constructor(subwayMapModel) {
    this.subwayMapModel = subwayMapModel;
  }

  getStations() {
    return this.subwayMapModel.getStations();
  }

  addStation(stationId) {
    this.subwayMapModel.addStation(stationId);
  }

  deleteStation(stationId) {
    this.subwayMapModel.deleteStation(stationId);
  }

  getLines() {
    return this.subwayMapModel.getLines();
  }

  getLine(lineId) {
    return this.subwayMapModel.getLine(lineId);
  }

  addLine(lineObject) {
    this.subwayMapModel.addLine(lineObject);
  }
}
