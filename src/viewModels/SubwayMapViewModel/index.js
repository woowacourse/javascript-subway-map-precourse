export default class SubwayMapViewModel {
  constructor(subwayMapModel) {
    this.subwayMapModel = subwayMapModel;
  }

  isEmpty(stationId) {
    if (stationId === '') {
      return true;
    }

    stationId = Array.from(new Set(stationId));
    if (
      (stationId.length === 1 && stationId[0] === ' ') ||
      stationId.length === 0
    ) {
      return true;
    }

    return false;
  }
  validStationName(stationId) {
    if (this.isEmpty(stationId)) {
      console.log('공백');
    }
    // if (!/^[0-9a-zA-Z가-힣]/g.test(stationId)) {
    //   console.log('이상한 이름');
    // }

    return '';
  }

  getStations() {
    return this.subwayMapModel.getStations();
  }

  addStation(stationId) {
    console.log(stationId);
    this.validStationName(stationId);
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

  deleteLine(lineId) {
    this.subwayMapModel.deleteLine(lineId);
  }

  addLine(lineObject) {
    this.subwayMapModel.addLine(lineObject);
  }

  addSection(sectionId, lineId, order) {
    this.subwayMapModel.addSectionToLine(sectionId, lineId, order);
  }

  deleteSection(lineId, order) {
    this.subwayMapModel.deleteSectionFromLine(lineId, order);
  }

  getSections(lineId) {
    return this.subwayMapModel.getsectionsFromLine(lineId);
  }
}
