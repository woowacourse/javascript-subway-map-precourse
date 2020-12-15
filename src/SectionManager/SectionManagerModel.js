export default class SectionManagerModel {
  static isValidInput(line, index, station) {
    if (!SectionManagerModel.isValidNumber(line, index)) {
      return 0;
    }
    if (SectionManagerModel.isDuplicated(line, station)) {
      return -1;
    }
    return 1;
  }

  static isValidNumber(line, number) {
    return (number !== '') && this.isValidRange(line, number) && this.isNumber(number);
  }

  static isValidRange(line, number) {
    const linesLength = JSON.parse(localStorage.getItem('Lines'))[line].stations.length;
    return linesLength + 1 >= number && number >= 0;
  }

  static isNumber(number) {
    return !/[^0-9]/.test(`${number}`);
  }

  static isDuplicated(line, station) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stationIncludedByLine = lines[line].stations;
    return stationIncludedByLine.indexOf(station) > -1;
  }

  static add(line, station, index) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stationIncludedByLine = lines[line].stations;
    const stations = JSON.parse(localStorage.getItem('Stations'));

    if (stations[station].lines.indexOf(line) < 0) {
      stations[station].lines.push(line);
    }
    stationIncludedByLine.splice(index, 0, station);
    lines[line].stations = stationIncludedByLine;

    localStorage.setItem('Stations', JSON.stringify(stations));
    localStorage.setItem('Lines', JSON.stringify(lines));
  }

  static checkNumOfStations(line) {
    return JSON.parse(localStorage.getItem('Lines'))[line].stations.length > 2;
  }

  static delete(line, station) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stationIncludedByLine = JSON.parse(localStorage.getItem('Lines'))[line].stations;
    stationIncludedByLine.splice(stationIncludedByLine.indexOf(station), 1);
    lines[line].stations = stationIncludedByLine;
    localStorage.setItem('Lines', JSON.stringify(lines));
  }
}
