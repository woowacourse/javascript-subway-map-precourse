import { message } from '../../constants';

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
      return message.ALERT_FOR_EMPTY;
    }
    if (!/^[가-힣a-zA-z0-9]+$/.test(stationId)) {
      return message.ALERT_FOR_WRONG_NAME;
    }
    if (stationId.length < 2) {
      return message.ALERT_FOR_LENGTH;
    }
    if (stationId in this.getStations()) {
      return message.ALERT_FOR_OVERLAPED_NAME;
    }

    return '';
  }

  getStations() {
    return this.subwayMapModel.getStations();
  }

  addStation(stationId) {
    const errorMessage = this.validStationName(stationId);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
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
