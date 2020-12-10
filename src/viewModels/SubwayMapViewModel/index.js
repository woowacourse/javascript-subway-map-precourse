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

  getlines() {
    return this.subwayMapModel.getlines();
  }

  addLine(lineObject) {
    this.subwayMapModel.addLine(lineObject);
  }
}
