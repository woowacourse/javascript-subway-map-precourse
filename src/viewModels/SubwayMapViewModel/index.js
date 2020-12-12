import { message } from '../../constants';

export default class SubwayMapViewModel {
  constructor(subwayMapModel) {
    this.subwayMapModel = subwayMapModel;
  }

  getStations() {
    return this.subwayMapModel.getStations();
  }

  setStations(stations) {
    return this.subwayMapModel.setStations(stations);
  }

  addStation(stationId) {
    const errorMessage = this.validStationId(stationId);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    this.subwayMapModel.addStation(stationId);
  }

  deleteStation(stationId) {
    if (this.isInLines(stationId)) {
      alert(message.ALERT_FOR_STATION_IN_LINES);
      return;
    }
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
    const errorMessage = this.validLineObject(lineObject);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    this.subwayMapModel.addLine(lineObject);
  }

  addSection(sectionId, lineId, order) {
    if (order < 0 || order === this.getSections(lineId).length) {
      alert(message.ALERT_FOR_BETWEEN_STATION_AND_STATION);
      return;
    }

    if (this.isInLine(sectionId, lineId)) {
      alert(message.ALERT_FOR_STATION_IS_IN_LINE);
      return;
    }

    this.subwayMapModel.addSectionToLine(sectionId, lineId, order);
  }

  deleteSection(lineId, order) {
    if (this.getSections(lineId).length === 2) {
      alert(message.ALERT_FOR_LESS_THAN_TWO);
      return;
    }

    this.subwayMapModel.deleteSectionFromLine(lineId, order);
  }

  getSections(lineId) {
    return this.subwayMapModel.getSectionsFromLine(lineId);
  }

  isEmpty(id) {
    if (id === '') {
      return true;
    }

    id = Array.from(new Set(id));
    if ((id.length === 1 && id[0] === ' ') || id.length === 0) {
      return true;
    }

    return false;
  }

  isInLines(stationId) {
    const lines = Object.entries(this.subwayMapModel.getLines());
    return lines.some(line => {
      return line[1].sections.some(section => {
        return section.stationId === stationId;
      });
    });
  }

  isInLine(stationId, lineId) {
    const found = this.getSections(lineId).find(section => {
      return stationId === section.stationId;
    });

    if (found) {
      return true;
    }

    return false;
  }

  validStationId(stationId) {
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

  validLineObject(lineObject) {
    if (this.isEmpty(lineObject.lineId)) {
      return message.ALERT_FOR_EMPTY;
    }

    if (!/^[가-힣a-zA-z0-9]+$/.test(lineObject.lineId)) {
      return message.ALERT_FOR_WRONG_NAME;
    }

    if (lineObject.lineId in this.getLines()) {
      return message.ALERT_FOR_OVERLAPED_NAME;
    }

    if (lineObject.startStation === lineObject.endStation) {
      return message.ALERT_FOR_OVERLAPED_STATION;
    }

    return '';
  }
}
