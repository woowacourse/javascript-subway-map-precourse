export class Line {
  constructor(name, stationList) {
    this.name = name;
    this.stationList = stationList;
  }

  unableToAddLine(lineList) {
    if (this.stationList[0] === this.stationList[1]) {
      return 'BOTH_START_END_STATION_SAME';
    }
    if (this.name.replace(/ /g, '').length == 0) {
      return 'LINE_NAME_ONLY_SPACE';
    }
    if (lineList?.map((v) => v.name).includes(this.name)) {
      return 'LINE_NAME_ALREADY_REGISTERED';
    }
    return false;
  }

  unableToDeleteLine() {
    return false;
  }

  unableToAddSection(station, order) {
    if (this.stationList.includes(station)) {
      return 'SECTION_ALREADY_REGISTERED';
    }
    if (order.replace(/ /g, '').length == 0) {
      return 'ORDER_ONLY_SPACE';
    }
    if (isNaN(order)) {
      return 'ORDER_NOT_NUMBER';
    }
    if (!Number.isInteger(+order)) {
      return 'ORDER_NOT_INTEGER';
    }
    if (+order < 0) {
      return 'ORDER_NEGATIVE_NUMBER';
    }
    return false;
  }

  unableToDeleteSection() {
    if (this.stationList.length <= 2) {
      return 'SECTION_ONLY_ONE_LEFT';
    }
    return false;
  }
}
