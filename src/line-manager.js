import StationLine from "./station-line.js";

export default class LineManager {
  constructor() {
    this.lineList = [];
    this.setLineList();
  }

  setLineList() {
    const storedLineList = localStorage.lineList;
    if (storedLineList !== undefined) {
      const storedLineListObj = JSON.parse(storedLineList);
      this.lineList = Object.entries(storedLineListObj).map((_line) => {
        return new StationLine(_line[0], _line[1]);
      });
    }
  }

  convertLineListToObject() {
    const converted = {};
    this.lineList.forEach((_line) => {
      converted[_line.name] = _line.section;
    });

    return converted;
  }

  addLine(lineName, startStation, endStation) {
    const newLine = new StationLine(lineName, [startStation, endStation]);
    this.lineList.push(newLine);
    const convertedLineObject = this.convertLineListToObject();
    localStorage.lineList = JSON.stringify(convertedLineObject);
  }

  hasLineName(lineName) {
    for (let i = 0; i < this.lineList.length; i++) {
      if (this.lineList[i].name === lineName) {
        return true;
      }
    }
    return false;
  }
}
// localStorage.lineList = {
//   lineName: [],
//    ...
// }
